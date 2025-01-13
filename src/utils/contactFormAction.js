import emailjs from '@emailjs/browser';
import validator from 'validator';
import { useTranslations } from '../i18n/utils';

const emailJsKey = import.meta.env.PUBLIC_EMAILJS_KEY;

document.addEventListener('astro:page-load', () => {
  const contactForm = document.querySelector('#contact-form');
  if (!contactForm) return;

  emailjs.init({
    publicKey: emailJsKey,
    blockHeadless: true,
    limitRate: {
      id: 'contact_form',
      throttle: 30000,
    },
  });

  const lang = contactForm.dataset.lang;
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

  const submissionResult = document.querySelector('#submission-result');

  contactForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    if (
      !validate(nameInput, checkNameValidity) |
      !validate(emailInput, checkEmailValidity) |
      !validate(subjectInput, checkSubjectValidity) |
      !validate(messageInput, checkMessageValidity)
    ) {
      return;
    }

    const formData = new FormData(this);
    const sanitizedData = sanitize(formData);

    // Check the availability making a fetch request to your own website
    let internetAvailable;

    try {
      const response = await fetch(window.location.origin, {
        method: 'HEAD',
      });
      internetAvailable = response.ok;
    } catch {
      internetAvailable = false;
    }

    if (!navigator.onLine || !internetAvailable) {
      submissionResult.style.color = 'var(--color-error)';
      submissionResult.textContent = t('form.submissionResults.offline');

      return;
    }

    emailjs.send('contact_service', 'contact_form', sanitizedData).then(
      () => {
        submissionResult.style.color = 'var(--color-success)';
        submissionResult.textContent = t('form.submissionResults.success');
        this.reset();
      },
      (error) => {
        submissionResult.style.color = 'var(--color-error)';
        submissionResult.textContent =
          error.status === 429
            ? t('form.submissionResults.spam')
            : t('form.submissionResults.failure');
      },
    );
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
