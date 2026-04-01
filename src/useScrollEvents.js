import { create } from 'zustand'

const PULSE_MAP = {
  hero:       { intensity: 0.0, color: [0.22, 0.13, 0.04], origin: [0.5, 0.5] },
  difference: { intensity: 0.6, color: [0.20, 0.15, 0.05], origin: [0.3, 0.5] },
  notUs:      { intensity: 1.0, color: [0.50, 0.32, 0.08], origin: [0.5, 0.5] },
  process:    { intensity: 0.5, color: [0.15, 0.10, 0.04], origin: [0.2, 0.4] },
  pricing:    { intensity: 0.7, color: [0.35, 0.22, 0.06], origin: [0.5, 0.3] },
  cta:        { intensity: 0.8, color: [0.45, 0.28, 0.07], origin: [0.5, 0.5] },
  techstack:  { intensity: 0.3, color: [0.18, 0.11, 0.04], origin: [0.6, 0.4] },
  contact:    { intensity: 0.3, color: [0.10, 0.07, 0.03], origin: [0.5, 0.7] },
}

export const useScrollStore = create((set, get) => ({
  scrollProgress: 0,
  activeSection:  'hero',
  mouseX: 0.5,
  mouseY: 0.5,

  // pulseEvent is overwritten (not cleared) — consumers track via id
  // id is a monotonically-increasing integer so identity check works
  pulseEvent: null,   // { id, intensity, color:[r,g,b], origin:[x,y] }

  setScroll: (v)    => set({ scrollProgress: v }),
  setMouse:  (x, y) => set({ mouseX: x, mouseY: y }),

  setActiveSection: (section) => {
    if (get().activeSection === section) return
    const pulse = PULSE_MAP[section]
    set({
      activeSection: section,
      pulseEvent: pulse
        ? { id: Date.now(), intensity: pulse.intensity, color: pulse.color, origin: pulse.origin }
        : null,
    })
  },
}))
