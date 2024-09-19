import React from 'react'
import TableSizeSelector from './actions/TableSizeSelector'

export function DataSheetGridToolbar() {
  return <div className="dsg-toolbar">

    <TableSizeSelector maxRows={10} maxCols={10} onSelect={() => {
      //
    }}
      predefinedSize={{ rows: 5, cols: 5 }}></TableSizeSelector>
  </div>
}