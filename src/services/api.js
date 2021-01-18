class API {
  async getLibs () {
    return require('../../public/data-small.json')
  }

  async getLibById (id) {
    const data = require('../../public/data-small.json')
    for (const d of data) {
      if (d._id === id) return d
    }
  }
}

export default new API()
