/**
 * Applys a given set of properties to a given object
 * 
 * @param {Object} props - An object with a key and value to be assigned to 
 * the given object. Property chains (e.g. "object.scale.x") are acceptable.
 * @param {Object} object - The object to assign the given properties 
 */
function applyProps(props, object){
    for (let key in props){
        set(object, key, props[key]);
    }

    return object;
}

/**
 * This function to replace lodash.set
 * 
 * @param {Object} obj - The object to access
 * @param {String} chain - A string representing a property chain. If the chain
 * does not exist it will be created
 * @param {*} val - The value of the last property in the chain
 */
function set(obj, chain, val) {
    var propChain = chain.split(".");
    if (propChain.length === 1) {
        obj[propChain[0]] = val;
        return;
    }
    var first = propChain.shift();
    if (!obj[first]) {
        obj[first] = {};
    }    
    set(obj[first], propChain.join("."), val);
}

export default applyProps;