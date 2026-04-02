import { create } from 'zustand';

export const useScrollProgress = create((set) => ({
  scrollY: 0,
  scrollProgress: 0,
  direction: 'down',
  setScroll: (y, progress, dir) => set({ scrollY: y, scrollProgress: progress, direction: dir }),
}));
