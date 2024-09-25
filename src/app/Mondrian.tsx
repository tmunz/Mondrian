import React, { forwardRef, useImperativeHandle, useRef, useState } from "react"
import { Tile } from "./Tile"

export interface MondrianProps {
  colors?: string[];
  gridColor?: string;
  gap?: number;
}

export interface MondrianRef {
  reset: () => void;
  canvas: HTMLElement | null;
}

export const DEFAULT = {
  colors: ['#fffffa', '#225095', '#dd0100', '#fac901', '#14080e'],
  gridColor: '#000000',
  gap: 8
};

export const Mondrian = forwardRef<MondrianRef, MondrianProps>(({
  colors = DEFAULT.colors,
  gridColor = DEFAULT.gridColor,
  gap = DEFAULT.gap,
}: MondrianProps, ref) => {

  const [key, setKey] = useState(0);
  const canvasRef = useRef<HTMLElement | null>(null);

  useImperativeHandle(ref, () => ({
    reset() {
      setKey(k => k + 1)
    },
    canvas: canvasRef.current,
  }));

  return <section ref={canvasRef} className='mondrian' style={{ width: '100%', height: '100%' }}>
    <Tile key={key} colors={colors} gridColor={gridColor} gap={gap} />
  </section>
});