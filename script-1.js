import { data } from './data.js';

// const MAX = 500
const MAX = Number.MAX_SAFE_INTEGER;
const ROW_NUMBER_COLUMN = '#'

let columnNames = [];

const sort = (column, type = 'desc') => {
  if(type === 'asc') return [...data].sort((a, b) => a[column] - b[column] )

  return [...data].sort((a, b) => b[column] - a[column] )
};

const createHeadings = () => {
  columnNames = [ROW_NUMBER_COLUMN, ...Object.keys(data[0])]

  const headings = new DocumentFragment();

  for(let column of columnNames) {
    const columnHeadingEl = document.createElement('th');
  
    columnHeadingEl.textContent = column;
  
    columnHeadingEl.className = column + ' border border-slate-300 p-4 text-slate-900 text-left font-normal';
  
    if(column === 'value') {
      columnHeadingEl.className += ' cursor-pointer sortable';

      columnHeadingEl.addEventListener('click', () => {
        const dir = columnHeadingEl.dataset.sort === 'desc' ? 'asc' : 'desc';

        const sortedData = sort(column, dir);
    
        columnHeadingEl.setAttribute('data-sort', dir);
    
        updateTable(sortedData);
      })
    }

    if(column === ROW_NUMBER_COLUMN) columnHeadingEl.className += ' text-center';
  
    headings.appendChild(columnHeadingEl)
  }

  return headings;
}

const createRows = (dataSet = data) => {  
  const rows = new DocumentFragment();
  
  let count = 0
  
  for(let row of dataSet) {
    const rowEl = document.createElement('tr');
  
    for(let columnName of columnNames) {
      const columnEl = document.createElement('td');
  
      columnEl.textContent = row[columnName] || (count + 1);
      columnEl.className = 'border border-slate-300 p-4 text-slate-500';

      if(columnName === ROW_NUMBER_COLUMN) columnEl.className += ' text-center';

      if(columnName === 'value') columnEl.textContent = row[columnName].toLocaleString('en-US');
  
      rowEl.appendChild(columnEl);
    }
  
    rows.appendChild(rowEl);
  
    count += 1;

    if(count === MAX) break;
  }

  return [rows, count];
}

const updateTable = (dataSet, create = false) => {
  if(create) {
    const headingColumns = createHeadings(dataSet);
    
    document.querySelector('table thead').appendChild(headingColumns);
  }

  const tableBody = document.querySelector('table tbody');

  const [ tableRows, count ] = createRows(dataSet);

  tableBody.replaceChildren(tableRows);

  const countEl = document.querySelector('div');

  countEl.textContent = `Displaying ${count} rows`;
}

const createTable = () => updateTable(data, true);

// Create table on initial page load
createTable();