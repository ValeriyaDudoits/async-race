import {
  createCar,
  createWinner,
  deleteCar,
  deleteWinner,
  engineDrive,
  getAllCars,
  getCarById,
  getCars,
  getWinner,
  startCarEngine,
  stopCarEngine,
  updateCar,
  updateWinner,
} from './api';
import {
  ASC, COUNT_OF_CARS_GENERATION, EXTRA_DISTANCE, MAX_CARS_GARAGE, MLSECONDS_IN_SECONDS, TIME_FOR_CONGRATULATIONS,
} from './constants';
import {
  animation, getDistanceBetweenElements, getRandomColor, getRandomName,
} from './helpers';
import {
  Actions, CarBase, CarRecord, DataCreateWinners, DataParamsCreate,
  DataParamsEngine, EngineDriveParams, SuccessCars, UpdateWinnerParams,
} from './models';
import { AnimationId, CarsOnTrip } from './store';
import './style/main.scss';
import { createBody, garageMain, winnersMain } from './ui/body';
import { carElement } from './ui/garage/cars';
import {
  controlBlockBtnGenerate,
  controlBlockBtnRace,
  controlBlockBtnReset,
  createBlockBtn,
  createBlockInputBrand,
  createBlockInputColor,
  createBlocksGarage,
  switchPageNext,
  switchPagePrev,
  updateBlockBtn,
  updateBlockInputBrand,
  updateBlockInputColor,
} from './ui/garage/garageBlocks';
import {
  createCarBlock,
  createGarageInfo,
  garageMainBlock,
  updateGarageInfo,
} from './ui/garage/garageMain';
import { getPageControl } from './ui/garage/pages';
import { createHeader } from './ui/header';
import { createBlocksWinners } from './ui/winners/winnersBlock';

const point = document.getElementById('app');
let pageNumber = 1;
createHeader(point);
createBody(point);
createBlocksGarage();
const carsItemsPromis1: Promise<CarRecord> = getCars(pageNumber);
carsItemsPromis1.then((result) => {
  garageMain.appendChild(createGarageInfo(+result.count, 1));
  garageMain.appendChild(garageMainBlock);
  for (let i = 0; i < result.items.length; i++) {
    const car = carElement(result.items[i].color, result.items[i].id);
    const carCreating = createCarBlock(result.items[i].name, car, result.items[i].id);
    garageMainBlock.appendChild(carCreating);
  }
  getPageControl(garageMain);
});

const garageBtn = document.getElementsByClassName('garage__btn')[0];
garageBtn.classList.add('active');
const winnersBtn = document.getElementsByClassName('winners__btn')[0];

garageBtn.addEventListener('click', () => {
  garageBtn.classList.add('active');
  winnersBtn.classList.remove('active');
  winnersMain.style.display = 'none';
  garageMain.style.display = 'block';
});

winnersBtn.addEventListener('click', () => {
  garageBtn.classList.remove('active');
  winnersBtn.classList.add('active');
  winnersMain.innerHTML = '';
  createBlocksWinners(1, 'id', ASC);
  winnersMain.style.display = 'block';
  garageMain.style.display = 'none';
});

// update Car in Page
const updateCarsInPage = async (page: number) => {
  const carRecord: CarRecord = await getCars(page);
  garageMainBlock.innerHTML = '';
  const oldGarageInfo = document.getElementsByClassName('garage-info');
  oldGarageInfo[0].replaceWith(createGarageInfo(+carRecord.count, page));
  for (let i = 0; i < carRecord.items.length; i++) {
    const car = carElement(carRecord.items[i].color, carRecord.items[i].id);
    const carCreating = createCarBlock(carRecord.items[i].name, car, carRecord.items[i].id);
    garageMainBlock.appendChild(carCreating);
  }
};

// create new car

function createNewCar(): void {
  if ((createBlockInputBrand as HTMLInputElement).value === '') {
    return;
  }
  const dataParams: DataParamsCreate = {
    name: (createBlockInputBrand as HTMLInputElement).value,
    color: (createBlockInputColor as HTMLInputElement).value,
  };
  createCar(dataParams).then(() => {
    updateCarsInPage(pageNumber);
  });
}

