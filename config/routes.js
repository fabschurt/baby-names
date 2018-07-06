module.exports = {
  list_names: {
    path: '/names/',
    method: 'GET',
    action: require('@src/action/name/list'),
  },
  create_name: {
    path: '/names/',
    method: 'POST',
    action: require('@src/action/name/create'),
  },
  delete_name: {
    path: '/names/{id}',
    method: 'DELETE',
    action: require('@src/action/name/delete'),
  },
}
