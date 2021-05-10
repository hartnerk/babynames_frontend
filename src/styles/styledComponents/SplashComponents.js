import styled from 'styled-components'
import { Link } from 'react-router-dom'
import CoverPhoto from '../../styles/resources/pexels-amina-filkins-5427242.jpg'


const CoverNav = styled.div`
  height: 65px;
  width: 100vw;
  background-color: ${({ theme }) => theme.page};
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 28px;
  color: ${({ theme }) => theme.darkest};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);

  img{
    height: 60px;
    padding: 0px 5px;
  }
`

const CoverButton = styled(Link)`
  margin: 0 15px;
  background-color: ${({ theme }) => theme.dark};
  font-size: 18px;
  border-radius: 10px;
  color: ${({ theme }) => theme.page};
  padding: 5px 10px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

  &:hover {
    background-color: ${({ theme }) => theme.light};
    color: ${({ theme }) => theme.page};
    text-decoration: none;
  }
  &:active {
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.75);
  }
  &:focus {
    outline: none !important;
    outline-style: none !important;
    box-shadow: none !important;
  }
`

const SplashCoverPhoto = styled.div`
  background-image: url(${CoverPhoto});
  height: 92vh;
  margin-top: 65px;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 25px 0 50px 0 white inset, -25px 0 50px 0 white inset, 0 -25px 25px white inset;

  &img {
    width: 100vw;
  }
`

const SpashTag = styled.div`
  color: ${({ theme }) => theme.page};
  font-size: 48px;
  font-weight: 600;
  text-shadow: 5px 5px 4px rgba(0, 0, 0, 0.75);
  margin-top: 300px;
`

const SplashPageSection = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column;
  justify-content: space-evenly;
  margin-bottom: 100px;
`

const WhyBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const WhyImg = styled.img`
  width: 100px;
  height: 100px;
  margin: 0 10px;
`

const WhyText = styled.div`
  width: 25vw;
`

const TeamContainer = styled.div`
  margin: 50px 0 100px 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  
`
const TeamCard = styled(Link)`
  width: 220px;
  color: white;
  display: flex;
  flex-flow: column;
  align-items: center;
  border-radius: 10px;
  padding-bottom: 10px;

  &:hover{
    color: white;
    transform: scale(1.1)
  }
  
  &.darkest {
    background-color: ${({ theme }) => theme.darkest};
  }
  &.darker {
    background-color: ${({ theme }) => theme.darker};
  }
  &.dark {
    background-color: ${({ theme }) => theme.dark};
  }
  &.light {
    background-color: ${({ theme }) => theme.light};
  }
  &.lighter {
    background-color: ${({ theme }) => theme.lighter};
  }
  &.lightest {
    background-color: ${({ theme }) => theme.lightest};
  }
`

const TeamImg = styled.img`
  width: 200px;
  height: 200px;
  margin: 10px;
  border-radius: 10px;
`

export {
  CoverNav,
  CoverButton,
  SplashCoverPhoto,
  SpashTag,
  SplashPageSection,
  WhyBlock,
  WhyImg,
  WhyText,
  TeamContainer,
  TeamCard,
  TeamImg,
}