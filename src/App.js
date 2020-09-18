import React, { useState } from 'react';
import { ReactSortable } from 'react-sortablejs'
import styled from "styled-components"
import CardList from "./CardList"
import Card from "./Card"
import Navigation from "./Navigation"
import CreateModal from './CreateModal'

const SCardLists = styled.div`
    display: flex;
    width: 100%;
    padding-left: 30px;
    box-sizing: border-box;
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

const SAddListButton = styled(SButton)` /* SButtonのstyleを上書きして新しいコンポーネントを作成 */
    margin: 30px 30px 30px 0px;
    min-width: 128px;
`

const SListTitle = styled.div`
    font-weight: bold; /* 太字 */
    padding: 5px; /* 適度な余白 */
    flex-grow: 1; /* 要素を最大限伸ばす */
    /* タイトルが長い時「...」にする */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width:0;
`

const SListTitleWrapper = styled.div`
    display: flex; /* タイトルとボタンを横並び */
`
const SRemoveCardListButton = styled(SButton)`
    font-size: 0.8rem; /* 削除ボタンの文字を少し小さく*/
`

function App() {
    const [state, setState] = useState({
        cardLists: [
            {
                title: 'リストタイトルA',
                cards: [{ title: 'カードタイトル' }]
            },
            {
                title: 'リストタイトルB',
                cards: [{ title: 'カードタイトル' }]
            },
            {
                title: 'リストタイトルC',
                cards: [{ title: 'カードタイトル' }]
            }
        ],
        targetListIndex: -1, // Listを指定した動作を実現するため
        shownCreateCardModal: false,
        shownCreateCardListModal: false // カードリスト追加のモーダル表示制御変数
    })

    const { cardLists, targetListIndex, shownCreateCardModal, shownCreateCardListModal } = state

    const addCardList = (newCardList) => {
        cardLists.push({ cards: [], ...newCardList })
        setState({ ...state, cardLists, shownCreateCardListModal: false })
    }

    const removeCardList = ( listIndex ) => {
        if (window.confirm('削除しますか？')) {
          cardLists.splice(listIndex, 1)
          setState({ ...state, cardLists })
        }
      }

    const openCreateCardListModal = () => {
        setState({ ...state, shownCreateCardListModal: true })
    }

    const closeCreateCardListModal = () => {
        setState({ ...state, shownCreateCardListModal: false })
    }

    const openCreateCardModal = (targetListIndex) => {
        setState({ ...state, shownCreateCardModal: true, targetListIndex })
    }
    const closeCreateCardModal = () => {
        setState({ ...state, shownCreateCardModal: false })
    }

    const setCards = cardLists.map((_, listIndex) => {
        return (newCards) => {
            cardLists[listIndex].cards = newCards
            setState({ ...state, cardLists })
        }
    })

    const setCardLists = (newCardLists) => {
        setState({ ...state, cardLists: newCardLists })
    }

    const addCard = (newCard) => {
        cardLists[targetListIndex].cards.push(newCard)
        setState({ ...state, cardLists, shownCreateCardModal: false })
    }

    const removeCard = (listIndex, cardIndex) => {
        cardLists[listIndex].cards.splice(cardIndex, 1)
        setState({ ...state, cardLists })
    }

    return (
        <>
            {shownCreateCardListModal ? <CreateModal
                onAdd={(newCardList) => addCardList(newCardList)}
                onClose={closeCreateCardListModal}
            /> : <></>}

            {shownCreateCardModal ?
                <CreateModal
                    onAdd={addCard}
                    onClose={closeCreateCardModal}
                /> : <></>
            }
            <Navigation />
            <SCardLists>
                <ReactSortable
                    list={cardLists}
                    setList={setCardLists} // あとで定義する
                    group='cardList'
                    animation={150}
                    style={{ display: 'flex' }}
                >

                    {
                        cardLists.map(({ title, cards }, listIndex) => {
                            const cardComponents = cards.map((card, cardIndex) => <Card title={card.title} removeCard={() => {
                                removeCard(listIndex, cardIndex)
                            }} key={cardIndex} />)
                            return (
                                <CardList key={listIndex}>
                                    <SListTitleWrapper>
                                        <SListTitle>{title}</SListTitle>
                                        <SRemoveCardListButton onClick={()=>removeCardList(listIndex)}>
                                            削除
                                        </SRemoveCardListButton>
                                    </SListTitleWrapper>
                                    <ReactSortable
                                        list={cards}
                                        setList={(newCards) => setCards[listIndex](newCards)}
                                        group='card'
                                        animation={150}
                                        style={{ flexGrow: 1 }}
                                    >
                                        {cardComponents}
                                    </ReactSortable>

                                    <SButton onClick={(e) => {
                                        openCreateCardModal(listIndex)
                                    }}>追加</SButton>
                                </CardList>
                            )
                        })
                    }
                </ReactSortable>

                <SAddListButton onClick={(e) => {
                    openCreateCardListModal()
                }}>リストを追加</SAddListButton>
            </SCardLists>
        </>
    )
}

export default App;
