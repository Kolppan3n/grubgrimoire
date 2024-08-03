import "@/lib/config"
import { drizzle } from "drizzle-orm/vercel-postgres"
import { sql } from "@vercel/postgres"
import { person } from "./schema"
import * as schema from "./schema"

export type Person = typeof person.$inferInsert

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql);

export const insertPerson = async (newPerson: Person) => (
    db.insert(person).values(newPerson).returning()
)

export const getPerson = async () => (
    await db.select().from(person)
)

/*export const getPersonAlt = async () => (
    await db.query.person.findMany()
)*/