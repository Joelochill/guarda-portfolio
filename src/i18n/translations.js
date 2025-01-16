import accounts from '../utils/accounts.json';
import constraints from '../utils/validationConstraints.json';

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
          outOfRange: `El campo nombre debe contener entre ${constraints.name.min} y ${constraints.name.max} caracteres`,
        },
        email: {
          required: 'El campo email es obligatorio',
          outOfRange: `El campo email debe contener entre ${constraints.email.min} y ${constraints.email.max} caracteres`,
          badFormat: 'El campo email debe tener un formato correcto',
        },
        subject: {
          required: 'El campo asunto es obligatorio',
          outOfRange: `El campo asunto debe contener entre ${constraints.subject.min} y ${constraints.subject.max} caracteres`,
        },
        message: {
          required: 'El campo mensaje es obligatorio',
          outOfRange: `El campo mensaje debe contener al menos ${constraints.message.min} caracteres`,
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
          outOfRange: `Name field must contain between ${constraints.name.min} and ${constraints.name.max} characters`,
        },
        email: {
          required: 'Email field is required',
          outOfRange: `Email field must contain between ${constraints.email.min} and ${constraints.email.max} characters`,
          badFormat: 'Email field must have a correct format',
        },
        subject: {
          required: 'Subject field is required',
          outOfRange: `Subject field must contain between ${constraints.subject.min} y ${constraints.subject.max} characters`,
        },
        message: {
          required: 'Message field is required',
          outOfRange: `Message field must contain at least ${constraints.message.min} characters`,
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
