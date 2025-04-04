import { GlobeAltIcon } from '@heroicons/react/24/outline';

export function AcmeLogo() {
  return (
    <div className="flex flex-row items-center leading-none text-white">
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="font-serif text-[44px]">Acme</p>
    </div>
  );
}
