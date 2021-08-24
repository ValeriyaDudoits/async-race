import { appendChildren, createNewElement } from '../../helpers';
import { switchPageNextWin, switchPagePrevWin } from '../garage/garageBlocks';

export const getPageControlWinners = (root: HTMLElement): void => {
  const pageControlBlock = createNewElement('div', 'page-control');
  root.appendChild(pageControlBlock);
  appendChildren(pageControlBlock, switchPagePrevWin, switchPageNextWin);
};
