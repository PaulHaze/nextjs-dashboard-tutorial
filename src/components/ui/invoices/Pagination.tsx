'use client';

import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

import { cn } from '@/lib/utils';
// import { generatePagination } from '@/lib/utils';

// ${pathname === link.href && 'bg-sky-100 text-blue-600'}
export function Pagination() {
  return (
    <div>
      <p>Pagination Placeholder</p>
    </div>
  );
}

export function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
}) {
  const className = cn(
    'flex h-10 w-10 items-center justify-center border text-sm',
    (position === 'first' || position === 'single') && 'rounded-l-md',
    (position === 'last' || position === 'single') && 'rounded-r-md',
    isActive && 'z-10 border-blue-600 bg-blue-600 text-white',
    !isActive && position !== 'middle' && 'hover:bg-gray-100',
    position === 'middle' && 'text-gray-300',
  );
  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

export function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {
  const className = cn(
    'flex h-10 w-10 items-center justify-center rounded-md border',
    isDisabled && 'pointer-events-none text-gray-300',
    !isDisabled && 'hover:bg-gray-100',
    direction === 'left' && 'mr-2 md:mr-4',
    direction === 'right' && 'ml-2 md:ml-4',
  );
  const icon =
    direction === 'left' ? (
      <ArrowLeftIcon className="w-4" />
    ) : (
      <ArrowRightIcon className="w-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
