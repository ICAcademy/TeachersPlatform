/* eslint-disable no-useless-escape */
export const regexFullName = /^([A-Z][a-z]{1,15} )([A-Z][a-z]{1,15}){0,30}$/;
export const regexEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
export const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?=.*?[/#?!@$%^&*-.)()]).{8,10}$/;
