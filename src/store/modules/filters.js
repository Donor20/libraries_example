export default {
  namespaced: true,
  state: {
    ranges: {
      porch: {
        key: 'porch',
        label: 'ЭТАЖ',
        min: 0,
        max: 100,
        value: { min: 0, max: 100 }
      },
      square: {
        key: 'square',
        label: 'ПЛОЩАДЬ, м²',
        min: 0,
        max: 1000,
        value: { min: 0, max: 1000 }
      },
      price: {
        key: 'price',
        label: 'СТОИМОСТЬ, млн. р.',
        min: 0.0,
        max: 100.0,
        value: { min: 0.0, max: 100.0 }
      }
    }
  },
  getters: {
    ranges: state => {
      return Object.values(state.ranges)
    }
  },
  mutations: {
    setMinRangeValue (state, { key, value }) {
      if (!Number(value)) return
      if (value < state.ranges[key].min) value = state.ranges[key].min
      if (value > state.ranges[key].max) value = state.ranges[key].max
      state.ranges[key].value.min = value
    },
    setMaxRangeValue (state, { key, valueKey, value }) {
      if (!Number(value)) return
      if (value < state.ranges[key].min) value = state.ranges[key].min
      if (value > state.ranges[key].max) value = state.ranges[key].max
      state.ranges[key].value.max = value
    },
    resetRanges (state) {
      for (const range of Object.values(state.ranges)) {
        range.value.min = range.min
        range.value.max = range.max
      }
    }
  },
  actions: {
    setMinRangeValue ({ state, commit, rootState }, { key, value }) {
      commit('setMinRangeValue', { key, value })
    },
    setMaxRangeValue ({ state, commit, rootState }, { key, value }) {
      commit('setMaxRangeValue', { key, value })
    },
    resetRanges ({ state, commit, rootState }) {
      commit('resetRanges')
    }
  }
}
