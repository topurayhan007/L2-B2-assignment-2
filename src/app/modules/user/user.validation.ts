import { z } from 'zod';

// sub schema validations
const userFullNameValidationSchema = z.object({
  firstName: z.string().refine((value) => /^[A-Z]/.test(value), {
    message: 'First Name must start with a capital letter',
  }),
  lastName: z.string().refine((value) => /^[A-Z]/.test(value), {
    message: 'Last Name must start with a capital letter',
  }),
});

const userAddressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const userOrderValidationSchema = z.object({
  productName: z.string(),
  price: z.number().min(1, { message: 'Price should be greater than 0' }),
  quantity: z.number().min(1, { message: 'Quantity should be at least 1' }),
});

// schema validation
const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' })
    .max(20, { message: 'Password should not be longer than 20 characters.' }),
  fullName: userFullNameValidationSchema,
  age: z.number().min(1, { message: 'Age should be greater than 0' }),
  email: z.string().email('This is not a valid email address'),
  isActive: z.boolean().default(true),
  hobbies: z.array(
    z.string().min(1, { message: 'Hobby should at least 1 character long' }),
  ),
  address: userAddressValidationSchema,
  orders: z.array(userOrderValidationSchema).optional(),
});

export { userValidationSchema, userOrderValidationSchema };
