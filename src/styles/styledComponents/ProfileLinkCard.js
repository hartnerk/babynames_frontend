import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ProfileLinkContainer = styled.div`
  display: flex;
  justify-content: space-around;
  

  @media(max-width: 900px) {
    flex-flow: column;
    align-items: center;
  }
`

const ProfileLinkCard = styled.div`
  height: 250px;
  width: 250px;
  border-radius: 25px;
  margin: 10vh 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25);

  @media(max-width: 900px) {
    margin: 2vh;
  }

  &:hover {
    transform: scale(1.1)
  }

  &:active {
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.75);
  }

  &.set-prefs {
    background: ${({ theme }) => theme.darker};
  }
  &.swipe-names {
    background: ${({ theme }) => theme.dark};
  }
  &.liked-names {
    background: ${({ theme }) => theme.lightest};
  }
`

const ProfileLink = styled(Link)`
  color: ${({ theme }) => theme.page};

  &:hover {
    color: ${({ theme }) => theme.page};
    text-decoration: none;
  }
`

export {
  ProfileLinkContainer,
  ProfileLinkCard,
  ProfileLink
}