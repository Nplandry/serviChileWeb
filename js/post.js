





function generateTableOfContents() {
    const headings = document.querySelectorAll('.post-main h2, .post-main h3');
    const tocList = document.querySelector('.toc-widget ul');
    
    if (!tocList) return;

    headings.forEach((heading, index) => {

        if (!heading.id) {
            heading.id = `section-${index}`;
        }


        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${heading.id}`;
        a.textContent = heading.textContent;
        a.onclick = function(e) {
            e.preventDefault();
            document.getElementById(heading.id).scrollIntoView({ behavior: 'smooth' });
        };

        li.appendChild(a);
        tocList.appendChild(li);
    });
}


document.addEventListener('DOMContentLoaded', generateTableOfContents);




function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 60px;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        z-index: 999;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

createProgressBar();




document.querySelectorAll('.share-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const platform = this.className.split(' ')[1];
        const title = document.querySelector('.post-header h1').textContent;
        const url = window.location.href;
        const text = `Mira este artículo: ${title}`;

        let shareUrl;
        switch(platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                break;
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
                break;
        }

        if (shareUrl) {
            window.open(shareUrl, 'share', 'width=600,height=400');
        }

        trackEvent('post_share', { platform: platform });
    });
});




function copyPostLink() {
    const url = window.location.href;
    const title = document.querySelector('.post-header h1').textContent;
    
    navigator.clipboard.writeText(url).then(() => {
        showToast('Link copiado');
        trackEvent('post_link_copied', { title: title });
    }).catch(() => {
        showToast('Error al copiar', 'error');
    });
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    const bgColor = type === 'error' ? '#e74c3c' : '#27ae60';
    
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: slideUp 0.3s ease-out;
    `;
    
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}




function makeSidebarSticky() {
    const sidebar = document.querySelector('.post-sidebar');
    if (!sidebar) return;

    const stickyOffset = sidebar.offsetTop;
    const stickyWidth = sidebar.offsetWidth;

    window.addEventListener('scroll', function() {
        if (window.scrollY > stickyOffset) {
            sidebar.style.position = 'fixed';
            sidebar.style.top = '70px';
            sidebar.style.width = stickyWidth + 'px';
        } else {
            sidebar.style.position = 'static';
            sidebar.style.width = 'auto';
        }
    });
}






function calculateReadingTime() {
    const text = document.querySelector('.post-main').innerText;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200); // 200 palabras por minuto
    
    const metaInfo = document.querySelector('.post-info');
    if (metaInfo) {
        const readingTimeSpan = document.createElement('span');
        readingTimeSpan.innerHTML = `<i class="fas fa-hourglass-half"></i> ${minutes} min de lectura`;
        metaInfo.appendChild(readingTimeSpan);
    }
}






document.querySelectorAll('.post-main a').forEach(link => {
    link.style.color = 'var(--primary-color)';
    link.style.fontWeight = '600';
    link.style.textDecoration = 'underline';
    link.style.cursor = 'pointer';
    
    link.addEventListener('mouseenter', function() {
        this.style.color = 'var(--secondary-color)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.color = 'var(--primary-color)';
    });
});




if (typeof trackEvent !== 'undefined') {

    const title = document.querySelector('.post-header h1')?.textContent || 'Unknown Post';
    trackEvent('post_view', {
        title: title,
        timestamp: new Date().toISOString()
    });


    let startTime = Date.now();
    window.addEventListener('beforeunload', function() {
        const timeSpent = (Date.now() - startTime) / 1000;
        trackEvent('post_time_spent', {
            title: title,
            seconds: Math.round(timeSpent)
        });
    });


    let maxScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollPercentage = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
        maxScroll = Math.max(maxScroll, scrollPercentage);
    });

    window.addEventListener('beforeunload', function() {
        trackEvent('post_scroll_depth', {
            title: title,
            percentage: Math.round(maxScroll)
        });
    });
}




function printPost() {
    window.print();
    trackEvent('post_print', {
        title: document.querySelector('.post-header h1').textContent
    });
}




function emailPost() {
    const title = document.querySelector('.post-header h1').textContent;
    const url = window.location.href;
    const subject = `Artículo: ${title}`;
    const body = `Te recomiendo este artículo de ServiChile:\n\n${title}\n\n${url}`;

    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    trackEvent('post_email_share', { title: title });
}




function initializeCommentForm() {
    const contactLink = document.querySelector('.post-comments .btn-secondary');
    if (contactLink) {
        contactLink.addEventListener('click', function() {
            trackEvent('post_comment_attempt', {
                title: document.querySelector('.post-header h1').textContent
            });
        });
    }
}

initializeCommentForm();




document.querySelectorAll('.related-list a').forEach(link => {
    link.addEventListener('click', function() {
        trackEvent('post_related_click', {
            from_post: document.querySelector('.post-header h1').textContent,
            to_post: this.textContent
        });
    });
});




document.querySelectorAll('.post-main h2, .post-main h3').forEach(heading => {
    heading.addEventListener('mouseenter', function() {
        this.style.color = 'var(--secondary-color)';
        this.style.transition = 'color 0.3s ease';
    });
    
    heading.addEventListener('mouseleave', function() {
        this.style.color = 'var(--primary-color)';
    });
});




document.querySelectorAll('.post-main h2, .post-main h3').forEach(heading => {
    if (heading.id) {
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.className = 'heading-anchor';
        link.innerHTML = '<i class="fas fa-link"></i>';
        link.title = 'Copy link';
        link.onclick = function(e) {
            e.preventDefault();
            navigator.clipboard.writeText(window.location.href + '#' + heading.id);
            showToast('Enlace copiado');
        };
        heading.appendChild(link);
    }
});




const style = document.createElement('style');
style.textContent = `
    .heading-anchor {
        margin-left: 0.5rem;
        opacity: 0;
        color: var(--secondary-color);
        text-decoration: none;
        transition: opacity 0.3s ease;
        font-size: 0.8em;
    }
    
    h2:hover .heading-anchor,
    h3:hover .heading-anchor {
        opacity: 1;
    }
    
    @keyframes slideUp {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(20px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

console.log('Post functionality loaded successfully');
