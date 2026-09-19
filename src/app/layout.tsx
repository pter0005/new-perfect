import type {Metadata, Viewport} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Lexend, Barlow_Condensed, Bebas_Neue } from 'next/font/google';
import { MotionProvider } from '@/components/motion-provider';

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

// Dados estruturados pro Google entender que a NEW é um serviço profissional
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "NEW",
  alternateName: "Agência NEW",
  url: "https://agencianew.site",
  logo: "https://agencianew.site/new-logo.png",
  image: "https://agencianew.site/og.png",
  description: "Sites, lojas e sistemas sob medida. Você paga uma vez e leva o código, o domínio e os acessos.",
  email: "contato@agencianew.site",
  telephone: "+5511916264441",
  sameAs: ["https://www.instagram.com/new.c0de/"],
  areaServed: "BR",
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
    <html lang="pt-BR" className="dark">
      <body className={`${lexend.variable} ${barlow_condensed.variable} ${bebas_neue.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionProvider>{children}</MotionProvider>
        <Toaster />
      </body>
    </html>
  );
}
