const isTouchScreen =
  typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches;

const startEventName = isTouchScreen ? 'touchstart' : 'mousedown';
const moveEventName = isTouchScreen ? 'touchmove' : 'mousemove';
const endEventName = isTouchScreen ? 'touchend' : 'mouseup';

const getDelta = (startEvent: MouseEvent | TouchEvent, moveEvent: MouseEvent | TouchEvent) => {
  if (isTouchScreen) {
    const se = startEvent as TouchEvent;
    const me = moveEvent as TouchEvent;

    return {
      deltaX: me.touches[0].pageX - se.touches[0].pageX,
      deltaY: me.touches[0].pageY - se.touches[0].pageY,
    };
  }

  const se = startEvent as MouseEvent;
  const me = moveEvent as MouseEvent;

  return {
    deltaX: me.pageX - se.pageX,
    deltaY: me.pageY - se.pageY,
  };
};

export type DropItem = {
  droppableId: string;
  index: number;
};

export type DropEvent = {
  source: DropItem;
  destination?: DropItem;
};

export default function registDND(onDrop: (event: DropEvent) => void) {
  const clearDroppableShadow = () => {
    document.querySelectorAll<HTMLElement>('[data-droppable-id]').forEach((element) => {
      element.style.boxShadow = 'none';
    });
  };
  const handlerStart = (se: MouseEvent | TouchEvent) => {
    const item = (se.target as HTMLElement).closest<HTMLElement>('.dnd-item');
    // item 자체가 없거나 현재 이벤트중인 item이 있을 경우 반환
    if (!item || item.classList.contains('moving')) return;

    // onDrop에 넘겨줄 변수 정의
    let destination: HTMLElement | null | undefined;
    let destinationItem: HTMLElement | null | undefined;
    let destinationIndex: number;
    let destinationDroppableId: string;

    const source = item.closest<HTMLElement>('[data-droppable-id]');
    if (!source) return console.warn('Need `data-droppable-id` at dnd-item parent');
    if (!item.dataset.index) return console.warn('Need `data-index` at dnd-item');
    // 다른 보드로 이동시 생성하는 임시 sourceItem
    let movingItem: HTMLElement;
    const sourceIndex = Number(item.dataset.index);
    const sourceDroppableId = source.dataset.droppableId!;

    // 클릭한 item을 직접 움직일 수 없으니 고스트 아이템을 만들어서 활용한다.
    // 초기 클릭했을 당시 아이템의 위치와 크기를 가져온다.
    const itemRect = item.getBoundingClientRect();
    const ghostItem = item.cloneNode(true) as HTMLElement;
    // 고스트 아이템을 생성한다
    ghostItem.classList.add('ghost');
    ghostItem.style.position = 'fixed';
    ghostItem.style.left = `${itemRect.left}px`;
    ghostItem.style.top = `${itemRect.top}px`;
    ghostItem.style.width = `${itemRect.width}px`;
    ghostItem.style.height = `${itemRect.height}px`;
    ghostItem.style.pointerEvents = 'none';
    ghostItem.style.border = '2px solid rgb(96 165 250)';
    ghostItem.style.opacity = '0.95';
    ghostItem.style.boxShadow = '0 30px 60px rgba(0, 0, 0, .2)';
    ghostItem.style.transform = 'scale(1.05)';
    ghostItem.style.transition = 'transform 200ms ease, opacity 200ms ease, boxShadow 200ms ease';

    item.classList.add('placeholder');
    item.style.cursor = 'grabbing';

    document.body.style.cursor = 'grabbing';
    // 생성한 고스트아이템을 body에 추가한다.
    document.body.appendChild(ghostItem);
    // ghostitem이 아닌 다른 아이템은 밀리거나 할 때 자연스럽게 보이도록 에니메이션 추가
    document.querySelectorAll<HTMLElement>('.dnd-item:not(.ghost)').forEach((item) => {
      item.style.transition = 'all 200ms ease';
    });

    const moveHandler = (me: MouseEvent | TouchEvent) => {
      // touch 이벤트 중 scrollevent가 겹쳐서 발생하지 않도록 방지
      if (me.cancelable) me.preventDefault();
      
      // 이동중인 요소의 위치를 가져온다
      const { deltaX, deltaY } = getDelta(se, me);
      // 고스트 아이템을 이동시킨다.
      ghostItem.style.top = `${itemRect.top + deltaY}px`;
      ghostItem.style.left = `${itemRect.left + deltaX}px`;

      // 이동중인 고스트아이템 영역 확인
      const ghostItemRect = ghostItem.getBoundingClientRect();

       // 중앙점을 기준으로 Drop 영역을 확인한다.
       const pointTarget = document.elementFromPoint(
        // 중앙점 계산법 (left + width / 2, top + height / 2)
        ghostItemRect.left + ghostItemRect.width / 2,
        ghostItemRect.top + ghostItemRect.height / 2,
      );
      
      const currentDestinationItem = pointTarget?.closest<HTMLElement>('.dnd-item');
      const currentDestination = pointTarget?.closest<HTMLElement>('[data-droppable-id]');
      const currentDestinationDroppableId = currentDestination?.dataset.droppableId;
      const currentDestinationIndex = Number(currentDestinationItem?.dataset.index);

      const currentSourceItem = movingItem ?? item;
      const currentSourceIndex = Number(currentSourceItem.dataset.index);
      const currentSource = currentSourceItem.closest<HTMLElement>('[data-droppable-id]')!;
      const currentSourceDroppableId = currentSource.dataset.droppableId;

      // active 상태의 droppable box에 박스 쉐도우 효과 주고 아닌 곳은 제거
      clearDroppableShadow();
      if (currentDestination) {
        currentDestination.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
      }

      // 만약 타겟 엘리먼트가 같은 위치에 있거나 이동중이라면 이후 동작을 수행하지 않는다.
      if (
        currentDestinationItem?.isSameNode(currentSourceItem) ||
        currentDestinationItem?.classList.contains('moving')
      ) {
        return;
      }

      if ( // 다른 보드로 이동할 경우에 로직
        currentDestination &&
        currentDestinationDroppableId &&
        currentDestinationDroppableId !== currentSourceDroppableId
      ) {
        // react에서 element의 dom을 직접으로 움직이는건 불가능하니 movingItem을 생성하여
        // 다른 보드에 추가시키고 기존의 아이템은 제거한다.
        if (!movingItem){
          movingItem = item.cloneNode(true) as HTMLElement;
          item.style.display = 'none';
        }
        currentDestination.appendChild(movingItem);
        // 이동된 보드를 기준으로 도착지 정보를 갱신한다.
        destination = currentDestination;
        destinationDroppableId = currentDestinationDroppableId;
        destinationIndex = currentDestination.querySelectorAll('.dnd-item').length-1;

        // 아이템이 이동되었으므로 각 보드들의 아이템 index를 다시 갱신한다.
        currentDestination.querySelectorAll<HTMLElement>('.dnd-item').forEach((ele, index) => {
          ele.dataset.index = index + '';
          ele.style.transform = '';
          ele.classList.remove('moved');
        });
        currentSource.querySelectorAll<HTMLElement>('.dnd-item').forEach((ele, index) => {
          ele.dataset.index = index + '';
          ele.style.transform = '';
          ele.classList.remove('moved');
        })
      }
      //    console.log(
      //   `'${currentSourceDroppableId}': ${currentSourceIndex} -> '${currentDestinationDroppableId}': ${currentDestinationIndex}`,
      // );
      // 위치를 바꿀 타겟이 없다면 이후 동작을 수행하지 않는다.
      if (!currentDestinationItem) return;

      // 아이템의 위치를 바꾸기 위해 이동되어어야할 거리를 구한다.
      const ITEM_MARGIN = 12;
      const eachItemDistance = itemRect.height + ITEM_MARGIN;

      // 도착지 정보 갱신
      destinationItem = currentDestinationItem;
      destination = currentDestinationItem.closest<HTMLElement>('[data-droppable-id]');
      destinationDroppableId = destination?.dataset.droppableId + '';

      let indexDiff = currentDestinationIndex - currentSourceIndex;
      // 위에서 아래로 간다면 (ex. index 1 -> 3)
      const isForward = currentSourceIndex < currentDestinationIndex;
      // 움직였던 item으로 다시 움직이는지 여부
      const isDestinationMoved = destinationItem.classList.contains('moved');
      if (isDestinationMoved) {
        indexDiff = isForward ? indexDiff - 1 : indexDiff + 1;
      }

      destinationIndex = currentSourceIndex + indexDiff;

      const transX = indexDiff * eachItemDistance;
      currentSourceItem.style.transform = `translate3d(0, ${transX}px, 0)`;

      // indexdiff 사이에 있는 아이템들 이동
      let target = currentDestinationItem;
      while (
        target &&
        target.classList.contains('dnd-item') &&
        !target.classList.contains('placeholder')
        ){
          if (isDestinationMoved) {
            target.style.transform = '';
            target.classList.remove('moved');
            target = (
              isForward ? target.nextElementSibling : target.previousElementSibling
            ) as HTMLElement;
          } else {
            target.style.transform = `translate3d(0, ${isForward ? -eachItemDistance : eachItemDistance}px, 0)`;
            target.classList.add('moved');
            target = (
              isForward ? target.previousElementSibling : target.nextElementSibling
            ) as HTMLElement;
          }
      }

      currentDestinationItem.classList.add('moving');
      currentDestinationItem.addEventListener(
        'transitionend',
        () => {
          currentDestinationItem?.classList.remove('moving');
        },
        { once: true },
      );
      // 가끔 transitioned가 씹히는 경우가 발생하니 보완하기 위해 추가적으로 setTimeout으로 제거한다
      setTimeout(() => {
        currentDestinationItem?.classList.remove('moving');
      }, 200);
    }
    // 드래그가 끝났을 때
    const endHandler = () => {
      const sourceItem = movingItem ?? item;
      item.classList.remove('placeholder');
      movingItem?.classList.remove('placeholder');

      // 초기에 지정한 document의 cursor를 초기화
      document.body.removeAttribute('style');
      clearDroppableShadow();

      const itemRect = sourceItem.getBoundingClientRect();
      ghostItem.classList.add('moving');
      ghostItem.style.left = `${itemRect.left}px`;
      ghostItem.style.top = `${itemRect.top}px`;
      ghostItem.style.opacity = '1';
      ghostItem.style.transform = 'none';
      ghostItem.style.borderWidth = '0px';
      ghostItem.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.15)';
      ghostItem.style.transition = 'all 200ms ease';

      ghostItem.addEventListener('transitionend', () => {
        setTimeout(() => {
          document.querySelectorAll<HTMLElement>('.dnd-item').forEach((item) => {
            item.removeAttribute('style');
            item.classList.remove('moving', 'moved');
          });

          item.classList.add('dnd-item');
          item.removeAttribute('style');
          movingItem?.remove();
        }, 0);

        ghostItem.remove();
        // console.log(
        //   `result >> '${sourceDroppableId}': ${sourceIndex} -> '${destinationDroppableId}': ${destinationIndex}`,
        // );

        onDrop({
          source: {
            droppableId: sourceDroppableId,
            index: sourceIndex,
          },
          destination: destination
            ? {
                droppableId: destinationDroppableId,
                index: destinationIndex,
              }
            : undefined,
        });
      }, 
      {once: true});
      document.removeEventListener(moveEventName, moveHandler);
    }

    document.addEventListener(moveEventName, moveHandler, { passive: false });
    document.addEventListener(endEventName, endHandler, { once: true });
  }
  
  document.addEventListener(startEventName, handlerStart);

  return () => document.removeEventListener(startEventName, handlerStart);
  
}