'use client';

import { useRef, useEffect, useMemo } from 'react';

export default function Globe() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Generate 800 random nodes for the network
  const nodes = useMemo(() => {
    return Array.from({ length: 800 }).map(() => ({
      phi: Math.random() * Math.PI * 2,
      theta: Math.acos((Math.random() * 2) - 1),
      size: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.002 + 0.001
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let rotation = 0;

    const resize = () => {
      const { width, height } = containerRef.current.getBoundingClientRect();
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
    };

    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const radius = Math.min(w, h) * 0.4;
      rotation += 0.003;

      ctx.clearRect(0, 0, w, h);
      ctx.translate(w / 2, h / 2);

      // Draw Atmospheric Glow
      const glow = ctx.createRadialGradient(0, 0, radius * 0.8, 0, 0, radius * 1.05);
      glow.addColorStop(0, 'rgba(30, 54, 117, 0)');
      glow.addColorStop(1, 'rgba(30, 54, 117, 0.08)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, radius * 1.05, 0, Math.PI * 2);
      ctx.fill();

      // Draw Longitudinal lines for 3D depth
      ctx.strokeStyle = 'rgba(197, 144, 72, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.ellipse(0, 0, radius, radius * Math.cos(i * Math.PI / 6), 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw Sparkling Nodes
      nodes.forEach((node) => {
        const phi = node.phi + rotation;
        const theta = node.theta;

        const x = radius * Math.sin(theta) * Math.cos(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(theta);

        // Simple perspective projection and Z-clipping (backside is darker)
        if (z > -radius * 0.2) {
          const perspective = (z + radius) / (2 * radius);
          const opacity = perspective * 0.8 + 0.2;
          
          ctx.fillStyle = `rgba(197, 144, 72, ${opacity})`;
          ctx.beginPath();
          ctx.arc(x, y, node.size * perspective, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw Main Core Hub
      ctx.fillStyle = 'rgba(123, 20, 54, 0.9)';
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(123, 20, 54, 0.5)';
      ctx.beginPath();
      ctx.arc(0, 0, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0; // Reset

      ctx.setTransform(1, 0, 0, 1, 0, 0); // Restore
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [nodes]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, right: 0, zIndex: 1 }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      <div style={{ position: 'absolute', bottom: '2rem', right: '1rem', width: '220px', pointerEvents: 'none' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'rgba(30, 54, 117, 0.3)', textTransform: 'uppercase', letterSpacing: '2.5px', textAlign: 'right', margin: 0 }}>
           Legacy Nodes <br /> 
           <span style={{ color: 'var(--primary-color)', opacity: 0.8 }}>Live Alumni Connection</span>
        </p>
      </div>
    </div>
  );
}
