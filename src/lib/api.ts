import { useState, useEffect } from 'react';
import { Perfume } from '../types';
import { INITIAL_PERFUMES, DEFAULT_ACCORD_COLORS } from './data';

export function usePerfumes() {
  const [perfumes, setPerfumesState] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('yeab_perfumes');
    if (saved) {
      try {
        setPerfumesState(JSON.parse(saved));
      } catch (e) {
        setPerfumesState(INITIAL_PERFUMES);
      }
    } else {
      setPerfumesState(INITIAL_PERFUMES);
      localStorage.setItem('yeab_perfumes', JSON.stringify(INITIAL_PERFUMES));
    }
    setLoading(false);
  }, []);

  const setPerfumes = (update: Perfume[] | ((prev: Perfume[]) => Perfume[])) => {
    setPerfumesState((prev) => {
      const next = typeof update === 'function' ? update(prev) : update;
      localStorage.setItem('yeab_perfumes', JSON.stringify(next));
      return next;
    });
  };

  return { perfumes, loading, setPerfumes };
}

export function useAccordColors() {
  const [colors, setColorsState] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = localStorage.getItem('yeab_colors');
    if (saved) {
      try {
        setColorsState(JSON.parse(saved));
      } catch (e) {
        setColorsState(DEFAULT_ACCORD_COLORS);
      }
    } else {
      setColorsState(DEFAULT_ACCORD_COLORS);
      localStorage.setItem('yeab_colors', JSON.stringify(DEFAULT_ACCORD_COLORS));
    }
  }, []);

  const setColors = (update: Record<string, string> | ((prev: Record<string, string>) => Record<string, string>)) => {
    setColorsState((prev) => {
      const next = typeof update === 'function' ? update(prev) : update;
      localStorage.setItem('yeab_colors', JSON.stringify(next));
      return next;
    });
  };

  return { colors, setColors };
}

export function useLogo() {
  const [logo, setLogoState] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('yeab_logo');
    setLogoState(saved || null);
  }, []);

  const setLogo = (newLogo: string | null) => {
    setLogoState(newLogo);
    if (newLogo) {
      localStorage.setItem('yeab_logo', newLogo);
    } else {
      localStorage.removeItem('yeab_logo');
    }
  };

  return { logo, setLogo };
}
