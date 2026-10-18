


document.addEventListener('DOMContentLoaded', function() {

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });


  const selects = document.querySelectorAll('select.field__input');
  selects.forEach(select => {
    select.style.padding = 'var(--space-sm, 0.75rem) var(--space-md, 1rem)';
    select.style.borderRadius = 'var(--radius-sm, 0.5rem)';
  });
});


function formatCLP(amount) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(amount);
}


function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}


function validateRUT(rut) {
  if (!rut || rut.length < 8) return false;
  rut = rut.replace(/\./g, '').replace(/-/g, '');
  return /^\d{7,8}[0-9Kk]$/.test(rut);
}

console.log('ServiChile initialized');




const SERVICHILE_CASES = [
  {
    id: 'arriendo',
    icon: 'fa-house-user',
    title: 'Voy a arrendar mi propiedad',
    subtitle: 'Verifica al arrendatario antes de entregar las llaves',
    offers: [
      {
        icon: 'fa-file-invoice-dollar',
        name: 'Informe Comercial DICOM Equifax',
        desc: 'Revisa deudas, morosidades y protestos del postulante con el informe comercial más usado de Chile.',
        price: 'Equifax Chile',
        cta: 'Obtener informe',
        link: 'contacto.html?caso=arriendo&servicio=dicom'
      },
      {
        icon: 'fa-shield-halved',
        name: 'Garantía de Arriendo con Assetplan o HousingPro',
        desc: 'Protege tus rentas mensuales contratando una garantía que cubre impagos y daños causados durante el contrato de arriendo.',
        price: 'Corredoras asociadas',
        cta: 'Cotizar garantía',
        link: 'contacto.html?caso=arriendo&servicio=garantia'
      }
    ]
  },
  {
    id: 'auto-usado',
    icon: 'fa-car',
    title: 'Compro un auto usado',
    subtitle: 'Evita prendas, multas y vehículos con problemas',
    offers: [
      {
        icon: 'fa-file-contract',
        name: 'Informe Automotriz Autofact',
        desc: 'Obtén el historial completo del vehículo incluyendo prendas, multas, kilometraje registrado, tasación y antecedentes de siniestros antes de hacer la compra.',
        price: 'Autofact',
        cta: 'Ver informe',
        link: 'contacto.html?caso=auto-usado&servicio=autofact'
      },
      {
        icon: 'fa-car-burst',
        name: 'Seguros Automotriz con BCI, HDI o SURA',
        desc: 'Compara y contrata tu seguro automotriz directamente con las principales aseguradoras operando en el mercado chileno.',
        price: 'Aseguradoras asociadas',
        cta: 'Cotizar seguro',
        link: 'contacto.html?caso=auto-usado&servicio=seguro'
      }
    ]
  },
  {
    id: 'cuidador',
    icon: 'fa-user-nurse',
    title: 'Contrato un cuidador o nana',
    subtitle: 'Protege a tus seres queridos antes de contratar',
    offers: [
      {
        icon: 'fa-id-badge',
        name: 'Verificación de Antecedentes Verifik / Trueke',
        desc: 'Validación de identidad y antecedentes del postulante con plataformas privadas de background check.',
        price: 'Partners de verificación',
        cta: 'Verificar persona',
        link: 'contacto.html?caso=cuidador&servicio=antecedentes'
      },
      {
        icon: 'fa-handshake-angle',
        name: 'Nanas y Cuidadores Babysits / Nannemployer',
        desc: 'Conecta con agencias privadas que ofrecen cuidadores verificados con referencias comprobadas.',
        price: 'Agencias asociadas',
        cta: 'Buscar cuidador',
        link: 'contacto.html?caso=cuidador&servicio=agencia'
      }
    ]
  },
  {
    id: 'adulto-mayor',
    icon: 'fa-shield-heart',
    title: 'Protejo a un adulto mayor',
    subtitle: 'Previene estafas y entrega apoyo de cuidado',
    offers: [
      {
        icon: 'fa-bell-concierge',
        name: 'Teleasistencia Mayores Help / Cuidados DUOC',
        desc: 'Botón de emergencia y asistencia remota 24/7 para adultos mayores con proveedores privados especializados.',
        price: 'Proveedores asociados',
        cta: 'Ver teleasistencia',
        link: 'contacto.html?caso=adulto-mayor&servicio=teleasistencia'
      },
      {
        icon: 'fa-heart-pulse',
        name: 'Seguro de Salud Senior Consalud / Colmena',
        desc: 'Planes de salud complementarios y seguros catastróficos pensados para adultos mayores.',
        price: 'Aseguradoras asociadas',
        cta: 'Cotizar plan',
        link: 'contacto.html?caso=adulto-mayor&servicio=salud'
      }
    ]
  },
  {
    id: 'socio-negocio',
    icon: 'fa-handshake',
    title: 'Inicio un negocio con un socio',
    subtitle: 'Conoce con quién te asocias antes de firmar',
    offers: [
      {
        icon: 'fa-building',
        name: 'Informe Empresarial Dun & Bradstreet / Equifax',
        desc: 'Reporte financiero y comercial de tu futuro socio o empresa con proveedores privados de riesgo.',
        price: 'Equifax Chile',
        cta: 'Investigar socio',
        link: 'contacto.html?caso=socio-negocio&servicio=informe-empresa'
      },
      {
        icon: 'fa-file-signature',
        name: 'Constitución de Empresa TuEmpresaEnUnDia Legal',
        desc: 'Estudios jurídicos y plataformas que redactan pactos de socios y constituyen tu sociedad.',
        price: 'Estudios asociados',
        cta: 'Asesoría legal',
        link: 'contacto.html?caso=socio-negocio&servicio=legal'
      }
    ]
  },
  {
    id: 'empresa-kyc',
    icon: 'fa-briefcase',
    title: 'Mi empresa necesita verificar clientes',
    subtitle: 'Conoce a tus clientes antes de dar crédito',
    offers: [
      {
        icon: 'fa-user-check',
        name: 'Onboarding Digital Fintoc / Toku',
        desc: 'Verificación de identidad y validación bancaria de tus clientes con fintechs chilenas líderes.',
        price: 'Fintechs asociadas',
        cta: 'Ver onboarding',
        link: 'contacto.html?caso=empresa-kyc&servicio=onboarding'
      },
      {
        icon: 'fa-chart-line',
        name: 'Scoring Crediticio Equifax / Sinacofi',
        desc: 'Evaluación automática de riesgo crediticio de tus clientes con los bureaus privados del mercado.',
        price: 'Bureaus asociados',
        cta: 'Evaluar riesgo',
        link: 'contacto.html?caso=empresa-kyc&servicio=scoring'
      }
    ]
  },
  {
    id: 'empleo',
    icon: 'fa-user-check',
    title: 'Voy a contratar un trabajador',
    subtitle: 'Valida antecedentes y títulos antes de contratar',
    offers: [
      {
        icon: 'fa-id-card-clip',
        name: 'Background Check Verifik / Laborum',
        desc: 'Verificación de identidad, antecedentes y referencias laborales con plataformas privadas de RRHH.',
        price: 'Partners de RRHH',
        cta: 'Verificar postulante',
        link: 'contacto.html?caso=empleo&servicio=background'
      },
      {
        icon: 'fa-graduation-cap',
        name: 'Validación de Títulos AcademicLog',
        desc: 'Confirma títulos y grados académicos de forma rápida con proveedores privados de validación.',
        price: 'Partners de validación',
        cta: 'Validar título',
        link: 'contacto.html?caso=empleo&servicio=titulos'
      }
    ]
  },
  {
    id: 'compra-online',
    icon: 'fa-cart-shopping',
    title: 'Compro por internet o Marketplace',
    subtitle: 'Confirma que el vendedor existe y no es un fraude',
    offers: [
      {
        icon: 'fa-shield-halved',
        name: 'Pago Protegido Mercado Pago / Khipu',
        desc: 'Usa pasarelas de pago con protección al comprador en vez de transferencias directas al vendedor.',
        price: 'Pasarelas asociadas',
        cta: 'Ver pago seguro',
        link: 'contacto.html?caso=compra-online&servicio=pago'
      },
      {
        icon: 'fa-store',
        name: 'Verificación de Vendedor Reclamos.cl',
        desc: 'Revisa la reputación y reclamos del vendedor con plataformas privadas de reputación comercial.',
        price: 'Partners de reputación',
        cta: 'Ver reputación',
        link: 'contacto.html?caso=compra-online&servicio=reputacion'
      }
    ]
  }
];

