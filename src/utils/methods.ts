import React from "react";

export function registerDragEvent (
  onDragChange: (delX:number, delY:number) => void,
  stopPropagation?:boolean
) {
  return (ce:React.MouseEvent<Element,MouseEvent>)=> {
    if(stopPropagation) ce.stopPropagation();

    const mouseMoveHandler = (e:MouseEvent) => {
      const delX = e.screenX - ce.screenX;
      const delY = e.screenY - ce.screenY;
      onDragChange(delX, delY);
    }
    
    const mouseUpHandler = (e: MouseEvent) => {
      console.warn(`>>>> mouse up x:${e.screenX} y:${e.screenY}`);
      document.removeEventListener('mousemove', mouseMoveHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler, { once: true });
  }
}