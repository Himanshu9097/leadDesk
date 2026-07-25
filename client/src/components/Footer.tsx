import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial } from '@react-three/drei';

gsap.registerPlugin(ScrollTrigger);

const AnimatedShape = () => {
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Icosahedron ref={meshRef} args={[1, 1]} scale={2}>
      <MeshDistortMaterial
        color="#0052FF"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </Icosahedron>
  );
};

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!footerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        "-=0.6"
      )
      .fromTo(
        linkRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)' },
        "-=0.6"
      );
    }, footerRef);

    return () => ctx.revert(); // Cleanup GSAP animations
  }, []);

  return (
    <footer 
      ref={footerRef} 
      className="relative w-full min-h-[500px] h-[60vh] bg-[#0A0F1C] text-white overflow-hidden flex flex-col items-center justify-center"
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 opacity-40 z-0 pointer-events-none">
        <Canvas style={{ pointerEvents: 'none' }} camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 5]} intensity={2} color="#ffffff" />
          <directionalLight position={[-2, -2, -5]} intensity={1} color="#4D7CFF" />
          <AnimatedShape />
        </Canvas>
      </div>

      {/* Ambient Glow */}
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/20 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Foreground Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center h-full text-center mt-12">
        <div ref={badgeRef} className="mb-6 opacity-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/80 font-medium">
              Join the elite
            </span>
          </div>
        </div>

        <div ref={textRef} className="flex flex-col items-center opacity-0 max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
            <a href="https://digitalheroesco.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity block z-50 relative pointer-events-auto">
              Build the future with <br className="hidden md:block"/>
              <span className="bg-gradient-to-r from-white via-accent-secondary to-accent bg-clip-text text-transparent">
                Digital Heroes Co.
              </span>
            </a>
          </h2>
          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-xl font-light leading-relaxed">
            Experience the ultimate synergy of design and engineering. Scale your workflows to unprecedented heights.
          </p>
        </div>
        
        <div className="relative z-[9999]">
          <a
            ref={linkRef}
            href="https://digitalheroesco.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center h-14 px-10 text-lg font-medium text-white transition-all bg-white/10 rounded-full hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-accent hover:shadow-accent-lg opacity-0 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Visit DigitalHeroesCo.com
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-secondary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          </a>
        </div>
      </div>
      
      {/* Copyright minimal */}
      <div className="absolute bottom-8 left-0 right-0 text-center flex flex-col items-center gap-2 z-10">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/20 mb-2"></div>
        <span className="text-[10px] text-white/30 font-mono uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} LeadDesk Mini
        </span>
      </div>
    </footer>
  );
};

export default Footer;
