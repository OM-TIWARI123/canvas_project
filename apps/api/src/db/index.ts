import env from '@/env';
import getDatabase from '@services/database/index';

const db = getDatabase(env.DATABASE_URL);

export default db;
