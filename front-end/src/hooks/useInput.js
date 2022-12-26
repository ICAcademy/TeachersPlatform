import dayjs from 'dayjs';
import { useState } from 'react';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const minAge = 8;
const maxAge = 100;

const minDate = `${dayjs().year() - maxAge}/12/31`;
const maxDate = `${dayjs().year() - minAge}/12/31`;

const useInput = (type, value, regex) => {
  const [enteredValue, setEnteredValue] = useState(value);
  const [isTouched, setIsTouched] = useState(false);

  let valueIsValid;
  let valueChangeHandler;

  switch (type) {
    case 'date':
      valueIsValid =
        dayjs(enteredValue).isBetween(maxDate, minDate, 'day', '[]') && regex.test(enteredValue);
      valueChangeHandler = (date) => {
        setEnteredValue(dayjs(date).format('MM/DD/YYYY'));
      };
      break;
    case 'time':
      valueIsValid = regex.test(dayjs(enteredValue).format('HH:mm'));
      valueChangeHandler = (time) => {
        setEnteredValue(dayjs(time).format('MM/DD/YYYY HH:mm'));
      };
      break;
    default:
      valueIsValid = regex.test(enteredValue);
      valueChangeHandler = (e) => {
        setEnteredValue(e.target.value);
      };
      break;
  }

  const hasError = !valueIsValid && isTouched;

  const valueOnBlurHandler = () => {
    setIsTouched(true);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    valueOnBlurHandler,
  };
};

export default useInput;
