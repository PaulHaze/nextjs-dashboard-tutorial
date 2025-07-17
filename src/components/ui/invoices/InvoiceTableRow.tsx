import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from './Buttons';
import { InvoiceStatus } from './InvoiceStatus';
import { formatDateToLocal, formatCurrency } from '@/lib/utils';
import { InvoicesTable } from '@/lib/definitions';

export function InvoiceTableRow({ invoice }: { invoice: InvoicesTable }) {
  return (
    <tr
      key={invoice.id}
      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
    >
      <td className="py-3 pr-3 pl-6 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <Image
            src={invoice.image_url}
            className="rounded-full"
            width={28}
            height={28}
            alt={`${invoice.name}'s profile picture`}
          />
          <p>{invoice.name}</p>
        </div>
      </td>
      <td className="px-3 py-3 whitespace-nowrap">{invoice.email}</td>
      <td className="px-3 py-3 whitespace-nowrap">
        {formatCurrency(invoice.amount)}
      </td>
      <td className="px-3 py-3 whitespace-nowrap">
        {formatDateToLocal(invoice.date)}
      </td>
      <td className="px-3 py-3 whitespace-nowrap">
        <InvoiceStatus status={invoice.status} />
      </td>
      <td className="py-3 pr-3 pl-6 whitespace-nowrap">
        <div className="flex justify-end gap-3">
          <UpdateInvoice id={invoice.id} />
          <DeleteInvoice id={invoice.id} />
        </div>
      </td>
    </tr>
  );
}
