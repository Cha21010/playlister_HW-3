import jsTPS_Transaction from "../common/jsTPS.js"

export default class AddSong_Transaction extends jsTPS_Transaction{
    constructor(initStore,initIndex,initSong){
        super();
        this.store = initStore;
        this.i = initIndex;
        this.s = initSong;
    }
    doTransaction(){
        this.store.addSong(this.i,this.s)
    }
    undoTransaction(){
        this.store.deleteSong(this.i);
    }
}