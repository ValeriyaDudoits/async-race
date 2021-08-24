export enum InputTypes {
  Color = 'color',
  Text = 'text',
}
export enum Status {
  Started = 'started',
  Stopped = 'stopped',
}

export enum Actions {
  Create = 'create',
  Update = 'update',
  Race = 'race',
  Reset = 'reset',
  Generate = 'generate cars',
  Select = 'select',
  Remove = 'remove',
  Move = 'move',
  Stop = 'stop',
}

export interface CarRecord {
  items: { name: string, color: string, id: string }[],
  count: string
}

export interface CarBase {
  name: string,
  color: string,
  id: string
}

export interface DataParamsCreate {
  name: string,
  color: string
}

export interface DataParamsCreateWinner {
  id?: number,
  wins: number,
  time: number
}
export interface CarRecordWinners {
  items: { id: number, wins: number, time: number }[],

}

export interface DataParamsEngine {
  velocity: number,
  distance: number
}

export interface DataParamsSuccess {
  success: boolean
}

export type AnimationIdType = {
  [key: string]: ObjectWithId;
};

export type ObjectWithId = {
  [key: string]: number;
};

export interface DataCreateWinners {
  id: number,
  wins: number,
  time: number
}
export interface EngineDriveParams {
  success: boolean
}

export type GetWinnersParams = { id: string, wins: number, time: number }[];

export type State = {
  id: number;
};
export interface SuccessCars {
  success: DataParamsSuccess,
  carIdStartMove: number,
  time: number
}

export type UpdateWinnerParams = {
  id?: number,
  wins: number,
  time: number
};
