
# Imagen base con Node.js
FROM node:18

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Asegurar compatibilidad con ES Modules
RUN echo '{ "type": "module" }' > ./package.json && cat package.json >> ./package.json.tmp && mv ./package.json.tmp ./package.json

# Exponer el puerto gRPC (50051 por defecto)
EXPOSE 50051

# Comando para iniciar el servidor gRPC
CMD ["node", "src/server.js"]
