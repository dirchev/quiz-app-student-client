export default function (items) {
  let entities = {}
  items.forEach(item => entities[item._id] = item)
  return entities
}
