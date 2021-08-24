import { COLOR_LENGTH, MODELS, NAMES } from './constants';
import { State } from './models';

export const createNewElement = (element: string, ...classes: string[]): HTMLElement => {
  const newElement = document.createElement(element);
  classes.forEach((item) => {
    newElement.classList.add(item);
  });
  return newElement;
};

export const appendChildren = (parent: HTMLElement, ...children: HTMLElement[]): void => {
  children.forEach((item) => {
    parent.appendChild(item);
  });
};

export const getRandomName = (): string => {
  const model = MODELS[Math.floor(Math.random() * MODELS.length)];
  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  return `${model} ${name}`;
};

export const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < COLOR_LENGTH; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};

function getPositionAtCenter(element: HTMLElement) {
  const {
    top, left, width, height,
  } = element.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2,
  };
}

export function getDistanceBetweenElements(firstEl: HTMLElement, secondEl: HTMLElement): number {
  const firstPosition = getPositionAtCenter(firstEl);
  const secondPosition = getPositionAtCenter(secondEl);

  return Math.hypot(firstPosition.x - secondPosition.x, firstPosition.y - secondPosition.y);
}

export function animation(car: HTMLElement, distance: number, animationTime: number): State {
  let start: number | null = null;
  const state: State = { id: null };
  function step(timestamp: number) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const passed = Math.round(time * (distance / animationTime));
    car.style.transform = `translateX(${Math.min(passed, distance)}px)`;
    if (passed < distance) {
      state.id = window.requestAnimationFrame(step);
    }
  }
  state.id = window.requestAnimationFrame(step);
  return state;
}
