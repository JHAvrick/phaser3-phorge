
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
        if (typeof keyOrIndex === "string") return this._dict[keyOrIndex];
        else return this._arr[keyOrIndex];
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
        this._dict[key] = item;
        if (index == null) this._arr.push(item);
        else  this._arr[index] = item;
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
     * Deletes an item at the given index
     * 
     * @param {Number} index - The index of the item to remove
     */
    deleteAtIndex(index){
        let item = this._arr[index];
        let itemKey = this._findInDict[item];

        this._arr.splice(this._arr.indexOf(item), 1);
        delete this._dict[itemKey];
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

}

export default MapList;