# React Animate Screen On Scroll

This package is used in React to animate the screen while you are scrolling. It uses GSAP under the hood and it is very simple to use. This is an example of website that uses this library: [https://momentsapp.xyz](https://momentsapp.xyz).

## How To Use

The way it works is by defining all the diferent phases that the animation goes through and the animation of each component in all the different phases.

We will create an example project showing how to use the library step by step and we will start by creating a React project:

```bash
npx create-react-app app
```

Then, we will open the project and install the library:

```bash
npm install react-animate-screen-on-scroll
```

### First Steps

To start using the library we will use the `PageScrollAnimation` component. This component is a wrapper for all the components that will be animated. We will use it inside **App.js**:

```javascript
import { PageScrollAnimation } from "react-animate-screen-on-scroll";

function App() {
  return <PageScrollAnimation>{/* COMPONENTS */}</PageScrollAnimation>;
}

export default App;
```

### Define Phases

Then, we will create a file called **phases.js** and we will define all the phases of the scroll animation using the `PageScrollAnimationPhases` class:

```javascript
import { PageScrollAnimationPhases } from "react-animate-screen-on-scroll";

const phases = new PageScrollAnimationPhases();

phases.add("boxes-right", 0, 1.5, true);
phases.add("boxes-hidden", 0, 1.5, true);

export default phases;
```

This class has the method `add()`. This method has the following parameters:

- **phase**: It is the name of the phase.

- **delay**: Its default value is 0 and it defines how many screens you have to scroll until the phase starts.

- **duration**: Its default value is 1 and it defines how many screens does the phase last.

- **snap**: Its default value is true and it defines if the scroll has to snap to the end of the phase or not. If it is true that means that it has to and if it is false it will snap to the end of the following phase.

We will import the instance we created and use it as a prop in `PageScrollAnimation`:

```javascript
// ...

import phases from "./phases";

function App() {
  return (
    <PageScrollAnimation phases={phases}>
      {/* COMPONENTS */}
    </PageScrollAnimation>
  );
}

// ...
```

### Create Component To Animate

We can start creating the component to animate. We will create a **folder called Boxes** and inside it we will create a **Boxes.js** and **Boxes.module.css** file:

```javascript
import styles from "./Boxes.module.css";

function Boxes() {
  return (
    <>
      <div className={styles.box1} />
      <div className={styles.box2} />
    </>
  );
}

export default Boxes;
```

```css
.box1,
.box2 {
  position: fixed;
  width: 100px;
  height: 100px;
  top: calc(50% - 50px);
  background: red;
}

.box1 {
  left: calc(25% - 50px);
}

.box2 {
  left: calc(75% - 50px);
}
```

We will add this component to the page by doing the following:

```javascript
// ...

import Boxes from "./Boxes/Boxes";

function App() {
  return (
    <PageScrollAnimation phases={phases}>
      <Boxes />
    </PageScrollAnimation>
  );
}

// ...
```

We could add as many components as we would like to but we will focus just on this one.

### Animate Component

Now that we have the component we can start animating it and to do that we have to use the component `ComponentScrollAnimation`:

```javascript
// ...

import { ComponentScrollAnimation } from "react-animate-screen-on-scroll";

function Boxes() {
  return (
    <ComponentScrollAnimation
      content={() => (
        <>
          <div className={styles.box1} />
          <div className={styles.box2} />
        </>
      )}
    />
  );
}

// ...
```

The component `ComponentScrollAnimation` has the **content** prop that has to be a function that returns the content of the component. This function has a parameter called **elems** and it is a function used to set tags to the elements (more on that later). It is used like so:

```javascript
// ...

function Boxes() {
  return (
    <ComponentScrollAnimation
      content={(elems) => (
        <>
          <div ref={elems("box")} className={styles.box1} />
          <div ref={elems("box")} className={styles.box2} />
        </>
      )}
    />
  );
}

// ...
```

Now we have to define the animation of the component in the different phases. To do that we will create a **folder inside the Boxes folder called phases**. Then, we will create a file called **phases.js** and we will use the `ComponentScrollAnimationPhases` class:

```javascript
import { ComponentScrollAnimationPhases } from "react-animate-screen-on-scroll";

const phases = new ComponentScrollAnimationPhases();

export default phases;
```

This class has the method `set()` and it is used to define the animation of the component in the specified phase. It has these parameters:

- **phase**: It is the name of the phase.

- **animation**: It is the animation that has to happen. It is an instance of `ComponentAnimation`.

We will define the animation of the component in the two phases so we can do the following:

```javascript
// ...

const phases = new ComponentScrollAnimationPhases();

phases.set("boxes-right", null /* animation */);
phases.set("boxes-hidden", null /* animation */);

// ...
```

We will define the animations later so for now we have put null values.

We have to pass this instance to the `ComponentScrollAnimation` component, like so:

```javascript
// ...

import phases from "./phases/phases";

function Boxes() {
  return (
    <ComponentScrollAnimation
      phases={phases}
      content={(elems) => (
        <>
          <div ref={elems("box")} className={styles.box1} />
          <div ref={elems("box")} className={styles.box2} />
        </>
      )}
    />
  );
}

// ...
```

## Define Animations

We used null values instead of defining the animations of the component. To define the animations we will create a **folder inside the phases folder that will be called animations**. It will contain two files that will be **boxes-right.js** and **boxes-hidden.js**.

The file **boxes-right.js** will have the following content:

```javascript
import { ComponentAnimation } from "react-animate-screen-on-scroll";

const animation = new ComponentAnimation();

animation.elems("box").to({ x: "100%" }).ease("power1.inOut").start(0).end(1);

export default animation;
```

The file **boxes-hidden.js** will have the following content:

```javascript
import { ComponentAnimation } from "react-animate-screen-on-scroll";

const animation = new ComponentAnimation();

animation
  .elems("box")
  .to({ autoAlpha: 0 })
  .ease("power1.inOut")
  .start(0)
  .end(1);

export default animation;
```

In both files we are creating an instance of `ComponentAnimation` and it has the method `elems()`. This method receives the tag that references the elements we want to animate and it returns an instance of `ElementsAnimation`. This class is used to animate the elements of the component that have the same tag.

The `ElementsAnimation` class has the following methods that can be chained:

- `to()`: It defines the animation that has to take place. Its parameter is an object that can have exactly the same properties that can be used in GSAP. Some of them are:

  - **x**: Moves element horizontally.

  - **y**: Moves element vertically.

  - **autoAlpha**: Changes opacity and also modifies the visibility property. If the value is 0 the opacity will become 0 and then the visibility will be hidden. If the value is 1 the visibility will be visible and then the opacity will become 1.

- `ease()`: It defines the ease of the animation (its default easing is **none**). Its parameter defines the easing and its values can be exactly the same as GSAP. Some of them are:

  - **none**: It is linear.

  - **power1.in**: It accelerates.

  - **power1.out**: It decelerates.

- `start()`: It receives as parameter a number that can be between 0 and 1 and defines at what time the animation starts (by default its **0**).

- `end()`: It receives as parameter a number that can be between 0 and 1 and defines at what time the animation ends (by default its **1**).

We can use these animations in the `set()` method of `ComponentScrollAnimationPhases`:

```javascript
// ...

import boxesRight from "./animations/boxes-right";
import boxesHidden from "./animations/boxes-hidden";

const phases = new ComponentScrollAnimationPhases();

phases.set("boxes-right", boxesRight);
phases.set("boxes-hidden", boxesHidden);

// ...
```

Now, the component will animate accordingly.

## Multiple Tags

We can define multiple tags for the elements, like so:

```javascript
function Boxes() {
  return (
    <ComponentScrollAnimation
      phases={phases}
      content={(elems) => (
        <>
          <div ref={elems("box", "box-1")} className={styles.box1} />
          <div ref={elems("box")} className={styles.box2} />
        </>
      )}
    />
  );
}
```

The first div has the tag box and box-1. If we animate using the tag box-1 only the first div will be animated. We can make it change its color to orange in **boxes-right.js**:

```javascript
// ...

const animation = new ComponentAnimation();

animation.elems("box").to({ x: "100%" }).ease("power1.inOut").start(0).end(1);

animation
  .elems("box-1")
  .to({ background: "orange" })
  .ease("power2.out")
  .start(0)
  .end(0.5);

// ...
```

## Callbacks

It is possible to execute callbacks at different points of different phases. To do that we have to do the following:

```javascript
// ...

import { useCallback } from "react";

function Boxes() {
  const callbacks = useCallback((callbacks) => {
    callbacks.add("boxes-hidden", 0.5, () => alert("Hello world!"));
  }, []);

  return (
    <ComponentScrollAnimation
      phases={phases}
      callbacks={callbacks}
      content={(elems) => (
        <>
          <div ref={elems("box", "box-1")} className={styles.box1} />
          <div ref={elems("box")} className={styles.box2} />
        </>
      )}
    />
  );
}

// ...
```

We have to create a function using the `useCallback()` hook that will receive a parameter that will be an instance of the class `ComponentScrollCallbacksPhases`. Inside the function we will be able to call the `add()` method to add a callback that will be executed at a certain point of the specified phase. It has these parameters:

- **phase**: The name of the phase in which the callback will execute.

- **time**: It is a number between 0 and 1 and defines the time in which the callback will be called.

- **callback**: It is the callback that will be called.
