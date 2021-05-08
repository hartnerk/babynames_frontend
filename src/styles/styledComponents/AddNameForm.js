import styled from 'styled-components'

const AddNameFormContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 3vh;
`

const AddNameTitle = styled.div`
  font-size: 24px;
  color: ${({ theme }) => theme.lightest};
`

const AddNameForm = styled.form`
  padding: 10px;
  background-color: ${({ theme }) => theme.darkest};
  border-radius: 10px;
  display: flex;
  align-items: center;
`

const AddNameField = styled.input`
  background-color: ${({ theme }) => theme.page};
  border: 2px solid ${({ theme }) => theme.light};
  border-radius: 10px;
  margin: 0px 10px;
`




export {
  AddNameFormContainer,
  AddNameTitle,
  AddNameForm,
  AddNameField,
}