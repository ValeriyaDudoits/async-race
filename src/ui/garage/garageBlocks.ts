import { appendChildren } from '../../helpers';
import { Actions, InputTypes } from '../../models';
import { garageMain } from '../body';

const input = (styles: string, type: string): HTMLElement => {
  const inputElement = document.createElement('input');
  inputElement.type = type;
  inputElement.classList.add(`${styles}`);
  return inputElement;
};

export const functionalBtn = (
  styles: string,
  text: string,
  id: string,
  dataId?: string,
  dataAction?: string,
): HTMLElement => {
  const functionalBtnElement = document.createElement('button');
  functionalBtnElement.classList.add(`${styles}`);
  functionalBtnElement.id = `${id}`;
  functionalBtnElement.dataset.id = `${dataId}`;
  functionalBtnElement.dataset.action = `${dataAction}`;
  functionalBtnElement.innerText = `${text}`;
  return functionalBtnElement;
};

export const getBlock = (
  root: HTMLElement,
  styles: string,
  inputBrand: HTMLElement,
  inputColor: HTMLElement,
  btn: HTMLElement,
): void => {
  const block = document.createElement('div');
  block.classList.add(`${styles}`);
  root.appendChild(block);
  appendChildren(block, inputBrand, inputColor, btn);
};
export const getControlBlock = (root: HTMLElement, btnRace: HTMLElement,
  btnReset: HTMLElement, btnGenerate: HTMLElement): void => {
  const block = document.createElement('div');
  block.classList.add('control-block');
  root.appendChild(block);
  appendChildren(block, btnRace, btnReset, btnGenerate);
};

export const createBlockInputBrand = input('create-block__input-brand', InputTypes.Text);
export const createBlockInputColor = input('create-block__input-color', InputTypes.Color);
export const createBlockBtn = functionalBtn('create-btn', Actions.Create, Actions.Create);

export const updateBlockInputBrand = input('update-block__input-brand', InputTypes.Text);
export const updateBlockInputColor = input('update-block__input-color', InputTypes.Color);
export const updateBlockBtn = functionalBtn('update-btn', Actions.Update, Actions.Update);
(updateBlockInputBrand as HTMLInputElement).disabled = true;
(updateBlockInputColor as HTMLInputElement).disabled = true;

export const controlBlockBtnRace = functionalBtn('control-block__race-btn', Actions.Race, Actions.Race);
export const controlBlockBtnReset = functionalBtn('control-block__reset-btn', Actions.Reset, Actions.Reset);
export const controlBlockBtnGenerate = functionalBtn('control-block__generate-btn', Actions.Generate, Actions.Generate);

export const switchPageNext = functionalBtn('btn-next', 'next', 'btn-next-garage');
export const switchPagePrev = functionalBtn('btn-prev', 'prev', 'btn-prev-garage');
export const switchPageNextWin = functionalBtn('btn-next', 'next', 'btn-next-winners');
export const switchPagePrevWin = functionalBtn('btn-prev', 'prev', 'btn-prev-winners');

export const createBlocksGarage = (): void => {
  getBlock(garageMain, 'create-block', createBlockInputBrand, createBlockInputColor, createBlockBtn);
  getBlock(garageMain, 'update-block', updateBlockInputBrand, updateBlockInputColor, updateBlockBtn);
  getControlBlock(garageMain, controlBlockBtnRace, controlBlockBtnReset, controlBlockBtnGenerate);
};
