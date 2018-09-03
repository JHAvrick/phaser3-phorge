import set from 'lodash.set';

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

export default applyProps;