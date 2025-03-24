import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import localFont from 'next/font/local';
// import { ThemeToggle } from '@/components/ui';
import '@/styles/main.css';

//* LEFT IN AS EXAMPLE OF HOW TO USE GOOGLE FONTS
import { Lusitana } from 'next/font/google';
const lusitana = Lusitana({
  subsets: ['latin'],
  variable: '--font-lusitana',
  weight: ['400', '700'],
});

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

export const metadata: Metadata = {
  title: 'Dashboard Tutorial',
  description: 'My code for the current NextJs Dashboard Tutorial',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lusitana.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="relative">
            {/* <div className="absolute top-3 right-2">
              <ThemeToggle />
            </div> */}
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
