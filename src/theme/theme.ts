import { createTheme } from '@mui/material/styles';
export const theme = createTheme({
  palette: {
    primary: { main: '#493444', contrastText: '#ffffff' },
    secondary: { main: '#dfd0e8', contrastText: '#33252e' },
    background: { default: '#faf8f6', paper: '#faf8f6' },
    text: { primary: '#352d32', secondary: '#70646c' },
  },
  typography: {
    fontFamily: '"Manrope Variable", sans-serif',
    button: { textTransform: 'none', fontWeight: 600, fontSize: '0.82rem' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 999, padding: '14px 24px', minHeight: 48, lineHeight: 1.4 },
        outlined: { borderColor: 'currentColor' },
      },
    },
    MuiIconButton: { styleOverrides: { root: { width: 44, height: 44 } } },
    MuiDialog: { styleOverrides: { paper: { borderRadius: 24, backgroundImage: 'none' } } },
    MuiOutlinedInput: { styleOverrides: { root: { borderRadius: 12 } } },
    MuiTab: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600, minHeight: 48, fontSize: 13 },
      },
    },
  },
});
