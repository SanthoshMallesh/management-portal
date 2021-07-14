interface ThemeProps {
  color: {
    [key: string]: {
      [key: string]: string;
    };
  };
  fontSize: {
    [key: string]: string;
  };
}

export type StyleProps<T> = Partial<T> & { theme: ThemeProps };

const THEME_PRIMARY_COLOR = '#003da5';

export default {
  color: {
    default: { labelColor: '#525964' },
    text: {
      primary: '#666',
      primaryHover: THEME_PRIMARY_COLOR,
      secondary: THEME_PRIMARY_COLOR,
      secondaryHover: '#fff',
      themeAlt: '#fff',
    },
    bg: {
      primary: THEME_PRIMARY_COLOR,
      primaryAltHover: '#15366f',
      primaryDisabled: '#6c757d',
      primaryHover: '#fff',
      secondary: '#fff',
      secondaryHover: '#15366f',
    },
    modal: {
      title: '#2f3540',
      description: '#525964',
      footerBorder: '#ebebeb',
    },
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
  },
} as ThemeProps;
