import styled from 'styled-components';

export default {
  NavBar: styled.nav`
    height: 54px;
    background: white;
    z-index: 1031;
    box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    align-items: center;
    display: flex;
    padding: 8px 16px;

    .nav-menu {
      position: relative;
      margin-left: 32px;
      &:before {
        content: ' ';
        position: absolute;
        left: -16px;
        height: 32px;
        top: 50%;
        margin-top: -16px;
        width: 1px;
        background: #b2b2b2;
      }
    }
  `,

  EmptySpace: styled.div`
    margin-left: auto;
  `,
};
