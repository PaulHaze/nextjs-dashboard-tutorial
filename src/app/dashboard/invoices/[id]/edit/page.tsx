import { Breadcrumbs } from '@/components/ui/invoices';
import { fetchCustomers } from '@/lib/data';

export default async function EditInvoicePage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      {id}
    </main>
  );
}
