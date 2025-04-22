import Image from 'next/image';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

import { LatestInvoice } from '@/lib/definitions';

type LatestInvoicesProps = {
  latestInvoices: LatestInvoice[];
};

export function LatestInvoices({ latestInvoices }: LatestInvoicesProps) {
  return (
    <div className="mt-4 flex w-full flex-col md:col-span-4">
      <h2 className="mb-4 font-serif text-xl md:text-2xl">Latest Invoices</h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 py-4">
        <div className="bg-white px-6">
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className={cn(
                  `flex flex-row items-center justify-between py-4 ${i !== 0 && 'border-t border-slate-200'}`,
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={invoice.image_url}
                    alt={`${invoice.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="lg:text-md truncate text-sm font-semibold">
                      {invoice.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p className="truncate font-serif text-sm font-medium lg:text-lg">
                  {invoice.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pt-6 pb-2">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
