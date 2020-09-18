import React, { useState } from 'react'
import styled from 'styled-components'

const SCreateModal = styled.div`
	position: fixed;
	top: 0; right: 0; bottom: 0; left: 0; 
    background: rgba(0, 0, 0, .6);
    
    display: flex;
    justify-content: center;
    align-items: center;
`

const SForm = styled.form`
    background: #fff;
    width: 300px;
    display: flex;
    flex-direction: column;
    padding: 20px 20px 10px 20px;
    & > * {
        margin-bottom: 10px;
    }
`

const CreateModal = ({ onAdd, onClose }) => {
    const [state, setState] = useState({ // フォームの値を管理してonAddCardに渡せるようにする
        title: ''
    })
    const { title } = state

    return (
        <SCreateModal onClick={onClose}>
            <SForm onSubmit={(e) => {
                e.preventDefault()
                onAdd({ title })
            }} onClick={(e) => {
                e.stopPropagation() // SCreateModalのクリックイベントを呼ばない
            }}>
                <input type="text" defaultValue={title} onChange={(e) => { // Use defaultValue. Not value.
                    setState({ title: e.target.value }) // フォームの内容が変わるたびにstateを更新
                }}/>
                <input type="submit" value="追加" />
            </SForm>
        </SCreateModal>
    )
}

export default CreateModal
