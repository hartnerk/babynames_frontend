import styled from 'styled-components'

const AuthContainer = styled.div`
  background-image: linear-gradient(45deg, ${({ theme }) => theme.dark} 0%, ${({ theme }) => theme.lighter} 100%);
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 800px) {
    height: auto;
  }

  
  .logoimg {
    background-repeat: no-repeat;
    object-fit: contain;
    height: 13vh;
    width: 13vh;
    border-radius: 50%;
    position: absolute;
    z-index: 1;
    margin-bottom: 67vh;
    margin-right: 47vh;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  
  
    &:hover {
      transform: rotate(-20deg);
    }
  }
`

export {
  AuthContainer,
}