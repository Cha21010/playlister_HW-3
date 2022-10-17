import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'

function DeleteListModal(props) {
    const {store} = useContext(GlobalStoreContext);
    store.history = useHistory();
    let name = store.getMarkedListName();
    function handleConfirm (event){
        event.stopPropagation();
        store.deletePlaylist();
    }
    function handleCancel (event){
        event.stopPropagation();
        store.closeModal("delete-list-modal");
    }

    let deleteListModalElement = 
    <div    
        class="modal" 
        id="delete-list-modal" 
        data-animation="slideInOutLeft">
            <div class="modal-root" id='verify-delete-list-root'>
                <div class="modal-north">
                    Delete playlist?
                </div>                
                <div class="modal-center">
                    <div class="modal-center-content">
                        Are you sure you wish to permanently delete the {name} playlist?
                    </div>
                </div>
                <div class="modal-south">
                    <input 
                        type="button" 
                        id="delete-list-confirm-button" 
                        class="modal-button" 
                        onClick = {handleConfirm}
                        value='Confirm' />
                    <input 
                        type="button" 
                        id="delete-list-cancel-button" 
                        class="modal-button" 
                        onClick={handleCancel}
                        value='Cancel' />
                </div>
            </div>
    </div>
    if (store.deleteListModalIsOpen()){
        document.getElementById("delete-list-modal").classList.add("is-visible");
    }
    return (deleteListModalElement);
    
}
export default DeleteListModal;