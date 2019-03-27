export default function (items, state) {
  let entities = {}
  items.forEach(item => {
    let oldItemData = state ? (state[item._id] || {}) : {}
    let oldItemMeta = oldItemData.__meta || {}
    entities[item._id] = {
      ...oldItemData,
      ...item,
      // merge the meta information
      __meta: {
        ...oldItemMeta,
        ...item.__meta
      },
    }
  })
  return entities
}
