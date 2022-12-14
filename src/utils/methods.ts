const isTouchScreen = typeof window !== 'undefined' && window.matchMedia('(hover:none) and (pointer:coarse)').matches;

export function registerDragEvent (
  onDragChange: (delX:number, delY:number) => void,
  stopPropagation?: boolean
) {

  if(isTouchScreen) {
    return {
      onTouchStart: (touchEvent: React.TouchEvent<HTMLDivElement>) => {
        if(stopPropagation)touchEvent.stopPropagation();
  
        const touchMoveHandler = (moveEvent: TouchEvent) => {
          if (moveEvent.cancelable) moveEvent.preventDefault();
  
          const deltaX = moveEvent.touches[0].pageX - touchEvent.touches[0].pageX;
          const deltaY = moveEvent.touches[0].pageY - touchEvent.touches[0].pageY;
          onDragChange?.(deltaX, deltaY);
        };
  
        const touchEndHandler = (moveEvent: TouchEvent) => {      
          document.removeEventListener('touchmove', touchMoveHandler);
        };
  
        document.addEventListener('touchmove', touchMoveHandler, { passive: false });
        document.addEventListener('touchend', touchEndHandler, { once: true });
      }
    } 
  }

  return {
    onMouseDown: (ce:React.MouseEvent<Element,MouseEvent>)=> {
      if(stopPropagation)ce.stopPropagation();
  
      const mouseMoveHandler = (e:MouseEvent) => {
        const delX = e.screenX - ce.screenX;
        const delY = e.screenY - ce.screenY;
        onDragChange(delX, delY);
      }
      
      const mouseUpHandler = (e: MouseEvent) => {
        document.removeEventListener('mousemove', mouseMoveHandler);
      };
  
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler, { once: true });
    }
  }
}