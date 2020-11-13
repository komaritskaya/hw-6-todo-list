import Abstract from './abstract';

const FilterType = {
  ALL: `all`,
  EXPIRED: `expired`,
  FINISHED: `finished`,
  PENDING: `pending`,
};

// const getFilterNameById = (id) => {
//   return id.substring(FILTER_ID_PREFIX.length);
// };

const createFilterMarkup = (filter, isActive) => {
  const activeAttribute = isActive ? `active` : ``;
  return (
    `<a class="item">
      ${filter}
    </a>`
  );
};

const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((filter) => createFilterMarkup(filter, filter.isActive)).join(`\n`);
  return (
    `<section class="main__filter filter container">
      ${filtersMarkup}
    </section>`
  );
};

export default class Filter extends Abstract {
  constructor() {
  }
}