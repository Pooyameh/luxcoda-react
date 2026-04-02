import { useEffect } from 'react';
import { useScrollProgress } from './hooks/useScrollProgress';
import Scene3D from './components/Scene3D';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Showcase from './components/Showcase';
import BeforeAfter from './components/BeforeAfter';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const setScroll = useScrollProgress((s) => s.setScroll);

  useEffect(() => {
    let lastY = 0;
    const handler = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? y / max : 0;
      const dir = y > lastY ? 'down' : 'up';
      lastY = y;
      setScroll(y, progress, dir);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [setScroll]);

  return (
    <>
      {/* Fixed 3D atmospheric canvas */}
      <Scene3D />

      {/* Scrollable content sits above the canvas */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Hero />
        <Showcase />
        <BeforeAfter />
        <Services />
        <Portfolio />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
