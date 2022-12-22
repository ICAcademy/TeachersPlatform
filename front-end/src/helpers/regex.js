export const regexFullName = /^([A-Z][a-z]{1,15}) ([A-Z][a-z]{1,15})$/;
export const regexEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
export const regexDateOfBirth = /^((0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)?[0-9]{2})*$/;
export const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?=.*?[/#?!@$%^&*-.)()]).{8,10}$/;
export const regexTime = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
