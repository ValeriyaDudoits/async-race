import { appendChildren, createNewElement } from '../helpers';

export const garageMain = createNewElement('div', 'garage-main');
export const winnersMain = createNewElement('div', 'winners-main');

const main = () => {
  const bodyElement = createNewElement('div', 'main');
  appendChildren(bodyElement, garageMain, winnersMain);
  return bodyElement;
};

export function createBody(point: HTMLElement): void {
  point.appendChild(main());
}
