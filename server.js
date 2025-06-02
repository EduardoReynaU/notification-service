import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
import { notificationHandlers } from './src/handlers/notificationHandler.js';

const PROTO_PATH = './protos/notification.proto';

const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObj = grpc.loadPackageDefinition(packageDef);
const notificationPackage = grpcObj.notification;

const server = new grpc.Server();
server.addService(notificationPackage.NotificationService.service, notificationHandlers);

const PORT = process.env.PORT || 8080;
server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
  console.log(`Notification service gRPC corriendo en puerto ${PORT}`);
  server.start();
});
