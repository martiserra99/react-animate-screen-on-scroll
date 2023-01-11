import { useContext, useLayoutEffect } from "react";

import ComponentScrollCallbacksPhases from "../classes/component-scroll-callbacks-phases";

import ScrollAnimationContext from "../context/scroll-animation-context";

/**
 * This component wraps all the content of the component that needs to be animated
 * and defines its animation in all the diferent phases.
 */
function ComponentScrollAnimation({
  content,
  phases: animationPhases,
  callbacks: addCallbacks,
}) {
  const scrollAnimation = useContext(ScrollAnimationContext);

  useLayoutEffect(() => {
    const callbacksPhases = setupCallbacksPhases(addCallbacks);
    scrollAnimation.add(animationPhases, callbacksPhases);
    return () => scrollAnimation.remove(animationPhases, callbacksPhases);
  }, [scrollAnimation, animationPhases, addCallbacks]);

  function elems(...tags) {
    return (elem) => {
      for (const [, animation] of animationPhases)
        for (const elementsAnimation of animation.elementsAnimations)
          if (tags.includes(elementsAnimation.tag))
            elementsAnimation.elements.push(elem);
    };
  }

  return content(elems);
}

function setupCallbacksPhases(addCallbacks = () => {}) {
  const callbacksPhases = new ComponentScrollCallbacksPhases();
  addCallbacks(callbacksPhases);
  return callbacksPhases;
}

export default ComponentScrollAnimation;
