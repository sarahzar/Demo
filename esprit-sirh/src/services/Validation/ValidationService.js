import SimpleReactValidator from 'simple-react-validator';
import { DateValidators } from "../../Components/Condidature/Validators/DateValidators"

class ValidationService {

  constructor() {
    //validations des champs 
    SimpleReactValidator.addLocale('fr', {
      required: 'champ obligatoire.',
      numeric: 'Le champ :attribute doit être numérique.',
      alpha_space: 'Le champ :attribute ne peut contenir que des lettres.',
      size: 'Le champ :attribute doit être 8 chiffres.',
      min: 'la valeur du champ :attribute ne peut pas être négative',
      before: 'Le champ :attribute doit être avant le :date.',
    });
    this.validator = new SimpleReactValidator({
      // autoForceUpdate: this,
      locale: 'fr',
      validators: {
        requiredSelect: {  // name the rule
          message: 'le champ :values est obligatoire.',
          rule: (val) => {
            return val != -1
          }
          ,
          messageReplace: (message, params) => message.replace(':values', params[0]),  // optional
        },

        dateAfterToday: {  // name the rule
          message: "La date doit être inférieure à aujourd'hui.",
          rule: (val) => {
            return !DateValidators.isSameToday(val) && !DateValidators.isAfterToday(val)
          },
        },
        dateAfter: {  // name the rule
          message: "La date début doit être inférieure à la date fin.",
          rule: (val, params) => {
            return !DateValidators.isSameDate(val, params[0]) && !DateValidators.isAfterDate(val, params[0])
          },
        },
        dateBefore: {  // name the rule
          message: "La date fin doit être supérieure à la date début.",
          rule: (val, params) => {
            return !DateValidators.isSameDate(val, params[0]) && !DateValidators.isbeforeDate(val, params[0])
          },
        },
        telephone: {  // name the rule
          message: "Le champ :attribute est invalide.",
          rule: (val) => {
            return this.validator.helpers.testRegex(val, /^((\+|00)216)?([9]{1}[0-9]{1}|[7]{1}[0-9]{1}|[5]{1}[0-9]{1}|[2-4]{1}[0-9]{1})[0-9]{6}$/i);
          },
        },
        afterCurrentYear: {  // name the rule
          message: "valeur supérieure à l'année courrante",
          rule: (val) => {
            let currentYear = new Date().getFullYear()
            return !(val > currentYear);
          },
        },
      }


    });

  }

}

export default new ValidationService();