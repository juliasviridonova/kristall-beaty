document.addEventListener('DOMContentLoaded', () => {
  // 1. Инициализация бургер-меню для мобильной версии
  const burgerBtn = document.getElementById('burgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav__link');

  if (burgerBtn && navMenu) {
    burgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('is-open');
    });

    // Закрытие меню при клике по пункту навигации
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
      });
    });
  }

  // 2. Маска ввода для телефона (+7 (XXX) XXX-XX-XX)
  const phoneInput = document.getElementById('phone');

  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      let formattedValue = '';

      if (!value) {
        e.target.value = '';
        return;
      }

      // Приводим первую цифру к семерке
      if (['7', '8', '9'].includes(value[0])) {
        if (value[0] === '9') value = '7' + value;
        const firstNumbers = '+7';
        formattedValue = firstNumbers + ' ';

        if (value.length > 1) {
          formattedValue += '(' + value.substring(1, 4);
        }
        if (value.length >= 5) {
          formattedValue += ') ' + value.substring(4, 7);
        }
        if (value.length >= 8) {
          formattedValue += '-' + value.substring(7, 9);
        }
        if (value.length >= 10) {
          formattedValue += '-' + value.substring(9, 11);
        }
      } else {
        // Для прочих вводов по умолчанию используем +7
        formattedValue = '+7 (' + value.substring(0, 3);
      }

      e.target.value = formattedValue;
    });

    phoneInput.addEventListener('keydown', (e) => {
      // Корректное удаление символов Backspace
      if (e.key === 'Backspace' && e.target.value.replace(/\D/g, '').length === 1) {
        e.target.value = '';
      }
    });
  }

  // 3. Валидация формы и Toast-уведомление
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const nameError = document.getElementById('nameError');
  const phoneError = document.getElementById('phoneError');
  const toast = document.getElementById('toastNotification');

  // Регулярное выражение для строгого формата: +7 (XXX) XXX-XX-XX
  const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Проверка имени
      if (!nameInput.value.trim()) {
        nameInput.classList.add('is-invalid');
        nameError.classList.add('is-visible');
        isValid = false;
      } else {
        nameInput.classList.remove('is-invalid');
        nameError.classList.remove('is-visible');
      }

      // Проверка номера телефона
      if (!phoneRegex.test(phoneInput.value.trim())) {
        phoneInput.classList.add('is-invalid');
        phoneError.classList.add('is-visible');
        isValid = false;
      } else {
        phoneInput.classList.remove('is-invalid');
        phoneError.classList.remove('is-visible');
      }

      // Если все поля валидны
      if (isValid) {
        showToast('Спасибо, мы свяжемся с вами!');
        contactForm.reset();
      }
    });
  }
});