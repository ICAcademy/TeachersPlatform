export const REGEX_FULL_NAME = /^([A-Z][a-z]{1,15}) ([A-Z][a-z]{1,15})$/;
export const REGEX_EMAIL = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
export const REGEX_DATE_OF_BIRTH =
  /^((0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)?[0-9]{2})*$/;
export const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?=.*?[/#?!@$%^&*-.)()]).{8,10}$/;
export const REGEX_TIME = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
export const REGEX_LABEL = /^[\w\s\-,\.:;()''""]{1,30}$/;
export const REGEX_WORD = /^[a-zA-Z]{1,20}$/;
export const REGEX_TRANSLATION = /^[А-ЩЬЮЯҐЄІЇа-щьюяґєії]{1,20}$/;
export const REGEX_TODO = /^[a-zA-Z \-,\.:;()?!''""]{1,30}$/;
