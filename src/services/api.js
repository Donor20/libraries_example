class API {
  async _getLibs () {
    return require('../../public/data-small.json')
  }

  async getLocales () {
    const data = await this._getLibs()
    const result = {}
    for (const d of data) {
      result[d.data.general.locale.name] = true
    }
    return Object.keys(result)
  }

  async getLibs ({ name, locale }) {
    const data = await this._getLibs()
    const result = []
    for (const d of data) {
      if (name && !d.data.general.name.match(name, 'g')) continue
      if (locale && d.data.general.locale.name !== locale) continue
      result.push(d)
    }
    return result
  }

  async getLibById (id) {
    const data = await this._getLibs()
    for (const d of data) {
      if (d._id === id) return d
    }
  }
}

export default new API()
