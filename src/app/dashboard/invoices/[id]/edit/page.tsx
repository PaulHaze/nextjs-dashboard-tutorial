import { Breadcrumbs, EditInvoiceForm } from '@/components/ui/invoices';
import { fetchCustomers, fetchInvoiceById } from '@/lib/data';

export default async function EditInvoicePage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

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
      <EditInvoiceForm invoice={invoice} customers={customers} />
    </main>
  );
}
