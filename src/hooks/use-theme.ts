import { useContext } from 'react';
import { ThemeContext } from 'contexts/theme-context';

const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
