import { getAllWiners, getCarById, getWinners } from '../../api';
import {
  ASC, DESC, MAX_CARS_WINNERS, TIME, WINS,
} from '../../constants';
import { appendChildren, createNewElement } from '../../helpers';
import { winnersMain } from '../body';
import { carElement } from '../garage/cars';
import { switchPageNextWin, switchPagePrevWin } from '../garage/garageBlocks';
import { getPageControlWinners } from './winnersPages';

const tableCapWins = createNewElement('div', 'table-cap__wins');
tableCapWins.id = 'table-cap__wins';
tableCapWins.innerText = 'Wins';

const tableCapTime = createNewElement('div', 'table-cap__time');
tableCapTime.id = 'table-cap__time';
tableCapTime.innerText = 'Best Time(sec)';

let pageWinsNumber = 1;

const createWinnersInfo = (root: HTMLElement, carQuantity: number, pageNumber: number) => {
  const winnersInfo = createNewElement('div', 'winners-info');
  root.appendChild(winnersInfo);
  const winnersName = createNewElement('h2', 'winners-name');
  winnersName.innerText = `Winners(${carQuantity})`;
  const winnersPage = createNewElement('p', 'winners-page');
  winnersPage.innerText = `Page ${pageNumber}`;
  appendChildren(winnersInfo, winnersName, winnersPage);
  getPageControlWinners(root);
};
const createWinnersTableCap = (root: HTMLElement): void => {
  const tableBody = createNewElement('div', 'table-body');
  tableBody.id = 'table-body';
  const tableCap = createNewElement('div', 'table-cap');
  const tableCapNumber = createNewElement('div', 'table-cap__number');
  tableCapNumber.innerText = 'Number';
  const tableCapCar = createNewElement('div', 'table-cap__car');
  tableCapCar.innerText = 'Car';
  const tableCapName = createNewElement('div', 'table-cap__name');
  tableCapName.innerText = 'Name';
  root.appendChild(tableBody);
  appendChildren(tableBody, tableCap);
  appendChildren(tableCap, tableCapNumber, tableCapCar, tableCapName, tableCapWins, tableCapTime);
};

const createWinnersTableMain = (number: number, car: HTMLElement, name: string, wins: number, time: number) => {
  const tableMain = createNewElement('div', 'table-main');
  const tableMainNumber = createNewElement('div', 'table-main__number');
  tableMainNumber.innerText = `${number}`;
  const tableMainCar = createNewElement('div', 'table-main__car');
  tableMainCar.appendChild(car);
  const tableMainName = createNewElement('div', 'table-main__name');
  tableMainName.innerText = `${name}`;
  const tableMainWins = createNewElement('div', 'table-main__wins');
  tableMainWins.innerText = `${wins}`;
  const tableMainTime = createNewElement('div', 'table-main__time');
  tableMainTime.innerText = `${time}`;
  appendChildren(tableMain, tableMainNumber, tableMainCar, tableMainName, tableMainWins, tableMainTime);
  return tableMain;
};

export const createBlocksWinners = (page: number, sort: string, order: string): void => {
  getAllWiners().then((countOfWinners) => {
    getWinners(page, sort, order).then((result) => {
      createWinnersInfo(winnersMain, +countOfWinners, pageWinsNumber);
      createWinnersTableCap(winnersMain);
      for (let i = 0; i < result.length; i++) {
        const counter = i + 1;
        getCarById(result[i].id).then((car) => {
          const carImg = carElement(car.color, car.id);
          const winsInfo = createWinnersTableMain(counter, carImg, car.name, result[i].wins, result[i].time);
          const root = document.getElementById('table-body');
          root.appendChild(winsInfo);
        });
      }
    });
  });
};

let winshelper = 1;
tableCapWins.addEventListener('click', () => {
  winnersMain.innerHTML = '';
  if (winshelper % 2 === 0) {
    createBlocksWinners(1, WINS, ASC);
  } else createBlocksWinners(1, WINS, DESC);
  winshelper++;
});
let timehelper = 1;
tableCapTime.addEventListener('click', () => {
  winnersMain.innerHTML = '';
  if (timehelper % 2 === 0) {
    createBlocksWinners(1, TIME, ASC);
  } else createBlocksWinners(1, TIME, DESC);
  timehelper++;
});
// pagination

switchPageNextWin.addEventListener('click', () => {
  getAllWiners().then((result) => {
    const maxCars = result;
    if (pageWinsNumber >= +maxCars / MAX_CARS_WINNERS) {
      return;
    }
    pageWinsNumber++;
    winnersMain.innerHTML = '';
    createBlocksWinners(pageWinsNumber, 'id', ASC);
  });
});

switchPagePrevWin.addEventListener('click', () => {
  if (pageWinsNumber < 2) {
    return;
  }
  pageWinsNumber--;
  winnersMain.innerHTML = '';
  createBlocksWinners(pageWinsNumber, 'id', ASC);
});
