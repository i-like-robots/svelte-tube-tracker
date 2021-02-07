module.exports = {
  '**/*.{js,svelte}': ['prettier --write', 'eslint --fix'],
  '**/*.{json,css}': ['prettier --write'],
}
