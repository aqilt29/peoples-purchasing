import styled from 'styled-components';
import { Button } from 'reactstrap';

export const LoginButton = styled(Button)`
  background-color: #b89b67;
  border: none;
  font: 700 1em "Poppins", sans-serif;
  padding: .6rem 1.5rem .5rem;
  line-height: 1.2rem;
  font-size: .88em;
  text-transform: uppercase;

  &:hover {
    background-color: #a1824b
  }
`