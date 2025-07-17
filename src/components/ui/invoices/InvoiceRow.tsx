import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from './Buttons';
import { InvoiceStatus } from './InvoiceStatus';
import { formatDateToLocal, formatCurrency } from '@/lib/utils';

type Invoice = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export function InvoiceRow({ invoice }: { invoice: Invoice }) {
  return (
    <div
      key={invoice.id}
      className="mb-2 w-full rounded-md bg-white p-4"
    >
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <div className="mb-2 flex items-center">
            <Image
              src={invoice.image_url}
              className="mr-2 rounded-full"
              width={28}
              height={28}
              alt={`${invoice.name}'s profile picture`}
            />
            <p>{invoice.name}</p>
          </div>
          <p className="text-sm text-gray-500">{invoice.email}</p>
        </div>
        <InvoiceStatus status={invoice.status} />
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <p className="text-xl font-medium">
            {formatCurrency(invoice.amount)}
          </p>
          <p>{formatDateToLocal(invoice.date)}</p>
        </div>
        <div className="flex justify-end gap-2">
          <UpdateInvoice id={invoice.id} />
          <DeleteInvoice id={invoice.id} />
        </div>
      </div>
    </div>
  );
}