
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || 'NotificationService';

const client = new MongoClient(uri);

let db;

export async function connectToMongo() {
  if (!db) {
    try {
      await client.connect();
      db = client.db(dbName);
      console.log('[✅] Conectado a MongoDB:', dbName);
    } catch (err) {
      console.error('[❌] Error conectando a MongoDB:', err.message);
    }
  }
  return db;
}

export async function guardarNotificacion(data) {
  try {
    const database = await connectToMongo();
    const coleccion = database.collection('notificaciones');
    const resultado = await coleccion.insertOne(data);
    console.log('[🗃️] Notificación guardada con ID:', resultado.insertedId);
  } catch (err) {
    console.error('[❌] Error al guardar notificación:', err.message);
  }
}
