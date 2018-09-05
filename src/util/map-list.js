
/**
 * The MapList class provides a list type which can resolve both keys and 
 * indexes to their items. This is useful in certain situations but requires that
 * both a key AND index be provided when adding an item.
 */
class MapList {

    constructor(){
        /**
         * The dictionary object
         */
        this._dict = {};

        /**
         * The list object
         */
        this._arr = [];

    }

    /**
     * Get an item w/ key or index
     * 
     * @param {String | Number} keyOrIndex 
     */
    get(keyOrIndex){
        return this._arr[this.getIndex(keyOrIndex)];
    }

    /**
     * Add an item to the MapList
     * 
     * @param {Any} item - The item to add to this list.
     * @param {String} key - This items key. MUST be set.
     * @param {Number} index - The index of this item. If not set, the item will
     * be pushed into the end of the list.
     */
    set(item, key, index){
        console.log(item, key, index);
        this._dict[key] = item;
        if (index == null) this._arr.push(item);
        else  this._arr[index] = item;
    }

    /**
     * Delete item with the given key or at given index
     * 
     * @param {String | Number} keyOrIndex 
     */
    delete(keyOrIndex){
        let index = this.getIndex(keyOrIndex);
        let key = this.getKey(keyOrIndex);

        console.log("INDEX: ");
        console.log(index);


        delete this._dict[key];
        return this._arr.splice(index, 1)[0];
    }

    /**
     * Moves an item in an existing position to the end of the array
     * 
     * @param {String | Number} keyOrIndex 
     */
    toLast(keyOrIndex){
        let index = this.getIndex(keyOrIndex);
        this._arr.push(this._arr.splice(index, 1)[0]);
    }

    /**
     * Moves an item in an existing position to the front of the array
     * 
     * @param {String | Number} keyOrIndex 
     */
    toFirst(keyOrIndex){
        let index = this.getIndex(keyOrIndex);
        this._arr.unshift(this._arr.splice(index, 1)[0])
    }

    /**
     * Swaps the position of two items. If either position is out of bounds, no
     * change will be made.
     * 
     * @param {String | Number} keyOne - The key or index of an item
     * @param {String | Number} keyTwo - The key pr index of another item
     */
    swap(keyOne, keyTwo){

        //Get the indexes if keys were given
        let indexOne = typeof keyOne === "string" ? this.indexOfKey(keyOne) : keyOne;
        let indexTwo = typeof keyTwo === "string" ? this.indexOfKey(keyTwo) : keyTwo;

        //Check for out-of-bounds
        if (indexOne >= this._arr.length || indexTwo >= this._arr.length)
            return;

        //Assign the two items to temp variables
        let itemOne = this._arr[indexOne];
        let itemTwo = this._arr[indexTwo];

        //Swap their indexes
        this._arr[indexOne] = itemTwo;
        this._arr[indexTwo] = itemOne;

    }

    /**
     * 
     * @param {Function} callback - Processing function, is passed the item,
     * it's key, and it's index in the list
     */
    forEach(callback){
        for (let key in this._dict){
            let item = this._dict[key];
            let index = this._arr.indexOf(this._dict[key])
            callback(item, key, index);
        }
    }

    /**
     * If passed a key, returns the key's index. If passed an index, simply
     * returns that index. Useful to avoid extra type-checking.
     * 
     * @param {String | Number} keyOrIndex 
     */
    getIndex(keyOrIndex){
        return typeof keyOrIndex === "string" 
                ? this.indexOfKey(keyOrIndex)
                : keyOrIndex;
    }

    /**
     * If passed an index, returns the index's key. If passed an key, simply 
     * returns that key. Useful to avoid extra type-checking.
     * 
     * @param {String | Number} keyOrIndex 
     */
    getKey(keyOrIndex){
        return typeof keyOrIndex === "string" 
                ? keyOrIndex
                : this.keyAtIndex(keyOrIndex);
    }


    /**
     * Find the index of a specific element, if it exists
     * 
     * @param {Any} item - The item for which to recieve an index
     */
    indexOf(item){
        return this._arr.indexOf(item);
    }

    /**
     * Get the index of a key's corresponding item
     * 
     * @param {String} key
     */
    indexOfKey(key){
        return this._arr.indexOf(this._dict[key]);
    }

    /**
     * Returns the key for an item at a given index
     * 
     * @param {Number} index
     */
    keyAtIndex(index){
        return this._findInDict(this._arr[index]);
    }

    /**
     * Wrapper for _findInDict().
     * 
     * @param {Any} item 
     */
    keyOfItem(item){
        return this._findInDict(item);
    }

    /**
     * Get the key of a given item. Returns false if the item does not exist.
     * 
     * @param {Any} item 
     */
    _findInDict(item){
        for (let key in this._dict){
            if (this._dict[key] === item)
                return key;
        }

        return false;
    }

    get length(){
        return this._arr.length;
    }


}

export default MapList;