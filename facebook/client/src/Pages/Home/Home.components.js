import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const RoundImage = styled.div`
  border-radius: 20px;
  width: 36px;
  height: 36px;
  background-image: ${({src}) => (`url(${src})`)};
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 2;
`

export const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: .5rem;
  border-radius: 6px;
  color: black;
  font-size: 18px;
  transition: all .2s ease-in-out;
  &:hover {
    cursor: pointer;
    color: black;
    background: lightgray;
    text-decoration: none;
  }
`