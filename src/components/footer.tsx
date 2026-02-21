import Link from 'next/link';
import { Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 bg-black/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-foreground/70">
        <div className="flex items-center justify-center text-sm">
          <span>© 2025</span>
          <div className="flex items-center text-primary drop-shadow-[0_0_8px_hsl(var(--primary)_/_0.5)] font-bold text-base mx-2">
            <span>N</span>
            <div className="flex flex-col items-center justify-center mx-1 space-y-1 h-[1em]">
              <div className="w-[0.4em] h-[0.2em] bg-primary rounded-full"></div>
              <div className="w-[0.4em] h-[0.2em] bg-primary rounded-full"></div>
              <div className="w-[0.4em] h-[0.2em] bg-primary rounded-full"></div>
            </div>
            <span>W</span>
          </div>
          <span>– Construindo o futuro digital.</span>
        </div>
        <div className="mt-4 flex justify-center space-x-6">
          <Link href="#home" className="text-sm hover:text-primary transition-colors">Home</Link>
          <Link href="#portfolio" className="text-sm hover:text-primary transition-colors">Portfólio</Link>
          <Link href="#contact" className="text-sm hover:text-primary transition-colors">Contato</Link>
        </div>
        <div className="mt-6 flex justify-center items-center space-x-4">
            <Link href="https://www.instagram.com/new.c0de/" target="_blank" rel="noopener noreferrer" className="text-primary/70 hover:text-primary transition-colors">
              <Instagram className="h-6 w-6 hover:drop-shadow-[0_0_5px_hsl(var(--primary))]" />
            </Link>
          </div>
      </div>
    </footer>
  );
}
