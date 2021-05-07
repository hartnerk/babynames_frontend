import styled from 'styled-components'
import { Link } from 'react-router-dom'


// ** Image is a little fuzzy.  Would like to try to fix that. **
// ** Also would like to add a cooler animation on the logo **
const SwiperForm = styled.form`
  height: 70vh;
  width: 50vh;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.page};
  box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25);
  }
`

const SwiperFormTitle = styled.div`
  font-size: 6vh;
  font-weight: 600;
  color: ${({ theme }) => theme.darkest};
  padding-top: 4vh;
`

const SwiperFormFieldContainer = styled.div`
  height: 80%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  font-size: 2.5vh;
  font-weight: 300;

  &.login-fields {
    margin-top: 3.5vh;
  }
`
// ** Figure out background fill color with text inputed.  Would like to remove or change. **
const SwiperFormField = styled.input`
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

const SwiperFormButton = styled.button`
  background-color: ${({ theme }) => theme.dark};
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

  &.login-btn {
    margin-bottom: 6vh;
  }
`

const SwiperRedirect = styled.div`
  padding: 3vh 0vh;
`

const SwiperLink = styled(Link)`
  color: ${({ theme }) => theme.dark} !important;
  text-decoration: underline;

  &:hover {
    color: ${({ theme }) => theme.light} !important;
  }
`


export {
  SwiperForm,
  SwiperFormTitle,
  SwiperFormFieldContainer,
  SwiperFormField,
  SwiperFormButton,
  SwiperRedirect,
  SwiperLink,
}