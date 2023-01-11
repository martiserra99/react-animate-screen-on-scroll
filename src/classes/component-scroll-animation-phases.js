/**
 * It defines tha animation of a component in all the phases.
 */
class ComponentScrollAnimationPhases {
  constructor() {
    this._animationPhases = new Map();
  }

  set(phase, animation) {
    this._animationPhases.set(phase, animation);
  }

  [Symbol.iterator]() {
    return this._animationPhases[Symbol.iterator]();
  }
}

export default ComponentScrollAnimationPhases;
