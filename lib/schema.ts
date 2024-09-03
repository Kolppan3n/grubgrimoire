import { int } from "drizzle-orm/mysql-core"
import {
  serial,
  boolean,
  timestamp,
  text,
  primaryKey,
  integer,
  pgTableCreator,
} from "drizzle-orm/pg-core"
import type { AdapterAccountType } from "next-auth/adapters"

export const createTable = pgTableCreator((name) => `gg_${name}`)

//four tables to manage users
export const users = createTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
})

export const accounts = createTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)
 
export const sessions = createTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})
 
export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
)
 
export const authenticators = createTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
)

//tables to manage recipes
export const units = createTable(
  "unit",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull()
  }
)

export const steps = createTable(
  "step",
  {
    id: serial("id").primaryKey(),
    recipe_id: integer("recipe_id").references(() => recipes.id),
    number: integer("number").notNull(),
    description: text("description")
  }
)

export const incredients = createTable(
  "incredient",
  {
    id: serial("id").primaryKey(),
    recipe_id: integer("recipe_id").references(() => recipes.id),
    name: text("name").notNull(),
    amount: integer("amount").notNull(),
    unit_id: integer("unit_id").references(() => units.id)
  }
)

export const recipes = createTable(
  "recipe",
  {
    id: serial("id").primaryKey(),
    user_id: text("user_id").references(() => users.id),
    name: text("name").notNull(),
    prepTime: integer("prepTime"),
    size: integer("size"),
    description: text("description"),
    createdAt: timestamp("createdAt", { mode: "date" }),
    lastEdit: timestamp("lastEdit", {mode: "date"})
  }
)