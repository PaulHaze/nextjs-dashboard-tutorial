'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  UserGroupIcon,
  DocumentDuplicateIcon,
  RectangleGroupIcon,
} from '@heroicons/react/24/outline';

import { cn } from '@/lib/utils';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: RectangleGroupIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              'bg-base-100/50 flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium',
              'hover:bg-sky-100 hover:text-blue-600',
              'md:flex-none md:justify-start md:p-2 md:px-3',
              pathname === link.href && 'bg-sky-200/70 text-blue-800',
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
