import validator from 'validator';

export const checkIfPasswordIsValid = (password: string) =>
  password.length >= 6;

export const checkIfEmailIsValid = (email: string) => validator.isEmail(email);

export const checkIfIdIsValid = (id: string) => validator.isUUID(id);
