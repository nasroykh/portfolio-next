import { useState, useEffect } from 'react';

function getWindowDimensions() {
  if (typeof window !== "undefined" && window) {
    const { 
      innerWidth: width, 
      innerHeight: height 
    } = window;
    
    return {
      screenWidth: width,
      screenHeight: height 
    };
  } else {
    return {
      screenWidth: 0,
      screenHeight: 0
    }
  }

}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}