export default class SortableTable {

  addSortArrow = (event) => {
    const column = event.target.closest('[data-sortable="true"]');

    const toggleOrder = order => {
      const orders = {
        asc: 'desc',
        desc: 'asc'
      };

      return orders[order];
    };

    if (column) {
      const { id, order } = column.dataset;
      const sortedData = this.sortData(id, toggleOrder(order)); 
   
      const arrow = column.querySelector('.sortable-table__sort-arrow');

      column.dataset.order = toggleOrder(order);
     

      if (!arrow) {
        column.append(this.subElements.arrow);
      }

      this.subElements.body.innerHTML = this.getTableItem(sortedData);
    }

  }

  constructor (headArr = [], {
    data = [],
    sorted = {
      id: headArr.find(item => item.sortable).id,
      order: 'asc'
    }
  } = {}) {
    this.headArr = headArr;
    this.data = data;
    this.sorted = sorted;
    this.render();
  }

  getTableHead() {
    return `<div data-element="header" class="sortable-table__header sortable-table__row">
            ${this.headArr.map(headElements => this.getTableHeadElements(headElements)).join('')}
        </div>`;
  }
  getTableHeadElements({ id, title, sortable }) {
    const order = this.sorted.id === id ? this.sorted.order : 'asc';
    return `
            <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="${order}">
              <span>${title}</span>
              ${this.headSortArrow(id)}
            </div>`;
  }

  headSortArrow(id) {
    const isOrderExist = this.sorted.id === id ? this.sorted.order : '';

    return isOrderExist
      ? `<span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>`
      : '';

  }

  getTableBody(data) {
    return `<div data-element="body" class="sortable-table__body">
                ${this.getTableItem(data)}
          </div>`;

  }
  getTableItem(data) {
    return data.map((element) => {
      return `<a href="/products/${element.id}" class="sortable-table__row">
                  ${this.getTabelElement(element)}
                  </a>`;
    }).join('');

  }

  getTabelElement(element) {
    const cells = this.headArr.map(({ id, template }) => {
      return {
        id,
        template,
      };
    });

    return cells.map(({ id, template }) => {
      return template
        ? template(element[id])
        : `<div class="sortable-table__cell">${element[id]}</div>`;
    }).join('');
  }

  getTemplate(data) {
    return `<div data-element="productsContainer" class="products-list__container">
            <div class="sortable-table">
              ${this.getTableHead()}
              ${this.getTableBody(data)}
            </div>
          </div>`;
  }


  render() {
    const {id, order} = this.sorted;

    const addWrap = document.createElement('div');
    const sortedData = this.sortData(id, order);
    addWrap.innerHTML = this.getTemplate(sortedData);
    const element = addWrap.firstElementChild;
    this.element = element;

    this.subElements = this.getSubElements(element);
    this.initListeners();

  }
  initListeners() {
    this.subElements.header.addEventListener('pointerdown', this.addSortArrow);
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');
    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }
  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.subElements = {};
  }



  sortData(field, order) {
    const arr = [...this.data];
    const column = this.headArr.find(item => item.id === field);
    const {sortType, customSorting} = column;
    const direction = order === 'asc' ? 1 : -1;

    return arr.sort((a, b) => {
      switch (sortType) {
        case 'number':
          return direction * (a[field] - b[field]);
        case 'string':
          return direction * a[field].localeCompare(b[field], 'ru');
        case 'custom':
          return direction * customSorting(a, b);
        default:
          return direction * (a[field] - b[field]);
      }
    });
  }



}
