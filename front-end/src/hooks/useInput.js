import { useState, useEffect } from 'react';

// Day.js library
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

// Constants
import { UNALLOWED_SYMBOLS } from 'constants/symbols';

// Functions
export const isRussianSymbols = (value) => {
  const checkArray = UNALLOWED_SYMBOLS.map((item) => value.includes(item));
  return checkArray.some((item) => item);
};

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

  const syncValue = (value) => {
    setEnteredValue(value);
  };

  useEffect(() => {
    syncValue(value);
  }, [value]);

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
        if (!isRussianSymbols(e.target.value)) {
          setEnteredValue(e.target.value);
        }
        if (!e.target.value) {
          setIsTouched(false);
        }
      };
      break;
  }

  const resetValue = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  const hasError = !valueIsValid && isTouched;

  const valueOnBlurHandler = () => {
    if (enteredValue !== '') {
      setIsTouched(true);
    } else {
      setIsTouched(false);
    }
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    valueOnBlurHandler,
    resetValue,
  };
};

export default useInput;
