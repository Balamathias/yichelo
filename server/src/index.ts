import http from 'http';
import app from './app';
import connectDB from './config/database.config';
import { PORT } from './config';
import dotenv from 'dotenv';

dotenv.config();

const server = http.createServer(app);

server.listen(PORT, async () => {
  await connectDB();

  console.log(`Server is running on http://localhost:${PORT}`);
});
