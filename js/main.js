console.log("main.js 연결됨!");
const heroBtn = document.querySelector('.btn');

heroBtn.addEventListener('click', () => {
  console.log('버튼 클릭됨!');
});

async function loadProjects() {
  const loadingMessage = document.querySelector('.loading-message');
  const errorMessage = document.querySelector('.error-message');
  const emptyMessage = document.querySelector('.empty-message');
  const projectList = document.querySelector('.project-list');

  loadingMessage.style.display = 'block';
  errorMessage.style.display = 'none';
  emptyMessage.style.display = 'none';
  projectList.innerHTML = '';

  try {
    const response = await fetch('https://api.github.com/users/gittul-123/repos');

    if (!response.ok) {
      throw new Error('API 요청 실패');
    }

    const data = await response.json();

    loadingMessage.style.display = 'none';

    if (data.length === 0) {
      emptyMessage.style.display = 'block';
      return;
    }

    const cardsHtml = data.map((repo) => {
      const { name, description, html_url } = repo;
      return `
        <div class="project-card">
          <h3>${name}</h3>
          <p>${description ? description : '설명이 없습니다.'}</p>
          <a href="${html_url}" target="_blank">View on GitHub</a>
        </div>
      `;
    });

    projectList.innerHTML = cardsHtml.join('');

  } catch (error) {
    loadingMessage.style.display = 'none';
    errorMessage.style.display = 'block';
    console.log(error);
  }
}

loadProjects();

const form = document.querySelector('#contact-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nameValue = document.querySelector('#name').value;
  const nameError = document.querySelector('#name-error');

  const emailValue = document.querySelector('#email').value;
  const emailError = document.querySelector('#email-error');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const messageValue = document.querySelector('#message').value;
  const messageError = document.querySelector('#message-error');

  if (nameValue === '') {
    nameError.textContent = '이름을 입력해주세요';
    nameError.style.display = 'block';
  } else {
    nameError.textContent = '';
    nameError.style.display = 'none';
  }

  if (emailValue === '') {
    emailError.textContent = '이메일 주소를 입력해주세요';
    emailError.style.display = 'block';
  } else if (!emailPattern.test(emailValue)) {
    emailError.textContent = '올바른 이메일 형식이 아닙니다';
    emailError.style.display = 'block';
  } else {
    emailError.textContent = '';
    emailError.style.display = 'none';
  }

  if (messageValue === '') {
    messageError.textContent = '메시지를 입력해주세요';
    messageError.style.display = 'block';
  } else {
    messageError.textContent = '';
    messageError.style.display = 'none';
  }

  if (nameValue !== '' && emailPattern.test(emailValue) && messageValue !== '') {
    alert('메시지가 전송되었습니다');
    form.reset();
  }
});

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
});

const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme');
const themeIcon = themeToggle.querySelector('i');

if (savedTheme === 'dark') {
  html.setAttribute('data-theme', 'dark');
}

themeToggle.addEventListener('click', () => {
  if (html.getAttribute('data-theme') === 'dark') {
    html.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  } else {
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }
});

const scrollTopBtn = document.querySelector('.scroll-top');
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = 'block';
  } else {
    scrollTopBtn.style.display = 'none';
  }

  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

sections.forEach((section) => {
  observer.observe(section);
});

const emailInput = document.querySelector('#email');

emailInput.addEventListener('input', () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailError = document.querySelector('#email-error');

  if (emailInput.value === '') {
    emailError.style.display = 'none';
  } else if (!emailPattern.test(emailInput.value)) {
    emailError.textContent = '올바른 이메일 형식이 아닙니다';
    emailError.style.display = 'block';
  } else {
    emailError.textContent = '';
    emailError.style.display = 'none';
  }
});