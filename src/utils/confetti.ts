import confetti from 'canvas-confetti';

// Cheerful heart & star confetti trigger
export function triggerHeartConfetti() {
  const count = 40;
  const defaults = {
    origin: { y: 0.7 },
    disableForReducedMotion: true,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
      colors: ['#FF758F', '#FFB3C6', '#C8B6FF', '#735DA5', '#FFE5EC', '#FFD166'],
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.4,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

// Gentle pastel celebration for smaller wins
export function triggerPastelCelebration() {
  confetti({
    particleCount: 30,
    spread: 50,
    origin: { y: 0.8 },
    colors: ['#D8BBFF', '#FFC2D1', '#B8E0D2', '#FFF3B0'],
    scalar: 0.9,
  });
}
