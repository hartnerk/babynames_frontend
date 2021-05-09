import styled from 'styled-components'

const CardsContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  margin-top: 10vh;
  color: white;
`
const SwiperCard = styled.div`
  width: 20vw;
  height: 30vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 40px;
  border-radius: 25px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
`

export {
  CardsContainer,
  SwiperCard,
}