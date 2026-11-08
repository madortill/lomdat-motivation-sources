import { useEffect, useState } from "react";

function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const savedValue = localStorage.getItem(key);

      if (savedValue !== null) {
        return JSON.parse(savedValue);
      }
    } catch (error) {
      console.warn(`Failed to load ${key}:`, error);
    }

    return typeof initialValue === "function"
      ? initialValue()
      : initialValue;
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Failed to save ${key}:`, error);
    }
  }, [key, value]);

  return [value, setValue];
}

export default usePersistentState;