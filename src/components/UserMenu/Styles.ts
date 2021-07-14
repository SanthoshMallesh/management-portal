import styled from 'styled-components';
import SecondaryButton from '@components/Buttons/SecondaryButton';

export default {
  Wrapper: styled.div`
    position: relative;
  `,

  Icon: styled.div`
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    font-size: 12px;
    border-radius: 50%;
    cursor: pointer;
  `,

  UserIcon: styled.div`
    width: 60px;
    height: 60px;
    font-size: 20px;
    letter-spacing: 1px;
    text-aligin: center;
    line-height: 60px;
    margin-bottom: 10px;
    border-radius: 50%;
    display: inline-block;
    cursor: default;
  `,

  UserWrapper: styled.div`
    animation-duration: 0.2s;
  `,

  UserName: styled.p`
    margin: 0;
    cursor: default;
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  UserEmail: styled.div`
    margin: 0;
    cursor: default;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  UserDetail: styled.div`
    text-aligin: center;
    position: absolute;
    right: -5px;
    width: 160px;
    top: 42px;
    z-index: 2;
    background: #fff;
    border: 1px solid #ccc;
    padding: 8px;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);

    &:before {
      content: ' ';
      right: 10.5px;
      position: absolute;
      bottom: 100%;
      border-width: 9.5%;
      border-style: solid;
      border-color: transparent transparent #fff transparent;
    }
  `,

  TopArrow: styled.div`
    background: #fff;
    border: 1px solid #ccc;
    position: absolute;
    right: 1px;
    width: 15px;
    height: 15px;
    z-index: 999;
    top: 56px;
    z-index: 1;
    transform: translate(-50%, calc(-100%, - 5px)) rotate(45deg);
  `,

  LogoutButton: styled(SecondaryButton)`
    margin-top: 20px;
    margin-bottom: 10px;
  `,
};
