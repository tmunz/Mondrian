import './Tile.styl';
import React, { useState } from 'react';

interface TileProps {
  level: number;
  colors?: string[];
  gridColor?: string;
  gap?: number;
}

export const Tile = ({
  level,
  colors = ['#ffffff', '#225095', '#dd0100', '#fac901'],
  gridColor = '#000000',
  gap = 4,
}: TileProps) => {
  const [gridTemplate, setGridTemplate] = useState<{ columns: number[], rows: number[] } | null>(null);
  const [indicator, setIndicator] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });
  const [colorIndex, setColorIndex] = useState(0);

  const calculateSplit = (e: React.MouseEvent<HTMLDivElement>): { columns: number[], rows: number[] } => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    const { width, height } = { width: (target as any).offsetWidth, height: (target as any).offsetHeight };
    const minDistance = 0.1;
    const columns = offsetX < width * minDistance || offsetX > width * (1 - minDistance) ? [offsetX] : [offsetX, width - offsetX];
    const rows = offsetY < width * minDistance || offsetY > height * (1 - minDistance) ? [offsetY] : [offsetY, height - offsetY];
    return (columns.length === 1 && rows.length === 1) ? { columns: [], rows: [] } : { columns, rows };
  }

  const resetIndicator = () => {
    setIndicator({ x: null, y: null });
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) {
      resetIndicator();
    } else {
      const potentialSplit = calculateSplit(e);
      setIndicator({
        x: potentialSplit.columns.length >= 2 ? potentialSplit.columns[0] : null,
        y: potentialSplit.rows.length >= 2 ? potentialSplit.rows[0] : null,
      });
    }
  };

  const handleMouseLeave = () => {
    resetIndicator();
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (gridTemplate || e.target !== e.currentTarget) return;
    const { columns, rows } = calculateSplit(e);
    if (columns.length > 0 && rows.length > 0) {
      setGridTemplate({ columns, rows });
    }
  };

  let backgroundColor = 'transparent';
  if (level === 0) {
    backgroundColor = gridColor;
  } else if (!gridTemplate) {
    backgroundColor = colors[colorIndex];
  }

  return (
    <div className={`tile level-${level}`}>
      {gridTemplate ? (
        <div
          className='grid'
          style={{
            gridTemplateColumns: gridTemplate.columns.map(c => `${c}fr`).join(' '),
            gridTemplateRows: gridTemplate.rows.map(c => `${c}fr`).join(' '),
            gap: `${gap}px`,
            backgroundColor
          }}
        >
          {new Array((gridTemplate?.columns.length ?? 0) * (gridTemplate?.rows.length ?? 0)).fill(0).map((_, index) => (
            <Tile key={index} level={level + 1} colors={colors} gap={gap} />
          ))}
        </div>
      ) : (
        <div
          className='controls'
          onClick={handleClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ backgroundColor }}
        >
          {level != 0 && colors.map((c, i) => (
            <button
              key={i}
              style={{ backgroundColor: c }}
              onClick={() => setColorIndex(i)}
            />
          ))}
          {indicator.y && <div
            className="crosshair crosshair-horizontal"
            style={{
              top: indicator.y,
              left: 0,
              width: '100%',
              height: 2,
            }}
          />}
          {indicator.x && <div
            className="crosshair crosshair-vertical"
            style={{
              top: 0,
              left: indicator.x,
              width: 2,
              height: '100%',
            }}
          />}
        </div>
      )}
    </div>
  );
};
