import { createNewElement } from '../helpers';

function getHeader(): HTMLElement {
  return createNewElement('div', 'header', 'wrapper');
}

const getBtn = (stylesWrapper: string, stylesBtn: string, textBtn: string): HTMLDivElement => {
  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add(`${stylesWrapper}`);
  const btn = document.createElement('button');
  btn.classList.add(`${stylesBtn}`);
  btn.innerText = `${textBtn}`;
  btnWrapper.appendChild(btn);
  return btnWrapper;
};

export function createHeader(point: HTMLElement): void {
  const header = getHeader();
  point.appendChild(header);
  header.appendChild(getBtn('header_garage', 'garage__btn', 'To garage'));
  header.appendChild(getBtn('header_winners', 'winners__btn', 'To winners'));
}
