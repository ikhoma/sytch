"use client";

import { useState } from 'react';
import useSWR from 'swr';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { CoffeeItem } from '@/lib/data';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const SplashSvg = ({ color }: { color: string }) => (
  <svg viewBox="0 0 500 500" fill={color} className="w-full h-full" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
    {/* Central splash blob */}
    <path d="M250 150 C 280 130, 290 170, 310 180 C 350 160, 350 200, 340 210 C 380 230, 360 260, 340 260 C 370 300, 330 320, 310 310 C 310 350, 270 350, 260 330 C 230 370, 200 350, 210 320 C 170 340, 150 300, 170 280 C 130 270, 150 230, 170 230 C 140 190, 180 170, 200 190 C 200 150, 240 150, 250 150 Z" />
    {/* Elongated teardrop droplets */}
    <path d="M 250 50 Q 260 90 250 120 Q 240 90 250 50 Z" />
    <path d="M 400 130 Q 370 170 340 160 Q 370 140 400 130 Z" />
    <path d="M 430 280 Q 380 290 370 260 Q 390 250 430 280 Z" />
    <path d="M 340 430 Q 310 390 290 400 Q 320 420 340 430 Z" />
    <path d="M 160 440 Q 180 390 210 400 Q 180 430 160 440 Z" />
    <path d="M 60 320 Q 100 330 120 290 Q 90 280 60 320 Z" />
    <path d="M 70 160 Q 110 160 130 190 Q 90 200 70 160 Z" />
    <path d="M 140 80 Q 170 100 180 140 Q 150 130 140 80 Z" />
    {/* Floating circular droplets */}
    <circle cx="290" cy="80" r="12" />
    <circle cx="410" cy="90" r="18" />
    <circle cx="460" cy="210" r="15" />
    <circle cx="400" cy="380" r="22" />
    <circle cx="240" cy="470" r="16" />
    <circle cx="90" cy="420" r="24" />
    <circle cx="30" cy="250" r="18" />
    <circle cx="80" cy="100" r="20" />
    <circle cx="210" cy="40" r="10" />
  </svg>
);

