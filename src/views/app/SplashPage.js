import React from 'react'
import { Link } from 'react-router-dom'

//STYLES
import { CoverNav, CoverButton, SplashCoverPhoto, SpashTag, SplashPageSection, WhyBlock, WhyImg, WhyText, TeamContainer, TeamCard, TeamImg, SplashFooter } from '../../styles/styledComponents/SplashComponents'
import { PageTitle } from '../../styles/styledComponents/PageTitle'
import logo from '../../styles/resources/binkylogo.png'
import jacob from '../../styles/resources/jacob.jpeg'
import jon from '../../styles/resources/jon.jpeg'
import kyle from '../../styles/resources/kyle.jpeg'
import krysta from '../../styles/resources/krysta.jpeg'
import caitlin from '../../styles/resources/caitlin.png'

const SplashPage = () => {
  return (
    <div style={{ display: 'flex', flexFlow: 'column' }}>
      <CoverNav>
        <div>
          <img src={logo} alt='logo' />
          &nbsp;
          baby swiper
        </div>
        <div>
          <CoverButton to='/signup'>Sign Up</CoverButton>
          <CoverButton to='/login'>Log In</CoverButton>
        </div>
      </CoverNav>
      <SplashCoverPhoto>
        <SpashTag>Placeholder for a super cool tagline.</SpashTag>
      </SplashCoverPhoto>
      <SplashPageSection>
        <PageTitle className='splash-why'>Why Baby Swiper?</PageTitle>
        <WhyBlock>
          <WhyImg src={logo} alt='logo' />
          <WhyText><span style={{ color: '#AD588C' }}>Baby Swiper</span> is a fun, interactive way for you and a partner to narrow down an infinite list of baby names.  Create an account to start swiping on baby names you like and dislike.</WhyText>
        </WhyBlock>
        <WhyBlock>
          <WhyText>Swipe through an extensive catalog of names and save your likes to a personalized list by swiping right.  Then order your likes to keep track of your front runners.</WhyText>
          <WhyImg src={logo} alt='swiper' />
        </WhyBlock>
        <WhyBlock>
          <WhyImg src={logo} alt='info' />
          <WhyText>Gain insight into each liked name on your list.  Learn about the name's origin as well as popularity throughout the years, and more!</WhyText>
        </WhyBlock>
        <WhyBlock>
          <WhyText>Link with a partner account and start seeing names that you and your partner have matched on.  Choosing a baby name has never been easier or more fun.</WhyText>
          <WhyImg src={logo} alt='share' />
        </WhyBlock>
        <WhyBlock>
          <WhyText><Link style={{ color: '#AD588C' }}>Sign up</Link> for an account and start swiping names today!</WhyText>
        </WhyBlock>
      </SplashPageSection>
      <div>
        <PageTitle className='splash-why'>Meet Team Baby Swiper</PageTitle>
        <TeamContainer>
          <TeamCard className='darkest' href='http://jamesbrooks.tech/'>
            <TeamImg src={logo} alt='James' className='darkest' />
            James Brooks
          </TeamCard>
          <TeamCard className='light' href='https://www.linkedin.com/in/jon-carlton42/'>
            <TeamImg src={jon} alt='Jon' />
            Jon Carlton
          </TeamCard>
          <TeamCard className='darker' href='https://www.linkedin.com/in/jacob-crawford-7033a918/'>
            <TeamImg src={jacob} alt='Jacob' />
            Jacob Crawford
          </TeamCard>
          <TeamCard className='lightest' href='https://www.linkedin.com/in/kyle-hartner/'>
            <TeamImg src={kyle} alt='Kyle' />
            Kyle Hartner
          </TeamCard >
          <TeamCard className='lighter' href='https://www.linkedin.com/in/krysta-pfeifer/'>
            <TeamImg src={krysta} alt='Krysta' />
            Krysta Pfeifer
          </TeamCard>
          <TeamCard className='dark' href='https://www.linkedin.com/in/caitlin-wilson-01/'>
            <TeamImg src={caitlin} alt='Caitlin' />
            Caitlin Wilson
          </TeamCard>
        </TeamContainer>
      </div>
      <SplashFooter />
    </div >
  )
}

export default SplashPage
