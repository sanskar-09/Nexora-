import * as React from 'react';

// Animation utility functions for enhancing UI interactions

export type AnimationOptions = {
  duration?: number;
  delay?: number;
  easing?: string;
};

// Fade in animation for elements
export const fadeIn = (element: HTMLElement, options: AnimationOptions = {}) => {
  const { duration = 300, delay = 0, easing = 'ease-in-out' } = options;
  
  element.style.opacity = '0';
  element.style.transition = `opacity ${duration}ms ${easing} ${delay}ms`;
  
  // Force a reflow to ensure the initial state is applied
  void element.offsetWidth;
  
  element.style.opacity = '1';
  
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), duration + delay);
  });
};

// Fade out animation for elements
export const fadeOut = (element: HTMLElement, options: AnimationOptions = {}) => {
  const { duration = 300, delay = 0, easing = 'ease-in-out' } = options;
  
  element.style.opacity = '1';
  element.style.transition = `opacity ${duration}ms ${easing} ${delay}ms`;
  
  // Force a reflow to ensure the initial state is applied
  void element.offsetWidth;
  
  element.style.opacity = '0';
  
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), duration + delay);
  });
};

// Slide in animation for elements
export const slideIn = (element: HTMLElement, direction: 'left' | 'right' | 'top' | 'bottom', options: AnimationOptions = {}) => {
  const { duration = 300, delay = 0, easing = 'ease-in-out' } = options;
  
  let transform = '';
  switch (direction) {
    case 'left':
      transform = 'translateX(-20px)';
      break;
    case 'right':
      transform = 'translateX(20px)';
      break;
    case 'top':
      transform = 'translateY(-20px)';
      break;
    case 'bottom':
      transform = 'translateY(20px)';
      break;
  }
  
  element.style.opacity = '0';
  element.style.transform = transform;
  element.style.transition = `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`;
  
  // Force a reflow to ensure the initial state is applied
  void element.offsetWidth;
  
  element.style.opacity = '1';
  element.style.transform = 'translate(0, 0)';
  
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), duration + delay);
  });
};

// Pulse animation for elements (useful for notifications or highlights)
export const pulse = (element: HTMLElement, options: AnimationOptions = {}) => {
  const { duration = 600, delay = 0, easing = 'ease-in-out' } = options;
  
  element.style.transform = 'scale(1)';
  element.style.transition = `transform ${duration/2}ms ${easing} ${delay}ms`;
  
  // Force a reflow to ensure the initial state is applied
  void element.offsetWidth;
  
  element.style.transform = 'scale(1.05)';
  
  setTimeout(() => {
    element.style.transform = 'scale(1)';
  }, duration/2);
  
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), duration + delay);
  });
};

// React hook for animation classes
export const useAnimationClass = (initialClass: string = '') => {
  const [animationClass, setAnimationClass] = React.useState(initialClass);
  
  const animate = (newClass: string, duration: number = 1000) => {
    setAnimationClass(newClass);
    
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setAnimationClass('');
        resolve();
      }, duration);
    });
  };
  
  return { animationClass, animate };
};