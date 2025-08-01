'use client';

import { useActionState, useState, useEffect } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

import { CustomerField } from '@/lib/definitions';
import { createInvoice } from '@/lib/actions';
import type { InvoiceFormState } from '@/lib/actions';

export function CreateForm({ customers }: { customers: CustomerField[] }) {
  const initialState: InvoiceFormState = {
    message: null,
    errors: {},
  };

  const [state, formAction] = useActionState(createInvoice, initialState);

  // GEMINI CODE
  // A single state to manage the display errors, which gets reset on successful submission
  const [displayErrors, setDisplayErrors] = useState(state.errors);

  // Sync displayErrors with the state from the server action
  useEffect(() => {
    setDisplayErrors(state.errors);
  }, [state]);

  // A single handler to clear errors as the user types
  const handleInputChange = (
    fieldName: keyof NonNullable<InvoiceFormState['errors']>,
  ) => {
    if (displayErrors?.[fieldName]) {
      const newErrors = { ...displayErrors };
      delete newErrors[fieldName];
      setDisplayErrors(newErrors);
    }
  };

  return (
    <form action={formAction}>
      <div className="rounded-md bg-slate-100 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="form-label">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer form-field"
              key={state.data?.customerId || 'initial'}
              defaultValue={state.data?.customerId || ''}
              onChange={() => handleInputChange('customerId')}
              aria-describedby="customer-error"
            >
              <option value="">Select a customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {displayErrors?.customerId && (
              <p className="mt-2 text-sm text-red-500">
                {displayErrors.customerId[0]}
              </p>
            )}
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="form-label">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter USD amount"
                className="peer form-field"
                defaultValue={state.data?.amount || ''}
                onChange={() => handleInputChange('amount')}
                aria-describedby="amount-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="amount-error" aria-live="polite" aria-atomic="true">
            {displayErrors?.amount && (
              <p className="mt-2 text-sm text-red-500">
                {displayErrors.amount[0]}
              </p>
            )}
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  className="radio-field"
                  defaultChecked={state.data?.status === 'pending'}
                  onChange={() => handleInputChange('status')}
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  className="radio-field"
                  defaultChecked={state.data?.status === 'paid'}
                  onChange={() => handleInputChange('status')}
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
        <div id="status-error" aria-live="polite" aria-atomic="true">
          {displayErrors?.status && (
            <p className="mt-2 text-sm text-red-500">
              {displayErrors.status[0]}
            </p>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}
