import React, { useState, useRef } from 'react';
import { DndBox } from './StyledComponents';
import { registerDragEvent } from '../utils/methods';

function DragAndDrop(){
  const [{x,y}, setPosition] = useState({x:0,y:0});
  const boundaryRef = useRef<HTMLDivElement>(null);
  const dropBox1Ref = useRef<HTMLDivElement>(null);

  const inRange = (v:number, min:number, max:number) => {
    
    if( v < min) return min;
    if( v > max) return max;
    return v;
  }

  const setBoxPosition = (delX:number, delY:number, boxRef:any) => {
    const BOUNDARY_MARGIN = 12;

    const boundary = boundaryRef.current?.getBoundingClientRect();
    const dropBox = boxRef.current?.getBoundingClientRect();
    
    if( boundary && dropBox ){
      return setPosition({
        x: inRange(
          x + delX,
          Math.floor((-boundary.width / 2) + (dropBox.width / 2) + BOUNDARY_MARGIN),
          Math.floor((boundary.width / 2) - (dropBox.width / 2) - BOUNDARY_MARGIN),
        ),
        y: inRange(
          y + delY,
          Math.floor((-boundary.height / 2) + (dropBox.height / 2) + BOUNDARY_MARGIN),
          Math.floor((boundary.height / 2) - (dropBox.height / 2) - BOUNDARY_MARGIN),
        ),
      })
    }
  }

  return (
    <div className='dnd-container' ref={boundaryRef}>
      <DndBox
        style={{transform: `translateX(${x}px) translateY(${y}px)`}} 
        onMouseDown={registerDragEvent((delX:number,delY:number)=>setBoxPosition(delX, delY, dropBox1Ref))}
        ref= {dropBox1Ref}
      />
    </div>
  );
}

export default DragAndDrop;