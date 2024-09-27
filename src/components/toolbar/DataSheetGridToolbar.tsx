import React from 'react';
import { generateAutoColumns } from '../../hooks/useColumns';
import { Column } from '../../types';
import TableSizeSelector from './actions/TableSizeSelector';


interface DataSheetGridToolbarProps<T> {
  columns:any[];
  rows: any[];
  insertRowAfter: (row: number, count?: number) => void,
  deleteRows:(rowMin: number, rowMax: number) => void,
  updateColumns: (newColumns: Partial<Column<T, any, any>>[]) => void
}

export function DataSheetGridToolbar({columns, rows, insertRowAfter, deleteRows, updateColumns}: DataSheetGridToolbarProps<any>) {
  const dataColumns = columns.slice(1)
 
  console.log(dataColumns)
 return <div className="dsg-toolbar">

    <TableSizeSelector maxRows={30} maxCols={26} onSelect={(newRowCount, newColCount) => {
      if(newRowCount !== rows.length) {
        if(newRowCount > rows.length){
          insertRowAfter(rows.length-1, newRowCount - rows.length);
        } else if(newRowCount < rows.length) {
          deleteRows(newRowCount, rows.length - 1)
        }
      }
      
      if(newColCount !== dataColumns.length) {
        if(newColCount > dataColumns.length && newColCount <= 26){
//

console.log('auto cols', generateAutoColumns(newColCount))
          updateColumns(generateAutoColumns(newColCount));

        } else if(newColCount < dataColumns.length) {
          updateColumns(dataColumns.slice(0, newColCount))
          //
        }
      }
      // console.log(x);
      //
    }}
      predefinedSize={{ rows: rows.length, cols: dataColumns.length }}></TableSizeSelector>
  </div>
}