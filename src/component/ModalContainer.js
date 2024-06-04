// ModalContainer.js
// 모달 컨테이너 컴포넌트에서 투두 작성 및 표시 기능 추가

import React from 'react';
import Modal from './Modal';
import TodoInsert from './TodoInsert';
import TodoList from './TodoList';

const ModalContainer = ({ open, close, userObj }) => {
    return (
        <Modal open={open} close={close}>
            <TodoInsert userObj={userObj} />
            <TodoList userObj={userObj} />
        </Modal>
    );
}

export default ModalContainer;
