"use client";

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export interface CardStackItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  href: string;
}

export default function CardStack({ items }: { items: CardStackItem[] }) {
  const router = useRouter();
  const [cards, setCards] = useState<CardStackItem[]>(items);
  const [dragDirection, setDragDirection] = useState<'up' | 'down' | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCards(items);
    setCurrentIndex(0);
  }, [items]);

  const dragY = useMotionValue(0);
  const rotateX = useTransform(dragY, [-200, 0, 200], [15, 0, -15]);

  const offset = 10;
  const scaleStep = 0.06;
  const borderRadius = 12;
  const swipeThreshold = 50;

  const spring = {
    type: 'spring' as const,
    stiffness: 170,
    damping: 26
  };

  const moveToEnd = () => {
    setCards(prev => [...prev.slice(1), prev[0]]);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const moveToStart = () => {
    setCards(prev => [prev[prev.length - 1], ...prev.slice(0, -1)]);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleDragEnd = (_: any, info: any) => {
    const velocity = info.velocity.y;
    const offset = info.offset.y;

    if (Math.abs(offset) > swipeThreshold || Math.abs(velocity) > 500) {
      if (offset < 0 || velocity < 0) {
        setDragDirection('up');
        setTimeout(() => {
          moveToEnd();
          setDragDirection(null);
        }, 150);
      } else {
        setDragDirection('down');
        setTimeout(() => {
          moveToStart();
          setDragDirection(null);
        }, 150);
      }
    } else {
      // It's a tap, not a swipe. Navigate.
      if (cards.length > 0 && cards[0].href) {
        window.open(cards[0].href, '_blank');
      }
    }
    dragY.set(0);
  };

  const cardStackTheme = {
      cardBorder: 'border-border/50',
      controlBg: 'bg-background/60 hover:bg-background/90 border-border/50',
      text: 'text-foreground',
      cardInfoBg: 'bg-gradient-to-t from-black/80 via-black/40 to-transparent',
      shadowCard: 'drop-shadow-2xl',
      shadowCardBack: 'drop-shadow-xl',
      dotActive: 'bg-primary',
      dotInactive: 'bg-border',
  }

  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <div className="w-full h-[280px] sm:h-[400px] md:h-[500px] flex items-center justify-center relative">
      
      <motion.button
        onClick={moveToStart}
        className={`absolute left-0 sm:-left-10 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full ${cardStackTheme.controlBg} border backdrop-blur-sm transition-colors duration-200 z-20`}
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft className={`w-5 h-5 sm:w-6 sm:h-6 ${cardStackTheme.text}`} />
      </motion.button>

      <motion.button
        onClick={moveToEnd}
        className={`absolute right-0 sm:-right-10 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full ${cardStackTheme.controlBg} border backdrop-blur-sm transition-colors duration-200 z-20`}
        whileHover={{ scale: 1.1, x: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight className={`w-5 h-5 sm:w-6 sm:h-6 ${cardStackTheme.text}`} />
      </motion.button>

      <div className="relative w-72 sm:w-96 md:w-[580px] aspect-[16/10] sm:aspect-video z-10">
        <ul className="relative w-full h-full m-0 p-0">
          <AnimatePresence>
            {cards.map(({ id, src, alt, title, description, href }, i) => {
              const isFront = i === 0;
              const brightness = Math.max(0.4, 1 - i * 0.15);
              const baseZ = cards.length - i;
              
              return (
                 <motion.li
                  key={id}
                  className={cn(
                    `absolute w-full h-full list-none overflow-hidden border-2`,
                    cardStackTheme.cardBorder,
                    isFront ? cardStackTheme.shadowCard : cardStackTheme.shadowCardBack
                  )}
                  style={{
                    borderRadius: `${borderRadius}px`,
                    cursor: isFront ? 'grab' : 'pointer',
                    touchAction: 'none',
                    rotateX: isFront ? rotateX : 0,
                    transformPerspective: 1000,
                  }}
                  animate={{
                    top: `${i * -offset}px`,
                    scale: 1 - i * scaleStep,
                    filter: `brightness(${brightness})`,
                    zIndex: baseZ,
                    opacity: dragDirection && isFront ? 0 : 1
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                    transition: { duration: 0.2 }
                  }}
                  transition={spring}
                  drag={isFront ? 'y' : false}
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0.7}
                  onDrag={(_, info) => {
                    if (isFront) dragY.set(info.offset.y);
                  }}
                  onDragEnd={isFront ? handleDragEnd : undefined}
                  whileDrag={
                    isFront ? { zIndex: cards.length + 1, cursor: 'grabbing', scale: 1.02 } : {}
                  }
                  onHoverStart={() => isFront && setShowInfo(true)}
                  onHoverEnd={() => setShowInfo(false)}
                  onClick={() => !isFront && moveToEnd()}
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover pointer-events-none select-none"
                    draggable={false}
                    sizes="(max-width: 768px) 80vw, 580px"
                  />
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 p-4 ${cardStackTheme.cardInfoBg}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: isFront && showInfo ? 1 : 0,
                      y: isFront && showInfo ? 0 : 10
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-white font-bold text-lg font-heading">{title}</h3>
                    <p className="text-white/80 text-sm">{description}</p>
                  </motion.div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>

      <div className="absolute bottom-[-2.5rem] left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to card ${i + 1}`}
            onClick={() => {
                const diff = i - (currentIndex % items.length);
                if (diff > 0) for (let j = 0; j < diff; j++) moveToEnd();
                else if (diff < 0) for (let j = 0; j < -diff; j++) moveToStart();
            }}
            className={cn(
              `h-2 rounded-full transition-all duration-300`,
              i === currentIndex % items.length
                ? `${cardStackTheme.dotActive} w-5`
                : `${cardStackTheme.dotInactive} w-2 hover:bg-border/70`
            )}
          />
        ))}
      </div>
    </div>
  );
}
