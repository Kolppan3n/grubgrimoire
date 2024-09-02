import "@/lib/config"
import { drizzle } from "drizzle-orm/vercel-postgres"
import { sql } from "@vercel/postgres"
import * as schema from "./schema"
import { units } from "./schema"

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql, {schema});

export const initUnits = async() => {
    await db.insert(units).values([
        { name: 'mg' }, { name: 'g' }, { name: 'kg' }, 
        { name: 'ml' }, { name: 'dl' }, { name: 'l' }, 
        { name: 'tsp' }, { name: 'tbs' }
    ]).onConflictDoUpdate;
}