const whatsappNumber = '5598985700659';

document.querySelectorAll('.card-want[data-product]').forEach((button) => {
  button.addEventListener('click', () => {
    const actions = button.closest('.product-card').querySelector('.card-actions');
    const whatsappLink = actions.querySelector('.card-whatsapp');
    const willOpen = actions.hidden;

    document.querySelectorAll('.card-actions').forEach((item) => { item.hidden = true; });
    document.querySelectorAll('.card-want').forEach((item) => { item.setAttribute('aria-expanded', 'false'); });

    if (willOpen) {
      const detailsMessage = button.dataset.size
        ? ` O tamanho é ${button.dataset.size}. Pode me contar sobre a disponibilidade?`
        : ' Pode me contar sobre tamanhos e disponibilidade?';
      const message = `Olá! Vim pelo site da TODA LINDA STORE e quero o ${button.dataset.product}.${detailsMessage}`;
      whatsappLink.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      actions.hidden = false;
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

const imageDialog = document.querySelector('#image-dialog');
const dialogImage = document.querySelector('#dialog-image');
const dialogProduct = document.querySelector('#dialog-product');
const dialogPrice = document.querySelector('#dialog-price');
const dialogClose = document.querySelector('.dialog-close');

function closeImageDialog() {
  imageDialog.close();
}

document.querySelectorAll('.image-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const image = trigger.querySelector('img');
    const productCard = trigger.closest('article');
    const product = productCard.querySelector('h3, h4').textContent;
    dialogImage.src = image.currentSrc || image.src;
    dialogImage.alt = image.alt;
    dialogProduct.textContent = product;
    dialogPrice.textContent = productCard.querySelector('.product-price').textContent;
    imageDialog.showModal();
    dialogClose.focus();
  });
});

dialogClose.addEventListener('click', closeImageDialog);
imageDialog.addEventListener('click', (event) => {
  if (event.target === imageDialog) closeImageDialog();
});

document.querySelectorAll('.product-carousel').forEach((carousel) => {
  const productTrack = carousel.querySelector('.carousel-track');
  const carouselPrevious = carousel.querySelector('[data-carousel-prev]');
  const carouselNext = carousel.querySelector('[data-carousel-next]');
  const carouselCurrent = carousel.querySelector('[data-carousel-current]');
  const carouselTotal = carousel.querySelector('[data-carousel-total]');

  if (!productTrack || !carouselPrevious || !carouselNext || !carouselCurrent || !carouselTotal) return;

  const productCards = [...productTrack.querySelectorAll('.product-card')];
  if (productCards.length === 0) return;
  carouselTotal.textContent = productCards.length;

  function activeCardIndex() {
    const trackCenter = productTrack.scrollLeft + (productTrack.clientWidth / 2);
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    productCards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
      const distance = Math.abs(trackCenter - cardCenter);
      if (distance < nearestDistance) {
        nearestIndex = index;
        nearestDistance = distance;
      }
    });
    return nearestIndex;
  }

  function updateActiveCard() {
    const index = activeCardIndex();
    productCards.forEach((card, cardIndex) => card.classList.toggle('is-active', cardIndex === index));
    carouselCurrent.textContent = index + 1;
    carouselPrevious.disabled = index === 0;
    carouselNext.disabled = index === productCards.length - 1;
  }

  function goToCard(index) {
    const safeIndex = Math.max(0, Math.min(index, productCards.length - 1));
    const card = productCards[safeIndex];
    productTrack.scrollTo({ left: card.offsetLeft - ((productTrack.clientWidth - card.offsetWidth) / 2), behavior: 'smooth' });
  }

  carouselPrevious.addEventListener('click', () => goToCard(activeCardIndex() - 1));
  carouselNext.addEventListener('click', () => goToCard(activeCardIndex() + 1));
  productTrack.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      goToCard(activeCardIndex() + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });

  let scrollFrame;
  productTrack.addEventListener('scroll', () => {
    cancelAnimationFrame(scrollFrame);
    scrollFrame = requestAnimationFrame(updateActiveCard);
  }, { passive: true });
  window.addEventListener('resize', updateActiveCard);
  updateActiveCard();
});

const revealElements = document.querySelectorAll('.reveal-on-scroll');
if ('IntersectionObserver' in window && revealElements.length > 0) {
  document.documentElement.classList.add('reveal-ready');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach((element) => revealObserver.observe(element));
}

const categoryPanels = document.querySelectorAll('.category-panel');
if (
  'IntersectionObserver' in window
  && categoryPanels.length > 0
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
) {
  document.documentElement.classList.add('stair-ready');
  const stairObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.product-card').forEach((card, index) => {
          card.style.setProperty('--stair-delay', `${index * 70}ms`);
          card.classList.add('is-visible');
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  categoryPanels.forEach((panel) => stairObserver.observe(panel));
}
