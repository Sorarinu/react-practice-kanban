import React, {useState} from 'react';
import styled from "styled-components"
import CardList from "./CardList"
import Card from "./Card"
import Navigation from "./Navigation"

const SCardLists = styled.div`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding-left: 30px;
`

const SButton = styled.button`
    border: none;
    border-radius: .25rem;
    box-sizing: border-box;
    padding: 0.5rem;
    color: rgba(0,0,0,.5);
    background: transparent;
    &:focus {
        outline: 0;
    }

    &:hover {
        color: rgba(0,0,0,.8);
        background: rgba(0,0,0,.125);
    }
`


function App() {
    const [state, setState] = useState({
        cards: [
            { title: "ここにタイトル" },
        ]
    })

    const {cards} = state

    const addCard = () => {
        cards.push({title: "新規カード"})
        setState({cards})
    }

    const removeCard = (index) => {
        cards.splice(index, 1)
        setState({cards})
    }

    return (
        <>
            <Navigation />
            <SCardLists>
                <CardList>
                    {cards.map((card, i) => <Card title={card.title} key={i} removeCard = {() => removeCard(i)} />)}
                    <SButton onClick={(e) => { addCard();}}>追加</SButton>
                </CardList>
            </SCardLists>
        </>
    )
}

export default App;
