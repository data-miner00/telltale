import * as yup from 'yup';

export const updateProfileRequestSchema = yup.object({
  alias: yup
    .string()
    .min(1, 'Alias must be at least 1 character long')
    .optional(),
  email: yup.string().email('The email format is invalid').optional(),
  avatarUrl: yup.string().url('The url format is invalid').optional(),
  location: yup.string(),
  description: yup.string().optional(),
});
