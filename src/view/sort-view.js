import AbstractView from '../framework/view/abstract-view.js';
import {SORT_TYPE, SORT_TYPE_DICTIONARY} from '../const.js';

const createSortingTemplate = (currentSortType) => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.values(SORT_TYPE).map((sortType) => `
      <div class="trip-sort__item  trip-sort__item--${sortType}">
        <input ${currentSortType === sortType ? 'checked' : ''}
          data-sort-type=${sortType} id="sort-${sortType}"
          class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortType}"
          ${[SORT_TYPE.EVENT, SORT_TYPE.OFFER].includes(sortType) ? 'disabled' : ''}>
        <label class="trip-sort__btn" for="sort-${sortType}">${SORT_TYPE_DICTIONARY[sortType]}</label>
      </div>
    `).join('')}
  </form>`;

export default class SortView extends AbstractView {
  #currentSortType;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };

  get template() {
    return createSortingTemplate(this.#currentSortType);
  }
}
