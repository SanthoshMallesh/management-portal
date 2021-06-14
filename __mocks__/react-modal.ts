import Modal from 'react-modal';

const oldFn = Modal.setAppElement;
Modal.setAppElement = element => {
    if(element === '#root') {
        return oldFn(document.createElement('div'));
    }
    oldFn(element);
};
module.exports = Modal;