export default function (items, state) {
  let entities = {}
  items.forEach(item => entities[item._id] = {
    ...(state ? state[item._id] : {}),
    ...item,
  })
  return entities
}
