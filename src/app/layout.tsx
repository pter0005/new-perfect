import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Bebas_Neue, Lexend, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const lexend = Lexend({ subsets: ['latin'], variable: '--font-lexend' });
const space_grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });
const bebas_neue = Bebas_Neue({ 
  subsets: ['latin', 'latin-ext'], 
  weight: '400',
  variable: '--font-bebas-neue' 
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
      <body className={`${lexend.variable} ${space_grotesk.variable} ${bebas_neue.variable} font-sans antialiased`}>
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
}
