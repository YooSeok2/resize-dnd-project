import styled, { css } from 'styled-components';

const ShadowEffect = css`
  box-shadow: 4px 6px 30px 6px rgb(0 0 0 / 9%);
  background: #fff;
  border-radius: 2%;
`;

export const DndBox = styled.div`
  background-color: #fff;
  cursor: grab;
  ${ShadowEffect};
  position: relative;
  :active {
    scale: 0.98;
    box-shadow: 2px 3px 10px 3px rgb(0 0 0 / 9%);
  }
`

export const ResizeBox = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: red;
  // 우하단
  top: calc(100% - 20px);
  left: calc(100% - 20px);
  // 좌상단
  /////////////
  // 우상단
  /* left: calc(100% - 20px); */
  // 좌하단
   /* top: calc(100% - 20px); */


  // 커서: 좌상단, 우하단
  cursor: se-resize;
  // 커서: 우상단, 좌하단
  /* cursor: sw-resize; */
`