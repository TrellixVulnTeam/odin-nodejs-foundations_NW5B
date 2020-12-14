import styled from 'styled-components';

export const ReplyContainer = styled.div`
  display: flex;
  margin-top: .5rem;
  &:last-child{
    margin-bottom: .5rem;
  }
`

export const UserPhoto = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`

export const ReplyBody = styled.div`
  padding: .5rem;
  width: 100%;
  border-radius: 10px;
  background: #f0f2f5;
  position: relative;
`

export const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: .5rem;
`

export const ReplyFooter = styled.div`
  display: flex;
  align-items: center;
`

export const FooterLink = styled.p`
  font-weight: ${({bold}) => (bold ? 'bold' : '')};
  font-size: 12px;
  color: ${({color}) => (color ? color : 'black')};
  margin-right: .5rem;
  margin-bottom: 0;
  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
`

export const LikesContainer = styled.div`
  background: white;
  border-radius: 6px;
  position: absolute;
  padding: 0 .2rem;
  bottom: -12px;
  right: 5px;
`
export const ReplyCount = styled.p`
  user-select: none;
  &:hover {
    cursor: pointer;
  }
`