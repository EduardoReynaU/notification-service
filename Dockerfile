# Etapa base: Node.js
FROM node:18

# Directorio de trabajo
WORKDIR /app

# Copia e instala dependencias
COPY package*.json ./
RUN npm install

# Copia el código fuente
COPY . .

# Exponer el puerto que Cloud Run espera (no cambiar)
EXPOSE 8080

# Comando de inicio (puedes usar server.js o el que tengas)
CMD ["node", "server.js"]
