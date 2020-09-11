import React from "react"
import styled from "styled-components"

const SLogo = styled.div`
	font-size: 24px;
    user-select: none;
    font-family: 'Pacifico', cursive;
`

const SNavigation = styled.div`
    width: 100%;
    color: white;
    background: #0f3460;
    & > * {
        padding: 12px 30px;
    }
`
const Navigation = () => {
    return <SNavigation><SLogo>Kanban</SLogo></SNavigation>
}

export default Navigation
