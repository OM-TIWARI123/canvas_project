import { Pool } from 'pg';
import * as schema from './schemas';
import { drizzle } from 'drizzle-orm/node-postgres';

export default function getDatabase(databaseUrl: string) {
  const pool = new Pool({ connectionString: databaseUrl });

  return drizzle(pool, { schema });
}

export type Database = ReturnType<typeof getDatabase>;
