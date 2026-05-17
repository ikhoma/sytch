"use client";

import { useState, useEffect } from 'react';
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sync Safari/Chrome browser chrome color with current tab
  useEffect(() => {
    const color = baseTab === 'Espresso' ? '#FF5C39' : '#5804E2';
    let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', color);
  }, [baseTab]);

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
    <div className={`min-h-screen text-white font-sans flex flex-col items-center overflow-clip ${getBgColorClass(baseTab)}`}>

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
            className={`pointer-events-none will-change-transform`}
          >
            <SplashSvg color={getHexColor(activeTab)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Fixed Header — appears on scroll */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 md:py-6 pointer-events-none"
        initial={{ y: '-100%' }}
        animate={{ y: scrolled ? '0%' : '-100%' }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0) 100%)'
        }}
      >
        <div className="w-full max-w-[1280px] px-4 md:px-12 lg:px-16 flex justify-end items-center gap-2 md:gap-8 tracking-wide pointer-events-auto">
          <a href="tel:+380675067392" className="text-white hover:text-white/80 transition-colors font-black text-[13px] md:text-[22px] whitespace-nowrap">
            +38 (067) 506 73 92
          </a>
          <a href="https://t.me/denissytchev" target="_blank" rel="noopener noreferrer" className={`px-4 md:px-8 py-2 md:py-3.5 rounded-full text-[13px] md:text-xl font-black text-white hover:opacity-90 transition-opacity whitespace-nowrap ${getOppositeBgClass(baseTab)}`}>
            Замовити
          </a>
        </div>
      </motion.header>

      {/* Mobile Header */}
      <div className="md:hidden w-full flex flex-col relative z-20">
        {/* Row 1: Logo + Phone + CTA */}
        <div className="flex items-center justify-between px-4 pt-3 pb-5 gap-2">
          <img src="/logo.svg" alt="Sytch Coffee Roasters" className="h-[36px] w-auto shrink-0" />
          <div className="flex items-center gap-2 shrink-0">
            <a href="tel:+380675067392" className="text-white font-black text-[13px] whitespace-nowrap">
              +38 (067) 506 73 92
            </a>
            <a href="https://t.me/denissytchev" target="_blank" rel="noopener noreferrer" className={`px-4 py-2 rounded-full text-[13px] font-black text-white whitespace-nowrap ${getOppositeBgClass(baseTab)}`}>
              Замовити
            </a>
          </div>
        </div>
        {/* Row 2: Tabs */}
        <div className="px-4 pb-5">
          <div className="inline-flex bg-black/20 rounded-full p-1 text-sm font-black tracking-wide">
            <button
              className={`relative px-5 py-2 rounded-full transition-colors ${activeTab === 'Espresso' ? 'text-white' : 'text-white/80'}`}
              onClick={(e) => handleTabClick('Espresso', e)}
            >
              {activeTab === 'Espresso' && (
                <motion.div layoutId="mobileTabUnderlay" className={`absolute inset-0 rounded-full ${getBgColorClass('Espresso')}`} transition={{ duration: 0.175, ease: 'easeInOut' }} />
              )}
              <span className="relative z-10">Espresso</span>
            </button>
            <button
              className={`relative px-5 py-2 rounded-full transition-colors ${activeTab === 'Filter' ? 'text-white' : 'text-white/80'}`}
              onClick={(e) => handleTabClick('Filter', e)}
            >
              {activeTab === 'Filter' && (
                <motion.div layoutId="mobileTabUnderlay" className={`absolute inset-0 rounded-full ${getBgColorClass('Filter')}`} transition={{ duration: 0.175, ease: 'easeInOut' }} />
              )}
              <span className="relative z-10">Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex w-full justify-center py-6 relative z-20">
        <div className="w-full max-w-[1280px] px-12 lg:px-16 flex flex-nowrap justify-between items-center">
          <div className="flex flex-row items-center gap-8">
            <img src="/logo.svg" alt="Sytch Coffee Roasters" className="h-[60px] w-auto shrink-0" />
            <div className="flex bg-black/20 rounded-full p-1.5 text-xl font-black tracking-wide">
              <button
                className={`relative px-8 py-2.5 rounded-full transition-colors ${activeTab === 'Espresso' ? 'text-white' : 'text-white/80 hover:text-white'}`}
                onClick={(e) => handleTabClick('Espresso', e)}
              >
                {activeTab === 'Espresso' && (
                  <motion.div layoutId="activeTabUnderlay" className={`absolute inset-0 rounded-full ${getBgColorClass('Espresso')}`} transition={{ duration: 0.175, ease: 'easeInOut' }} />
                )}
                <span className="relative z-10">Espresso</span>
              </button>
              <button
                className={`relative px-8 py-2.5 rounded-full transition-colors ${activeTab === 'Filter' ? 'text-white' : 'text-white/80 hover:text-white'}`}
                onClick={(e) => handleTabClick('Filter', e)}
              >
                {activeTab === 'Filter' && (
                  <motion.div layoutId="activeTabUnderlay" className={`absolute inset-0 rounded-full ${getBgColorClass('Filter')}`} transition={{ duration: 0.175, ease: 'easeInOut' }} />
                )}
                <span className="relative z-10">Filter</span>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-8 tracking-wide">
            <a href="tel:+380675067392" className="text-white hover:text-white/80 transition-colors font-black text-[22px] whitespace-nowrap">
              +38 (067) 506 73 92
            </a>
            <a href="https://t.me/denissytchev" target="_blank" rel="noopener noreferrer" className={`px-8 py-3.5 rounded-full text-xl font-black text-white hover:opacity-90 transition-opacity whitespace-nowrap ${getOppositeBgClass(baseTab)}`}>
              Замовити
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Wrapper */}
      <div className="w-full md:max-w-[1280px] md:px-12 lg:px-16 flex flex-col flex-1 relative z-20">

      {/* Parallax Decorations (desktop only) */}
      <motion.div style={{ y: ySlow }} className="hidden md:block absolute top-[320px] -left-20 z-[-1] pointer-events-none will-change-transform">
        <div className={`w-[141px] h-[157px] ${getOppositeBgClass(baseTab)} transition-colors duration-700`} style={{ maskImage: 'url(/grain.svg)', maskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskImage: 'url(/grain.svg)', WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat' }} />
      </motion.div>
      <motion.div style={{ y: yFast }} className="hidden md:block absolute top-[560px] -right-24 z-[-1] pointer-events-none will-change-transform">
        <div className={`w-[141px] h-[157px] ${getOppositeBgClass(baseTab)} transition-colors duration-700`} style={{ maskImage: 'url(/grain.svg)', maskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskImage: 'url(/grain.svg)', WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', transform: 'rotate(120deg) scale(0.95)' }} />
      </motion.div>
      <motion.div style={{ y: yMedium }} className="hidden md:block absolute top-[1000px] -left-32 z-[-1] pointer-events-none will-change-transform">
        <div className={`w-[141px] h-[157px] ${getOppositeBgClass(baseTab)} transition-colors duration-700`} style={{ maskImage: 'url(/grain.svg)', maskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskImage: 'url(/grain.svg)', WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', transform: 'rotate(-45deg) scale(1.05)' }} />
      </motion.div>
      {!isLoading && (
        <motion.div style={{ y: ySlow, opacity: opacitySytch }} className="hidden md:block absolute top-[1240px] -right-40 z-[-1] pointer-events-none will-change-transform">
          <img src="/sytch.svg" alt="Sytch" className="w-[322px]" />
        </motion.div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col pt-0 md:pt-6">

        {/* Title */}
        <div className="flex flex-col items-start mb-6 md:mb-12 px-4 md:px-0">
          <h1 className="flex items-start min-h-[52px] md:min-h-[140px]">
            <img src="/espresso.svg" alt="Espresso" className={`h-[52px] md:h-[119px] w-auto object-contain mt-[2px] md:mt-[5px] ${activeTab === 'Espresso' ? 'block' : 'hidden'}`} />
            <img src="/filter.svg" alt="Filter" className={`h-[42px] md:h-[97px] w-auto object-contain ${activeTab === 'Filter' ? 'block' : 'hidden'}`} />
          </h1>
        </div>

        {/* Mobile: Card List */}
        <div className="md:hidden flex flex-col gap-2 pb-8 px-4">
          {isLoading && Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-[20px] bg-black/10 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-4 bg-white/20 rounded w-4" />
                <div className="h-6 bg-white/20 rounded w-2/3" />
              </div>
              <div className="h-4 bg-white/20 rounded w-1/2 mb-1" />
              <div className="h-4 bg-white/20 rounded w-3/4 mb-1" />
              <div className="h-4 bg-white/20 rounded w-1/3 mb-4" />
              <div className="flex gap-8">
                <div className="flex-1"><div className="h-3 bg-white/20 rounded w-1/2 mb-2" /><div className="h-7 bg-white/20 rounded w-full mb-2" /><div className="h-7 bg-white/20 rounded w-full" /></div>
                <div className="flex-1"><div className="h-3 bg-white/20 rounded w-1/2 mb-2" /><div className="h-7 bg-white/20 rounded w-full mb-2" /><div className="h-7 bg-white/20 rounded w-full" /></div>
              </div>
            </div>
          ))}
          {error && <div className="py-8 text-center text-lg font-bold">Помилка завантаження даних</div>}
          {!isLoading && !error && filteredData.map((item) => (
            <div key={item.id} className="rounded-[20px] bg-black/10 px-4 py-4">
              {/* Number + Name */}
              <div className="flex items-start gap-2 mb-1">
                <span className="text-[13px] font-black opacity-60 shrink-0 w-5">{item.number}</span>
                <span className="text-[24px] font-black tracking-tight uppercase leading-tight">{item.name}</span>
              </div>
              {/* Region */}
              <div className="pl-7 text-[13px] font-bold mb-2">{item.region}</div>
              {/* Flavor */}
              {item.flavorProfile && (
                <div className="pl-7 text-[13px] font-bold mb-1">{item.flavorProfile}</div>
              )}
              {/* Processing */}
              {item.processing && (
                <div className="pl-7 text-[13px] font-bold mb-4">{item.processing}</div>
              )}
              {/* Prices: two columns */}
              <div className="flex gap-4 pl-7">
                <div className="flex-1">
                  <div className="text-[10px] font-black uppercase opacity-70 tracking-wider mb-2">ЦІНА РОЗДРІБ</div>
                  <div className="flex items-baseline gap-2 mb-1.5">
                    <span className="text-[11px] font-black uppercase opacity-70 w-8 shrink-0">250г</span>
                    <span className="text-[20px] font-black leading-none">{item.retailPrice.weight250g}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[11px] font-black uppercase opacity-70 w-8 shrink-0">1кг</span>
                    <span className="text-[20px] font-black leading-none">{item.retailPrice.weight1kg}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-[10px] font-black uppercase opacity-70 tracking-wider mb-2">ОПТ ВІД 2КГ</div>
                  <div className="flex items-baseline gap-2 mb-1.5">
                    <span className="text-[11px] font-black uppercase opacity-70 w-8 shrink-0">250г</span>
                    <span className="text-[20px] font-black leading-none">{item.wholesalePrice.weight250g}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[11px] font-black uppercase opacity-70 w-8 shrink-0">1кг</span>
                    <span className="text-[20px] font-black leading-none">{item.wholesalePrice.weight1kg}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Table */}
        <div className="hidden md:block w-full overflow-x-auto flex-1">
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
