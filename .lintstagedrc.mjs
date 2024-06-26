export default {
    '*.ts': ['prettier --write', 'eslint --fix', 'pnpm test:staged'],
    '*.{m,c}?js': ['prettier --filter', 'eslint --fix', 'pnpm test:staged'],
    '*.json': 'prettier --write',
}
