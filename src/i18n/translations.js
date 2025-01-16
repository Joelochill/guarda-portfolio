import accounts from '../utils/accounts.json';

export const translations = {
  defaultLang: 'es',
  es: {
    form: {
      ui: {
        user_name: 'Nombre',
        user_email: 'Email',
        subject: 'Asunto',
        message: 'Mensaje',
        submit: 'Enviar',
      },
      errors: {
        name: {
          required: 'El campo nombre es obligatorio',
          outOfRange: 'El campo nombre debe contener entre 1 y 50 caracteres',
        },
        email: {
          required: 'El campo email es obligatorio',
          outOfRange: 'El campo email debe contener entre 3 y 254 caracteres',
          badFormat: 'El campo email debe tener un formato correcto',
        },
        subject: {
          required: 'El campo asunto es obligatorio',
          outOfRange: 'El campo asunto debe contener entre 1 y 70 caracteres',
        },
        message: {
          required: 'El campo mensaje es obligatorio',
          outOfRange: 'El campo mensaje debe contener al menos 10 caracteres',
        },
      },
      submissionResults: {
        success: `Has enviado correctamente un email a ${accounts.email}. Espera mi respuesta!`,
        failure:
          'Estamos teniendo problemas enviando tu email. Por favor prueba con la dirección de abajo.',
        spam: 'Has enviado un email recientemente. Por favor, prueba de nuevo más tarde.',
        offline:
          'No estás conectado a internet. Por favor, comprueba tu conexión e inténtalo de nuevo.',
      },
    },
  },
  en: {
    form: {
      ui: {
        user_name: 'Name',
        user_email: 'Email',
        subject: 'Subject',
        message: 'Message',
        submit: 'Send',
      },
      errors: {
        name: {
          required: 'Name field is required',
          outOfRange: 'Name field must contain between 1 and 50 characters',
        },
        email: {
          required: 'Email field is required',
          outOfRange: 'Email field must contain between 3 and 254 characters',
          badFormat: 'Email field must have a correct format',
        },
        subject: {
          required: 'Subject field is required',
          outOfRange: 'Subject field must contain between 1 and 70 characters',
        },
        message: {
          required: 'Message field is required',
          outOfRange: 'Message field must contain at least 10 characters',
        },
      },
      submissionResults: {
        success: `You've succesfully sent an email to ${accounts.email}. Look forward for my response!`,
        failure:
          'We are experiencing issues sending your email. Please use the address below.',
        spam: "You've recently sent an email. Please, try again later.",
        offline:
          'You are not connected to the internet. Please, check your connection and try again.',
      },
    },
  },
};
