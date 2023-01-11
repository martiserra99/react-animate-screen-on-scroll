/**
 * It defines the phases of the scroll animation.
 */
class PageScrollAnimationPhases {
  constructor() {
    this._phases = new Map();
  }

  add(phase, delay = 0, duration = 1, snap = true) {
    this._phases.set(phase, { delay, duration, snap });
  }

  [Symbol.iterator]() {
    return this._phases[Symbol.iterator]();
  }
}

export default PageScrollAnimationPhases;
