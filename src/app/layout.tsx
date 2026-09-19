import type {Metadata, Viewport} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Lexend, Barlow_Condensed, Bebas_Neue } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const lexend = Lexend({ subsets: ['latin'], variable: '--font-lexend' });
const barlow_condensed = Barlow_Condensed({
  subsets: ['latin'],
  variable: '--font-barlow-condensed',
  weight: ['700', '800'],
});
// Bebas Neue agora vem self-hosted pelo next/font (antes era @import do Google no globals.css)
const bebas_neue = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  weight: '400',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://agencianew.site'),
  title: 'NEW - Sites e Sistemas',
  description: 'A gente faz site, loja e sistema sob medida pro seu negócio. Você paga uma vez e leva o código, o domínio e os acessos. Sem mensalidade.',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'NEW - Sites e Sistemas',
    description: 'Você paga uma vez e o site é seu. Sem mensalidade, sem ficar preso a plataforma.',
    url: 'https://agencianew.site',
    siteName: 'NEW',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'NEW - Sites e Sistemas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEW - Sites e Sistemas',
    description: 'Você paga uma vez e o site é seu. Sem mensalidade, sem ficar preso a plataforma.',
    images: ['/og.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${lexend.variable} ${barlow_condensed.variable} ${bebas_neue.variable} font-sans antialiased`}>
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
