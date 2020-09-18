import React from "react"
import styled from "styled-components"

const SDeleteButton = styled.button`
  border: none;
  background: transparent;
  &:focus {
      outline: 0;
  }
  font-size: 0.75rem;
  color: #888;
`

const SCard = styled.div`
  Border: 1px solid rgba(0,0,0,.125);
  Border-radius: .25rem;
  Background: #eee;
  Box-shadow: 0 1px 0 rgba(9,30,66,.25);
  margin-bottom: 10px;
  Padding: 6px 8px;
  Cursor: pointer;
  &:hover {
    background: #ddd;
  }
`


function Card({ title, removeCard }) {
    return (
        <SCard>
            <p>{title}</p>
            <SDeleteButton onClick={removeCard}>削除</SDeleteButton>
        </SCard>
    )
}

export default Card