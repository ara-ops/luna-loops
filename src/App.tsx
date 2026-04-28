import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

import bowHairclipImg from './Images/Bow_Hairclip.jpg';
import bunnyDollImg from './Images/Bunny_Doll.jpg';
import charmsImg from './Images/Charms.jpg';
import heartKeychainImg from './Images/Heart_keychain.png';
import peacockKeychainImg from './Images/Peacock_keychain.png';
import miniBowclipImg from './Images/mini_bowclip.jpg';
import babyHeadbandImg from './Images/Baby_headband.jpg';
import butterflyRubberbandImg from './Images/Butterfly_Rubberband.jpg';
import turtleKeychainImg from './Images/Turtle_keychain.png.jpg';
import catEarclipsImg from './Images/Cat_earclips.jpg';

// Reusable SVG icons to avoid extra dependencies, though lucide could be used.
const InstagramIcon = ({ width = 24, height = 24, strokeWidth = 1.5 }: { width?: number, height?: number, strokeWidth?: number }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const HeartIcon = ({ width = 24, height = 24, strokeWidth = 1.5 }: { width?: number, height?: number, strokeWidth?: number }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const HamburgerIcon = () => (
  <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="22" height="1.5" fill="currentColor" />
    <rect y="8.25" width="22" height="1.5" fill="currentColor" />
    <rect y="16.5" width="22" height="1.5" fill="currentColor" />
  </svg>
);

// Standard reveal variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } }
};

const LookbookItem = ({ image, title, index = 0 }: { image: string, title: string, index?: number }) => {
  const isEven = index % 2 === 1; // 0-indexed, so 1,3,5 are "even" visually (right aligned image)
  return (
    <motion.div variants={itemVariants} className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} w-full mb-[60px] lg:mb-[120px] last:mb-0 items-center`}>
      <div className={`w-full lg:w-[60%] aspect-[4/5] lg:aspect-auto lg:h-[650px] relative overflow-hidden bg-cream group mb-6 lg:mb-0 ${isEven ? 'lg:ml-16' : 'lg:mr-16'}`}>
        <div className="absolute inset-0 bg-[#F7F4F0]/-[0.08] pointer-events-none z-10 mix-blend-overlay"></div>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover product-image transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="w-full lg:w-[40%] flex flex-col justify-center items-start lg:py-8">
        <h3 className="font-serif text-[clamp(1.5rem,2.5vw,2rem)] text-[#2C2520] mb-0 font-normal leading-[1.2]">{title}</h3>
        <div className="w-[30px] h-[1px] bg-[#C9A882] my-5"></div>
        <p className="font-sans text-[10px] tracking-[0.14em] text-[#9C8E85] mb-8 uppercase leading-[1.8] whitespace-pre-line">
          Handmade · Made to order{'\n'}DM for pricing
        </p>
        <a 
          href="https://ig.me/m/luna___loops" 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center justify-center border border-[#2C2520] text-[#2C2520] font-sans text-[11px] tracking-[0.18em] uppercase h-[44px] px-[18px] transition hover:bg-[#2C2520] hover:text-[#F7F4F0]"
          style={{ transitionDuration: '0.3s' }}
        >
          [ Message to Order ]
        </a>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    
    // Slight delay to allow DOM to render before connecting observer
    setTimeout(() => {
      document.querySelectorAll('.scroll-reveal').forEach(section => {
        observer.observe(section);
      });
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen font-sans bg-cream text-espresso selection:bg-blush selection:text-espresso">
      {/* 01 - Sticky Global Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-[600ms] ease-in-out ${scrolled ? 'bg-[#F7F4F0]/96 backdrop-blur-[8px] border-b border-[#2A231E]/10' : 'bg-transparent border-transparent'}`}
      >
        <div className="h-[56px] lg:h-[64px] max-w-[1100px] mx-auto px-7 lg:px-0 flex items-center justify-between">
          <div className="w-8 flex items-center">
            <button className="md:hidden text-espresso" aria-label="Menu">
              <HamburgerIcon />
            </button>
          </div>
          <div className="font-serif text-[15px] tracking-[0.35em] text-espresso uppercase shrink-0">
            L U N A L O O P S
          </div>
          <div className="w-8 flex items-center justify-end">
            <a href="https://ig.me/m/luna___loops" target="_blank" rel="noreferrer" className="text-espresso hover:text-forest transition-colors">
              <InstagramIcon />
            </a>
          </div>
        </div>
      </header>

      {/* 02 - Hero Section */}
      <section className="relative h-[100dvh] w-full flex items-end">
        <div className="absolute inset-0 z-0">
          <img 
            src={bunnyDollImg} 
            alt="Luna Loops Crochet" 
            className="w-full h-full object-cover origin-center"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(247,244,240,0.15) 0%, rgba(42,35,30,0.45) 100%)' }}></div>
        </div>

        <div className="relative z-10 w-full pl-[28px] lg:pl-[80px] pb-[80px] max-w-[1100px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-serif text-[44px] lg:text-[72px] font-light leading-[1.1] text-cream mb-4 whitespace-pre-line tracking-[-0.01em]">
              Artisanal warmth,<br/>crafted for you.
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-sans text-[13px] tracking-[0.06em] text-[#F7F4F0]/75 max-w-[360px] leading-[1.85] mb-8">
              Handmade crochet accessories. Woven with care, meant to be cherished.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <a 
              href="https://ig.me/m/luna___loops" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center bg-espresso text-cream h-[44px] px-[18px] font-sans text-[11px] tracking-[0.18em] uppercase transition hover:bg-[#3D342E] active:translate-y-[1px]"
              style={{ transitionDuration: '0.5s', transitionTimingFunction: 'ease' }}
            >
              INQUIRE ON INSTAGRAM
            </a>
          </motion.div>
        </div>
      </section>

      {/* 02.5 - The Maker */}
      <section className="scroll-reveal bg-[#F9EDE8] py-[48px] lg:py-[80px] px-[5%]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="flex flex-col items-start order-2 md:order-1">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#9C8E85] mb-4">THE MAKER</span>
            <div className="w-[40px] h-[1px] bg-[#E2DDD9] mb-8"></div>
            <h2 className="font-serif text-[clamp(2rem,3.5vw,2.8rem)] text-[#2A231E] mb-6 leading-[1.2]">
              Made by hand.<br/>Loved by heart.
            </h2>
            <p className="font-sans text-[15px] leading-[1.8] text-[#2A231E] mb-8">
              "I started Luna Loops as a quiet rebellion against mass production. There is a certain magic in an object that takes hours to come to life — in feeling the tension of the yarn, the weight of the stitches, the intention behind the shape. My hope is that every piece we create feels like returning home."
            </p>
            <p className="font-serif italic text-[1.2rem] opacity-70 text-[#2A231E]">
              — Apoorva, Founder
            </p>
          </div>
          <div className="hidden md:flex order-1 md:order-2 w-full aspect-[4/5] bg-cream overflow-hidden items-center justify-center p-8 border border-[#2A231E]/5">
            <span className="font-serif text-[18px] tracking-[0.35em] uppercase text-espresso/40">
              L U N A L O O P S
            </span>
          </div>
        </div>
      </section>

      {/* 03 - The Lookbook */}
      <section id="lookbook" className="py-[80px] lg:py-[160px] px-7 lg:px-8 max-w-[1100px] mx-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
        >
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="font-serif text-[48px] font-light leading-[1.1] tracking-[-0.01em] text-espresso mb-6">
              The Collection
            </h2>
            <div className="w-full h-px bg-espresso/12"></div>
          </motion.div>

          <div className="w-full flex flex-col mt-12">
            <LookbookItem index={0} image={bowHairclipImg} title="Citrus Scallop Bow" />
            <LookbookItem index={1} image={bunnyDollImg} title="The Classic Bunny" />
            <LookbookItem index={2} image={charmsImg} title="Lily of the Valley" />
            <LookbookItem index={3} image={heartKeychainImg} title="Two-Tone Heart Keychain" />
            <LookbookItem index={4} image={peacockKeychainImg} title="Peacock Eye" />
            <LookbookItem index={5} image={miniBowclipImg} title="Mini Bowclip" />
          </div>
        </motion.div>
      </section>

      {/* 04 - Bespoke & Custom Creations */}
      <section id="custom" className="scroll-reveal bg-[#EDE8E3] w-full py-[80px] lg:py-[160px] px-7 lg:px-8 border-t border-[#E2DDD9]">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[40px] lg:gap-[80px] items-center"
        >
          <div className="order-2 lg:order-1 flex flex-col items-start pr-0 lg:pr-8">
            <motion.span variants={itemVariants} className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#3B5249] mb-6 block">
              MADE TO ORDER
            </motion.span>
            <motion.h2 variants={itemVariants} className="font-serif text-[42px] lg:text-[52px] font-light leading-[1.1] tracking-[-0.01em] text-espresso whitespace-pre-line mb-6">
              Dream it.<br/>We'll loop it.
            </motion.h2>
            <motion.p variants={itemVariants} className="font-sans text-[15px] leading-[1.85] text-espresso/80 mb-10 max-w-[480px]">
              Looking for a specific color, character, or charm? We specialize in bringing your unique ideas to life. Send us your inspiration, and let's craft something entirely your own.
            </motion.p>
            <motion.a 
              variants={itemVariants}
              href="https://ig.me/m/luna___loops" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center bg-espresso text-cream h-[44px] px-[18px] font-sans text-[11px] tracking-[0.18em] uppercase transition hover:bg-[#3D342E] active:translate-y-[1px]"
              style={{ transitionDuration: '0.5s', transitionTimingFunction: 'ease' }}
            >
              REQUEST A CUSTOM DESIGN
            </motion.a>
          </div>
          <motion.div variants={itemVariants} className="order-1 lg:order-2 w-full h-[480px] lg:h-[600px] rounded-[2px] overflow-hidden">
            <img src={charmsImg} alt="Custom crochet piece" className="w-full h-full object-cover" />
          </motion.div>
        </motion.div>
      </section>

      {/* 05 - How it Works (replaces old "The Process") */}
      <section className="scroll-reveal bg-[#F7F4F0] py-[80px] lg:py-[120px] px-7 lg:px-[5%] border-t border-[#E2DDD9]">
        <div className="max-w-[1100px] mx-auto flex flex-col items-center">
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#9C8E85] mb-4">THE PROCESS</span>
          <h2 className="font-serif text-[clamp(2rem,3.5vw,2.8rem)] text-[#2C2520] mb-4 text-center">
            How to commission a piece
          </h2>
          <p className="font-sans text-[0.95rem] tracking-[0.05em] text-[#9C8E85] text-center max-w-[400px] mb-16">
            We work intimately with our clients to ensure every loop is woven with intention.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 w-full relative mb-16">
            {/* Desktop Connectors */}
            <div className="hidden md:block absolute top-[28px] left-[16%] right-[16%] h-[1px] bg-[#E2DDD9] z-0"></div>

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center text-center bg-[#F7F4F0]">
              <div className="w-[56px] h-[56px] rounded-full bg-[#F7F4F0] border border-[#E2DDD9] flex items-center justify-center font-serif text-[1.5rem] text-[#2C2520] mb-6">1</div>
              <h3 className="font-serif text-[1.4rem] text-[#2C2520] mb-3">Send a Message</h3>
              <p className="font-sans text-[0.9rem] text-[#9C8E85] leading-[1.6]">Slide into our Instagram DMs with screenshots of pieces you love, or a moodboard for a custom design.</p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center text-center bg-[#F7F4F0]">
              <div className="w-[56px] h-[56px] rounded-full bg-[#F7F4F0] border border-[#E2DDD9] flex items-center justify-center font-serif text-[1.5rem] text-[#2C2520] mb-6">2</div>
              <h3 className="font-serif text-[1.4rem] text-[#2C2520] mb-3">Consult & Confirm</h3>
              <p className="font-sans text-[0.9rem] text-[#9C8E85] leading-[1.6]">We'll discuss yarn colors, sizing, and pricing. Once details are finalized, a secure payment link is shared.</p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center text-center bg-[#F7F4F0]">
              <div className="w-[56px] h-[56px] rounded-full bg-[#F7F4F0] border border-[#E2DDD9] flex items-center justify-center font-serif text-[1.5rem] text-[#2C2520] mb-6">3</div>
              <h3 className="font-serif text-[1.4rem] text-[#2C2520] mb-3">The Making</h3>
              <p className="font-sans text-[0.9rem] text-[#9C8E85] leading-[1.6]">Your piece goes into production. We'll send you behind-the-scenes updates from the studio until it ships.</p>
            </div>
          </div>

          <a 
            href="https://ig.me/m/luna___loops" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center justify-center border border-[#2C2520] text-[#2C2520] font-sans text-[11px] tracking-[0.18em] uppercase h-[44px] px-[24px] transition hover:bg-[#2C2520] hover:text-[#F7F4F0]"
          >
            [ Message us on Instagram ]
          </a>
        </div>
      </section>

      {/* 05 - Testimonials / Kind Words */}
      <section className="scroll-reveal bg-[#2C2520] py-[80px] lg:py-[120px] px-7 lg:px-[5%]">
        <div className="max-w-[1100px] mx-auto flex flex-col items-center">
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#C9A882] mb-4">KIND WORDS</span>
          <h2 className="font-serif text-[clamp(2rem,3.5vw,2.8rem)] text-[#F7F4F0] mb-16 text-center">
            From our community
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
            {/* Box 1 */}
            <div className="bg-[#FFFFFF]/[0.06] border border-[#FFFFFF]/10 p-8 flex flex-col">
              <span className="font-serif text-[3rem] text-[#C9A882] leading-[0.5] mb-4">“</span>
              <p className="font-serif italic text-[1.1rem] text-[#F7F4F0] leading-[1.6] mb-8 flex-grow">
                The most precious custom bunny for my daughter's first birthday. The attention to detail is just stunning.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-[30px] h-[1px] bg-[#C9A882]"></div>
                <span className="font-sans text-[0.8rem] uppercase tracking-[0.1em] text-[#F7F4F0]/60">Rhea M.</span>
              </div>
            </div>

            {/* Box 2 */}
            <div className="bg-[#FFFFFF]/[0.06] border border-[#FFFFFF]/10 p-8 flex flex-col">
              <span className="font-serif text-[3rem] text-[#C9A882] leading-[0.5] mb-4">“</span>
              <p className="font-serif italic text-[1.1rem] text-[#F7F4F0] leading-[1.6] mb-8 flex-grow">
                Absolutely in love with my scallop bow. I wore it for my engagement shoot and it held up beautifully all day.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-[30px] h-[1px] bg-[#C9A882]"></div>
                <span className="font-sans text-[0.8rem] uppercase tracking-[0.1em] text-[#F7F4F0]/60">Sneha K.</span>
              </div>
            </div>

            {/* Box 3 */}
            <div className="bg-[#FFFFFF]/[0.06] border border-[#FFFFFF]/10 p-8 flex flex-col">
              <span className="font-serif text-[3rem] text-[#C9A882] leading-[0.5] mb-4">“</span>
              <p className="font-serif italic text-[1.1rem] text-[#F7F4F0] leading-[1.6] mb-8 flex-grow">
                I ordered custom charms as bridesmaids gifts. Apoorva color-matched the yarn perfectly to their dresses!
              </p>
              <div className="flex items-center gap-3">
                <div className="w-[30px] h-[1px] bg-[#C9A882]"></div>
                <span className="font-sans text-[0.8rem] uppercase tracking-[0.1em] text-[#F7F4F0]/60">Divya R.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 - From the Studio */}
      <section id="from-the-studio" aria-label="From the Studio — Instagram Gallery" className="bg-[#F7F4F0] pt-[120px] pb-[80px] lg:pb-[120px]">
        <div className="max-w-[1100px] mx-auto flex flex-col items-center w-full px-7 lg:px-8">
          
          <h2 className="font-serif text-[24px] tracking-[0.04em] text-[#2A231E] font-normal mb-8">
            @luna___loops
          </h2>
          
          <div className="w-[40px] h-[1px] bg-[#E2DDD9] mb-3"></div>
          
          <p className="font-sans text-[0.9rem] tracking-[0.12em] uppercase text-[#9C8E85] mb-[40px]">
            Follow our journey and see the latest drops.
          </p>
          
          <div className="w-full flex lg:grid lg:grid-cols-4 gap-[6px] overflow-x-auto scrollbar-hide snap-x snap-mandatory pt-2 pb-4 lg:pb-0">
            {[babyHeadbandImg, butterflyRubberbandImg, turtleKeychainImg, catEarclipsImg].map((imgSrc, idx) => (
              <figure key={idx} className="relative overflow-hidden rounded-[2px] cursor-pointer group shrink-0 w-[75vw] lg:w-auto aspect-square snap-center lg:snap-align-none m-0">
                <a href="https://www.instagram.com/luna___loops" target="_blank" rel="noopener noreferrer" aria-label="View post on Instagram" tabIndex={0} className="block w-full h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C9A882] focus-visible:outline-offset-[3px]">
                  
                  <img 
                    src={imgSrc} 
                    alt="Luna Loops piece from studio"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center block transform scale-100 group-hover:scale-[1.06]"
                    style={{ transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-[#1E1612]/40 opacity-0 group-hover:opacity-100 ease-in-out pointer-events-none" style={{ transition: 'opacity 0.35s ease' }}></div>
                  
                  {/* Hover CTA */}
                  <figcaption className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[52%] group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100 flex flex-col items-center pointer-events-none text-white w-full px-2 text-center" style={{ transition: 'opacity 0.3s ease, transform 0.35s ease' }}>
                    <HeartIcon width={24} height={24} strokeWidth={1.5} />
                    <span className="font-sans text-[0.7rem] tracking-[0.15em] uppercase text-white/90 mt-[8px]">View on Instagram</span>
                  </figcaption>
                  
                  {/* Persistent Instagram Badge */}
                  <div className="absolute top-[10px] right-[10px] bg-white/20 rounded-[4px] p-1 backdrop-blur-[2px] z-10 text-white/80">
                    <InstagramIcon width={20} height={20} className="" />
                  </div>
                  
                </a>
              </figure>
            ))}
          </div>
          
          <a href="https://www.instagram.com/luna___loops" target="_blank" rel="noopener noreferrer" className="inline-block mt-[40px] font-sans text-[0.75rem] tracking-[0.2em] uppercase text-[#2A231E] border border-[#2A231E] bg-transparent py-[14px] px-[36px] rounded-none transition-colors duration-[250ms] ease-in-out hover:bg-[#2A231E] hover:text-[#F7F4F0]">
            [ FOLLOW US ON INSTAGRAM ]
          </a>
          
        </div>
      </section>

      {/* 07 - Footer */}
      <footer className="bg-[#2A3B31] text-soft-cream py-[80px]">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="max-w-[1100px] mx-auto px-7 lg:px-8 flex flex-col items-center text-center"
        >
          <motion.div variants={itemVariants} className="font-serif text-[18px] tracking-[0.35em] uppercase mb-12">
            L U N A L O O P S
          </motion.div>
          
          <motion.nav variants={itemVariants} className="flex gap-4 font-sans text-[11px] tracking-[0.15em] uppercase mb-16">
            <a href="#lookbook" className="nav-link text-soft-cream/50 hover:text-soft-cream/100 transition-colors duration-300">Lookbook</a>
            <span className="text-soft-cream/50">·</span>
            <a href="#custom" className="nav-link text-soft-cream/50 hover:text-soft-cream/100 transition-colors duration-300">Custom Orders</a>
            <span className="text-soft-cream/50">·</span>
            <a href="https://ig.me/m/luna___loops" target="_blank" rel="noreferrer" className="nav-link text-soft-cream/50 hover:text-soft-cream/100 transition-colors duration-300">Instagram</a>
          </motion.nav>

          <motion.div variants={itemVariants} className="w-full h-px bg-soft-cream/12 mb-8"></motion.div>

          <motion.div variants={itemVariants} className="font-sans text-[11px] text-soft-cream/35">
            &copy; 2026 Luna Loops. All inquiries and orders processed exclusively via Instagram Direct Message.
          </motion.div>
        </motion.div>
      </footer>
    </div>
  );
}
