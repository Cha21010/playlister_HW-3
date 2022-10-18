import jsTPS_Transaction from "../common/jsTPS.js"
export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(initStore,initIndex,previousSong,initSong){
        super();
        this.store = initStore;
        this.index = initIndex;
        this.previousSong = previousSong;
        this.initSong = initSong;
    }
    doTransaction(index,){
        this.store.editSong(this.index,this.initSong);
    }
    undoTransaction(){
        this.store.editSong(this.index,this.previousSong);
    }
}