createBlockBtn.addEventListener('click', createNewCar);

// remove car
function removeCar(event: MouseEvent) {
  const removedCarId = (event.target as HTMLElement).dataset.id;
  deleteCar(removedCarId).then(() => {
    const carBlock = document.getElementById(`carBlock-${removedCarId}`);
    carBlock.remove();
    updateGarageInfo();
    deleteWinner(removedCarId);
  });
}
// updateCar
const carsForUpdate: string[] = [];
function selectCar(event: MouseEvent) {
  const removedCarId = (event.target as HTMLElement).dataset.id;
  const carName = document.getElementById(`car-model-${removedCarId}`);
  (updateBlockInputBrand as HTMLInputElement).value = carName.textContent;
  (updateBlockInputBrand as HTMLInputElement).disabled = false;
  (updateBlockInputColor as HTMLInputElement).disabled = false;
  carsForUpdate.push(removedCarId);
}
updateBlockBtn.addEventListener('click', () => {
  const dataParams: DataParamsCreate = {
    name: (updateBlockInputBrand as HTMLInputElement).value,
    color: (updateBlockInputColor as HTMLInputElement).value,
  };
  updateCar(carsForUpdate[0], dataParams).then(() => {
    updateCarsInPage(pageNumber).then(() => {
      carsForUpdate.length = 0;
      (updateBlockInputBrand as HTMLInputElement).disabled = true;
      (updateBlockInputColor as HTMLInputElement).disabled = true;
      (updateBlockInputBrand as HTMLInputElement).value = '';
      (updateBlockInputColor as HTMLInputElement).value = '#000000';
    });
  });
});

// generate Cars

const generateCars = (pageNum: number, count: number = COUNT_OF_CARS_GENERATION) => {
  for (let i = 0; i < count; i++) {
    const dataParams: DataParamsCreate = {
      name: getRandomName(),
      color: getRandomColor(),
    };
    createCar(dataParams).then(() => {
      updateCarsInPage(pageNum);
    });
  }
};

controlBlockBtnGenerate.addEventListener('click', () => {
  generateCars(pageNumber);
});

// startEngine
const startCarMoving = async (carIdStartMove: number) => {
  const startButton = document.getElementById(`move${carIdStartMove}`);
  (startButton as HTMLButtonElement).disabled = true;

  const movingParametres: DataParamsEngine = await startCarEngine(carIdStartMove);
  const time = Math.round(movingParametres.distance / movingParametres.velocity);
  const stopButton = document.getElementById(`stop${carIdStartMove}`);
  (stopButton as HTMLButtonElement).disabled = false;
  const car = document.getElementById(`car-${carIdStartMove}`);
  const flag = document.getElementById(`flag-${carIdStartMove}`);
  const htmlDistance = Math.floor(getDistanceBetweenElements(car, flag) + EXTRA_DISTANCE);
  AnimationId[carIdStartMove] = animation(car, htmlDistance, time);
  const success: EngineDriveParams = await engineDrive(carIdStartMove);
  if (success) {
    window.cancelAnimationFrame(AnimationId[carIdStartMove].id);
  }
  CarsOnTrip.push({ success, carIdStartMove, time });
  return CarsOnTrip;
};

// stopEngine
function stopCarMoving(carIdStopMove: string) {
  const stopButton = document.getElementById(`stop${carIdStopMove}`);
  (stopButton as HTMLButtonElement).disabled = true;
  stopCarEngine(carIdStopMove).then(() => {
    const startButton = document.getElementById(`move${carIdStopMove}`);
    (startButton as HTMLButtonElement).disabled = false;
    const car = document.getElementById(`car-${carIdStopMove}`);
    car.style.transform = 'translateX(0)';
    if (AnimationId[carIdStopMove]) window.cancelAnimationFrame(AnimationId[carIdStopMove].id);
  });
}

function getCongratulations(carWinner: CarBase, successCar: SuccessCars) {
  const congratulations = document.createElement('div');
  congratulations.classList.add('congratulations');
  congratulations.innerText = `Win ${carWinner.name} with time ${+successCar.time / MLSECONDS_IN_SECONDS}`;
  point.appendChild(congratulations);
  setTimeout(() => {
    point.removeChild(congratulations);
  }, TIME_FOR_CONGRATULATIONS);
}

