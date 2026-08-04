"use client";

import { useEffect, useRef, useState } from "react";

export function useLocalStorage<T>(key: string, fallback: T) {
  const fallbackRef = useRef(fallback);
  const [value, setValue] = useState<T>(fallback);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    fallbackRef.current = fallback;
  }, [fallback]);

  useEffect(() => {
    try {
      const rawValue = window.localStorage.getItem(key);
      if (rawValue) {
        setValue(JSON.parse(rawValue) as T);
      }
    } catch {
      setValue(fallbackRef.current);
    } finally {
      setHydrated(true);
    }
  }, [key]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(key, JSON.stringify(value));
  }, [hydrated, key, value]);

  return { value, setValue, hydrated };
}
