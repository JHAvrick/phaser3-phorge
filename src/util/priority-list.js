class PriorityList  {
    constructor(priorityRange){
        this._range = priorityRange;
        this._master = [];
        for(let i = 0; i < priorityRange; i++){
            this._master.push([]);
        }
    }

    add(element, priority){
        if (priority > this._range || priority < 0) return;
        this._master[priority].push(element);
    }

    toArray(){
        return [].concat.apply([], this._master);
    }

}

export default PriorityList;