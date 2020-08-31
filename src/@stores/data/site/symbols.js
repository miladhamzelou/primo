import { writable, readable, derived, get } from 'svelte/store';
import { find, some } from 'lodash'
import {site} from '../index'

const store = writable([])

let symbols
store.subscribe(s => {
  symbols = s
})

const actions = {
  reload: async () => {
    return symbols
  },
  add: (symbol) => {
    store.set([ symbol, ...symbols ])
  },
  place: (symbol) => {
    // store.set([ symbol, ...symbols ])
    const exists = some(symbols, ['id',symbol.id])
    if (exists) {
      actions.modify(symbol)
    } else {
      actions.add(symbol)
    }
    site.save({ symbols })
  },
  modify: (symbol) => {
    const newLibrary = symbols.map(s => s.id === symbol.id ? symbol : s)
    store.set(newLibrary)
    site.save({ symbols })
  },
  remove: (symbolID) => {
    const newLibrary = symbols.filter(s => s.id !== symbolID)
    store.set(newLibrary)
    site.save({ symbols })
  },
  get: (symbolID) => find(symbols, ['id', symbolID]),
  subscribe: store.subscribe,
  set: store.set
}


export default actions