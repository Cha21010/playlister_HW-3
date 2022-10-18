import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'

function DeleteSongModal() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
    let songname = store.getMarkedSongName();
    let songartist  = store.getMarkedSongArtist();
    function handleCancel(event){
        event.stopPropagation();
        store.closeModal("delete-song-modal");
    }
    function handleConfirm(event){
        event.stopPropagation();
        store.addDeleteSongTransaction(store.getMarkedSongIndex(), store.getMarkedSong());
    }

    let DeleteSongModalElement = 
    <div 
        className="modal" 
        id="delete-song-modal" 
        data-animation="slideInOutLeft">
            <div className="modal-root" id='verify-delete-song-root'>
                <div className="modal-north">
                    Delete Song?
                </div>
                <div className="modal-center">
                    <div className="modal-center-content">
                        Are you sure you wish to remove {songname} by {songartist} from the playlist?
                    </div>
                </div>
                <div className="modal-south">
                    <input type="button" 
                        id="delete-song-confirm-button" 
                        className="modal-button" 
                        onClick={handleConfirm}
                        value='Confirm' />
                    <input type="button" 
                        id="delete-song-cancel-button" 
                        className="modal-button" 
                        onClick={handleCancel}
                        value='Cancel' />
                </div>
            </div>
    </div>

    if (store.deleteSongModalIsOpen()) {
        document.getElementById("delete-song-modal").classList.add("is-visible");
    }

    return (DeleteSongModalElement);
}
export default DeleteSongModal;
