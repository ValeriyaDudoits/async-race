import { getAllCars } from '../../api';
import { appendChildren, createNewElement } from '../../helpers';
import { Actions } from '../../models';
import { functionalBtn } from './garageBlocks';

export const garageBlockMain = (): HTMLElement => {
  const garageBlockElement = createNewElement('div', 'garage-block-main');
  garageBlockElement.id = 'garage-block-main';
  return garageBlockElement;
};

export const garageMainBlock = garageBlockMain();

export const createGarageInfo = (carQuantity: number, pageNumber: number): HTMLElement => {
  const garageMain = createNewElement('div', 'garage-info');
  const garageName = createNewElement('h2', 'garage-name');
  garageName.innerHTML = `Garage(${carQuantity})`;
  const garagePage = createNewElement('p', 'garage-page');
  garagePage.innerText = `Page ${pageNumber}`;
  appendChildren(garageMain, garageName, garagePage);
  return garageMain;
};

export const createCarBlock = (carName: string, car: HTMLElement, id: string): HTMLElement => {
  const carBlock = createNewElement('div', 'car-block');
  carBlock.id = `carBlock-${id}`;
  const btnBlockCar = createNewElement('div', 'btn-block-car');
  const carModel = createNewElement('div', 'car-model');
  carModel.id = `car-model-${id}`;
  carModel.innerText = `${carName}`;
  btnBlockCar.append(
    functionalBtn('select-btn', Actions.Select, `select-${id}`, `${id}`, Actions.Select),
    functionalBtn('remove-btn', Actions.Remove, `remove${id}`, `${id}`, Actions.Remove),
    carModel,
  );
  const btnBlockAction = createNewElement('div', 'btn-block-action');
  const stopBtn = functionalBtn('stop-btn', Actions.Stop, `stop${id}`, `${id}`, Actions.Stop);
  (stopBtn as HTMLButtonElement).disabled = true;
  appendChildren(
    btnBlockAction,
    functionalBtn('move-btn', Actions.Move, `move${id}`, `${id}`, Actions.Move),
    stopBtn,
  );
  const flag = createNewElement('div', 'flag');
  flag.id = `flag-${id}`;
  flag.innerHTML = '<img src="https://img.icons8.com/dusk/64/000000/finish-flag.png"/>';
  appendChildren(carBlock, btnBlockCar, btnBlockAction, car, flag);
  return carBlock;
};

export const updateGarageInfo = (): void => {
  getAllCars().then((result) => {
    const garageMainText = document.getElementsByClassName('garage-name');
    garageMainText[0].innerHTML = '';
    garageMainText[0].innerHTML = `Garage(${result})`;
  });
};
