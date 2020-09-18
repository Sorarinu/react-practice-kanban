import React, { useState } from 'react';
import styled from "styled-components"
import CardList from "./CardList"
import Card from "./Card"
import Navigation from "./Navigation"
import CreateModal from './CreateModal'

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
        ],
        shownCreateCardModal: false
    })

    const { cards, shownCreateCardModal } = state

    const openCreateCardModal = () => {
        setState({
            ...state,
            shownCreateCardModal: true
        })
    }
    const closeCreateCardModal = () => {
        setState({
            ...state,
            shownCreateCardModal: false
        })
    }

    const addCard = (newCard) => {
        cards.push(newCard)
        setState({
            ...state,
            cards,
            shownCreateCardModal: false        
        })
    }

    const removeCard = (index) => {
        cards.splice(index, 1)
        setState({
            ...state,
            cards
        })
    }

    return (
        <>
            { shownCreateCardModal ?
                <CreateModal
                    onAdd={addCard}
                    onClose={closeCreateCardModal}
                /> : <></>
            }
            <Navigation />
            <SCardLists>
                <CardList>
                    { cards.map((card, i) => <Card title={ card.title } key={ i } removeCard = { () => removeCard(i) } />)}
                    <SButton onClick={ (e) => {
                        openCreateCardModal()
                    }}>追加</SButton>
                </CardList>
            </SCardLists>
        </>
    )
}

export default App;
