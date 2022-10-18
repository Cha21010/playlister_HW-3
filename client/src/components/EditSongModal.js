import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'

function EditSongModal() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
    function handleCancel(event){
        event.stopPropagation();
        store.closeModal("edit-song-modal");
    }
    function handleConfirm(event){
        event.stopPropagation();
        let previousSong = {"title":store.getMarkedSongName(),"artist":store.getMarkedSongArtist(),"youTubeId":store.getMarkedSongYoutubeid()};
        let initTitle = document.getElementById("edit-song-title").value;
        let initArtist = document.getElementById("edit-song-artist").value;
        let initYoutubeid = document.getElementById("edit-song-youtubeid").value;
        let initSong = {
            "title":initTitle,
            "artist":initArtist,
            "youTubeId":initYoutubeid
        }
        store.addEditSongTransaction(store.getMarkedSongIndex(),previousSong,initSong);
        store.closeModal("edit-song-modal");
    }

    let EditSongModalElement = 
    <div 
        className="modal" 
        id="edit-song-modal" 
        data-animation="slideInOutLeft">
            <div className="modal-root" id='verify-edit-song-root'>
                <div className="modal-north">
                    Edit Song?
                </div>
                <div className="modal-center">
                    <div className="modal-center-content">
                    Title: <input class = "modal-text-input" type="text" id = "edit-song-title" defaultValue = ""/> <br/>
                        Artist: <input class = "modal-text-input" type="text" id = "edit-song-artist" defaultValue = ""/> <br/>
                        You Tube Id:  <input class = "modal-text-input" type="text" id = "edit-song-youtubeid" defaultValue = ""/> <br/>
                    </div>
                </div>
                <div className="modal-south">
                    <input type="button" 
                        id="edit-song-confirm-button" 
                        className="modal-button" 
                        onClick={handleConfirm}
                        value='Confirm' />
                    <input type="button" 
                        id="edit-song-cancel-button" 
                        className="modal-button" 
                        onClick={handleCancel}
                        value='Cancel' />
                </div>
            </div>
    </div>

    if (store.editSongModalIsOpen()) {
        document.getElementById("edit-song-modal").classList.add("is-visible");
        document.getElementById("edit-song-title").value = store.getMarkedSongName();
        document.getElementById("edit-song-artist").value = store.getMarkedSongArtist();
        document.getElementById("edit-song-youtubeid").value = store.getMarkedSongYoutubeid();

    }

    return (EditSongModalElement);
}
export default EditSongModal;
