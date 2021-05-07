import styled from 'styled-components'

const AuthContainer = styled.div`
  background-image: linear-gradient(45deg, ${({ theme }) => theme.dark} 0%, ${({ theme }) => theme.lighter} 100%);
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

export {
  AuthContainer,
}