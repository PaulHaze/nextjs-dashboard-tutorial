'use client';

import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

import { cn, generatePagination } from '@/lib/utils';

// ${pathname === link.href && 'bg-sky-100 text-blue-600'}

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
