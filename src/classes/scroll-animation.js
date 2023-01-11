import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * It contains all the login to set up the scroll animation.
 */
class ScrollAnimation {
  constructor(phases) {
    this._phases = this._setupPhases(phases);
    this._timeline = null;
  }

  _setupPhases(phases) {
    const result = new Map();
    for (const [phase, config] of phases) {
      const data = { ...config, elementsAnimations: [], callbacks: [] };
      result.set(phase, data);
    }
    return result;
  }

  getHeight() {
    const duration = this._getTotalDuration();
    return `${duration * 100 + 100}vh`;
  }

  add(animationPhases, callbacksPhases) {
    this._addAnimationPhases(animationPhases);
    this._addCallbacksPhases(callbacksPhases);
  }

  _addAnimationPhases(animationPhases) {
    for (const [phase, animation] of animationPhases) {
      const currElementsAnimations = this._phases.get(phase).elementsAnimations;
      for (const elementsAnimation of animation.elementsAnimations) {
        currElementsAnimations.push(elementsAnimation);
      }
    }
  }

  _addCallbacksPhases(callbacksPhases) {
    for (const [phase, callbacks] of callbacksPhases) {
      const currCallbacks = this._phases.get(phase).callbacks;
      currCallbacks.push(...callbacks);
    }
  }

  remove(animationPhases, callbacksPhases) {
    this._removeAnimationPhases(animationPhases);
    this._removeCallbacksPhases(callbacksPhases);
  }

  _removeAnimationPhases(animationPhases) {
    for (const [phase, animation] of animationPhases) {
      const currElementsAnimations = this._phases.get(phase).elementsAnimations;
      for (const elementsAnimation of animation.elementsAnimations) {
        const index = currElementsAnimations.indexOf(elementsAnimation);
        currElementsAnimations.splice(index, 1);
      }
    }
  }

  _removeCallbacksPhases(callbacksPhases) {
    for (const [phase, callbacks] of callbacksPhases) {
      const currCallbacks = this._phases.get(phase).callbacks;
      for (const callback of callbacks) {
        const index = currCallbacks.indexOf(callback);
        currCallbacks.splice(index, 1);
      }
    }
  }

  start(scroll) {
    this._timeline = this._createTimeline(scroll);
    this._timelineConfig(this._timeline);
    this._timelineAnimation(this._timeline);
    this._timelineCallbacks(this._timeline);
  }

  _createTimeline(scroll) {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: scroll,
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
        snap: {
          snapTo: "labelsDirectional",
          delay: 0,
          duration: { min: 1, max: 2 },
          ease: "power1.inOut",
        },
      },
    });
    return timeline;
  }

  _timelineConfig(timeline) {
    this._timelineDuration(timeline);
    this._timelineSnap(timeline);
  }

  _timelineDuration(timeline) {
    timeline.set({}, {}, this._getTotalDuration());
  }

  _timelineSnap(timeline) {
    timeline.addLabel("", 0);
    for (const [phase, config] of this._phases) {
      if (!config.snap) continue;
      const time = this._getEndTimePhase(phase, config);
      timeline.addLabel(phase, time);
    }
  }

  _timelineAnimation(timeline) {
    for (const [phase, config] of this._phases) {
      const startPhase = this._getStartTimePhase(phase, config);

      for (const elementsAnimation of config.elementsAnimations) {
        const startInPhase = elementsAnimation.config.start * config.duration;
        const endInPhase = elementsAnimation.config.end * config.duration;

        const start = startPhase + startInPhase;
        const duration = endInPhase - startInPhase;

        const to = {
          ...elementsAnimation.animate,
          duration: duration,
          ease: elementsAnimation.config.ease,
        };

        timeline.to(elementsAnimation.elements, to, start);
      }
    }
  }

  _timelineCallbacks(timeline) {
    for (const [phase, config] of this._phases) {
      const startPhase = this._getStartTimePhase(phase, config);

      for (const callback of config.callbacks) {
        const startInPhase = callback.time * config.duration;

        const start = startPhase + startInPhase;

        timeline.call(callback.callback, null, start);
      }
    }
  }

  end() {
    this._destroyTimeline();
  }

  _destroyTimeline() {
    this._timeline.scrollTrigger.kill();
    this._timeline.kill();
    this._timeline = null;
  }

  _getTotalDuration() {
    return [...this._phases.values()].reduce(
      (acc, phase) => acc + phase.delay + phase.duration,
      0
    );
  }

  _getStartTimePhase(phase, config) {
    let startTime = config.delay;
    for (const [other, config] of this._phases) {
      if (other === phase) break;
      startTime += config.delay + config.duration;
    }
    return startTime;
  }

  _getEndTimePhase(phase, config) {
    return this._getStartTimePhase(phase, config) + config.duration;
  }
}

export default ScrollAnimation;
