import { data } from './data.js';

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
  
    if(column === 'value') {
      columnHeadingEl.className += 'sortable';

      columnHeadingEl.addEventListener('click', () => {
        const dir = columnHeadingEl.dataset.sort === 'desc' ? 'asc' : 'desc';

        const sortedData = sort(column, dir);
    
        columnHeadingEl.setAttribute('data-sort', dir);
        const arrows = {
          asc: 'value ▲',
          desc: 'value ▼'
        }

        columnHeadingEl.textContent = arrows[dir];
    
        updateTable(sortedData);
      })
    }

    headings.appendChild(columnHeadingEl)
  }

  return headings;
}

const createRows = (dataSet = data) => {  
  const rows = new DocumentFragment();
  
  for(let row of dataSet) {
    const rowEl = document.createElement('tr');
  
    for(let columnName of columnNames) {
      const columnEl = document.createElement('td');
  
      columnEl.textContent = row[columnName] || (count + 1);

      if(columnName === 'value') columnEl.textContent = row[columnName].toLocaleString('en-US');
  
      rowEl.appendChild(columnEl);
    }
  
    rows.appendChild(rowEl);
  
    count += 1;

    if(count === MAX) break;
  }

  return rows;
}

const updateRows = (dataSet = data) => {  
  let rowEl = document.querySelector('table tbody').firstChild

  for(let i = 0; i < dataSet.length; i++) {
    let row = dataSet[i];

    rowEl = rowEl.nextElementSibling;
  
    let columnEl = rowEl.firstChild

    for(let x = 0; x < columnNames.length; x++) {
      const columnName = columnNames[x]
      if(x > 0) columnEl = columnEl.nextElementSibling;

      columnEl.textContent = row[columnName] || (i + 1);

      if(columnName === 'value') columnEl.textContent = row[columnName].toLocaleString('en-US');
    }
  }
}

const updateTable = (dataSet, create = false) => {
  if(create) {
    const headingColumns = createHeadings(dataSet);
    
    document.querySelector('table thead').appendChild(headingColumns);

    const tableBody = document.querySelector('table tbody');

    const rows = createRows(dataSet);

    tableBody.replaceChildren(rows);
  } else {
    updateRows(dataSet); // This is sooooooooooo slow
  }

  const countEl = document.querySelector('div');

  countEl.textContent = `Displaying ${dataSet.length} rows`;
}

const createTable = () => updateTable(data, true);

// Create table on initial page load
createTable();