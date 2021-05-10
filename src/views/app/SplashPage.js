import React from 'react'

//STYLES
import { CoverNav, CoverButton, SplashCoverPhoto, SpashTag, WhyBabySwipe, WhyBlock, WhyImg, WhyText } from '../../styles/styledComponents/SplashComponents'
import { PageTitle } from '../../styles/styledComponents/PageTitle'
import logo from '../../styles/resources/binkylogo.png'

const SplashPage = () => {
  return (
    <div>
      <CoverNav>
        <div>
          <img src={logo} />
          &nbsp;
          baby swiper
        </div>
        <div>
          <CoverButton>Sign Up</CoverButton>
          <CoverButton>Log In</CoverButton>
        </div>
      </CoverNav>
      <SplashCoverPhoto>
        <SpashTag>Placeholder for a super cool tagline.</SpashTag>
      </SplashCoverPhoto>
      <WhyBabySwipe>
        <PageTitle className='splash-why'>Why Baby Swiper?</PageTitle>
        <WhyBlock>
          <WhyImg src={logo} />
          <WhyText>Baby Swiper is a fun, interactive way for you and a partner to narrow down an infinite list of baby names.  Create an account to start swiping on baby names you like and dislike.</WhyText>
        </WhyBlock>
        <WhyBlock>
          <WhyText>Save a list of all the baby names you have liked on and refer back to it at any time.</WhyText>
          <WhyImg src={logo} />
        </WhyBlock>
        <WhyBlock>
          <WhyImg src={logo} />
          <WhyText>Gain insight into each like name on your list.  Learn about the name's origin as well as popularity throughout the years, celebrities who share that name and more!</WhyText>
        </WhyBlock>
        <WhyBlock>
          <WhyText>Link your account with a partner account and start seeing names that you and your partner have matched on.  Choosing a baby name has never been easier or more fun.  Join today!</WhyText>
          <WhyImg src={logo} />
        </WhyBlock>
      </WhyBabySwipe>
    </div>
  )
}

export default SplashPage
