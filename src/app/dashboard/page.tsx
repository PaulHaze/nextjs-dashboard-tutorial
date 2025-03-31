import { Card, RevenueChart } from '@/components/ui';

export default function DashboardPage() {
  return (
    <div>
      <Card title="Test Card" value="$444" type="invoices" />
      <RevenueChart revenue={[]} />
    </div>
  );
}
