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

// CERTIFICATE vERIICATION

// const SHEET_URL =
//   'https://docs.google.com/spreadsheets/d/e/2PACX-1vRObSQdxAPjb9kbLx-9exCwkC5AzdYwaTlxB8Onu3-RdM85mfN6e_2Gp8ZqEB_RpCES4_yz32XQHSGl/pub?output=csv';

// ps: cHECK THE URL OF THE GOOGLE SHEET TO BE USED AND COPY THE UNIQUE ID.
// E.G https://docs.google.com/spreadsheets/d/1qWktil0sqkU8xHzEeLBgrzDfrnRauc3xHWyFOR0DYdA/edit?gid=0#gid=0
// THE ID NEEDED IS 1qWktil0sqkU8xHzEeLBgrzDfrnRauc3xHWyFOR0DYdA
// THEN ADD '/SHEET_NUMBER'
// Ensure the Sheet  Sharing is open to every one with the link

const SHEET_URL =
  'https://opensheet.elk.sh/14mUXJkSpbjDiM9-_gmzVHjLY4iiegFIuJR0nLnfusDE/SHEET1';

// Modal Controls
document.getElementById('openModalBtn')?.addEventListener('click', () => {
  document.getElementById('certModal').style.display = 'flex';
});

// Mobile (Second) Verification button
document.getElementById('openModalBtn_2')?.addEventListener('click', () => {
  document.getElementById('certModal').style.display = 'flex';
});

document.querySelector('.close')?.addEventListener('click', closeModal);

function closeModal() {
  document.getElementById('certModal').style.display = 'none';
  document.querySelector('#result').style.display = 'none';
  document.querySelector('#certError').style.display = 'none';
  document.getElementById('certNumber').value = '';
}

document.querySelector('#result').style.display = 'none';

const form = document.getElementById('certModal');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  checkCertificate();
});

async function checkCertificate() {
  const certNumber = document
    .getElementById('certNumber')
    .value.trim()
    .toUpperCase();
  const loader = document.getElementById('loader');
  const result = document.getElementById('result');
  const errorMsg = document.getElementById('certError');
  const verifyBtn = document.getElementById('verifyBtn');

  result.style.display = 'none';
  errorMsg.style.display = 'none';
  errorMsg.textContent = '';

  if (!certNumber) {
    errorMsg.textContent = 'Please enter a certificate number.';
    errorMsg.style.display = 'block';
    return;
  }

  loader.style.display = 'block';
  verifyBtn.disabled = true;

  try {
    const res = await fetch(SHEET_URL);
    const data = await res.json();

    //  console.log(data);
    //  console.log(foundRow);

    const foundRow = data.find(
      (row) => row['CERTIFICATE NUMBER'].toUpperCase() === certNumber
    );

    if (foundRow) {
      const client = foundRow['CLIENT'] || 'N/A';
      const certNum = foundRow['CERTIFICATE NUMBER'] || 'N/A';
      const equipName = foundRow['NAME OF EQUIPMENT'] || 'N/A';
      const modelNumber = foundRow['MODEL NUMBER'] || 'N/A';
      const serialNumber = foundRow['SERIAL NUMBER'] || 'N/A';
      const dateCalibrated = foundRow['DATE CALIBRATED'] || 'N/A';
      const dueDate = foundRow['DUE DATE'] || 'N/A';
      // const link = foundRow['LINK'] || '';

      result.style.display = 'block';

      document.querySelector('.clientName').textContent = client || 'N/A';
      document.querySelector('.certificateNumber').textContent =
        certNum || 'N/A';
      document.querySelector('.equipmentName').textContent = equipName || 'N/A';
      document.querySelector('.modelNumber').textContent = modelNumber || 'N/A';
      document.querySelector('.serialNumber').textContent =
        serialNumber || 'N/A';
      document.querySelector('.dateCalibrated').textContent =
        dateCalibrated || 'N/A';
      document.querySelector('.dueDate').textContent = dueDate || 'N/A';

      // Not Needed for now: Update link dynamically
      // const linkButton = document.querySelector('.btn-link');
      // if (link) {
      //   const fixedLink = link.startsWith('http') ? link : `https://${link}`;
      //   linkButton.style.display = 'flex';
      //   linkButton.href = fixedLink;
      // } else {
      //   linkButton.style.display = 'none';
      // }
    } else {
      errorMsg.textContent = 'Certificate not found.';
      errorMsg.style.display = 'block';
    }
  } catch (err) {
    console.error(err);
    errorMsg.textContent =
      'Error checking certificate. Please try again later.';
    errorMsg.style.display = 'block';
  } finally {
    loader.style.display = 'none';
    verifyBtn.disabled = false;
  }
}
