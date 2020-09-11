import React from "react"
import styled from "styled-components"

const SCardList = styled.div`
  display: flex;
  flex-direction: column;

  width: 272px;
  min-height: 500px;
  margin: 30px 30px 30px 0px;
  padding: 5px;
  box-sizing: border-box;

  cursor: pointer;
  background: #ebecf0;
  border-radius: .25rem;
  & > * {
      margin-bottom: 5px; 
  }
`
const CardList = ({ children }) => {
	return (
		<SCardList>{ children }</SCardList>
)
}
export default CardList
