class API {
  async getLibs ({ name }) {
    const data = require('../../public/data-small.json')
    const result = []
    for (const d of data) {
      if (name) {
        if (d.data.general.name.match(name, 'g')) {
          result.push(d)
        }
      } else {
        result.push(d)
      }
    }
    return result
  }

  async getLibById (id) {
    const data = require('../../public/data-small.json')
    for (const d of data) {
      if (d._id === id) return d
    }
  }
}

export default new API()
