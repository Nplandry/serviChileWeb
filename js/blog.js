





const filterButtons = document.querySelectorAll('.filter-btn');
const postCards = document.querySelectorAll('.post-card');
let currentFilter = 'all';

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        const filterValue = this.dataset.filter;
        currentFilter = filterValue;


        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');


        filterPosts(filterValue);


        if (typeof trackEvent !== 'undefined') {
            trackEvent('blog_filter', { filter: filterValue });
        }
    });
});

function filterPosts(filter) {
    postCards.forEach(card => {
        const category = card.dataset.category;
        
        if (filter === 'all' || category === filter) {
            card.classList.remove('hidden');
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = 'fadeIn 0.5s ease-out';
            }, 10);
        } else {
            card.classList.add('hidden');
        }
    });


    const postsSection = document.querySelector('.blog-posts');
    if (postsSection) {
        setTimeout(() => {
            postsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}




const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        
        postCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const matches = title.includes(query) || description.includes(query);
            
            if (query === '' || matches) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });


        const visibleCards = Array.from(postCards).filter(card => !card.classList.contains('hidden'));
        if (visibleCards.length === 0 && query !== '') {
            showNoResults();
        } else {
            hideNoResults();
        }


        if (query.length > 2) {
            trackEvent('blog_search', { query: query });
        }
    });
}

function showNoResults() {
    const postsGrid = document.querySelector('.posts-grid');
    if (postsGrid && !postsGrid.querySelector('.no-results')) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.innerHTML = `
            <i class="fas fa-search"></i>
            <p>No encontramos artículos que coincidan con tu búsqueda.</p>
        `;
        postsGrid.appendChild(noResults);
    }
}

function hideNoResults() {
    const noResults = document.querySelector('.no-results');
    if (noResults) {
        noResults.remove();
    }
}




const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[name="email"]').value;
        

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, ingresa un email válido');
            return;
        }


        const button = this.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Suscribiendo...';
        button.disabled = true;


        setTimeout(() => {
            button.textContent = '¡Bienvenido!';
            this.reset();
            

            trackEvent('newsletter_signup', { email: email });


            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 3000);
        }, 1000);
    });
}




document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');

    if (filterParam && filterParam !== 'all') {
        const button = document.querySelector(`[data-filter="${filterParam}"]`);
        if (button) {
            button.click();
        }
    }
});




document.querySelectorAll('.read-more').forEach(link => {
    link.addEventListener('click', function() {
        const title = this.closest('.post-card').querySelector('h3').textContent;
        trackEvent('blog_read_more', { post: title });
    });
});




document.querySelectorAll('.post-category').forEach(category => {
    category.addEventListener('click', function(e) {
        if (e.target.tagName !== 'A') {
            const categoryText = this.textContent;
            trackEvent('blog_category_click', { category: categoryText });
        }
    });
});




const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('post-card')) {
            entry.target.style.animation = 'fadeIn 0.5s ease-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.post-card').forEach(card => {
    observer.observe(card);
});




function sharePost(title) {
    const url = window.location.href;
    const text = `Mira este artículo de ServiChile: ${title}`;

    if (navigator.share) {
        navigator.share({
            title: title,
            text: text,
            url: url
        }).catch(err => console.log('Error sharing:', err));
    } else {

        const fullText = `${title}\n${url}`;
        navigator.clipboard.writeText(fullText).then(() => {
            alert('Link copiado al portapapeles');
        });
    }
}




document.addEventListener('keydown', function(event) {

    if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
        event.preventDefault();
        searchInput.focus();
    }


    if (event.key === 'Escape' && searchInput === document.activeElement) {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
    }
});




if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}




function copyArticleLink(articleTitle) {
    const url = window.location.href;
    const text = `${articleTitle} - ServiChile`;
    
    navigator.clipboard.writeText(url).then(() => {

        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #27ae60;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 9999;
            animation: slideUp 0.3s ease-out;
        `;
        toast.textContent = 'Link copiado';
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideDown 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    });
}




function loadRelatedPosts(category) {
    const related = Array.from(postCards)
        .filter(card => card.dataset.category === category && card.classList.contains('hidden'))
        .slice(0, 3);

    if (related.length > 0) {
        related.forEach(card => {
            card.classList.remove('hidden');
        });
    }
}




if (typeof trackEvent !== 'undefined') {

    trackEvent('blog_page_view', {
        page: 'blog_main',
        timestamp: new Date().toISOString()
    });


    let startTime = Date.now();
    window.addEventListener('beforeunload', function() {
        const timeSpent = (Date.now() - startTime) / 1000;
        trackEvent('blog_time_spent', {
            seconds: Math.round(timeSpent),
            page: 'blog_main'
        });
    });
}




function printArticle() {
    const article = document.querySelector('.post-card');
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(article.innerHTML);
    printWindow.document.close();
    printWindow.print();
}

console.log('Blog functionality loaded successfully');
