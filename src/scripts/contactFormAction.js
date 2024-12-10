import validator from 'validator';
import { useTranslations } from '../i18n/utils';

document.addEventListener('astro:page-load', () => {
  const form = document.querySelector('#contact-form');
  const lang = form.dataset.lang;
  const t = useTranslations(lang);

  const nameInput = document.querySelector('input[name="user_name"]');
  nameInput.addEventListener('blur', function () {
    validate(this, checkNameValidity);
  });

  const emailInput = document.querySelector('input[name="user_email"]');
  emailInput.addEventListener('blur', function () {
    validate(this, checkEmailValidity);
  });

  const subjectInput = document.querySelector('input[name="subject"]');
  subjectInput.addEventListener('blur', function () {
    validate(this, checkSubjectValidity);
  });

  const messageInput = document.querySelector('textarea[name="message"]');
  messageInput.addEventListener('blur', function () {
    validate(this, checkMessageValidity);
  });

  document
    .getElementById('contact-form')
    .addEventListener('submit', function (event) {
      event.preventDefault();

      if (
        !validate(nameInput, checkNameValidity) |
        !validate(emailInput, checkEmailValidity) |
        !validate(subjectInput, checkSubjectValidity) |
        !validate(messageInput, checkMessageValidity)
      ) {
        return;
      }

      console.log('ATTEMPT');

      const formData = new FormData(this);
      const sanitizedData = sanitize(formData);

      console.log(sanitizedData);
    });

  function validate(input, validatorFn) {
    const errorMessage = validatorFn(validator.trim(input.value));

    if (errorMessage) {
      showError(input, errorMessage);
      return false;
    } else {
      hideError(input);
      return true;
    }
  }

  // Pretty hardcoded aswell but do i want to code a framework??
  function sanitize(formData) {
    return {
      user_name: validator.escape(validator.trim(formData.get('user_name'))),
      user_email: validator.normalizeEmail(
        validator.trim(formData.get('user_email')),
      ),
      subject: validator.escape(validator.trim(formData.get('subject'))),
      message: validator.escape(
        validator.stripLow(validator.trim(formData.get('message')), {
          keep_new_lines: true,
        }),
      ),
    };
  }

  function showError(input, message) {
    input.classList.add('invalid');
    input.nextElementSibling.textContent = message;
  }

  function hideError(input) {
    input.classList.remove('invalid');
    input.nextElementSibling.textContent = '';
  }

  function checkNameValidity(value) {
    const min = 1;
    const max = 50;

    if (validator.isEmpty(value)) return t('form.errors.name.required');

    if (!validator.isLength(value, { min, max })) {
      return t('form.errors.name.outOfRange');
    }

    return false;
  }

  function checkEmailValidity(value) {
    const min = 3;
    const max = 254;

    if (validator.isEmpty(value)) return t('form.errors.email.required');

    if (!validator.isLength(value, { min, max })) {
      return t('form.errors.email.outOfRange');
    }

    if (!validator.isEmail(value)) return t('form.errors.email.badFormat');

    return false;
  }

  function checkSubjectValidity(value) {
    const min = 1;
    const max = 70;

    if (validator.isEmpty(value)) return t('form.errors.subject.required');

    if (!validator.isLength(value, { min, max })) {
      return t('form.errors.subject.outOfRange');
    }

    return false;
  }

  function checkMessageValidity(value) {
    const min = 10;

    if (validator.isEmpty(value)) return t('form.errors.message.required');

    if (!validator.isLength(value, { min })) {
      return t('form.errors.message.outOfRange');
    }

    return false;
  }
});
