import Filter from "../components/filter";
import { FilterType } from "../utils/filter";
import {render, RenderPosition} from '../utils/render';

export default class FilterController {
  constructor(container, tasksModel, onFilterChange) {
    this._container = container;
    this._tasksModel = tasksModel;
    this._onFilterChange = onFilterChange;
    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;
  }
  
  render() {
    const container = this._container;
    
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        isChecked: filterType === this._activeFilterType,
      };
    });
    
    this._filterComponent = new Filter(filters);
    render(container, this._filterComponent, RenderPosition.AFTER);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);
  }
}