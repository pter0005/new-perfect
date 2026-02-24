import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Lexend, Space_Grotesk, Barlow_Condensed } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const lexend = Lexend({ subsets: ['latin'], variable: '--font-lexend' });
const space_grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });
const barlow_condensed = Barlow_Condensed({
  subsets: ['latin'],
  variable: '--font-barlow-condensed',
  weight: ['700', '800'],
});

export const metadata: Metadata = {
  title: 'NEW - Soluções Digitais',
  description: 'Tecnologia que evolui junto com você.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${lexend.variable} ${space_grotesk.variable} ${barlow_condensed.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
