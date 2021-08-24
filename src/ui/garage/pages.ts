import { appendChildren, createNewElement } from '../../helpers';
import { switchPageNext, switchPagePrev } from './garageBlocks';

export const getPageControl = (root: HTMLElement): void => {
  const pageControlBlock = createNewElement('div', 'page-control');
  root.appendChild(pageControlBlock);
  appendChildren(pageControlBlock, switchPagePrev, switchPageNext);
};
