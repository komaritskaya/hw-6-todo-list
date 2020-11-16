import Abstract from './abstract';

const FILTER_ID_PREFIX = `filter__`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

const createFilterMarkup = (filter, isChecked) => {
  const checkedAttribute = isChecked ? `checked` : ``;
  return (
    `<input
      type="radio"
      id="filter__${filter.name}"
      class="filter__input"
      name="filter"
      ${checkedAttribute}
    />
    <label for="filter__${filter.name}" class="filter__label">
      ${filter.name}</label
    >`
  );
};

const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((filter) => createFilterMarkup(filter, filter.isChecked)).join(`\n`);
  return (
    `<section class="main__filter filter container">
      ${filtersMarkup}
    </section>`
  );
};

export default class Filter extends Abstract {
  constructor(filters) {
    super();
    this._filters = filters;
  }
  
  getTemplate() {
    return createFilterTemplate(this._filters);
  }
  
  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }
}