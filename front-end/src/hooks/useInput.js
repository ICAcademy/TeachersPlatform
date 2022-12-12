/* eslint-disable indent */
import dayjs from 'dayjs';
import { useState } from 'react';
import isBetween from 'dayjs/plugin/isBetween';

const error = 'Fix comment';

dayjs.extend(isBetween);

const minAge = 8;
const maxAge = 100;

const minDate = `${dayjs().year() - maxAge}/12/31`;
const maxDate = `${dayjs().year() - minAge}/12/31`;

const useInput = (type, value, regex) => {
  const [enteredValue, setEnteredValue] = useState(value);
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid =
    type === 'date'
      ? dayjs(enteredValue).isBetween(maxDate, minDate, 'day', '[]') && regex.test(enteredValue)
      : regex.test(enteredValue);

  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler =
    type === 'date'
      ? (date) => {
          setEnteredValue(dayjs(date).format('MM/DD/YYYY'));
        }
      : (e) => {
          setEnteredValue(e.target.value);
        };

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
