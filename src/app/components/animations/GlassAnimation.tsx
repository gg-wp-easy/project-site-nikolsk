import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export function GlassAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const canvasEl: HTMLCanvasElement = canvas;

    const nav = navigator as Navigator & { deviceMemory?: number };
    const isLowPerfDevice = (navigator.hardwareConcurrency || 8) <= 4 || (nav.deviceMemory || 8) <= 4;
    const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shouldReduceEffects = shouldReduceMotion || isLowPerfDevice;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let rafId = 0;
    let lastFrameTime = 0;
    const frameIntervalMs = shouldReduceEffects ? 1000 / 20 : 1000 / 30;

    // Устанавливаем размер canvas
    const resizeCanvas = () => {
      canvasEl.width = Math.floor(window.innerWidth * dpr);
      canvasEl.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Класс для частицы стекла
    class GlassParticle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      angle: number;
      rotationSpeed: number;

      constructor() {
        this.x = Math.random() * canvasEl.width;
        this.y = Math.random() * canvasEl.height;
        this.size = Math.random() * 4 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.angle = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.rotationSpeed;

        // Циклическое появление частиц
        if (this.x < 0) this.x = canvasEl.width;
        if (this.x > canvasEl.width) this.x = 0;
        if (this.y < 0) this.y = canvasEl.height;
        if (this.y > canvasEl.height) this.y = 0;

        // Мерцание
        this.opacity += (Math.random() - 0.5) * 0.02;
        if (this.opacity < 0.1) this.opacity = 0.1;
        if (this.opacity > 0.8) this.opacity = 0.8;
      }

      draw() {
        if (!ctx) return;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // Рисуем частицу в форме кристалла/стекла
        ctx.beginPath();

        // Основная форма
        ctx.moveTo(0, -this.size * 2);
        ctx.lineTo(this.size * 1.5, 0);
        ctx.lineTo(0, this.size * 2);
        ctx.lineTo(-this.size * 1.5, 0);
        ctx.closePath();

        // Градиент для эффекта стекла
        const gradient = ctx.createLinearGradient(
          -this.size,
          -this.size,
          this.size,
          this.size,
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        gradient.addColorStop(0.5, `rgba(200, 230, 255, ${this.opacity * 0.8})`);
        gradient.addColorStop(1, `rgba(150, 200, 255, ${this.opacity * 0.6})`);

        ctx.fillStyle = gradient;
        ctx.shadowColor = 'rgba(100, 200, 255, 0.32)';
        ctx.shadowBlur = 4;
        ctx.fill();

        // Добавляем блики
        ctx.beginPath();
        ctx.arc(-this.size * 0.3, -this.size * 0.3, this.size * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.5})`;
        ctx.fill();

        ctx.restore();
      }
    }

    // Создаем частицы
    const particles: GlassParticle[] = [];
    const particleCount = shouldReduceEffects ? 24 : window.innerWidth < 768 ? 36 : 52;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new GlassParticle());
    }

    // Класс для "потоков" расплавленного стекла
    class GlassStream {
      points: { x: number; y: number }[];
      progress: number;
      speed: number;

      constructor() {
        this.points = [];
        this.progress = 0;
        this.speed = 0.002;

        // Создаем путь потока
        const startY = Math.random() * canvasEl.height;
        for (let i = 0; i < 5; i++) {
          this.points.push({
            x: (canvasEl.width / 4) * i,
            y: startY + Math.sin(i) * 100,
          });
        }
      }

      update() {
        this.progress += this.speed;
        if (this.progress > 1) this.progress = 0;
      }

      draw() {
        if (!ctx) return;

        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);

        for (let i = 1; i < this.points.length; i++) {
          const xc = (this.points[i].x + this.points[i - 1].x) / 2;
          const yc = (this.points[i].y + this.points[i - 1].y) / 2;
          ctx.quadraticCurveTo(this.points[i - 1].x, this.points[i - 1].y, xc, yc);
        }

        // Создаем градиент для потока
        const gradient = ctx.createLinearGradient(
          this.points[0].x,
          this.points[0].y,
          this.points[this.points.length - 1].x,
          this.points[this.points.length - 1].y,
        );
        gradient.addColorStop(0, 'rgba(255, 140, 0, 0.15)');
        gradient.addColorStop(0.5, 'rgba(255, 200, 100, 0.25)');
        gradient.addColorStop(1, 'rgba(255, 140, 0, 0.15)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Рисуем "капли" вдоль потока
        const pointIndex = Math.floor(this.progress * (this.points.length - 1));
        if (pointIndex < this.points.length - 1) {
          const t = this.progress * (this.points.length - 1) - pointIndex;
          const x = this.points[pointIndex].x + (this.points[pointIndex + 1].x - this.points[pointIndex].x) * t;
          const y = this.points[pointIndex].y + (this.points[pointIndex + 1].y - this.points[pointIndex].y) * t;

          ctx.beginPath();
          ctx.arc(x, y, 8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 180, 100, 0.3)';
          ctx.shadowColor = 'rgba(255, 150, 50, 0.35)';
          ctx.shadowBlur = 8;
          ctx.fill();
        }
      }
    }

    const streams: GlassStream[] = [];
    const streamCount = shouldReduceEffects ? 1 : 2;
    for (let i = 0; i < streamCount; i++) {
      streams.push(new GlassStream());
    }

    // Анимация
    const animate = (time: number) => {
      if (document.hidden) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      if (time - lastFrameTime < frameIntervalMs) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = time;

      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

      // Фоновый градиент
      const gradient = ctx.createLinearGradient(0, 0, canvasEl.width, canvasEl.height);
      gradient.addColorStop(0, '#0a1a2f');
      gradient.addColorStop(0.5, '#1a3a4f');
      gradient.addColorStop(1, '#0a2a3f');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

      // Рисуем потоки стекла
      streams.forEach((stream) => {
        stream.update();
        stream.draw();
      });

      // Рисуем частицы
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Добавляем эффект свечения
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(100, 200, 255, 0.3)';

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
}
