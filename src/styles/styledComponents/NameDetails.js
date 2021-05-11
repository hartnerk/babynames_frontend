import styled from 'styled-components'

const DetailsForm = styled.form`
  height: 70vh;
  width: 50vh;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.darkest};
  box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25);
  }
`

export {
  DetailsForm,
}