
import { useState, useEffect, useRef, RefObject } from 'react';

interface ObserverOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useAnimateOnScroll = <T extends HTMLElement>(options?: ObserverOptions): [RefObject<T>, boolean] => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // We only want to animate once
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: options?.threshold || 0.1,
        rootMargin: options?.rootMargin || '0px',
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options?.threshold, options?.rootMargin]);

  return [elementRef, isVisible];
};
