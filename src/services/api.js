const flats = [
  {
    building_id: 73,
    building_name: '1 этап 1а корпуса',
    floor: 10,
    id: 23329,
    is_studio: 1,
    number: '163',
    plan: '/img/bb8d/9eeb90d9c7aeeed41fb41c0b5e383013.jpg',
    porch: 3,
    price: 2956317,
    rooms: 1,
    size: 'XS',
    square: 23.66
  },
  {
    building_id: 74,
    building_name: '1 этап 1а корпуса',
    floor: 4,
    id: 20822,
    is_studio: 1,
    number: '163',
    plan: '/img/bb8d/9eeb90d9c7aeeed41fb41c0b5e383013.jpg',
    porch: 3,
    price: 2992701,
    rooms: 1,
    size: 'XS',
    square: 23.87
  },
  {
    building_id: 75,
    building_name: '1 этап 1а корпуса',
    floor: 4,
    id: 20382,
    is_studio: 1,
    number: '163',
    plan: '/img/bb8d/9eeb90d9c7aeeed41fb41c0b5e383013.jpg',
    porch: 3,
    price: 4952721,
    rooms: 2,
    size: '2k',
    square: 42.87
  },
  {
    building_id: 75,
    building_name: '1 этап 1а корпуса',
    floor: 4,
    id: 20332,
    is_studio: 1,
    number: '163',
    plan: '/img/bb8d/9eeb90d9c7aeeed41fb41c0b5e383013.jpg',
    porch: 3,
    price: 8862732,
    rooms: 3,
    size: '3k',
    square: 42.87
  },
  {
    building_id: 32,
    building_name: '1 этап 1а корпуса',
    floor: 10,
    id: 20328,
    is_studio: 1,
    number: '163',
    plan: '/img/bb8d/9eeb90d9c7aeeed41fb41c0b5e383013.jpg',
    porch: 3,
    price: 3956317,
    rooms: 1,
    size: '1k',
    square: 24.99
  },
  {
    building_id: 37,
    building_name: '1 этап 1а корпуса',
    floor: 10,
    id: 20320,
    is_studio: 1,
    number: '163',
    plan: '/img/bb8d/9eeb90d9c7aeeed41fb41c0b5e383013.jpg',
    porch: 3,
    price: 3956317,
    rooms: 1,
    size: 'XS',
    square: 24.99
  },
  {
    building_id: 17,
    building_name: '1 этап 1а корпуса',
    floor: 10,
    id: 33320,
    is_studio: 1,
    number: '163',
    plan: '/img/bb8d/9eeb90d9c7aeeed41fb41c0b5e383013.jpg',
    porch: 3,
    price: 5956317,
    rooms: 1,
    size: '2k',
    square: 45.36
  },
  {
    building_id: 87,
    building_name: '1 этап 1а корпуса',
    floor: 10,
    id: 33320,
    is_studio: 1,
    number: '163',
    plan: '/img/bb8d/9eeb90d9c7aeeed41fb41c0b5e383013.jpg',
    porch: 3,
    price: 9956317,
    rooms: 4,
    size: '4',
    square: 66.60
  }
]

class API {
  async getFlats ({ rooms, porch, square, price }) {
    const result = []
    for (const flat of flats) {
      if (rooms && flat.rooms !== rooms) continue
      if (flat.porch < porch.min || flat.porch > porch.max) continue
      if (flat.square < square.min || flat.square > square.max) continue
      if (flat.price < price.min * 1000000 || flat.price > price.max * 1000000) continue
      result.push(flat)
    }
    return result
  }

  async getLibraries () {
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
