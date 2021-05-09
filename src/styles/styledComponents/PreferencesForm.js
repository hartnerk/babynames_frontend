import styled from 'styled-components'
import { Link } from 'react-router-dom'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';


// ** Image is a little fuzzy.  Would like to try to fix that. **
// ** Also would like to add a cooler animation on the logo **
const PrefForm = styled.form`
  height: 70vh;
  width: 50vh;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.darkest};
  box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25);
  }
`

const PrefFormTitle = styled.div`
  font-size: 6vh;
  font-weight: 600;
  color: ${({ theme }) => theme.page};
  padding: 4vh 0 5vh 0;
`

// ** Figure out background fill color with text inputed.  Would like to remove or change. **
const PrefFormField = styled.input`
  width: 80%;
  border: 2px solid ${({ theme }) => theme.dark};
  border-radius: 10px;
  padding: .75vh 1.5vh;
  margin: 1.25vh; 
  font-style: italic;

  &:focus {
    outline: none !important;
    outline-style: none !important;
    box-shadow: none !important;
  }
  $:valid {
    background-color: red;
  }
`


const PrefFormButton = styled.button`
  background-color: ${({ theme }) => theme.lightest};
  color: ${({ theme }) => theme.page};
  border: none;
  border-radius: 10px;
  padding: 1vh 3vh;
  margin: 2vh;
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

const PrefLink = styled(Link)`
  color: ${({ theme }) => theme.dark} !important;
  text-decoration: underline;

  &:hover {
    color: ${({ theme }) => theme.light} !important;
  }
`

const PrefDropdownButton = styled(DropdownButton)`
  button {
    background-color: ${({ theme }) => theme.lightest} !important;
    border-color: ${({ theme }) => theme.darkest} !important;
  }
  ul.dropdown-menu {
    max-height: 5em;
    overflow-y: scroll;
  }
  margin-top: 1em; 
  &:hover {
    color: ${({ theme }) => theme.light} !important;
  }
`
const PrefDropdown = styled(Dropdown.Item)`
  &:hover {
    color: ${({ theme }) => theme.light} !important;
  }
`
const PrefFormNoteText = styled.div`
  font-size: 1em;
  font-weight: 5em;
  color: ${({ theme }) => theme.page};
  padding-top: 4vh;
`
export {
  PrefForm,
  PrefFormTitle,
  PrefFormField,
  PrefFormButton,
  PrefLink,
  PrefDropdownButton,
  PrefDropdown,
  PrefFormNoteText,
}