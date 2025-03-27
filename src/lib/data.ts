import postgres from 'postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
} from './definitions';

import { formatCurrency } from '@/lib/utils';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
