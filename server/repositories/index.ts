import loki from 'lokijs';
import databaseConfig from '../config/database.json';

export default new loki(databaseConfig.name);
