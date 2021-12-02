
import ValidationService from "../../../services/Validation/ValidationService"
export const RejexValidators = {
  alpha,
  telRejex
}

function alpha(value) {
  var letter = /^[a-zA-Z ]+$/;
  if (value.match(letter)) {
    return true;
  }
  else {
    return false;
  }
}
function telRejex(value) {
  return ValidationService.validator.helpers.testRegex(value, /^((\+|00)216)?([9]{1}[0-9]{1}|[7]{1}[0-9]{1}|[5]{1}[0-9]{1}|[2-4]{1}[0-9]{1})[0-9]{6}$/i);
}

export default RejexValidators;