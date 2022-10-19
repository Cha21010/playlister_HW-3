import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { song, index } = props;
    const [isDragging,setisDragging] = useState(false);
    const[draggedTo,setdraggedTo] = useState(false);
    let cardClass = "list-card unselected-list-card";
    function handleToggleDeleteSong(event){
        store.markSongForDeletion({song:song,index:index});
    }
    function DoEditSong(event){
        store.markSongForEdition({song:song,index:index});
    }
    function handleDragStart(event){
        event.dataTransfer.setData("songs",props.index);
        setisDragging(true);
        setdraggedTo(draggedTo);
    }

    function handleDragOver(event){
        event.preventDefault();
        setisDragging(isDragging);
        setdraggedTo(true);
        // this.setState(prevState => ({
        //     isDragging: prevState.isDragging,
        //     draggedTo: true
        // }));
    }
    
    function handleDragEnter(event){
        event.preventDefault();
        setisDragging(isDragging);
        setdraggedTo(true);
        // this.setState(prevState => ({
        //     isDragging: prevState.isDragging,
        //     draggedTo: true
        // }));
    }
    function handleDragLeave(event){
        event.preventDefault();
        setisDragging(isDragging);
        setdraggedTo(false);
        // this.setState(prevState => ({
        //     isDragging: prevState.isDragging,
        //     draggedTo: false
        // }));
    }
    function handleDrop(event){
        event.preventDefault();
        let initNewSongIndex = props.index;
        let initOldSongIndex = Number(event.dataTransfer.getData("song"));
        setisDragging(false);
        setdraggedTo(false);
        // this.setState(prevState => ({
        //     isDragging: false,
        //     draggedTo: false
        // }));
        store.addMoveSongTransaction(initOldSongIndex,initNewSongIndex);
    }
    
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            draggable="true"
            onDoubleClick = {DoEditSong}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                onClick={handleToggleDeleteSong}
                value={"\u2715"}
            />
        </div>
    );
}

export default SongCard;