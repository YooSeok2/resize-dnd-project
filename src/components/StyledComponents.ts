import styled, { css } from 'styled-components';

const ShadowEffect = css`
 box-shadow: 4px 12px 30px 6px rgb(0 0 0 / 9%);
  background: #fff;
  border-radius: 2%;
`;

export const DndBox = styled.div`
  width: 150px;
  height: 150px;
  background-color: #fff;
  margin-left: 30px;
  ${ShadowEffect};
`