export default function Home() {
  const [activeTab, setActiveTab] = useState<'Espresso' | 'Filter'>('Espresso');
  const [baseTab, setBaseTab] = useState<'Espresso' | 'Filter'>('Espresso');
  const [ripple, setRipple] = useState<{ x: number, y: number, id: number } | null>(null);

  const handleTabClick = (tab: 'Espresso' | 'Filter', e: React.MouseEvent) => {
    if (tab === activeTab) return;
    setRipple({ x: e.clientX, y: e.clientY, id: Date.now() });
    setActiveTab(tab);
  };

  const { scrollY } = useScroll();
  const ySlow = useTransform(scrollY, [0, 1000], [0, 300]);
  const yMedium = useTransform(scrollY, [0, 1000], [0, 150]);
  const yFast = useTransform(scrollY, [0, 1000], [0, 450]);
  const opacitySytch = useTransform(scrollY, [0, 300], [0, 0.9]);

  
  // Polling every 5 minutes (300000ms), fallback to local cache
  const { data, error, isLoading } = useSWR<CoffeeItem[]>('/api/prices', fetcher, {
    refreshInterval: 300000,
    revalidateOnFocus: true,
  });

  const filteredData = data?.filter(item => item.category === activeTab) || [];
  
  const getBgColorClass = (tab: 'Espresso' | 'Filter') => tab === 'Espresso' ? 'bg-[#FF5C39]' : 'bg-[#5804E2]';
  const getOppositeBgClass = (tab: 'Espresso' | 'Filter') => tab === 'Espresso' ? 'bg-[#5804E2]' : 'bg-[#FF5C39]';
  const getHexColor = (tab: 'Espresso' | 'Filter') => tab === 'Espresso' ? '#FF5C39' : '#5804E2';

  const size = typeof window !== 'undefined' ? Math.max(window.innerWidth, window.innerHeight) * 2 : 2000;

  return (
    <div className={`min-h-screen text-white p-6 md:p-12 lg:p-16 font-sans flex flex-col items-center overflow-x-hidden ${getBgColorClass(baseTab)}`}>

      {/* Liquid Background Overlay */}
      <AnimatePresence>
        {activeTab !== baseTab && ripple && (
          <motion.div
            key={ripple.id}
            style={{
              position: 'fixed',
              left: ripple.x - size / 2,
              top: ripple.y - size / 2,
              width: size,
              height: size,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10
            }}
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 25, rotate: 15 }}
            transition={{ duration: 0.7, ease: 'circIn' }}
            onAnimationComplete={() => setBaseTab(activeTab)}
            className={`pointer-events-none`}
          >
            <SplashSvg color={getHexColor(activeTab)} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-[1280px] flex flex-col flex-1 relative z-20">
      
      {/* Parallax Decorations */}
      <motion.div 
        style={{ y: ySlow }} 
        className="absolute top-[20%] -left-10 md:-left-20 z-[-1] pointer-events-none"
      >
        <div 
          className={`w-[141px] h-[157px] ${getOppositeBgClass(baseTab)} transition-colors duration-700`} 
          style={{ maskImage: 'url(/grain.svg)', maskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskImage: 'url(/grain.svg)', WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat' }}
        />
      </motion.div>

      <motion.div 
        style={{ y: yFast }} 
        className="absolute top-[30%] -right-8 md:-right-24 z-[-1] pointer-events-none"
      >
        <div 
          className={`w-[141px] h-[157px] ${getOppositeBgClass(baseTab)} transition-colors duration-700`} 
          style={{ maskImage: 'url(/grain.svg)', maskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskImage: 'url(/grain.svg)', WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', transform: 'rotate(120deg) scale(0.8)' }}
        />
      </motion.div>

      <motion.div 
        style={{ y: yMedium }} 
        className="absolute top-[80%] -left-16 md:-left-32 z-[-1] pointer-events-none"
      >
        <div 
          className={`w-[141px] h-[157px] ${getOppositeBgClass(baseTab)} transition-colors duration-700`} 
          style={{ maskImage: 'url(/grain.svg)', maskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskImage: 'url(/grain.svg)', WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', transform: 'rotate(-45deg) scale(1.2)' }}
        />
      </motion.div>

      {/* Sytch Character */}
      {!isLoading && (
        <motion.div 
          style={{ y: ySlow, opacity: opacitySytch }} 
          className="absolute bottom-10 md:bottom-20 -right-20 md:-right-40 z-[-1] pointer-events-none"
        >
          <img src="/sytch.svg" alt="Sytch" className="w-[200px] md:w-[322px]" />
        </motion.div>
      )}

      {/* Header Area (Tabs & Contact) */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full mb-12 px-2 mt-2 gap-6 md:gap-0">
        {/* Top Tabs */}
        <div className="flex bg-black/20 rounded-full p-1.5 text-lg md:text-xl font-black tracking-wide">
          <button 
            className={`relative px-6 md:px-8 py-2 md:py-2.5 rounded-full transition-colors ${activeTab === 'Espresso' ? 'text-white' : 'text-white/80 hover:text-white'}`}
            onClick={(e) => handleTabClick('Espresso', e)}
          >
            {activeTab === 'Espresso' && (
              <motion.div
                layoutId="activeTabUnderlay"
                className={`absolute inset-0 rounded-full ${getBgColorClass('Espresso')}`}
                transition={{ duration: 0.175, ease: "easeInOut" }}
              />
            )}
            <span className="relative z-10">Espresso</span>
          </button>
          <button 
            className={`relative px-6 md:px-8 py-2 md:py-2.5 rounded-full transition-colors ${activeTab === 'Filter' ? 'text-white' : 'text-white/80 hover:text-white'}`}
            onClick={(e) => handleTabClick('Filter', e)}
          >
            {activeTab === 'Filter' && (
              <motion.div
                layoutId="activeTabUnderlay"
                className={`absolute inset-0 rounded-full ${getBgColorClass('Filter')}`}
                transition={{ duration: 0.175, ease: "easeInOut" }}
              />
            )}
            <span className="relative z-10">Filter</span>
          </button>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 md:space-x-8 tracking-wide">
          <a href="tel:+380675067392" className="text-white hover:text-white/80 transition-colors font-black text-xl md:text-[22px]">
            +38 (067) 506 73 92
          </a>
          <a href="https://t.me/denissytchev" target="_blank" rel="noopener noreferrer" className={`px-8 py-3 md:py-3.5 rounded-full text-lg md:text-xl font-black text-white hover:opacity-90 transition-opacity ${getOppositeBgClass(baseTab)}`}>
            Замовити
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col">
        
        {/* Title and Logo */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <h1 className="flex items-start min-h-[80px] md:min-h-[140px] pt-2 md:pt-4">
            <img 
              src="/espresso.svg" 
              alt="Espresso" 
              className={`h-[71px] md:h-[119px] w-auto object-contain mt-[3px] md:mt-[5px] ${activeTab === 'Espresso' ? 'block' : 'hidden'}`} 
            />
            <img 
              src="/filter.svg" 
              alt="Filter" 
              className={`h-[58px] md:h-[97px] w-auto object-contain ${activeTab === 'Filter' ? 'block' : 'hidden'}`} 
            />
          </h1>
          <div className="flex flex-col items-end mt-4 md:mt-0">
            <img src="/logo.svg" alt="Sytch Coffee Roasters" className="h-16 md:h-20 lg:h-[89px] w-auto" />
          </div>
        </div>

        {/* Table Container */}
        <div className="w-full overflow-x-auto flex-1">
          <table className="w-full text-left border-separate border-spacing-0 min-w-[900px]">
            <thead>
              <tr className="text-[13px] font-black uppercase">
                <th className="pb-4 pt-2 w-20 lg:w-24 pl-4 lg:pl-6 font-black border-b border-white/50">№</th>
                <th className="pb-4 pt-2 w-[28%] font-black border-b border-white/50">КАВА</th>
                <th className="pb-4 pt-2 w-[22%] font-black border-b border-white/50">ПРОФІЛЬ СМАКУ</th>
                <th className="pb-4 pt-2 w-[15%] font-black border-b border-white/50">ОБРОБКА</th>
                <th className="pb-4 pt-2 w-[15%] font-black border-b border-white/50">ЦІНА РОЗДРІБ</th>
                <th className="pb-4 pt-2 w-[15%] pr-4 lg:pr-6 font-black border-b border-white/50">ОПТ ВІД 2КГ</th>
              </tr>
            </thead>
            <tbody className="text-sm md:text-base font-semibold">
              {isLoading && <TableSkeletonRows count={6} />}
              {error && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-xl font-bold">
                    Помилка завантаження даних
                  </td>
                </tr>
              )}
              {!isLoading && !error && filteredData.map((item, index) => (
                <tr key={item.id} className="group">
                  <td className="py-6 align-top text-xl font-black pl-4 lg:pl-6 group-even:bg-black/10 group-even:rounded-l-[30px]">{item.number}</td>
                  <td className="py-6 align-top pr-6 group-even:bg-black/10">
                    <div className="text-[28px] font-black tracking-tight uppercase leading-[1.1] mb-2">{item.name}</div>
                    <div className="text-base font-bold">{item.region}</div>
                  </td>
                  <td className="py-6 align-top pr-6 font-bold text-[15px] leading-snug group-even:bg-black/10">{item.flavorProfile}</td>
                  <td className="py-6 align-top pr-6 font-bold text-[15px] group-even:bg-black/10">{item.processing}</td>
                  <td className="py-6 align-top pr-2 group-even:bg-black/10">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="w-11 text-[13px] uppercase font-black">250г</span>
                      <span className="text-xl font-black">{item.retailPrice.weight250g}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="w-11 text-[13px] uppercase font-black">1кг</span>
                      <span className="text-xl font-black">{item.retailPrice.weight1kg}</span>
                    </div>
                  </td>
                  <td className="py-6 align-top pr-4 lg:pr-6 group-even:bg-black/10 group-even:rounded-r-[30px]">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="w-11 text-[13px] uppercase font-black">250г</span>
                      <span className="text-xl font-black">{item.wholesalePrice.weight250g}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="w-11 text-[13px] uppercase font-black">1кг</span>
                      <span className="text-xl font-black">{item.wholesalePrice.weight1kg}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      </div>
    </div>
  );
}

// Skeleton Loading Component
function TableSkeletonRows({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <tr key={i} className="animate-pulse group">
          <td className="py-6 pr-4 pl-4 lg:pl-6 group-even:bg-black/10 group-even:rounded-l-[30px]"><div className="h-6 bg-white/20 rounded w-8"></div></td>
          <td className="py-6 pr-6 group-even:bg-black/10">
            <div className="h-8 bg-white/20 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-white/20 rounded w-1/2"></div>
          </td>
          <td className="py-6 pr-6 group-even:bg-black/10"><div className="h-4 bg-white/20 rounded w-full mb-2"></div><div className="h-4 bg-white/20 rounded w-4/5"></div></td>
          <td className="py-6 pr-6 group-even:bg-black/10"><div className="h-4 bg-white/20 rounded w-2/3"></div></td>
          <td className="py-6 pr-4 group-even:bg-black/10">
            <div className="h-6 bg-white/20 rounded w-full mb-2"></div>
            <div className="h-6 bg-white/20 rounded w-full"></div>
          </td>
          <td className="py-6 pr-4 lg:pr-6 group-even:bg-black/10 group-even:rounded-r-[30px]">
            <div className="h-6 bg-white/20 rounded w-full mb-2"></div>
            <div className="h-6 bg-white/20 rounded w-full"></div>
          </td>
        </tr>
      ))}
    </>
  );
}
