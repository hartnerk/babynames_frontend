import styled from 'styled-components'
import { ButtonGroup } from 'react-bootstrap'

const AddNameFormContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 3vh;
  font-size: 16px;
`

const AddNameTitle = styled.div`
  font-size: 24px;
  color: ${({ theme }) => theme.evenlighter};
`

const AddNameForm = styled.form`
  width: 60vw;
  padding: 10px;
  background-color: ${({ theme }) => theme.darkest};
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25);

`

const AddNameField = styled.input`
  background-color: ${({ theme }) => theme.page};
  border: 2px solid ${({ theme }) => theme.lightest};
  border-radius: 10px;
  padding: 2px 4px; 
  
  &:focus {
    outline: none !important;
    outline-style: none !important;
    box-shadow: none !important;
  }
`

const AddButton = styled.button`
  background-color: ${({ theme }) => theme.lightest};
  border: none;
  border-radius: 10px;
  color: ${({ theme }) => theme.page};
  padding: 5px 15px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

  &:hover {
    background-color: ${({ theme }) => theme.light};
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

export {
  AddNameFormContainer,
  AddNameTitle,
  AddNameForm,
  AddNameField,
  AddButton,
  ButtonGroup
}