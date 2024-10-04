npm install

npx tailwindcss init -p

añadir esto a tsconfig.json y tsconfig.app.json:

"compilerOptions": {
"baseUrl": ".",
"paths": {
"@/_": ["./src/_"]
}
}

vite.config.ts:

import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
plugins: [react()],
resolve: {
alias: {
"@": path.resolve(\_\_dirname, "./src"),
},
},
})

npx shadcn@latest init

creo que deberia funcionar
