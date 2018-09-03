class Pool {
    constructor(){
        this._items = new Map();
    }

    has(key){
        return this._items.has(key);
    }

    forEach(callback) {
        this._items.forEach((item, key) => {
            callback(key, item.item, item.meta);
        });
    }

    add(itemKey, item, meta = {}){
        this._items.set(itemKey, {
            item: item,
            meta: meta
        })

        return item;
    }

    remove(itemKey){
        this._items.delete(itemKey);
    }

    get(itemKey){
        return this._items.get(itemKey);
    }

    setMeta(itemKey, meta){
        this._items.get(itemKey).meta = meta;
    }

    getMeta(itemKey){
        return this._items.get(itemKey).meta;
    }

    asObject(){
        let items = {};
        this._items.forEach((item, key) => {
            items[key] = item.item;
        });
        return items;
    }

    asArray(){
        let items = [];
        this._items.forEach((item, key) => {
            items.push(item.item);
        });
        return items;
    }

}

export default Pool;