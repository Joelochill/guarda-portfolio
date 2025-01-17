import emailjs from '@emailjs/browser';
import validator from 'validator';
import accounts from '../utils/accounts.json';
import constraints from '../utils/validationConstraints.json';
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

  const nameInput = document.querySelector('input[name="user_name"]');
  const emailInput = document.querySelector('input[name="user_email"]');
  const subjectInput = document.querySelector('input[name="subject"]');
  const messageInput = document.querySelector('textarea[name="message"]');

  [
    { input: nameInput, fn: checkNameValidity },
    { input: emailInput, fn: checkEmailValidity },
    { input: subjectInput, fn: checkSubjectValidity },
    { input: messageInput, fn: checkMessageValidity },
  ].forEach(({ input, fn }) => {
    input.addEventListener('blur', function () {
      validate(this, fn);
    });
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
      submissionResult.textContent =
        lang === 'es'
          ? 'No estás conectado a internet. Por favor, comprueba tu conexión e inténtalo de nuevo.'
          : 'You are not connected to the internet. Please, check your connection and try again.';

      return;
    }

    emailjs.send('contact_service', 'contact_form', sanitizedData).then(
      () => {
        submissionResult.style.color = 'var(--color-success)';
        submissionResult.textContent =
          lang === 'es'
            ? `Has enviado correctamente un email a ${accounts.email}. Espera mi respuesta!`
            : `You've succesfully sent an email to ${accounts.email}. Look forward for my response!`;
        this.reset();
      },
      (error) => {
        submissionResult.style.color = 'var(--color-error)';
        submissionResult.textContent =
          error.status === 429
            ? lang === 'es'
              ? 'Has enviado un email recientemente. Por favor, prueba de nuevo más tarde.'
              : "You've recently sent an email. Please, try again later."
            : lang === 'es'
              ? 'Estamos teniendo problemas enviando tu email. Por favor prueba con la dirección de abajo.'
              : 'We are experiencing issues sending your email. Please use the address below.';
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
    const { min, max } = constraints.name;

    if (validator.isEmpty(value))
      return lang === 'es'
        ? 'El campo nombre es obligatorio'
        : 'Name field is required';

    if (!validator.isLength(value, { min, max }))
      return lang === 'es'
        ? `El campo nombre debe contener entre ${min} y ${max} caracteres`
        : `Name field must contain between ${min} and ${max} characters`;

    return false;
  }

  function checkEmailValidity(value) {
    const { min, max } = constraints.email;

    if (validator.isEmpty(value))
      return lang === 'es'
        ? 'El campo email es obligatorio'
        : 'Email field is required';

    if (!validator.isLength(value, { min, max }))
      return lang === 'es'
        ? `El campo email debe contener entre ${min} y ${max} caracteres`
        : `Email field must contain between ${min} and ${max} characters`;

    if (!validator.isEmail(value))
      return lang === 'es'
        ? 'El campo email debe tener un formato correcto'
        : 'Email field must have a correct format';

    return false;
  }

  function checkSubjectValidity(value) {
    const { min, max } = constraints.subject;

    if (validator.isEmpty(value))
      return lang === 'es'
        ? 'El campo asunto es obligatorio'
        : 'Subject field is required';

    if (!validator.isLength(value, { min, max }))
      return lang === 'es'
        ? `El campo asunto debe contener entre ${min} y ${max} caracteres`
        : `Subject field must contain between ${min} and ${max} characters`;

    return false;
  }

  function checkMessageValidity(value) {
    const { min, max } = constraints.message;

    if (validator.isEmpty(value))
      return lang === 'es'
        ? 'El campo mensaje es obligatorio'
        : 'Message field is required';

    if (!validator.isLength(value, { min, max }))
      return lang === 'es'
        ? `El campo mensaje debe contener entre ${min} y ${max} caracteres`
        : `Message field must contain between ${min} and ${max} characters`;

    return false;
  }
});
