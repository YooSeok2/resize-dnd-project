import React, { useState, useRef, useEffect } from 'react';
import { DndBox, ResizeBox } from './StyledComponents';
import { registerDragEvent } from '../utils/methods';

const BOUNDARY_MARGIN = 12;
const MIN_W = 80;
const MIN_H = 80;

function DragAndDrop(){
  const [{x,y,w,h}, setConfig] = useState({x:0,y:0, w: 150, h:150});
  const boundaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const boundary = boundaryRef.current?.getBoundingClientRect();

    if (boundary) {
      const DEFAULT_W = 240;
      const DEFAULT_H = 120;
      setConfig({
        x: Math.floor(boundary.width / 2 - DEFAULT_W / 2),
        y: Math.floor(boundary.height / 2 - DEFAULT_H / 2),
        w: DEFAULT_W,
        h: DEFAULT_H,
      });
    }
  }, []);

  const inRange = (v:number, min:number, max:number) => {
    if( v < min) return min;
    if( v > max) return max;
    return v;
  }

  return (
    <div className='dnd-container' ref={boundaryRef}>
      <DndBox
        // style={{transform: `translateX(${x}px) translateY(${y}px)`}} 
        style={{left:x, top:y, width:w, height:h}} 
        {...registerDragEvent((delX:number,delY:number)=>{
          if(!boundaryRef.current) return;
          
          const boundary = boundaryRef.current?.getBoundingClientRect();
          setConfig({
            x: inRange(
              x + delX,
              BOUNDARY_MARGIN, boundary.width - w - BOUNDARY_MARGIN
            ),
            y: inRange(
              y + delY,
              BOUNDARY_MARGIN, boundary.height - h - BOUNDARY_MARGIN
            ),
            w,
            h
          })
          
        },true)}
          
      > 
        <ResizeBox 
          {...registerDragEvent((delX:number,delY:number)=>{
            if(!boundaryRef.current) return;
            
            const boundary = boundaryRef.current?.getBoundingClientRect();
            setConfig({
              x,
              y,
              w: inRange(w + delX, MIN_W, boundary.width - x - BOUNDARY_MARGIN),
              h: inRange(h + delY, MIN_H, boundary.height - y - BOUNDARY_MARGIN),
            })
          }, true)}
          
        />
      </DndBox>
    </div>
  );
}

export default DragAndDrop;