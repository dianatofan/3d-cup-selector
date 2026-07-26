import { useEffect, useRef, useState } from 'react';
import { breakpoint } from '../theme.js';

// Detects value changes and returns { old, scratchAnim, writeAnim } so the
// receipt can scratch out the previous value and type the new one in place.
export function useScratch(value) {
  const prev = useRef(value);
  const [state, setState] = useState({ old: '', n: 0 });
  useEffect(() => {
    if (prev.current !== value) {
      setState((s) => ({ old: prev.current, n: s.n + 1 }));
      prev.current = value;
    }
  }, [value]);
  const ab = state.n % 2 ? 'A' : 'B';
  return {
    old: state.old,
    scratchAnim: state.n ? `lp-scratch${ab} 1.3s ease-in` : 'none',
    writeAnim: state.n ? `lp-write${ab} .6s .7s steps(8, end) both` : 'none',
  };
}

export function useIsMobile(width = breakpoint.mobile) {
  const [mobile, setMobile] = useState(() => window.innerWidth < width);
  useEffect(() => {
    const onR = () => setMobile(window.innerWidth < width);
    window.addEventListener('resize', onR);
    return () => window.removeEventListener('resize', onR);
  }, [width]);
  return mobile;
}
