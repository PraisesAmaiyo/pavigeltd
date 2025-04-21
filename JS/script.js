const btnNavEl = document.querySelector('.btn-mobile-nav');
const allLinks = document.querySelectorAll('a:link');
const headerEl = document.querySelector('.navigation-header');

btnNavEl.addEventListener('click', function () {
  headerEl.classList.toggle('nav-open');
});

allLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    const href = link.getAttribute('href');

    if (href === '#')
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

    if (href !== '#' && href.startsWith('#')) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: 'smooth' });
      e.preventDefault();
    }

    if (link.classList.contains('main-nav-link'))
      headerEl.classList.toggle('nav-open');
  });
});

// Sticky Navigation
const navigationHeader = document.querySelector('.navigation-header');
const initialNavigation = document.querySelector('.initial-navigation');
const stickyNavigation = document.querySelector('.sticky-nav');
const sectionHero = document.querySelector('.section-hero');

document.addEventListener('DOMContentLoaded', function () {
  let lastScrollTop = 0;

  function handleScroll() {
    const scrollTop = window.scrollY;

    if (scrollTop > 40 && scrollTop > lastScrollTop) {
      navigationHeader.classList.add('sticky-nav');
      navigationHeader.classList.remove('initial-navigation');
    } else if (scrollTop <= 40 && scrollTop < lastScrollTop) {
      navigationHeader.classList.remove('sticky-nav');
      navigationHeader.classList.add('initial-navigation');
    }

    lastScrollTop = scrollTop;
  }

  window.addEventListener('scroll', handleScroll);
});

document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.main-nav-list li');

  navLinks.forEach((li) => {
    li.addEventListener('click', function () {
      // Remove active class from all items
      navLinks.forEach((item) => item.classList.remove('active'));

      // Add active class to clicked item
      this.classList.add('active');
    });
  });
});
