import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const CreateClientSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(6, 'Valid phone number is required'),
  nationality: z.string().min(2, 'Nationality is required'),
  countryOfResidence: z.string().min(2, 'Country of residence is required'),
  assignedAgentId: z.string().optional(),
});

export type CreateClientInput = z.infer<typeof CreateClientSchema>;

export const CreateReceiptSchema = z.object({
  clientId: z.string().uuid('Invalid client ID format'),
  amount: z.number().positive('Receipt amount must be a positive number'),
  currency: z.string().default('EUR'),
  paymentMethod: z.enum(['CASH', 'BANK_TRANSFER']),
  paymentDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid payment date format',
  }),
  notes: z.string().optional(),
});

export type CreateReceiptInput = z.infer<typeof CreateReceiptSchema>;

export const SubmitReviewSchema = z.object({
  authorName: z.string().min(2, 'Author name is required'),
  rating: z.number().int().min(1).max(5, 'Rating must be between 1 and 5 stars'),
  title: z.string().min(3, 'Review title must be at least 3 characters'),
  comment: z.string().min(10, 'Review comment must be at least 10 characters'),
});

export type SubmitReviewInput = z.infer<typeof SubmitReviewSchema>;

export const SearchUniversitySchema = z.object({
  domain: z.string().optional(),
  degreeLevel: z.enum(['BACHELOR', 'MASTER', 'PHD']).optional(),
  city: z.string().optional(),
  status: z.enum(['OPEN', 'CLOSED', 'OPENING_SOON', 'CLOSING_SOON']).optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
});

export type SearchUniversityInput = z.infer<typeof SearchUniversitySchema>;
