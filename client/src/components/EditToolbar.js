import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let enabledButtonClass = "playlister-button";
    
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }
    function handleAddSong(){
        if(store.currentList){
            let newSong = {
                "title":"Untitled",
                "artist":"unknown",
                "youTubeId":"dQw4w9WgXcQ"
            };
            store.addAddSongTransaction(store.getPlaylistSize(),newSong);
        }
    }
    let canEdit = false;
    if (store.currentList&&!store.hasModal) {
        canEdit = true;
    }
    let canundo = false;
    let canredo = false;
    if(!store.hasModal){
        if(store.currentList){
            if(store.hasTransactionToRedo()){
                canredo =  true;
            }
            if(store.hasTransactionToUndo()){
                canundo = true;
            }
        }
    }

    return (
        <span id="edit-toolbar">
            <input
                type="button"
                id='add-song-button'
                disabled={!canEdit}
                value="+"
                onClick={handleAddSong}
                className={enabledButtonClass}
            />
            <input
                type="button"
                id='undo-button'
                disabled={!canundo}
                value="⟲"
                className={enabledButtonClass}
                onClick={handleUndo}
            />
            <input
                type="button"
                id='redo-button'
                disabled={!canredo}
                value="⟳"
                className={enabledButtonClass}
                onClick={handleRedo}
            />
            <input
                type="button"
                id='close-button'
                disabled={!canEdit}
                value="&#x2715;"
                className={enabledButtonClass}
                onClick={handleClose}
            />
        </span>);
}

export default EditToolbar;