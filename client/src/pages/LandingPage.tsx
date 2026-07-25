import React from 'react';
import LeadForm from '../components/LeadForm';
import Footer from '../components/Footer';
import { ArrowRight, Zap, Shield, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SectionBadge } from '../components/ui/SectionBadge';
import { Canvas } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

const easeOut = [0.16, 1, 0.3, 1] as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

// Subtle 3D Sphere inspired by the reference design
const FloatingSphere = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} className="w-full h-full pointer-events-none">
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
      <directionalLight position={[-5, -5, -5]} intensity={1} color="#3F6B54" />
      <Sphere args={[1, 64, 64]} scale={1.6}>
        <MeshDistortMaterial
          color="#98A399"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.2}
          metalness={0.6}
        />
      </Sphere>
    </Canvas>
  );
};

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-accent selection:text-white overflow-x-hidden font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif font-bold text-xl tracking-tight text-foreground">LeadDesk</span>
          </div>
          <Link 
            to="/admin/login"
            className="text-sm font-medium text-foreground hover:text-accent transition-colors underline underline-offset-4"
          >
            Admin Login
          </Link>
        </div>
      </nav>

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 md:pt-32 md:pb-44 overflow-hidden">
          {/* Abstract Green Blob background */}
          <div className="absolute right-[-10%] top-0 w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="max-w-2xl"
              >
                <motion.div variants={fadeInUp} className="mb-6">
                  <SectionBadge animateDot={true}>The Modern CRM</SectionBadge>
                </motion.div>
                
                <motion.h1 variants={fadeInUp} className="text-[3rem] md:text-6xl lg:text-[5rem] leading-[1.05] tracking-tight font-serif text-foreground mb-8">
                  Streamline your <br className="hidden md:block"/> 
                  <span className="text-accent italic">lead management.</span>
                </motion.h1>
                
                <motion.div variants={fadeInUp} className="relative mb-10 max-w-xl">
                  <p className="text-lg md:text-xl text-muted-foreground leading-[1.75]">
                    The modern CRM for digital agencies and freelancers. Capture, manage, and convert leads with absolute precision and speed.
                  </p>
                </motion.div>
                
                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-4">
                  <a 
                    href="#contact" 
                    className="group inline-flex h-14 items-center justify-center rounded-xl bg-accent px-8 text-lg font-medium text-white hover:bg-accent/90 transition-all focus:outline-none w-full sm:w-auto shadow-accent"
                  >
                    Get Started 
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                </motion.div>
              </motion.div>

              {/* Inspired 3D Visual */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: easeOut }}
                className="hidden lg:block relative h-[500px] w-full"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <FloatingSphere />
                </div>
                
                {/* Floating frosted card inspired by reference */}
                <motion.div 
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-10 left-10 w-72 bg-white/40 backdrop-blur-md rounded-3xl shadow-xl border border-white/40 p-6 z-10"
                >
                  <div className="px-3 py-1 bg-white/60 rounded-full text-[10px] font-bold text-accent tracking-widest inline-block mb-4">
                    2,800+ LEADS MANAGED
                  </div>
                  <h3 className="text-2xl font-serif text-foreground tracking-tight leading-tight">
                    Capture. Manage. Convert.
                  </h3>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Inverted Section - Using Accent Green */}
        <section className="bg-accent text-white py-28 md:py-36 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="text-center mb-20">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/70 mb-4 block">Features</span>
              <h2 className="text-4xl md:text-5xl font-serif mb-6">Everything you need to scale</h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                Stop letting valuable opportunities slip through the cracks. Our platform provides the essential tools to grow your business.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="h-6 w-6 text-accent" />,
                  title: 'Lightning Fast',
                  description: 'Built on modern web technologies to ensure your team works at the speed of thought.'
                },
                {
                  icon: <Shield className="h-6 w-6 text-accent" />,
                  title: 'Bank-grade Security',
                  description: 'Your data is encrypted at rest and in transit. We take your security seriously.'
                },
                {
                  icon: <BarChart3 className="h-6 w-6 text-accent" />,
                  title: 'Actionable Insights',
                  description: 'Get real-time metrics on your pipeline and make data-driven decisions.'
                }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: easeOut }}
                  className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-colors"
                >
                  <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-6 shadow-sm">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section id="contact" className="py-28 md:py-36 relative">
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-start">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: easeOut }}
              >
                <SectionBadge className="mb-6">Get Started</SectionBadge>
                <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6">Ready to transform your workflow?</h2>
                <p className="text-lg text-muted-foreground mb-12 max-w-lg">
                  Fill out the form to get started. Our team will review your requirements and get back to you within 24 hours.
                </p>
                
                <div className="space-y-10 relative hidden md:block">
                  <div className="absolute left-6 top-10 bottom-10 w-px bg-border" />
                  
                  {[
                    { step: '01', title: 'Submit your inquiry', desc: 'Tell us about your project and requirements.' },
                    { step: '02', title: 'We review and respond', desc: 'Our team analyzes your needs and prepares a proposal.' },
                    { step: '03', title: 'Project kicks off', desc: 'We start building your vision into reality.' }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 relative z-10">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-background border-2 border-accent text-accent flex items-center justify-center font-mono font-bold shadow-sm">
                        {item.step}
                      </div>
                      <div className="pt-2">
                        <h4 className="text-lg font-bold text-foreground mb-1">{item.title}</h4>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
                className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-border"
              >
                <h3 className="text-2xl font-serif mb-8 text-foreground">Contact Us</h3>
                <LeadForm />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
