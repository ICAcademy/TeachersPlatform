import React, { useContext, useState } from 'react';

import { CurrentUserContext } from 'context/AppProvider';
import { Box, TextField, Button } from '@mui/material';

import useInput from 'hooks/useInput';

import { updateUserById } from 'services/userService';
import { regexFullName, regexEmail } from 'helpers/regex';

import styles from './GeneralInfo.module.scss';
import userImg from 'assets/sidebar/avatar.png';

const sx = {
  saveBtn: { maxWidth: '100px', ml: 'auto' },
};

const fullNameHelperText =
  'Enter 2 capitalized words; each word has a min of 2 and a max of 16 letters';
const emailHelperText = 'Please enter a valid email address; examples: cockroaches@gmail.com';

const GeneralInfo = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const {
    value: enteredFullName,
    isValid: fullNameIsValid,
    hasError: fullNameHasError,
    valueChangeHandler: fullNameChangeHandler,
    valueOnBlurHandler: fullNameBlurHandler,
  } = useInput(currentUser.fullName, regexFullName);

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    valueOnBlurHandler: emailBlurHandler,
  } = useInput(currentUser.email, regexEmail);

  const formIsValid = fullNameIsValid && emailIsValid;

  const updateUser = async (id, data) => {
    try {
      const updatedUser = await updateUserById(id, data);
      setCurrentUser(updatedUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box component='img' src={userImg} alt='User photo' className={styles.profile__img} />
      <Button>Change profile photo</Button>
      <Box className={styles.profile__content}>
        <TextField
          type='text'
          label='Fullname:'
          value={enteredFullName}
          onChange={fullNameChangeHandler}
          onBlur={fullNameBlurHandler}
          error={fullNameHasError}
          helperText={fullNameHasError ? fullNameHelperText : ''}
          sx={sx.profileItem}
        />
        <TextField
          type='email'
          label='Email:'
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          error={emailHasError}
          helperText={emailHasError ? emailHelperText : ''}
          sx={sx.profileItem}
        />
        <Button
          variant='contained'
          color='primary'
          disabled={formIsValid}
          sx={sx.saveBtn}
          onClick={() => updateUser(currentUser._id, { fullName: enteredFullName })}
        >
          Save
        </Button>
      </Box>
      <Button variant='outlined' color='primary'>
        Change password
      </Button>
    </>
  );
};

export default GeneralInfo;

// import React, { useContext, useReducer, useState, useEffect } from 'react';
// import { Box, TextField, Button } from '@mui/material';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import dayjs from 'dayjs';

// import { CurrentUserContext } from 'context/AppProvider';

// import useInput from 'hooks/useInput';

// import { updateUserById } from 'services/userService';
// import { regexFullName, regexEmail } from 'helpers/regex';

// import styles from './GeneralInfo.module.scss';
// import userImg from 'assets/sidebar/avatar.png';

// const minAge = 8;
// const maxAge = 100;

// const minDate = `${dayjs().year() - minAge}/12/31`;
// const maxDate = `${dayjs().year() - maxAge}/12/31`;

// const sx = {
//   profileItem: {
//     // '&:hover': {
//     //   '& > .MuiInputLabel-root': { color: 'primary.main' },
//     // },
//     // '& .MuiOutlinedInput-root:hover': {
//     //   '& > fieldset': { borderColor: 'primary.main', borderWidth: '2px' },
//     // },
//   },
//   saveBtn: { maxWidth: '100px', ml: 'auto' },
// };

// const userReduser = (state, action) => {
//   switch (action.type) {
//     case 'CHANGE_FULLNAME':
//       return { ...state, fullName: action.payload };
//     case 'CHANGE_EMAIL':
//       return { ...state, email: action.payload };
//     case 'CHANGE_BITH_DATE':
//       return { ...state, dateOfBirth: action.payload };
//     default:
//       return state;
//   }
// };

// const initialFieldsStatus = {
//   fullName: true,
//   email: true,
//   dateOfBirth: true,
// };

// const fullNameHelperText =
//   'Enter 2 capitalized words; each word has a min of 2 and a max of 16 letters';

// const emailHelperText = 'Please enter a valid email address; examples: cockroaches@gmail.com';

// const GeneralInfo = () => {
//   const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
//   const [user, setUser] = useState(currentUser);
//   // const [user, dispatchUser] = useReducer(userReduser, currentUser);

//   const {
//     value: enteredFullName,
//     isValid: fullNameIsValid,
//     hasError: fullNameHasError,
//     valueChangeHandler: fullNameChangeHandler,
//     valueOnBlurHandler: fullNameBlurHandler,
//   } = useInput(user.fullName, regexFullName);
//   // const [fieldsValidity, setFieldsValidity] = useState(initialFieldsStatus);
//   // const [fieldsToched, setFieldsTouched] = useState()

//   const formIsValid = fullNameIsValid;
//   // const formHasError = Object.values(fieldsValidity).some((item) => !item);

//   // const changeFullname = (e) => {
//   //   dispatchUser({ type: 'CHANGE_FULLNAME', payload: e.target.value });
//   //   setFieldsValidity((prev) => ({ ...prev, fullName: regexFullName.test(e.target.value) }));
//   // };

//   // const changeEmail = (e) => {
//   //   dispatchUser({ type: 'CHANGE_EMAIL', payload: e.target.value });
//   //   setFieldsValidity((prev) => ({ ...prev, email: regexEmail.test(e.target.value) }));
//   // };

//   // const changeDate = (date) => {
//   //   dispatchUser({ type: 'CHANGE_BITH_DATE', payload: dayjs(date) });
//   //   validateBirthDate();
//   // };

//   const updateUser = async (id, data) => {
//     try {
//       const updatedUser = await updateUserById(id, data);
//       setCurrentUser(updatedUser);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // const validateBirthDate = () => {
//   //   const dateInRange =
//   //     dayjs(minDate).diff(user.dateOfBirth, 'year') >= 8 &&
//   //   setFieldsValidity((prev) => ({
//   //     dayjs(minDate).diff(user.dateOfBirth, 'year') < 100;
//   //     dateOfBirth: dayjs(user.dateOfBirth).isValid() && dateInRange,
//   //     cdOfBirth: dayjs(user.dateOfBirth).isValid() && dateInRange,
//   //     dateOfBirth: dayjs(user.dateOfBirth).isValid() && dateInRange,
//   //     ...prev,
//   //     cd...prev,
//   //     ...prev,
//   // };
//   // };cd
//   // };
//   //   }));
//   //   }));cd
//   //   }));
//   return (
//   return (cd
//   return (
//     <>
//     <>cd
//     <>

//       <Box component='img' src={userImg} alt='User photo' className={styles.profile__img} />
//       <Button>Change profile photo</Button>
//       <Box className={styles.profile__content}>
//         <TextField
//           type='text'
//           label='Fullname:'
//           value={enteredFullName}
//           onChange={fullNameChangeHandler}
//           onBlur={fullNameBlurHandler}
//           error={fullNameHasError}
//           helperText={fullNameHasError ? fullNameHelperText : ''}
//           sx={sx.profileItem}
//         />
//         {/* <TextField
//           type='email'
//           label='Email:'
//           value={user.email}
//           onChange={changeEmail}
//           error={!fieldsValidity.email}
//           helperText={!fieldsValidity.email ? emailHelperText : ''}
//           sx={sx.profileItem}
//         />
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <DesktopDatePicker
//             disableFuture
//             className={styles.profile__item}
//             maxDate={minDate}
//             minDate={maxDate}
//             // inputFormat='DD/MM/YYYY'
//             value={user.dateOfBirth}
//             onChange={changeDate}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label='Birth date:'
//                 onBlur={validateBirthDate}
//                 error={!fieldsValidity.dateOfBirth}
//               />
//             )}
//           />
//         </LocalizationProvider> */}
//         <Button
//           variant='contained'
//           color='primary'
//           disabled={formIsValid}
//           sx={sx.saveBtn}
//           onClick={() => updateUser(user._id, user)}
//         >
//           Save
//         </Button>
//       </Box>
//       <Button variant='outlined' color='primary'>
//         Change password
//       </Button>
//     </>
//   );
// };

// export default GeneralInfo;
