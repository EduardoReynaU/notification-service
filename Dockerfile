FROM node:18

# Instalar Envoy
RUN apt-get update && apt-get install -y curl lsb-release && \
    curl -sL 'https://getenvoy.io/gpg' | apt-key add - && \
    echo "deb [arch=amd64] https://dl.bintray.com/tetrate/getenvoy-deb $(lsb_release -cs) stable" > /etc/apt/sources.list.d/getenvoy.list && \
    apt-get update && apt-get install -y getenvoy-envoy

# Copiar app
WORKDIR /app
COPY . .

# Instalar dependencias Node
RUN npm install

# Exponer puerto HTTP
EXPOSE 8080

# Ejecutar Envoy + gRPC server en paralelo
CMD [\"sh\", \"-c\", \"node server.js & envoy -c envoy.yaml\"]
