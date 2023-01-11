/**
 * It defines all the callbacks of a component that will be executed
 * at different phases.
 */
class ComponentScrollCallbacksPhases {
  constructor() {
    this._callbacksPhases = new Map();
  }

  add(phase, time, callback) {
    let callbacksPhase = this._callbacksPhases.get(phase);
    if (!callbacksPhase) callbacksPhase = [];
    this._callbacksPhases.set(phase, [...callbacksPhase, { time, callback }]);
  }

  [Symbol.iterator]() {
    return this._callbacksPhases[Symbol.iterator]();
  }
}

export default ComponentScrollCallbacksPhases;
