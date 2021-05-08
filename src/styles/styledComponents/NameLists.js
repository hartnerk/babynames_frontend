import styled from 'styled-components'

const LikedNamesContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-flow: column;
  align-items: center;

`

const NameListItem = styled.div`
  min-width: 225px;
  font-size: 24px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  margin: 7px;
  background-color: ${({ theme }) => theme.darkest};
  color: ${({ theme }) => theme.page};  
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.25); 

`

const Num = styled.div`
  color: ${({ theme }) => theme.evenlighter};
`

const Delete = styled.button`
  background-color: ${({ theme }) => theme.lightest};
  border: none;
  border-radius: 10px;
  color: ${({ theme }) => theme.page};
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); 
  padding: 0px 11px;

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
  LikedNamesContainer,
  NameListItem,
  Num,
  Delete,
}