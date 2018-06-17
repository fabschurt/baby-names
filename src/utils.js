exports.escapeForRegExp = (string) => (
  string.replace(/[\/.*+?^${}()|[\]\\]/g, '\\$&')
)
