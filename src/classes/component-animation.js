import ElementsAnimation from "./elements-animation";

/**
 * It defines the animation of a component.
 */
class ComponentAnimation {
  constructor() {
    this._elementsAnimations = [];
  }

  get elementsAnimations() {
    return [...this._elementsAnimations];
  }

  elems(tag) {
    const elementsAnimation = new ElementsAnimation(tag);
    this._elementsAnimations.push(elementsAnimation);
    return elementsAnimation;
  }
}

export default ComponentAnimation;
