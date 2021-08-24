import { BASE_URL, Path } from './constants';
import {
  CarBase,
  CarRecord,
  CarRecordWinners,
  DataParamsCreate,
  DataParamsCreateWinner,
  DataParamsEngine,
  EngineDriveParams,
  GetWinnersParams,
  UpdateWinnerParams,
} from './models';

export const getCars = async (page: number, limit = 7): Promise<CarRecord> => {
  const response = await fetch(`${BASE_URL}${Path.Garage}?_page=${page}&_limit=${limit}`);
  const items = await response.json();
  const count: string = response.headers.get('X-Total-Count');
  return { items, count };
};

export const getAllCars = async (limit = 7): Promise<string> => {
  const response = await fetch(`${BASE_URL}${Path.Garage}?_limit=${limit}`);
  await response.json();
  const count: string = response.headers.get('X-Total-Count');
  return count;
};

export const getCarById = async (id: string): Promise<CarBase> => {
  const response = await fetch(`${BASE_URL}${Path.Garage}/${id}`);
  const car = await response.json();
  return car;
};

export const createCar = async (body: DataParamsCreate): Promise<CarBase> => {
  const response = await fetch(`${BASE_URL}${Path.Garage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const newCar = await response.json();
  return newCar;
};

export const deleteCar = async (id: string): Promise<CarRecord> => {
  const response = await fetch(`${BASE_URL}${Path.Garage}/${id}`, {
    method: 'DELETE',
  });
  const car = await response.json();
  return car;
};

export const updateCar = async (id: string, body: DataParamsCreate): Promise<CarRecord> => {
  const response = await fetch(`${BASE_URL}${Path.Garage}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const car = await response.json();
  return car;
};

export const startCarEngine = async (id: number): Promise<DataParamsEngine> => {
  const response = await fetch(`${BASE_URL}${Path.Engine}?id=${id}&status=started`);
  const result = await response.json();
  return result;
};

export const stopCarEngine = async (id: string): Promise<DataParamsEngine> => {
  const response = await fetch(`${BASE_URL}${Path.Engine}?id=${id}&status=stopped`);
  const result = await response.json();
  return result;
};

export const engineDrive = async (id: number): Promise<EngineDriveParams> => {
  const response = await fetch(`${BASE_URL}${Path.Engine}?id=${id}&status=drive`);
  if (response.ok) {
    const result = await response.json();
    return result;
  }
  return { success: false };
};

export const getWinners = async (page: number, sort: string, order: string, limit = 10): Promise<GetWinnersParams> => {
  const response = await fetch(
    `${BASE_URL}${Path.Winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
  );
  const result = await response.json();
  return result;
};

export const getWinner = async (id: string): Promise<UpdateWinnerParams> => {
  const response = await fetch(`${BASE_URL}${Path.Winners}/${id}`);
  if (response.ok) {
    const result = await response.json();
    return result;
  }
  return { wins: 0, time: 0 };
};

export const createWinner = async (body: DataParamsCreateWinner): Promise<CarRecordWinners> => {
  const response = await fetch(`${BASE_URL}${Path.Winners}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  return result;
};

export const deleteWinner = async (id: string): Promise<CarRecordWinners> => {
  const response = await fetch(`${BASE_URL}${Path.Winners}/${id}`, {
    method: 'DELETE',
  });
  const result = await response.json();
  return result;
};

export const updateWinner = async (id: string, body: DataParamsCreateWinner): Promise<CarRecordWinners> => {
  const response = await fetch(`${BASE_URL}${Path.Winners}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  return result;
};

export const getAllWiners = async (limit = 10): Promise<string> => {
  const response = await fetch(`${BASE_URL}${Path.Winners}?_limit=${limit}`);
  await response.json();
  const count: string = response.headers.get('X-Total-Count');
  return count;
};
