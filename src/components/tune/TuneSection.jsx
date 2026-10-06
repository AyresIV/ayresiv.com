import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { STEPS } from './tuneSteps';
import './tune.css';

// Which caption to show for a given scroll progress
function stepFor(p) {
  if (p < 0.1) return 'intro';
  if (p < STEPS[0].at[0]) return 'open';
  const i = STEPS.findIndex((s) => p >= s.at[0] && p < s.at[1]);
  return i === -1 ? 'outro' : i;
}

const TuneSection = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const progressRef = useRef(null);
  const [step, setStep] = useState('intro');

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    let scene = null;
    let visible = false;
    let cancelled = false;

    const progress = () => {
      const r = section.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      return total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
    };

    const onScroll = () => {
      const p = progress();
      scene?.setProgress(p);
      progressRef.current?.style.setProperty('--p', p);
      setStep((prev) => {
        const next = stepFor(p);
        return prev === next ? prev : next;
      });
    };

    const onResize = () => scene?.resize();

    // Only download three.js once the visitor is getting close to the section
    const loader = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || scene) return;
        loader.disconnect();
        import('./tuneScene').then(({ createTuneScene }) => {
          if (cancelled) return;
          scene = createTuneScene(canvas);
          scene.setProgress(progress());
          if (visible) scene.start();
        });
      },
      { rootMargin: '800px 0px' }
    );
    loader.observe(section);

    // Only animate while the section is on screen
    const runner = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!scene) return;
      if (visible) scene.start();
      else scene.stop();
    });
    runner.observe(section);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    onScroll();

    return () => {
      cancelled = true;
      loader.disconnect();
      runner.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      scene?.dispose();
    };
  }, []);

  const current = typeof step === 'number' ? STEPS[step] : null;

  return (
    <section className="tune" id="what-i-tune" ref={sectionRef} aria-label="What I tune">
      <div className="tune__sticky">
        <canvas className="tune__canvas" ref={canvasRef} aria-hidden="true" />

        <div className="tune__panel">
          <p className="tune__eyebrow">What I tune</p>

          {step === 'intro' && (
            <div className="tune__card" key="intro">
              <h2 className="tune__title">Every part of your PC, dialed in.</h2>
              <p className="tune__text">Scroll to take it apart and see what each optimization actually touches.</p>
              <div className="tune__hint" aria-hidden="true">
                <span className="tune__hint-mouse"><span className="tune__hint-wheel" /></span>
                <span>Scroll to explore</span>
                <ChevronDown size={16} className="tune__hint-chevron" />
              </div>
            </div>
          )}

          {step === 'open' && (
            <div className="tune__card" key="open">
              <h2 className="tune__title">Let&apos;s look inside.</h2>
              <p className="tune__text">Stock settings leave performance on the table in almost every component.</p>
            </div>
          )}

          {current && (
            <div className="tune__card" key={current.part}>
              <span className="tune__step">{String(step + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}</span>
              <h2 className="tune__title">{current.title}</h2>
              <p className="tune__service">
                {current.service} <span className="tune__price">{current.price}</span>
              </p>
              <p className="tune__text">{current.text}</p>
            </div>
          )}

          {step === 'outro' && (
            <div className="tune__card" key="outro">
              <h2 className="tune__title">Or get all of it at once.</h2>
              <p className="tune__text">The Supreme Package covers every component above, with intensive testing.</p>
              <Link to="/optimizations" className="cta-button primary tune__cta">See Packages</Link>
            </div>
          )}

          <div className="tune__progress" ref={progressRef} aria-hidden="true">
            <span className="tune__progress-bar" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TuneSection;
