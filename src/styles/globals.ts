import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle `
body{
  outline: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: -moz-none;
  -o-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-focus-ring-color: transparent;
  outline: 0;
}

input{
  -webkit-user-select: auto;
  -khtml-user-select: auto;
  -moz-user-select: -moz-all;
  -o-user-select: auto;
  user-select: auto;
}

button, a, select{
  outline: 0;
}
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, 
big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, 
dl, dt, dd, menu, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, 
article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, main, menu, nav, output, ruby, 
section, summary, time, mark, audio, video { margin: 0; padding: 0; border: 0; font-size: 100%;
vertical-align: baseline; }  article, aside, details, figcaption, 
figure, footer, header, hgroup, main, menu, nav, section { display: block; } *[hidden] { display: none; }
body { line-height: 1; } menu, ol, ul { list-style: none; } blockquote, q { quotes: none; } blockquote:before, 
blockquote:after, q:before, q:after { content: ''; content: none; } 
table { border-collapse: collapse; border-spacing: 0;}
html,
body {
  padding: 0;
  margin: 0;
  font-family: pretendard, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}
html,
body{
  width: 100%;
  height: 100%;
}

.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover, .ant-menu-horizontal:not(.ant-menu-dark) > 
.ant-menu-submenu:hover, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-active, 
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-active, .ant-menu-horizontal:not(.ant-menu-dark) > 
.ant-menu-item-open, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-open, 
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected, .ant-menu-horizontal:not(.ant-menu-dark) > 
.ant-menu-submenu-selected{
  color:#30a46c;
}
.ant-radio-button-wrapper-checked:not([class*=' ant-radio-button-wrapper-disabled']).ant-radio-button-wrapper:first-child{
  border-right-color:#30a46c;
}
.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover::before{
  background-color:#30a46c;
}
.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover{
  color:#30a46c;
  border-color:#30a46c;
}
.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):first-child{
  font-weight:700 !important;
  border-color: #30a46c;
}
.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):active::before{
  font-weight:700 !important;
  background-color: #30a46c;
}
.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled){
  font-weight:700 !important;
  color:#30a46c;
  border-color:#30a46c;
}
.ant-radio-button-wrapper:hover{
  color:#30a46c;
}
.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)::before{
  background-color: #30a46c;
}
.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):focus-within{
  box-shadow:none;
}
.ant-radio-button-wrapper:focus-within{
  box-shadow:none;
}
.ant-spin-dot-item{
  background-color: #30a46c;
}
.ant-radio-button-wrapper{
  color: #999;
  font-weight:300;
  font-size:15px
}
.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector{
  border-color: #30a46c;
  box-shadow: none;
}
.ant-select:not(.ant-select-disabled):hover .ant-select-selector{
  border-color: #30a46c;
}
.ant-menu-horizontal > .ant-menu-item-selected a{
  color: #30a46c;
}
a {
  color: inherit;
  text-decoration: none;
}

a:hover{
  color:#30a46c;
}

.ant-menu-horizontal > .ant-menu-item a:hover{
  color:#30a46c;
}


* {
  box-sizing: border-box;
}

.slick-slide{
  display:inline-block;
}

.ant-row{
  margin-right:0 !important;
}

.ant-card-cover{
  transform:none !important;
}

.slick-track{
  display: flex;
  align-items:center;
}

.ant-menu-item-selected {
  border: none;
}
`;

export default GlobalStyle;