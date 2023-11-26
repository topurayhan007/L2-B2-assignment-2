import { z } from 'zod';

// User sub schema validations
const userFullNameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required',
      invalid_type_error: 'First name must be a string',
    })
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  lastName: z
    .string({
      required_error: 'Last name is required',
      invalid_type_error: 'Last name must be a string',
    })
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'Last Name must start with a capital letter',
    }),
});

const userAddressValidationSchema = z.object({
  street: z.string({
    required_error: 'Street name is required',
    invalid_type_error: 'Street name must be a string',
  }),
  city: z.string({
    required_error: 'City name is required',
    invalid_type_error: 'City name must be a string',
  }),
  country: z.string({
    required_error: 'Country name is required',
    invalid_type_error: 'Country name must be a string',
  }),
});

const userOrderValidationSchema = z.object({
  productName: z.string({
    required_error: 'Product name is required',
    invalid_type_error: 'Product name must be a string',
  }),
  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .min(1, { message: 'Price should be greater than 0' }),
  quantity: z
    .number({
      required_error: 'Quantity is required',
      invalid_type_error: 'Quantity must be a number',
    })
    .min(1, { message: 'Quantity should be at least 1' }),
});

// User schema validations
const userValidationSchema = z.object({
  userId: z.number({
    required_error: 'UserId is required',
    invalid_type_error: 'UserId must be a number',
  }),
  username: z.string({
    required_error: 'Username is required',
    invalid_type_error: 'Username must be a string',
  }),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(20, { message: 'Password should not be longer than 20 characters' }),
  fullName: userFullNameValidationSchema.required({
    firstName: true,
    lastName: true,
  }),
  age: z
    .number({
      required_error: 'Age is required',
      invalid_type_error: 'Age must be a number',
    })
    .min(1, { message: 'Age should be greater than 0' }),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email('This is not a valid email address'),
  isActive: z
    .boolean({
      required_error: 'isActive status is required',
      invalid_type_error: 'isActive must be a boolean',
    })
    .default(true),
  hobbies: z.array(
    z
      .string({
        invalid_type_error: 'Hobby must be a string',
      })
      .min(1, { message: 'Hobby should at least 1 character long' }),
    {
      required_error: 'Hobbies are required',
      invalid_type_error: 'Hobbies must be an array',
    },
  ),
  address: userAddressValidationSchema.required({
    street: true,
    city: true,
    country: true,
  }),
  orders: z.array(userOrderValidationSchema).optional(),
});

export { userValidationSchema, userOrderValidationSchema };
