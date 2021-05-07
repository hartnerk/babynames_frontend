import styled from 'styled-components'

const LoginPageContainer = styled.div`
  width: 100vw;
  height: 92.5vh;
  display: flex;
  align-items: center;
  flex-flow: row;
  justify-content: space-evenly;

  @media (max-width: 800px) {
    margin-top: 11vh;
    flex-flow: column-reverse;
    height: auto;
  }
`

const LoginLeft = styled.div`
  margin: 10vh;

  img {
    height: 20vh;
    width: 20vh;
    border-radius: 50%;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  }

  img:hover {
    transform: rotate(-20deg);
  }
`

// ** Add animation to text? **
const LeftText = styled.div`
  font-size: 48px;
  color: ${({ theme }) => theme.evenlighter};
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
`


export {
  LoginPageContainer,
  LoginLeft,
  LeftText,
}