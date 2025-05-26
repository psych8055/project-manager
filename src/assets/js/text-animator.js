import { TextSplitter } from './textSplitter.js';
import { gsap } from 'gsap';

const lettersAndSymbols = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*-_=+;:<>,'.split('');

export function createTextAnimator(textElement) {
  if (!textElement || !(textElement instanceof HTMLElement)) {
    throw new Error('Invalid text element provided.');
  }

  const splitter = new TextSplitter(textElement, {
    splitTypeTypes: 'words, chars'
  });

  const originalChars = splitter.getChars().map(char => char.innerHTML);
  let currentAnimation = null;

  function animate() {
    // Kill any existing animation
    if (currentAnimation) {
      currentAnimation.kill();
    }

    const chars = splitter.getChars();
    
    // Create a timeline for better control
    const tl = gsap.timeline();
    
    // Add character animations to timeline
    chars.forEach((char, position) => {
      const initialHTML = char.innerHTML;
      
      tl.fromTo(char, 
        { opacity: 0 },
        {
          duration: 0.03,
          opacity: 1,
          onStart: () => {
            char.innerHTML = lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
          },
          onComplete: () => {
            char.innerHTML = initialHTML;
          },
          repeat: 2,
          repeatRefresh: true,
          repeatDelay: 0.05,
          delay: position * 0.04,
        }, 0
      );
    });

    // Add background animation
    tl.to(textElement, {
      '--anim': 1,
      duration: 0.3,
      ease: 'power2.out'
    }, 0);

    currentAnimation = tl;
  }

  function animateBack() {
    if (currentAnimation) {
      currentAnimation.kill();
    }

    const chars = splitter.getChars();
    
    // Create a new timeline for reset
    const tl = gsap.timeline();
    
    // Reset characters
    chars.forEach((char, index) => {
      char.innerHTML = originalChars[index];
      gsap.set(char, { opacity: 1 });
    });

    // Reset background
    tl.to(textElement, {
      '--anim': 0,
      duration: 0.2,
      ease: 'power1.out',
      clearProps: 'all'
    });

    currentAnimation = tl;
  }

  return {
    animate,
    animateBack
  };
}