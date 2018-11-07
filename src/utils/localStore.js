const _localStore = {
  s: window.localStorage,
  type: 'localStorage',
  set: function (key, val) {
    this.s.setItem(key, JSON.stringify(val))
    return val
  },
  get: function (key) {
    let value = this.s.getItem(key)
    if (typeof value != 'string') {
      return undefined
    }
    try {
      return JSON.parse(value)
    } catch(e) {
      return value || undefined
    }
  },
  remove: function (key) {
    this.s.removeItem(key)
  },
  removeAll: function () {
    this.s.clear()
  },
  getAll: function () {
    let ret = {};
    for (let i = 0; i < this.s.length; i++) {
      let key = this.s.key(i)
      ret[key] = this.get(key)
    }
    return ret
  }
}

module.exports = _localStore
