import React, { ReactElement, useRef, useState } from 'react';
import useOutsideClick from '@components/hooks/useOutsideClick';
import Styles from './Styles';

interface UserMenuProps {
  name: string;
  email: string;
  className: string;
  logout: () => void;
}

/**
 * Get Color Info By Name
 *
 * @param name
 * @returns
 */

const getColorInfoByName = (name: string): { background: string; color: string } => {
  const colorInfo: { [key: string]: string } = {
    '#003DA6': '#fff',
    '#00A3E0': '#fff',
    '#F1B434': '#fff',
    '#00B140': '#fff',
    '#2F3540': '#fff',
    '#525964': '#fff',
  };

  const colors = Object.keys(colorInfo);

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  hash = ((hash % colors.length) + colors.length) % colors.length;

  return { background: colors[hash], color: colorInfo[colors[hash]] };
};

/**
 * Get Initial By Name
 *
 * @param name
 * @returns
 */

const getInitialByName = (name: string): string => {
  let names: string[] = [];

  if (name) {
    names = typeof name === 'string' ? name.split(' ') : name;
  }

  let initials = names[0].substring(0, 1);

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1);
  } else if (names[0].length > 1) {
    initials += names[0].substring(1, 2);
  }

  return initials.toUpperCase();
};

export default function UserMenu({ name, email, className, logout }: UserMenuProps): ReactElement | null {
  const [isVisible, setIsVisible] = useState(false);
  const [rendered, setRendered] = useState(false);

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => setIsVisible(false));

  if (!name || !email) {
    return null;
  }

  const initial = getInitialByName(name);
  const colorInfo = getColorInfoByName(name);

  return (
    <Styles.Wrapper ref={wrapperRef} className={className}>
      <Styles.Icon
        style={getColorInfoByName(name)}
        title={email}
        onClick={(): void => {
          setIsVisible(!isVisible);
          setRendered(true);
        }}
      >
        {initial}
      </Styles.Icon>
      {rendered && (
        <Styles.UserWrapper className={`animated ${isVisible ? 'fadeIn' : 'fadeOut'}`}>
          <Styles.TopArrow style={!isVisible ? { display: 'none' } : {}} />
          <Styles.UserDetail style={!isVisible ? { display: 'none' } : {}}>
            <Styles.UserIcon style={colorInfo}>{initial}</Styles.UserIcon>
            <Styles.UserName title={name}>
              <strong>{name}</strong>
            </Styles.UserName>
            <Styles.UserEmail title={email}>{email}</Styles.UserEmail>
            <Styles.LogoutButton onClick={logout}>Logout</Styles.LogoutButton>
          </Styles.UserDetail>
        </Styles.UserWrapper>
      )}
    </Styles.Wrapper>
  );
}