const getRace = (carsToRace: CarBase[]) => {
  (switchPageNext as HTMLButtonElement).disabled = true;
  (switchPagePrev as HTMLButtonElement).disabled = true;
  const ids: string[] = [];
  CarsOnTrip.length = 0;
  for (let i = 0; i < carsToRace.length; i++) {
    ids.push(carsToRace[i].id);
    const stopButton = document.getElementById(`stop${carsToRace[i].id}`);
    (stopButton as HTMLButtonElement).disabled = true;
  }
  const promises = ids.map((id) => startCarMoving(+id));
  Promise.all(promises).then((result) => {
    const carArray = result[0];
    const successCars: SuccessCars[] = [];
    for (let i = 0; i < carArray.length; i++) {
      if (carArray[i].success.success === true) {
        successCars.push(carArray[i]);
      }
    }
    successCars.sort((a: SuccessCars, b: SuccessCars) => a.time - b.time);
    if (successCars[0].carIdStartMove === undefined) {
      return;
    }
    getCarById(`${successCars[0].carIdStartMove}`).then((answer) => {
      getCongratulations(answer, successCars[0]);
    });
    getWinner(`${successCars[0].carIdStartMove}`).then((resultCheck) => {
      const check: UpdateWinnerParams = resultCheck;
      if (check.wins === 0) {
        const winner: DataCreateWinners = {
          id: successCars[0].carIdStartMove,
          wins: 1,
          time: +successCars[0].time / MLSECONDS_IN_SECONDS,
        };
        createWinner(winner);
      } else {
        const winsOld = check.wins;
        const updateWinStatus = {
          wins: winsOld + 1,
          time: +successCars[0].time / MLSECONDS_IN_SECONDS,
        };
        updateWinner(`${successCars[0].carIdStartMove}`, updateWinStatus);
      }
    });
  });
};

// race
function race() {
  getCars(pageNumber).then((result) => {
    const carsForRace = result.items;
    getRace(carsForRace);
  });
}

controlBlockBtnRace.addEventListener('click', (event) => {
  (event.target as HTMLButtonElement).disabled = true;
  race();
  (controlBlockBtnReset as HTMLButtonElement).disabled = false;
});

// reset
function stopRace() {
  getCars(pageNumber).then((result) => {
    const carsToRace = result.items;
    for (let i = 0; i < carsToRace.length; i++) {
      stopCarMoving(carsToRace[i].id);
      const startButton = document.getElementById(`move${carsToRace[i].id}`);
      (startButton as HTMLButtonElement).disabled = false;
    }
  });
}

controlBlockBtnReset.addEventListener('click', (event) => {
  (event.target as HTMLButtonElement).disabled = true;
  stopRace();
  (controlBlockBtnRace as HTMLButtonElement).disabled = false;
  (switchPageNext as HTMLButtonElement).disabled = false;
  (switchPagePrev as HTMLButtonElement).disabled = false;
});

// pagination
switchPageNext.addEventListener('click', () => {
  getAllCars().then((result) => {
    const maxCars = result;
    if (pageNumber >= +maxCars / MAX_CARS_GARAGE) {
      return;
    }
    pageNumber++;
    updateCarsInPage(pageNumber);
  });
});

switchPagePrev.addEventListener('click', () => {
  if (pageNumber < 2) {
    return;
  }
  pageNumber--;
  updateCarsInPage(pageNumber);
});

// actions on buttons
garageMainBlock.addEventListener('click', (event) => {
  const { action } = (event.target as HTMLButtonElement).dataset;
  const carId: string = (event.target as HTMLButtonElement).dataset.id;
  if (action === null) {
    return;
  }
  if (action === Actions.Remove) {
    removeCar(event);
    return;
  }
  if (action === Actions.Select) {
    selectCar(event);
    return;
  }
  if (action === Actions.Move) {
    startCarMoving(+carId);
    return;
  }
  if (action === Actions.Stop) {
    stopCarMoving(carId);
  }
});
