import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
import { fileURLToPath } from 'url';
import { manejarNotificacion } from './handlers/notificationHandler.js';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar el archivo .proto
const PROTO_PATH = path.join(__dirname, '../protos/notification.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition).notification;

const server = new grpc.Server();

// Registrar el servicio
server.addService(proto.NotificationService.service, {
  EnviarNotificacion: manejarNotificacion
});

const PORT = process.env.GRPC_PORT || '50051';
server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('[❌] Error al iniciar gRPC:', err.message);
    return;
  }

  console.log(`[✅] Servidor gRPC escuchando en el puerto ${port}`);
  server.start();
});
