import styled from 'styled-components';
import { AiFillDelete } from 'react-icons/ai';

export const NotificationContainer = styled.div`
  padding: .5rem;
  border-radius: 5px;
  background: ${({clicked}) => (!clicked ? 'rgba(200,0,20,.15)' : 'white')};
  display: flex;
  align-items: center;
  position: relative;
  &:hover {
    background: lightgray;
    cursor: pointer;
  }
`

export const UserImage = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-image: ${({src}) => (`url(${src})`)};
  background-size: 100%;
  background-repeat: no-repeat;
`

export const DeleteButton = styled(AiFillDelete)`
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 24px;
  color: gray;
  transition: all .2s ease-in-out;
  &:hover {
    color: red;
    transform: scale(1.2);
  }
`