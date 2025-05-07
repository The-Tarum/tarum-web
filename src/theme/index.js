
export const theme = {
  colors: {
    primary: {
      dark: '#00447c',
      light: '#1f73f7',
    },
    secondary: '#00ad6f',
    tag: '#6cb33f',
    pillSelected: '#f8d45d',
    background: {
      light: '#ffffff',
      dark: '#f5f5f5',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#666666',
    }
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  }
};

export const getResponsiveStyle = (styles) => {
  return {
    '@media (min-width: 640px)': styles.sm,
    '@media (min-width: 768px)': styles.md,
    '@media (min-width: 1024px)': styles.lg,
    '@media (min-width: 1280px)': styles.xl,
  };
};
