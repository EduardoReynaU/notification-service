# Etapa base: usa una imagen oficial de Node.js
FROM node:18

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos del proyecto
COPY package*.json ./
COPY . .

# Instalar dependencias
RUN npm install

# Exponer el puerto gRPC (50052)
EXPOSE 50052

# Comando para ejecutar el servidor
CMD ["node", "server.js"]
