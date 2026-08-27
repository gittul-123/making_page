console.log("main.js 연결됨!");
const heroBtn = document.querySelector('.btn');
console.log(heroBtn);

heroBtn.addEventListener('click', function () {
  console.log('버튼 클릭됨!');
});

async function loadProjects() {
  const response = await fetch('https://api.github.com/users/gittul-123/repos');
  const data = await response.json();
  
  const projectList = document.querySelector('.project-list');

  data.forEach(function (repo) {
    const html = `
      <div class="project-card">
        <h3>${repo.name}</h3>
        <p>${repo.description ? repo.description : '설명이 없습니다.'}</p>
        <a href="${repo.html_url}" target="_blank">View on GitHub</a>
      </div>
    `;
    projectList.innerHTML += html;
  });
}

loadProjects();

const form = document.querySelector('#contact-form');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const nameValue = document.querySelector('#name').value;
  if (nameValue === '') {
  console.log('이름을 입력해주세요');
  }
});

form.addEventListener('submit', function (e){
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

hamburger.addEventListener('click', function () {
  nav.classList.toggle('open');
});


const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme');

const themeIcon = themeToggle.querySelector("i");

if (savedTheme === 'dark') {
  html.setAttribute('data-theme', 'dark')
}


themeToggle.addEventListener('click', function () {
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