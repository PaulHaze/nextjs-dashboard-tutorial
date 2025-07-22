'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { insertInvoice, editInvoice, deleteInvoice } from '@/lib/data';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const InvoiceSchema = FormSchema.omit({ id: true, date: true });

// const invoiceHelper = (data: FormData) => {
//   const { customerId, amount, status } = InvoiceSchema.parse({
//     customerId: data.get('customerId'),
//     amount: data.get('amount'),
//     status: data.get('status'),
//   });
//   const amountInCents = amount * 100;
//   const date = new Date().toISOString().split('T')[0]; // Format date as YYYY-MM-DD
//   return {
//     customerId,
//     amountInCents,
//     status,
//     date,
//   };
// };

export async function createInvoice(formData: FormData) {
  try {
    // const rawFormData = Object.fromEntries(formData.entries());
    // console.log('raw:', rawFormData);
    const { customerId, amount, status } = InvoiceSchema.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });

    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];
    // const { customerId, amountInCents, status, date } = invoiceHelper(formData);

    await insertInvoice({
      customerId,
      amountInCents,
      status,
      date,
    });
  } catch (error) {
    console.error('ACTIONS.ts - Failed to create invoice:', error);
    throw new Error('ACTIONS.ts Unable to create invoice. Please try again.');
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, formData: FormData) {
  try {
    const { customerId, amount, status } = InvoiceSchema.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });

    const amountInCents = amount * 100;
    // const { customerId, amountInCents, status } = invoiceHelper(formData);
    await editInvoice({
      id,
      customerId,
      amountInCents,
      status,
    });
  } catch (error) {
    console.error('ACTIONS.ts - Failed to update invoice:', error);
    throw new Error('ACTIONS.ts Unable to update invoice. Please try again.');
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoiceAction(id: string) {
  try {
    await deleteInvoice(id);
    revalidatePath('/dashboard/invoices');
  } catch (error) {
    console.error('ACTIONS.ts - Failed to delete invoice:', error);
    throw new Error('ACTIONS.ts Unable to delete invoice. Please try again.');
  }
}
