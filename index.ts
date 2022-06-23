import dotenv from 'dotenv';
import { DiContainer } from './api/di/di';
import WebServer from './api/webserver';

dotenv.config();

const app = new WebServer(DiContainer.getContainer());
app.create()
