import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import CardSwap, { Card, type CardSwapHandle } from '@/components/ui/CardSwap';
import matchaLatteImg from '@/assets/matcha-latte.jpg';
import foundersNoteImg from '@/assets/founders-note.jpg';

/* ─────────────────────────────────────────────────────────
   Redirect card data
───────────────────────────────────────────────────────── */
const REDIRECTS = [
    {
        id: '01',
        title: 'Shop Avora',
        body: "Experience the finest ceremonial-grade matcha. Sourced directly from Japan's most prestigious tea gardens, our matcha brings authentic tradition to your cup.",
        image: matchaLatteImg,
        buttonText: 'Pre-Order Now',
        buttonLink: '/product/ceremonial-matcha',
    },
    {
        id: '02',
        title: "Founders' Note",
        body: 'Discover the journey behind Avora. From our passion for authentic matcha to building a brand rooted in quality, tradition, and sustainability.',
        image: foundersNoteImg,
        buttonText: 'Read Our Story',
        buttonLink: '/founders',
    },
];

/* ─────────────────────────────────────────────────────────
   Nav arrow button
───────────────────────────────────────────────────────── */
function NavBtn({ dir, onClick }: { dir: 'prev' | 'next'; onClick: () => void }) {
    const btnRef = useRef<HTMLButtonElement>(null);
    return (
        <button
            ref={btnRef}
            onClick={onClick}
            aria-label={dir === 'prev' ? 'Previous' : 'Next'}
            onMouseEnter={() => gsap.to(btnRef.current, { scale: 1.05, duration: 0.2, ease: 'power2.out' })}
            onMouseLeave={() => gsap.to(btnRef.current, { scale: 1, duration: 0.25, ease: 'power2.out' })}
            onMouseDown={() => gsap.to(btnRef.current, { scale: 0.95, duration: 0.1 })}
            onMouseUp={() => gsap.to(btnRef.current, { scale: 1, duration: 0.2, ease: 'power2.out' })}
            className="w-12 h-12 rounded-full border border-cream/30 bg-cream/5 backdrop-blur-sm flex items-center justify-center text-cream/70 hover:border-cream/50 hover:bg-cream/10 transition-all duration-300"
        >
            <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                aria-hidden="true"
                style={{ transform: dir === 'prev' ? 'scaleX(-1)' : undefined }}
            >
                <path
                    d="M5 10h9M10 5l4 5-4 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    );
}

/* ─────────────────────────────────────────────────────────
   Main section
───────────────────────────────────────────────────────── */
export default function RedirectsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const cardSwapRef = useRef<CardSwapHandle>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const rd = REDIRECTS[activeIndex];

    /* ── Responsive — detect ≤768 for CardSwap sizing ── */
    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)');
        const update = () => setIsMobile(mq.matches);
        update();
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, []);

    /* ── Swap callbacks ── */
    const handleFrontChange = useCallback((cardIdx: number) => {
        const el = contentRef.current;
        if (!el) { setActiveIndex(cardIdx); return; }

        // Kill any in-flight tweens so spam-clicking doesn't flicker.
        gsap.killTweensOf(el);

        setActiveIndex(cardIdx);
        gsap.fromTo(
            el,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        );
    }, []);

    const goNext = useCallback(() => { cardSwapRef.current?.next(); }, []);
    const goPrev = useCallback(() => { cardSwapRef.current?.prev(); }, []);

    /* ── Keyboard navigation ── */
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') goPrev();
            if (e.key === 'ArrowRight') goNext();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [goNext, goPrev]);

    return (
        <section 
            id="redirects" 
            ref={sectionRef} 
            className="bg-primary py-20 md:py-28 overflow-hidden relative"
        >
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row items-stretch gap-12 md:gap-20 lg:gap-24">

                    {/* ── Left: Info + Navigation (45%) ── */}
                    <div className="w-full md:w-[45%] flex flex-col justify-center order-2 md:order-1 relative z-20 -mt-4 md:mt-0 px-2 md:px-0">
                        {/* Mobile Gradient Blur Backdrop */}
                        <div 
                            className="absolute -inset-x-4 -top-32 -bottom-20 md:hidden pointer-events-none backdrop-blur-[12px] z-0" 
                            style={{ 
                                maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 40%)', 
                                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 40%)' 
                            }} 
                        />
                        <div className="absolute -inset-x-4 -top-32 -bottom-20 md:hidden pointer-events-none bg-gradient-to-b from-transparent via-primary/80 to-primary z-0" />
                        
                        <div ref={contentRef} className="space-y-6 relative z-10">
                            {/* Title */}
                            <h3 className="font-display text-5xl md:text-6xl lg:text-7xl text-cream font-light leading-[1.1] tracking-tight">
                                {rd.title}
                            </h3>

                            {/* CTA Button */}
                            <div className="pt-6">
                                <Link
                                    to={rd.buttonLink}
                                    className="inline-block font-body text-sm tracking-[0.2em] text-cream border border-cream/40 px-10 py-4 hover:bg-cream/10 transition-all duration-500"
                                >
                                    {rd.buttonText}
                                </Link>
                            </div>

                            {/* Navigation: arrows + dots */}
                            <div className="flex items-center gap-4 pt-8">
                                <NavBtn dir="prev" onClick={goPrev} />
                                <NavBtn dir="next" onClick={goNext} />
                                <div className="flex gap-2 ml-3">
                                    {REDIRECTS.map((_, i) => (
                                        <div 
                                            key={i} 
                                            className={`h-1.5 rounded-full transition-all duration-500 ${
                                                i === activeIndex 
                                                    ? 'w-10 bg-cream' 
                                                    : 'w-1.5 bg-cream/30'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Right: CardSwap (55%) ── */}
                    <div 
                        className="w-full md:w-[55%] relative order-1 md:order-2 z-10" 
                        style={{ 
                            minHeight: isMobile ? '360px' : '650px'
                        }}
                    >
                        <CardSwap
                            ref={cardSwapRef}
                            width={isMobile ? 560 : 800}
                            height={isMobile ? 420 : 600}
                            cardDistance={isMobile ? 20 : 30}
                            verticalDistance={isMobile ? 24 : 35}
                            delay={6000}
                            pauseOnHover
                            onFrontChange={handleFrontChange}
                            skewAmount={1.5}
                            easing="smooth"
                        >
                            {REDIRECTS.map((r, i) => (
                                <Card key={i} className="overflow-hidden shadow-2xl">
                                    {/* Background Image */}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            width: '100%',
                                            height: '100%',
                                            backgroundImage: `url(${r.image})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            pointerEvents: 'none',
                                        }}
                                    />

                                    {/* Subtle vignette overlay */}
                                    <div 
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            background: 'radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.12) 100%)',
                                            pointerEvents: 'none',
                                        }} 
                                    />
                                </Card>
                            ))}
                        </CardSwap>
                    </div>
                </div>
            </div>

            {/* ── Responsive ── */}
            <style>{`
                @media (max-width: 768px) {
                    #redirects .container > div {
                        flex-direction: column;
                        gap: 0rem;
                    }
                }
            `}</style>
        </section>
    );
}
