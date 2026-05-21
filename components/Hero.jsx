'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const Globe = dynamic(() => import('./Globe'), { ssr: false });

const words = ["Generations", "Batches", "Departments", "Legacies"];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="home" className="hero-section" style={{ position: 'relative', overflow: 'hidden', paddingTop: '80px', paddingBottom: '40px' }}>
      
      {/* Dramatic Animated Background Blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.4, 1],
          x: [0, 80, 0],
          y: [0, -50, 0],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{ position: 'absolute', top: '-15%', right: '0%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(123,20,54,0.12) 0%, transparent 75%)', filter: 'blur(100px)', zIndex: 0 }}
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          x: [0, -100, 0],
          y: [0, 60, 0],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(197,144,72,0.1) 0%, transparent 75%)', filter: 'blur(120px)', zIndex: 0 }}
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="wrapper hero-grid" 
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div className="hero-content">

          
          <motion.h1 variants={itemVariants} className="hero-title">
            Connecting <span className="highlight">SMVITM</span> <br /> 
            Across <span className="rotating-word-container">
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[index]}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                  style={{ display: 'inline-block' }}
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="hero-subtitle">
            Foster lifelong connections and drive institutional excellence. Join a network where tradition meets tomorrow's innovation.
          </motion.p>
          
          <motion.div variants={itemVariants} className="hero-buttons">
            <Link href="/signup" className="btn-secondary large">Join Alumni Network</Link>
            <Link href="/community" className="btn-outline large">Explore Community <ArrowRight size={18} style={{ marginLeft: '8px' }} /></Link>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
          className="hero-visual"
        >
          <div className="image-composite">
            <div className="main-img-wrapper" style={{ position: 'relative', width: '100%', height: '100%', zIndex: 2 }}>
              <img src="/image.png" className="hero-img main-img" alt="Graduation" style={{ width: '100%', height: '100%', borderRadius: '40px', boxShadow: '0 40px 100px rgba(0,0,0,0.15)', objectFit: 'cover' }} />
            </div>

            <div className="network-dots" style={{ opacity: 0.5 }}></div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
