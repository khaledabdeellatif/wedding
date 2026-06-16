import { useState, useEffect, useRef, useCallback } from 'react';

interface EnvelopeOpeningProps {
  onOpen?: () => void;
}

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const OPEN_MS = 1500;
const EXIT_START_MS = 1000;
const SITE_REVEAL_MS = 1800;

export default function EnvelopeOpening({ onOpen }: EnvelopeOpeningProps) {
  const [isEntered, setIsEntered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isSealPressed, setIsSealPressed] = useState(false);
  const hasOpenedRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const onOpenRef = useRef(onOpen);

  useEffect(() => {
    onOpenRef.current = onOpen;
  }, [onOpen]);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const schedule = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
  };

  const openEnvelope = useCallback(() => {
    if (hasOpenedRef.current) return;
    hasOpenedRef.current = true;
    clearTimers();
    setIsSealPressed(true);
    setIsOpen(true);

    schedule(() => setIsExiting(true), EXIT_START_MS);
    schedule(() => onOpenRef.current?.(), SITE_REVEAL_MS);
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsEntered(true));
    schedule(() => openEnvelope(), 2400);

    return () => {
      cancelAnimationFrame(raf);
      clearTimers();
    };
  }, []);

  const handleSealClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOpen) openEnvelope();
  };

  return (
    <>
      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&display=swap');

      .envelope-stage {
        --paper: #dec6cd;
        --paper-light: #ead8dc;
        --paper-deep: #d4b4bc;
        --paper-fold: #c9a8b2;
        --paper-glow: rgba(234, 216, 220, 0.95);
        --paper-glow-soft: rgba(222, 198, 205, 0.7);
        --paper-shadow: rgba(160, 110, 120, 0.12);
        --gold: #dec6cd;
        --gold-light: #ead8dc;
        --gold-soft: rgba(222, 198, 205, 0.25);
        --burgundy: #6b1e2e;
        --burgundy-deep: #4a1018;
        --ease: ${EASE};

        position: fixed;
        inset: 0;
        z-index: 9999;
        overflow: hidden;
        background: var(--paper);
        transition: opacity 0.7s var(--ease), transform 0.7s var(--ease);
      }

      .envelope-stage.is-exiting {
        opacity: 0;
        transform: scale(1.03);
        pointer-events: none;
      }

      .envelope-scene {
        position: relative;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
      }

      .envelope-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        opacity: 0;
        transform: scale(0.94);
        transition: opacity 1.5s var(--ease), transform 1.5s var(--ease);
        overflow: hidden;
      }

      .envelope-wrapper.is-entered {
        opacity: 1;
        transform: scale(1);
      }

      .envelope-wrapper.is-opening {
        transform: scale(1) translateY(-1.5vh);
        transition: transform 1.4s var(--ease);
      }

      .envelope {
        position: relative;
        width: 100%;
        height: 100%;
        perspective: 1800px;
        overflow: hidden;
      }

      /* ── Corps & texture papier ── */
      .env-body {
        position: absolute;
        inset: 0;
        overflow: hidden;
        background: linear-gradient(
          158deg,
          var(--paper-light) 0%,
          var(--paper) 38%,
          var(--paper-deep) 72%,
          var(--paper) 100%
        );
        box-shadow:
          inset 0 -30px 60px rgba(160, 110, 120, 0.08),
          inset 0 30px 80px rgba(234, 216, 220, 0.45);
      }

      .paper-texture {
        position: absolute;
        inset: 0;
        opacity: 0.55;
        pointer-events: none;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
        background-size: 180px 180px;
        mix-blend-mode: multiply;
      }

      .paper-grain {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(201, 168, 178, 0.02) 3px,
            rgba(201, 168, 178, 0.02) 4px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 3px,
            rgba(160, 110, 120, 0.015) 3px,
            rgba(160, 110, 120, 0.015) 4px
          );
      }

      .env-vignette {
        position: absolute;
        inset: 0;
        pointer-events: none;
        box-shadow:
          inset 0 0 100px rgba(160, 110, 120, 0.09),
          inset 0 0 200px rgba(107, 30, 46, 0.05);
        z-index: 6;
      }

      /* ── Plis 3D ── */
      .env-fold {
        position: absolute;
        pointer-events: none;
      }

      .env-fold.left {
        bottom: 0;
        left: 0;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 0 49vh 50.5vw;
        border-color: transparent transparent rgba(212, 180, 188, 0.6) transparent;
        filter: drop-shadow(2px 4px 8px rgba(120, 80, 90, 0.14));
        z-index: 2;
      }

      .env-fold.right {
        bottom: 0;
        right: 0;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 49vh 0 0 50.5vw;
        border-color: transparent transparent transparent rgba(201, 168, 178, 0.5);
        filter: drop-shadow(-2px 4px 8px rgba(120, 80, 90, 0.12));
        z-index: 2;
      }

      .env-fold.left::after,
      .env-fold.right::after {
        content: '';
        position: absolute;
        bottom: 0;
        width: 50vw;
        height: 49vh;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.04) 0%, transparent 40%);
        pointer-events: none;
      }

      .env-crease-center {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 1px;
        height: 49vh;
        background: linear-gradient(to top, rgba(100, 60, 70, 0.05), transparent 80%);
        z-index: 3;
        pointer-events: none;
      }

      /* ── Lumière intérieure ── */
      .inner-light {
        position: absolute;
        left: 6%;
        right: 6%;
        top: 10%;
        bottom: 6%;
        border-radius: 2px;
        background: radial-gradient(
          ellipse at 50% 25%,
          var(--paper-glow) 0%,
          var(--paper-glow-soft) 40%,
          rgba(212, 180, 188, 0.25) 70%,
          transparent 100%
        );
        opacity: 0;
        transform: translateY(6vh) scale(0.95);
        transition: opacity 1.2s var(--ease) 0.4s, transform 1.4s var(--ease) 0.4s;
        z-index: 4;
        box-shadow: 0 0 60px rgba(222, 198, 205, 0.55);
      }

      .is-opening .inner-light {
        opacity: 1;
        transform: translateY(-1vh) scale(1);
      }

      /* ── Rabat supérieur ── */
      .env-flap {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 57vh;
        transform-origin: top center;
        transform-style: preserve-3d;
        transition: transform ${OPEN_MS}ms var(--ease);
        z-index: 20;
        filter: drop-shadow(0 8px 24px rgba(100, 60, 70, 0.18));
      }

      .is-opening .env-flap {
        transform: perspective(1800px) rotateX(-175deg);
      }

      .flap-face {
        position: absolute;
        inset: 0;
        clip-path: polygon(0 0, 100% 0, 50% 83%);
        overflow: hidden;
        backface-visibility: hidden;
      }

      .flap-paper {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          172deg,
          var(--paper-light) 0%,
          var(--paper) 35%,
          var(--paper-deep) 70%,
          var(--paper-fold) 100%
        );
      }

      .flap-texture {
        position: absolute;
        inset: 0;
        opacity: 0.4;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E");
        background-size: 160px 160px;
        mix-blend-mode: multiply;
        clip-path: polygon(0 0, 100% 0, 50% 83%);
      }

      .flap-crease {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          180deg,
          rgba(238, 220, 225, 0.4) 0%,
          rgba(201, 168, 178, 0.12) 25%,
          rgba(100, 60, 70, 0.05) 55%,
          transparent 75%
        );
        clip-path: polygon(0 0, 100% 0, 50% 83%);
      }

      .flap-edge-shadow {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 45%;
        background: linear-gradient(to bottom, transparent, rgba(100, 60, 70, 0.1));
        clip-path: polygon(0 0, 100% 0, 50% 83%);
      }

      .flap-back {
        position: absolute;
        inset: 0;
        clip-path: polygon(0 0, 100% 0, 50% 83%);
        background: linear-gradient(175deg, var(--paper-fold) 0%, var(--paper-deep) 100%);
        transform: rotateX(180deg);
        backface-visibility: hidden;
      }

      .flap-back-shadow {
        position: absolute;
        inset: 0;
        clip-path: polygon(0 0, 100% 0, 50% 83%);
        background: linear-gradient(180deg, rgba(0,0,0,0.06) 0%, transparent 50%);
        transform: rotateX(180deg);
        backface-visibility: hidden;
      }

      /* ── Sceau de cire ── */
      .seal-container {
        position: absolute;
        top: 35.5vh;
        left: 50%;
        transform: translateX(-50%);
        z-index: 30;
        transition: transform 0.7s var(--ease), opacity 0.5s var(--ease);
      }

      .is-opening .seal-container {
        transform: translateX(-50%) scale(0.6) rotate(30deg);
        opacity: 0;
        transition-delay: 0.08s;
      }

      .seal-open-btn {
        display: block;
        padding: 0;
        margin: 0;
        border: none;
        background: transparent;
        cursor: pointer;
        border-radius: 50%;
        transform: scale(1);
        transition: transform 0.4s var(--ease);
        -webkit-tap-highlight-color: transparent;
        animation: seal-pulse 2.8s var(--ease) infinite;
        filter: drop-shadow(0 10px 20px rgba(60, 10, 15, 0.4));
      }

      .seal-open-btn:hover {
        animation: none;
        transform: scale(1.08);
        filter: drop-shadow(0 14px 28px rgba(60, 10, 15, 0.5));
      }

      .seal-open-btn:active,
      .seal-open-btn.is-pressed {
        animation: none;
        transform: scale(1.14);
      }

      @keyframes seal-pulse {
        0%, 100% {
          transform: scale(1);
          filter: drop-shadow(0 10px 20px rgba(60, 10, 15, 0.4));
        }
        50% {
          transform: scale(1.05);
          filter: drop-shadow(0 14px 26px rgba(60, 10, 15, 0.48));
        }
      }

      .seal {
        position: relative;
        width: clamp(108px, 19vw, 172px);
        height: clamp(108px, 19vw, 172px);
        pointer-events: none;
      }

      .seal-wax {
        position: absolute;
        inset: -2px;
        border-radius: 47% 53% 52% 48% / 48% 52% 47% 53%;
        background:
          radial-gradient(ellipse at 32% 28%, #b83848 0%, transparent 45%),
          radial-gradient(ellipse at 68% 72%, var(--burgundy-deep) 0%, transparent 40%),
          radial-gradient(ellipse at 50% 50%, var(--burgundy) 0%, #5c1520 55%, var(--burgundy-deep) 100%);
        box-shadow:
          inset 0 3px 8px rgba(255, 140, 140, 0.18),
          inset 0 -4px 10px rgba(0, 0, 0, 0.45),
          0 5px 0 rgba(40, 8, 12, 0.65),
          0 8px 0 rgba(30, 5, 8, 0.25);
      }

      .seal-drip {
        position: absolute;
        background: var(--burgundy-deep);
        border-radius: 0 0 50% 50%;
      }

      .seal-drip.d1 {
        bottom: -5px;
        left: 18%;
        width: 13%;
        height: 11px;
        transform: rotate(-8deg);
        box-shadow: 0 3px 0 rgba(30, 5, 8, 0.5);
      }

      .seal-drip.d2 {
        bottom: -4px;
        right: 20%;
        width: 9%;
        height: 7px;
        transform: rotate(6deg);
        background: #5c1520;
      }

      .seal-drip.d3 {
        bottom: -2px;
        left: 42%;
        width: 7%;
        height: 5px;
        opacity: 0.7;
      }

      .seal-rim {
        position: absolute;
        inset: 6px;
        border-radius: 46% 54% 51% 49% / 49% 51% 48% 52%;
        border: 1.5px solid rgba(222, 198, 205, 0.55);
        box-shadow:
          inset 0 2px 4px rgba(234, 216, 220, 0.25),
          inset 0 -1px 3px rgba(0, 0, 0, 0.2);
      }

      .seal-monogram {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Cinzel Decorative', Georgia, serif;
        font-size: clamp(20px, 4.2vw, 34px);
        font-weight: 700;
        color: var(--gold-light);
        letter-spacing: 2px;
        line-height: 1;
        z-index: 2;
        text-shadow:
          0 1px 0 rgba(255, 255, 255, 0.2),
          0 -1px 3px rgba(0, 0, 0, 0.55),
          0 0 14px rgba(222, 198, 205, 0.45);
      }

      .seal-monogram .seal-amp {
        font-size: clamp(13px, 2.8vw, 20px);
        color: var(--gold);
        font-weight: 400;
        margin: 0 1px;
      }

      .seal-shine {
        position: absolute;
        inset: 0;
        border-radius: 47% 53% 52% 48% / 48% 52% 47% 53%;
        background:
          radial-gradient(ellipse at 28% 22%, rgba(234, 216, 220, 0.5) 0%, transparent 42%),
          radial-gradient(ellipse at 75% 80%, rgba(0, 0, 0, 0.08) 0%, transparent 35%);
        pointer-events: none;
        z-index: 3;
      }

      .seal-highlight {
        position: absolute;
        top: 14%;
        left: 22%;
        width: 28%;
        height: 18%;
        border-radius: 50%;
        background: radial-gradient(ellipse, rgba(255, 255, 255, 0.35) 0%, transparent 70%);
        pointer-events: none;
        z-index: 4;
      }

      /* ── Transition sortie ── */
      .exit-bloom {
        position: absolute;
        inset: 0;
        background: radial-gradient(
          ellipse at 50% 38%,
          rgba(242, 228, 232, 1) 0%,
          rgba(222, 198, 205, 0.9) 35%,
          rgba(212, 180, 188, 0.45) 60%,
          transparent 80%
        );
        opacity: 0;
        z-index: 50;
        pointer-events: none;
        transition: opacity 0.8s var(--ease) 0.5s;
      }

      .is-exiting .exit-bloom {
        opacity: 1;
      }

      .env-shimmer {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          108deg,
          transparent 35%,
          rgba(238, 220, 225, 0.1) 48%,
          rgba(234, 216, 220, 0.16) 50%,
          rgba(238, 220, 225, 0.1) 52%,
          transparent 65%
        );
        background-size: 220% 100%;
        animation: shimmer 9s ease-in-out infinite;
        pointer-events: none;
        z-index: 5;
      }

      @keyframes shimmer {
        0% { background-position: -120% 0; }
        45%, 100% { background-position: 220% 0; }
      }

      @media (max-width: 480px) {
        .seal-open-btn {
          animation-duration: 2.2s;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .envelope-wrapper,
        .seal-open-btn,
        .env-shimmer {
          animation: none !important;
        }
        .envelope-wrapper {
          opacity: 1;
          transform: none;
        }
        .envelope-stage.is-exiting {
          transition-duration: 0.25s;
        }
      }
    `}</style>

    <main
      className={`envelope-stage ${isExiting ? 'is-exiting' : ''}`}
      aria-hidden={isExiting}
      aria-label="Invitation de mariage"
    >
      <div className="envelope-scene">
        <div
          className={`envelope-wrapper ${isEntered ? 'is-entered' : ''} ${isOpen ? 'is-opening' : ''}`}
        >
          <div className="envelope">
            <div className="env-body">
              <div className="paper-texture" aria-hidden="true" />
              <div className="paper-grain" aria-hidden="true" />
              <div className="env-fold left" aria-hidden="true" />
              <div className="env-fold right" aria-hidden="true" />
              <div className="env-crease-center" aria-hidden="true" />
              <div className="inner-light" aria-hidden="true" />
              <div className="env-shimmer" aria-hidden="true" />
              <div className="env-vignette" aria-hidden="true" />
            </div>

            <div className="env-flap" aria-hidden="true">
              <div className="flap-face">
                <div className="flap-paper" />
                <div className="flap-texture" />
                <div className="flap-crease" />
                <div className="flap-edge-shadow" />
              </div>
              <div className="flap-back" />
              <div className="flap-back-shadow" />
            </div>

            <div className="seal-container">
              <button
                type="button"
                className={`seal-open-btn ${isSealPressed ? 'is-pressed' : ''}`}
                onClick={handleSealClick}
                disabled={isOpen}
                aria-label="Ouvrir l'invitation de mariage"
              >
                <div className="seal" aria-hidden="true">
                  <div className="seal-wax">
                    <div className="seal-drip d1" />
                    <div className="seal-drip d2" />
                    <div className="seal-drip d3" />
                  </div>
                  <div className="seal-rim" />
                  <div className="seal-monogram">
                    M<span className="seal-amp">&amp;</span>G
                  </div>
                  <div className="seal-shine" />
                  <div className="seal-highlight" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="exit-bloom" aria-hidden="true" />
    </main>
    </>
  );
}
