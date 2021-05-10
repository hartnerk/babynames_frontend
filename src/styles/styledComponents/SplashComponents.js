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

const WhyBabySwipe = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column;
  justify-content: space-evenly;
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

export {
  CoverNav,
  CoverButton,
  SplashCoverPhoto,
  SpashTag,
  WhyBabySwipe,
  WhyBlock,
  WhyImg,
  WhyText
}