import Link from 'next/link';
import { cn } from '@/lib/utils';

type Breadcrumb = {
  label: string;
  href: string;
  active?: boolean;
};

export function Breadcrumbs({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className="flex md:text-lg">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={cn(
              breadcrumb.active ? 'text-gray-800' : 'text-gray-400',
            )}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
