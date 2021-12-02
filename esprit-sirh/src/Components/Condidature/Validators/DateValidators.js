import moment from 'moment';
export const DateValidators = {
  isAfterToday,
  isSameToday,
  isAfterDate,
  isSameDate,
  isbeforeDate
}


function isAfterToday(date) {
  let d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  let current = [year, month, day].join('-');
  let momentObject = moment(date, 'YYYY-MM-DD');
  let today = moment(current, 'YYYY-MM-DD');
  let isAfter = momentObject.isAfter(today)
  return isAfter;
};
function isSameToday(date) {
  let d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  let current = [year, month, day].join('-');
  let momentObject = moment(date, 'YYYY-MM-DD');
  let today = moment(current, 'YYYY-MM-DD');
  let isSame = momentObject.isSame(today, 'day')
  return isSame;
}

function isAfterDate(date1, date2) {
  let momentObject1 = moment(date1, 'YYYY-MM-DD');
  let momentObject2 = moment(date2, 'YYYY-MM-DD');
  let isAfter = momentObject1.isAfter(momentObject2)
  return isAfter;
}
function isSameDate(date1, date2) {
  let momentObject1 = moment(date1, 'YYYY-MM-DD');
  let momentObject2 = moment(date2, 'YYYY-MM-DD');
  let isSame = momentObject1.isSame(momentObject2)
  return isSame;
}
function isbeforeDate(date1, date2) {
  let momentObject1 = moment(date1, 'YYYY-MM-DD');
  let momentObject2 = moment(date2, 'YYYY-MM-DD');
  let isAfter = momentObject1.isBefore(momentObject2)
  return isAfter;
}

export default DateValidators;