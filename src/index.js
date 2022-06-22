const config = {
  type: 'localstorage', // localstorage or sessionstorage
  expire: 1, // number for seconds, 0 for never expire
}

class MewStorage {
  constructor(config) {
    this.config = config;
    this.storage = this.config.type === 'localstorage' ? window.localStorage : window.sessionStorage;
    this.expire = this.config.expire ? this.config.expire : 0;
  }

  setStorage = (key, value, expire = 0) => {
    if (value === '' || value === null || value === undefined) {
      value = null
    }
    if (isNaN(expire) || expire < 0) throw new Error('expire must be a positive number')

    expire = (expire ? expire : config.expire) * 1000;

    let data = {
      value,
      expire,
      time : Date.now()
    }
    window[this.storage].setItem(key, JSON.stringify(data));
  }

  getStorage = (key) => {
    if (!window[this.storage].getItem(key) || JSON.stringify(window[this.storage].getItem(key)) === 'null') {
      return null
    }

    const data = JSON.parse(window[this.storage].getItem(key));
    const nowTime = Date.now();

    if (data.expire && this.config.expire * 1000 < nowTime - data.time) {
      this.removeStorage(key);
      return null
    } else {
      this.setStorage(key, data.value, data.expire);
      return data.value
    }
  }

  removeStorage = (key) => {
    window[this.storage].removeItem(key);
  }

  clearStorage = () => {
    window[this.storage].clear();
  }
}

export default new MewStorage(config);
