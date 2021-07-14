import React, { ReactElement, useState, useEffect } from 'react';
import 'animate.css';
import Styles from './Styles';
import IconButton from '../IconButton';
import ArrawCircleUp from '@components/Icons/ArrowCiricleUp';

export default function BackToTop(): ReactElement | null {
  const [isVisible, setIsVisible] = useState(false);
  const offset = 30;

  const listener = (): void => {
    setIsVisible(document.body.scrollTop >= offset || document.documentElement.scrollTop >= offset);
  };

  const scrollTop = (): void => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    listener();

    window.addEventListener('scroll', listener);

    return (): void => {
      window.removeEventListener('scroll', listener);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <Styles.Wrapper className="animate__animated animate__fadeIn animate__fast">
      <IconButton onClick={scrollTop}>
        <ArrawCircleUp />
      </IconButton>
      <Styles.Label onClick={scrollTop}>BACK TO TOP</Styles.Label>
    </Styles.Wrapper>
  );
}
