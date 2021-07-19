import { createGlobalStyle } from 'styled-components';
import { Colors } from '../../styledHelpers/Colors';
import { FontSize } from '../../styledHelpers/FontSize';
import { Margin } from '../../styledHelpers/Margin';

const GlobalStyle = createGlobalStyle`
  .modal {
    &__container {
      max-height: 90vh;
      overflow: auto;
      box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
      width: 700px;
      background: ${Colors.white};
      color: ${Colors.black};
      padding: 20px;
      z-index: 10000;
      border-radius: 2rem;
      position: fixed;
      z-index: 2;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      transition: box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      &:hover {
          box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
      }
      &:active {
          box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
      }
    }
    &__header {
        text-align: center;
        color: ${Colors.navy};
        font-size: ${FontSize[20]};
        margin-bottom: ${Margin[24]};
    }
    &__background {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100vw;
      height: 100vh;
      background-color: ${Colors.blackTransparent};
      z-index: 2;
    }
  }
`;

function Modal() {
  return (
        <GlobalStyle />
  );
}
export default Modal;
