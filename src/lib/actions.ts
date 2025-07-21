'use server';

import { z } from 'zod';

import { insertInvoice } from '@/lib/data';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  // const rawFormData = Object.fromEntries(formData.entries());
  // console.log('raw:', rawFormData);
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0]; // Format date as YYYY-MM-DD

  console.log('Creating invoice with:', { customerId, amount, status });
  insertInvoice({
    customerId,
    amountInCents,
    status,
    date,
  });

  // Return a success message or redirect
  // return { success: true, message: 'Invoice created successfully!' };
}
