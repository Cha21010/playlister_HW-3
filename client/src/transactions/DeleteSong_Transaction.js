import jsTPS_Transaction from "../common/jsTPS.js"

export default class DeleteSong_Transaction extends jsTPS_Transaction{
    constructor(initStore,initIndex,initSong){
        super();
        this.store = initStore;
        this.i = initIndex;
        this.song = initSong;
    }

    doTransaction(){
        this.store.deleteSong(this.i);
    }
    undoTransaction(){
        this.store.addSong(this.i,this.song);
    }
}