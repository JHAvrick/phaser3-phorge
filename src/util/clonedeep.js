function cloneDeep(obj) {
    return Object.keys(obj).reduce((v, d) => Object.assign(v, {
      [d]: (obj[d].constructor === Object) ? deepCopy(obj[d]) : obj[d]
    }), {});
}

export default cloneDeep;