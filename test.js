import fs from 'fs/promises'

console.log(await fs.readFile('./www/index.html', 'utf-8'))