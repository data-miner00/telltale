import * as yup from 'yup';

export const registerRequestSchema = yup.object({
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(15, 'Username must be no longer than 15 characters')
    .required(),
});

export const authRequestSchema = yup.object({
  username: yup
    .string()
    .min(3, 'Username is too short')
    .max(15, 'Username is too long')
    .required(),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required(),
});
