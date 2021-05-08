import styled from 'styled-components'

const PageTitle = styled.div`
  font-size: 36px;
  color: ${({ theme }) => theme.darkest};
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);

  &.profile {
    margin-top: 15vh;
  }

  &.likes {
    margin-top: 5vh;
  }
`

export {
  PageTitle,
}