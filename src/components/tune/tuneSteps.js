// Scroll timeline for the "What I tune" section. `at` is the [start, end]
// slice of the section's scroll progress (0..1) where that part is in focus.
// Kept free of three.js so the page can read it without loading the 3D bundle.
export const STEPS = [
  {
    part: 'cpu',
    at: [0.22, 0.36],
    title: 'CPU',
    service: 'Overclocking / Undervolting',
    text: 'Push clocks higher, or run cooler and quieter at the same speed. Stress-tested for stability.',
    price: 'from $30',
  },
  {
    part: 'ram',
    at: [0.36, 0.5],
    title: 'Memory',
    service: 'RAM Tuning',
    text: 'Frequency and timing tuning to cut stutter and lift 1% lows, the frames you actually feel.',
    price: 'from $40',
  },
  {
    part: 'gpu',
    at: [0.5, 0.64],
    title: 'Graphics Card',
    service: 'GPU Overclocking',
    text: 'Core and memory clocks tuned to your exact card for free extra FPS, with stability testing.',
    price: '$20',
  },
  {
    part: 'board',
    at: [0.64, 0.78],
    title: 'Motherboard',
    service: 'BIOS Tuning',
    text: 'Power, memory and platform settings dialed in, the foundation every other tweak builds on.',
    price: '$40',
  },
  {
    part: 'ssd',
    at: [0.78, 0.9],
    title: 'Windows',
    service: 'Debloat & Optimization',
    text: 'Bloat, telemetry and background junk removed; Windows and your games tuned for low latency.',
    price: 'from $25',
  },
];
