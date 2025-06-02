# Etapa 1: Instala dependencias de Node.js
FROM node:18 as app

WORKDIR /app
COPY . .
RUN npm install

# Etapa 2: Usa una imagen de Envoy como base final
FROM envoyproxy/envoy:v1.25-latest

# Copiar app Node.js desde la etapa anterior
COPY --from=app /app /app

# Copiar configuración de Envoy
COPY envoy.yaml /etc/envoy/envoy.yaml

# Exponer el puerto 8080 para Cloud Run (proxy Envoy)
EXPOSE 8080

# Comando para correr tu app Node.js y Envoy al mismo tiempo
CMD [\"sh\", \"-c\", \"node /app/server.js & envoy -c /etc/envoy/envoy.yaml -l info\"]
