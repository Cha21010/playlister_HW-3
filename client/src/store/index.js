import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api from '../api'
import DeleteSong_Transaction from '../transactions/DeleteSong_Transaction';
import AddSong_Transaction from '../transactions/AddSong_Transaction';
import EditSong_Transaction from '../transactions/EditSong_Transaction';
import MoveSong_Transaction from '../transactions/MoveSong_Transaction';
export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/
//TESTING
// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    REFRESH_LIST:"REFRESH_LIST",
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    OPEN_MODAL:"OPEN_MODAL",
    CLOSE_MODAL:"CLOSE_MODAL",
    DELETE_LIST_ACTION:"DELETE_LIST_ACTION",
    MARK_SONG_FOR_DELETION:"MARK_SONG_FOR_DELETION",
    MARK_SONG_FOR_EDITION:"MARK_SONG_FOR_EDITION"
}
const ModalType = {
    DELETE_LIST: "DELETE_LIST",
    DELETE_SONG:"DELETE_SONG",
    EDIT_SONG:"EDIT_SONG",
    NONE:"NONE"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        markDeleteList :null,
        markDeleteSong:null,
        modalType: ModalType.NONE,
        hasModal:false
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markDeleteList :null,
                    markDeleteSong:null,
                    modalType: ModalType.NONE,
                    hasModal:true
                });
            }
            case GlobalStoreActionType.REFRESH_LIST:{
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markDeleteList :null,
                    markDeleteSong:null,
                    modalType: ModalType.NONE,
                    hasModal:false
                });  
            }

            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markDeleteList :null,
                    markDeleteSong:null,
                    modalType: ModalType.NONE,
                    hasModal:false
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    markDeleteList :null,
                    markDeleteSong:null,
                    modalType: ModalType.NONE,
                    hasModal:false
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markDeleteList :null,
                    markDeleteSong:null,
                    modalType: ModalType.NONE,
                    hasModal:false
                });
            }
            // PREPARE TO DELETE A SONG
            case GlobalStoreActionType.MARK_SONG_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markDeleteList :null,
                    markDeleteSong:payload,
                    modalType: ModalType.DELETE_SONG,
                    hasModal:true
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markDeleteList :null,
                    markDeleteSong:null,
                    modalType: ModalType.NONE,
                    hasModal:false,
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    markDeleteList :null,
                    markDeleteSong:null,
                    modalType: ModalType.NONE,
                    hasModal:false
                });
            }
            case GlobalStoreActionType.DELETE_LIST_ACTION:{
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter:store.newListCounter,
                    listNameActive: false,
                    markDeleteList:null,
                    markDeleteSong:null,
                    modalType:ModalType.NONE,
                    hasModal:false
                })
            }
            case GlobalStoreActionType.OPEN_MODAL:{
                return setStore({
                    idNamePairs : store.idNamePairs,
                    currentList : store.currentList,
                    newListCounter : store.newListCounter,
                    listNameActive:false,
                    markDeleteList:payload,
                    markDeleteSong:null,
                    modalType:ModalType.DELETE_LIST,
                    hasModal:true
                })

            }
            case GlobalStoreActionType.CLOSE_MODAL:{
                return setStore({
                    idNamePairs : store.idNamePairs,
                    currentList : store.currentList,
                    newListCounter : store.newListCounter,
                    listNameActive:false,
                    markDeleteList:null,
                    markDeleteSong:null,
                    modalType:ModalType.NONE,
                    hasModal:false
                })
            }
            case GlobalStoreActionType.MARK_SONG_FOR_EDITION:{
                return setStore({
                    idNamePairs : store.idNamePairs,
                    currentList : store.currentList,
                    newListCounter:store.newListCounter,
                    listNameActive:false,
                    markDeleteList:null,
                    markDeleteSong:payload,
                    modalType:ModalType.EDIT_SONG,
                    hasModal:true
                })
            }
            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        async function asyncCLN(id) {
            let response = await api.getPlaylistById(id._id);
            if (response.data.success) {
                let pl = response.data.playlist;
                pl.name = newName;
                async function updateTheList(pl) {
                    let update = {_id: pl._id,playlist: pl}
                    response = await api.updatePlaylistById(update);
                    if (response.data.success) {
                        async function getListNum(pl) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {idNamePairs: pairsArray,playlist: pl}
                                });
                            }
                        }
                        getListNum(pl);
                    }
                }
                updateTheList(pl);
            }
        }
        asyncCLN(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        tps.clearAllTransactions();
    }

    store.hasTransactionToRedo=function(){
        return tps.hasTransactionToRedo();
    }
    store.hasTransactionToUndo= function(){
        return tps.hasTransactionToUndo();
    }
    

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }
    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }
    store.editSong = function(i,initSong){
        async function asyncEditSong(){
            let response = await api.getPlaylistById(store.currentList._id);
            if(response.data.success){
                let pl = response.data.playlist;
                pl.songs.splice(i,1,initSong);
                async function updateTheList(pl){
                    let up = {
                        _id:pl._id,
                        playlist:pl
                    }
                    response = await api.updatePlaylistById(up);
                    if(response.data.success){
                        async function getPairs(pl){
                            response = await api.getPlaylistPairs();
                            if (response.data.success){
                                let array = response.data.idNamePairs;
                                storeReducer({
                                    type:GlobalStoreActionType.REFRESH_LIST,
                                    payload:{
                                        idNamePairs:array,
                                        playlist:pl
                                    }
                                })
                            }
                        }
                        getPairs(pl);
                    }
                }
                updateTheList(pl);
            }
        }
        asyncEditSong();
    }

    store.addSong = function(i,s){
        async function asyncAddSong() {
            let response = await api.getPlaylistById(store.currentList._id);
            if (response.data.success) {
                let pl = response.data.playlist;
                pl.songs.splice(i, 0, s);
                async function updateTheList(pl) {
                    let ud = 
                    {   _id: pl._id,
                        playlist: pl
                    }
                    response = await api.updatePlaylistById(ud);
                    if (response.data.success) {
                        async function getPairs(pl) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.REFRESH_LIST,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: pl
                                    }
                                });
                            }
                        }
                        getPairs(pl);
                    }
                }
                updateTheList(pl);
            }
        }
        asyncAddSong();
    }
    store.getMarkedListName =() =>{
        if(store.markDeleteList){
            return store.markDeleteList.name;
        }
    }
    store.getMarkedSong = () =>{
        if(store.markDeleteSong){
            return store.markDeleteSong.song;
        }
    }
    store.getMarkedSongArtist = () =>{
        if(store.markDeleteSong){
            return store.markDeleteSong.song.artist;
        }
    }
    store.getMarkedSongName = () =>{
        if(store.markDeleteSong){
            return store.markDeleteSong.song.title;
        }
    }
    store.getMarkedSongYoutubeid = () =>{
        if(store.markDeleteSong){
            return store.markDeleteSong.song.youTubeId;
        }
    }
    store.getMarkedSongIndex = () =>{
        if(store.markDeleteSong){
            return store.markDeleteSong.index;
        }
    }
    store.markSongForEdition = function(nameAndIndex){
        storeReducer({
            type:GlobalStoreActionType.MARK_SONG_FOR_EDITION,
            payload:nameAndIndex
        });
    }
    store.markSongForDeletion = function(nameAndIndex){
        storeReducer({
            type:GlobalStoreActionType.MARK_SONG_FOR_DELETION,
            payload:nameAndIndex
        });
    }

    store.markListForDeletion = function(id){
        storeReducer({
            type: GlobalStoreActionType.OPEN_MODAL,
            payload:id
        })
    }
    store.deletePlaylist = function(){
        async function asyncDeletePlaylist(){
            const resp = await api.deletePlaylistById(store.markDeleteList._id);
            if(resp.data.success){
                storeReducer({
                    type:GlobalStoreActionType.DELETE_LIST_ACTION,
                    payload:null
                });
                store.closeModal("delete-list-modal");
                store.loadIdNamePairs();
            }
        }
        asyncDeletePlaylist();
    }
    //to check whether the modal type is delete list
    store.deleteListModalIsOpen = () =>{
        return store.modalType === ModalType.DELETE_LIST;
    }

    store.deleteSong = function (i){
        async function asyncChangeListName() {
            let response = await api.getPlaylistById(store.currentList._id);
            if (response.data.success) {
                let pl = response.data.playlist;
                pl.songs.splice(i, 1);
                async function updateList(pl) {
                    let update = 
                    {   _id: pl._id,
                        playlist: pl
                    }
                    response = await api.updatePlaylistById(update);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsA = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.REFRESH_LIST,
                                    payload: {
                                        idNamePairs: pairsA,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(pl);
                    }
                }
                updateList(pl);
                
            }
        }
        asyncChangeListName();
        store.closeModal("delete-song-modal")
    }
    store.deleteSongModalIsOpen = () =>{
        return store.modalType === ModalType.DELETE_SONG;
    }
    store.editSongModalIsOpen = () =>{
        return store.modalType === ModalType.EDIT_SONG;
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setlistNameActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }
    
    store.closeModal = function (modal){
        document.getElementById(modal).classList.remove("is-visible");
        storeReducer({
            type:GlobalStoreActionType.CLOSE_MODAL,
            payload:null
        })
    }
    store.moveSong= function(oldSongIndex,newSongIndex){
        async function asyncChangeListName() {
            let response = await api.getPlaylistById(store.currentList._id);
            if (response.data.success) {
                let pl = response.data.playlist;
                let movedSong = pl.songs[oldSongIndex];
                pl.songs[oldSongIndex]=pl.songs[newSongIndex];
                pl.songs[newSongIndex]=movedSong;
                async function updateList(pl) {
                    let up = 
                    {   _id: pl._id,
                        playlist: pl
                    }
                    response = await api.updatePlaylistById(up);
                    if (response.data.success) {
                        async function getListPairs(pl) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsA = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.REFRESH_LIST,
                                    payload: {
                                        idNamePairs: pairsA,
                                        playlist: pl
                                    }
                                });
                            }
                        }
                        getListPairs(pl);
                    }
                }
                updateList(pl);
                
            }
        }
        asyncChangeListName();
    }
    store.createNewList = function(){
        async function asyncCreateNewList(){
            let id = "Untitled" +(store.newListCounter+1);
            const response = await api.createNewList({name:id , songs:[]});
            if (response.data.success){
                let playlist = response.data.playlist;
                storeReducer({
                    type:GlobalStoreActionType.CREATE_NEW_LIST,
                    payload:playlist
                });

                store.newListCounter+=1;
                store.setCurrentList(playlist._id);
            }
        } 
        asyncCreateNewList();
    }
    store.addDeleteSongTransaction= function(index,oldSong){
        let transaction = new DeleteSong_Transaction(store,index,oldSong);
        tps.addTransaction(transaction);
    }
    store.addAddSongTransaction = function(i,s){
        let t = new AddSong_Transaction(store,i,s);
        tps.addTransaction(t);
    }
    store.addEditSongTransaction = function(i,previousSong,initSong){
        let t = new EditSong_Transaction(store,i,previousSong,initSong);
        tps.addTransaction(t);
    }
    store.addMoveSongTransaction = function(initOldSongIndex,initNewSongIndex){
        let t  = new MoveSong_Transaction(store,initOldSongIndex,initNewSongIndex);
        tps.addTransaction(t);
    }

    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}