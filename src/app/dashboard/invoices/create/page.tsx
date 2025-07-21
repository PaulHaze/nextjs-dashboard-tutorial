import { CreateForm, Breadcrumbs } from '@/components/ui/invoices';
import { fetchCustomers } from '@/lib/data';
import { cache } from 'react';

const getCachedCustomers = cache(fetchCustomers);

export default async function CreateInvoicePage() {
  const customers = await getCachedCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <CreateForm customers={customers} />
    </main>
  );
}
