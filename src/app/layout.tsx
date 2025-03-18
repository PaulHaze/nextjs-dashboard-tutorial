import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import localFont from 'next/font/local';
import { ThemeToggle } from '@/components/ui';
import '@/styles/main.css';

//* LEFT IN AS EXAMPLE OF HOW TO USE GOOGLE FONTS
// import { Nabla } from 'next/font/google';
// const nabla = Nabla({
//   subsets: ['latin'],
//   variable: '--font-nabla',
//   weight: '400',
// });

//* INCLUDE THIS IN <body>
// ${nabla.variable}

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

// !CHANGETHIS
export const metadata: Metadata = {
  title: 'CHANGE THIS',
  description: 'CHANGE THIS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="relative">
            <div className="absolute right-2 top-3">
              <ThemeToggle />
            </div>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
