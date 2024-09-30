import './MondrianWithControls.styl';
import React, { useRef, useState } from 'react';
import { DEFAULT as MondrianDefaultProps, Mondrian, MondrianRef } from './Mondrian';
import domtoimage from 'dom-to-image';

export const MondrianWithControls = () => {
  const mondrianRef = useRef<MondrianRef | null>(null);
  const [gridColor, setGridColor] = useState(MondrianDefaultProps.gridColor);
  const [colors, setColors] = useState(MondrianDefaultProps.colors);
  const [gap, setGap] = useState(MondrianDefaultProps.gap);
  const [isOpen, setIsOpen] = useState(false);

  const handleColorChange = (index: number, value: string) => {
    const updatedColors = [...colors];
    updatedColors[index] = value;
    setColors(updatedColors);
  };

  const resetSettings = () => {
    setGridColor(MondrianDefaultProps.gridColor);
    setColors(MondrianDefaultProps.colors);
    setGap(MondrianDefaultProps.gap);
  };

  const resetCanvas = () => {
    mondrianRef.current?.reset();
  };

  const download = (dataUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.download = fileName;
    link.href = dataUrl;
    link.click();
  };

  const exportPng = () => {
    if (mondrianRef.current?.canvas) {
      domtoimage.toPng(mondrianRef.current.canvas)
        .then((dataUrl: string) => download(dataUrl, 'mondrian.png'))
        .catch((error: any) => {
          console.error('PNG export failed', error);
        });
    }
  };

  const exportSvg = () => {
    if (mondrianRef.current?.canvas) {
      domtoimage.toSvg(mondrianRef.current.canvas)
        .then((dataUrl: string) => download(dataUrl, 'mondrian.svg'))
        .catch((error: any) => {
          console.error('SVG export failed', error);
        });
    }
  };

  return (
    <div className='mondrian-with-controls'>
      <div
        className={`mondrian-controls ${isOpen ? 'open' : ''}`}
        style={{ backgroundColor: gridColor, gap }}
        onClick={(e) => { if (e.target === e.currentTarget) { setIsOpen(s => !s); } }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className='grid-color'>
          <label>Grid Color</label>
          <input
            type='color'
            value={gridColor}
            onChange={(e) => setGridColor(e.target.value)}
            style={{ backgroundColor: gridColor }}
          />
        </div>

        {colors.map((color, i) => (
          <div key={i} className={`color-picker color-picker-${i}`}>
            <label>-- {i + 1} --</label>
            <input
              type='color'
              value={color}
              onChange={(e) => handleColorChange(i, e.target.value)}
              style={{ backgroundColor: color }}
            />
          </div>
        ))}

        <div className='gap'>
          <label>Gap</label>
          <input
            type='number'
            value={gap}
            onChange={(e) => setGap(Math.max(0, Number.parseInt(e.target.value)))}
          />
        </div>

        <button className='reset-settings' onClick={resetSettings} style={{ background: colors[3] }} title="Reset Settings">
          <span>Reset Settings</span>
        </button>

        <button className='reset-canvas' onClick={resetCanvas} style={{ background: colors[2] }} title="Reset Canvas">
          <span>Reset Canvas</span>
        </button>

        <button className='export-png' onClick={exportPng} style={{ background: colors[0] }} title="Download as PNG">
          <span>PNG</span>
        </button>

        <button className='export-svg' onClick={exportSvg} style={{ background: colors[0] }} title="Download as SVG">
          <span>SVG</span>
        </button>
      </div>
      <Mondrian ref={mondrianRef} colors={colors} gridColor={gridColor} gap={gap} />
    </div >
  );
};
