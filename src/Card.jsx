import React from "react"
import styled from "styled-components"

const SDeleteButton = styled.button `
    border: none;
    background: transparent;
    &:focus {
        outline: 0;
    }
    font-size: 0.75rem;
    color: #888;
`

const SCard = styled.div`
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
    background: #eee;
    box-shadow: 0 1px 0 rgba(9,30,66,.25);

    padding: 6px 8px;

    cursor: pointer;
    &:hover {
        background: #ddd;
    }
`


function Card({ title, removeCard }) {
    return (
        <SCard>
            <p>{ title }</p>
            <SDeleteButton onClick={ removeCard }>削除</SDeleteButton>
        </SCard>
    )
}

export default Card