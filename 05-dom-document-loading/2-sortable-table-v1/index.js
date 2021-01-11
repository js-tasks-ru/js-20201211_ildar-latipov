export default class SortableTable {
  constructor (headArr = [], {
    data = []
  } = {}) {
    this.headArr = headArr;
    this.data = data;

    this.render();
  }

  getTableHead() {
    return `<div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.headArr.map(headElements => this.getTableHeadElements(headElements)).join('')}
    </div>`;
  }
  getTableHeadElements({ id, title, sortable }) {
    return `
        <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}">
          <span>${title}</span>
        </div>`;
  }

  getTableBody() {
    return `<div data-element="body" class="sortable-table__body">
            ${this.getTableItem(this.data)}
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

  get template() {
    return `<div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">
          ${this.getTableHead()}
          ${this.getTableBody()}
        </div>
      </div>`;
  }


  render() {
    const addWrap = document.createElement('div');
    addWrap.innerHTML = this.template;
    this.element = addWrap.firstElementChild;
    this.subElements = this.getSubElements(this.element);
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

  sort(field, order) {
    const sortedData = this.sortData(field, order);
    const allColumns = this.element.querySelectorAll('.sortable-table__cell[data-id]');
    const currentColumn = this.element.querySelector(`.sortable-table__cell[data-id="${field}"]`);
    allColumns.forEach(column => {
      column.dataset.order = '';
    });

    currentColumn.dataset.order = order;
    this.subElements.body.innerHTML = this.getTableItem(sortedData);
  }


  sortData(field, order) {
    const arr = [...this.data];
    const column = this.headArr.find(item => item.id === field);
    const { sortType } = column;
    const direction = order === 'asc' ? 1 : -1;

    return arr.sort((a, b) => {
      switch (sortType) {
        case 'number':
          return direction * (a[field] - b[field]);
        case 'string':
          return direction * a[field].localeCompare(b[field], 'ru');
        default:
          return direction * (a[field] - b[field]);
      }
    });
  }



}

