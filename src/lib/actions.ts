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

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  try {
    // const rawFormData = Object.fromEntries(formData.entries());
    // console.log('raw:', rawFormData);
    const { customerId, amount, status } = CreateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });

    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0]; // Format date as YYYY-MM-DD

    await insertInvoice({
      customerId,
      amountInCents,
      status,
      date,
    });

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  } catch (error) {
    console.error('Failed to create invoice:', error);
    throw new Error('Unable to create invoice. Please try again.');
  }
}

export async function updateInvoice(id: string, formData: FormData) {
  try {
    const { customerId, amount, status } = UpdateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });

    const amountInCents = amount * 100;
    await editInvoice({
      id,
      customerId,
      amountInCents,
      status,
    });
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  } catch (error) {
    console.error('Failed to update invoice:', error);
    throw new Error('Unable to update invoice. Please try again.');
  }
}

export async function deleteInvoiceAction(id: string) {
  try {
    await deleteInvoice(id);
    revalidatePath('/dashboard/invoices');
  } catch (error) {
    console.error('Failed to delete invoice:', error);
    throw new Error('Unable to delete invoice. Please try again.');
  }
}
