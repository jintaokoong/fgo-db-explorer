import styled from 'styled-components';
import Colors from 'constants/colors';
import useTheme from 'hooks/use-theme';
import { HTMLProps } from 'react';

const Input = styled.input`
  width: 20%;
  padding: 10px;
  border: 2px solid rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  background-color: ${(props) =>
    props.theme === 'dark' ? Colors.background.dark : Colors.background.light};
  color: ${(props) =>
    props.theme === 'dark' ? Colors.foreground.dark : Colors.foreground.light};
  font-size: 1.05rem;
  caret-color: ${Colors.primary};

  :focus {
    outline: none !important;
    border: 2px solid ${Colors.primary};
  }
`;

interface Props extends HTMLProps<HTMLInputElement> {}

const SkillInput = (props: Props) => {
  const { mode } = useTheme();
  return (
    <Input
      theme={mode}
      type={'number'}
      min={1}
      max={9}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

export default SkillInput;