(function initCases() {
  const grid = document.getElementById('casesGrid');
  const modal = document.getElementById('casesModal');
  if (!grid || !modal) return;

  const modalTitle = document.getElementById('casesModalTitle');
  const modalSubtitle = document.getElementById('casesModalSubtitle');
  const modalBody = document.getElementById('casesModalBody');
  const closeBtn = document.getElementById('casesModalClose');
  let lastFocused = null;


  grid.innerHTML = SERVICHILE_CASES.map(function (c) {
    return (
      '<button type="button" class="case-card" data-case="' + c.id + '">' +
      '<span class="case-card__icon"><i class="fas ' + c.icon + '"></i></span>' +
      '<span class="case-card__title">' + c.title + '</span>' +
      '<span class="case-card__hint">Ver servicios →</span>' +
      '</button>'
    );
  }).join('');

  function openModal(caseId) {
    const data = SERVICHILE_CASES.find(function (c) { return c.id === caseId; });
    if (!data) return;

    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    modalBody.innerHTML = data.offers.map(function (o) {
      return (
        '<div class="offer-card">' +
        '<span class="offer-card__icon"><i class="fas ' + o.icon + '"></i></span>' +
        '<div class="offer-card__content">' +
        '<h4>' + o.name + '</h4>' +
        '<p>' + o.desc + '</p>' +
        '<span class="offer-card__price">' + o.price + '</span><br>' +
        '<a class="offer-card__cta" href="' + o.link + '">' + o.cta + ' <i class="fas fa-arrow-right"></i></a>' +
        '</div>' +
        '</div>'
      );
    }).join('');

    lastFocused = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-locked');
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-locked');
    if (lastFocused) lastFocused.focus();
  }

  grid.addEventListener('click', function (e) {
    const card = e.target.closest('.case-card');
    if (card) openModal(card.getAttribute('data-case'));
  });

  closeBtn.addEventListener('click', closeModal);


  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });


  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
})();
