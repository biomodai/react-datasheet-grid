import React, { useEffect, useState } from 'react'

interface TableSizeSelectorProps {
  maxRows: number
  maxCols: number
  onSelect: (rows: number, cols: number) => void
  predefinedSize?: { rows: number; cols: number }
}

export default function TableSizeSelector({ maxRows, maxCols, onSelect, predefinedSize }: TableSizeSelectorProps) {
  const [selectedDimensions, setSelectedDimensions] = useState<{ rows: number; cols: number } | null>(null)
  const [hoveredDimensions, setHoveredDimensions] = useState<{ rows: number; cols: number } | null>(null)
  const [isHoveringGrid, setIsHoveringGrid] = useState(false)

  useEffect(() => {
    if (predefinedSize) {
      setSelectedDimensions(predefinedSize)
      onSelect(predefinedSize.rows, predefinedSize.cols)
    }
  }, [predefinedSize, onSelect])

  const handleSelect = (rows: number, cols: number) => {
    setSelectedDimensions({ rows, cols })
    onSelect(rows, cols)
    setIsHoveringGrid(false)
  }

  return (
    <div className="table-size-selector">
      <button
        className="toolbar-button"
        onClick={() => setIsHoveringGrid(!isHoveringGrid)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="3" y1="15" x2="21" y2="15"></line>
          <line x1="9" y1="3" x2="9" y2="21"></line>
          <line x1="15" y1="3" x2="15" y2="21"></line>
        </svg>
      </button>
      {isHoveringGrid && (
        <div
          className="size-grid"
          onMouseLeave={() => {
            setIsHoveringGrid(false)
            setHoveredDimensions(null)
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${maxCols}, 1fr)`,
              gap: '0.25rem',
            }}
            onClick={() => {
              if (hoveredDimensions) {
                handleSelect(hoveredDimensions.rows, hoveredDimensions.cols)
              }
            }}
          >
            {Array.from({ length: maxRows * maxCols }).map((_, index) => {
              const row = Math.floor(index / maxCols) + 1
              const col = (index % maxCols) + 1
              const isHovered = hoveredDimensions && row <= hoveredDimensions.rows && col <= hoveredDimensions.cols
              const isSelected = selectedDimensions && row <= selectedDimensions.rows && col <= selectedDimensions.cols
              return (
                <div
                  key={index}
                  className={`size-cell ${isHovered ? 'hovered' : ''} ${isSelected ? 'selected' : ''}`}
                  onMouseEnter={() => setHoveredDimensions({ rows: row, cols: col })}
                />
              )
            })}
          </div>
          <div className="size-label">
            {hoveredDimensions ? `${hoveredDimensions.rows} x ${hoveredDimensions.cols}` :
              selectedDimensions ? `${selectedDimensions.rows} x ${selectedDimensions.cols}` : ''}
          </div>
        </div>
      )}
    </div>
  )
}