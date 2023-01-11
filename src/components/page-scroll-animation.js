import React, { useState, useLayoutEffect, useRef } from "react";

import ScrollAnimation from "../classes/scroll-animation";
import ScrollAnimationContext from "../context/scroll-animation-context";

/**
 * This component wraps all the components that need to be animated and defines
 * all the phases of the scroll animation.
 */
function PageScrollAnimation({ children, phases }) {
  const scrollAnimation = useState(() => new ScrollAnimation(phases))[0];
  const scrollReference = useRef();

  useLayoutEffect(() => {
    scrollAnimation.start(scrollReference.current);
    return () => scrollAnimation.end();
  }, [scrollAnimation]);

  return (
    <div ref={scrollReference} style={{ height: scrollAnimation.getHeight() }}>
      <ScrollAnimationContext.Provider value={scrollAnimation}>
        {children}
      </ScrollAnimationContext.Provider>
    </div>
  );
}

export default PageScrollAnimation;
