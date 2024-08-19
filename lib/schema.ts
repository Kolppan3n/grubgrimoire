import { relations } from 'drizzle-orm';
import {
  pgTable,
  serial,
  integer,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

type uom = "mg" | "g" | "kg" | "ml" | "dl" | "l" | "tsp" | "tbsp"

// Create a pgTable that maps to a table in your DB
export const person = pgTable(
  'person',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    image: text('image').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(users.email),
    };
  },
);

export const step = pgTable(
  'step',
  {
    id: serial('id').primaryKey(),
    recipe_id: integer('recipe_id').notNull(),
    number: integer('number').notNull(),
    description: text('description').notNull()
  }
)

export const incredient = pgTable(
  'incredient',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    amount: integer('amount').notNull(),
    uom: text('uom'),
    url: text('url'),
    price: text('price')
  }
)

export const recipe = pgTable(
  'recipe',
  {
    id: serial('id').primaryKey(),
    person_id: integer('person_id').references(() => person.id),
    name: text('name').notNull(),
    prepTime: integer('prepTime').notNull(),
    size: integer('size').notNull(),
    description: text('description')
  }
)

export const stepRelations = relations(step, ({ one }) => ({
  recipe: one(recipe, {
    fields: [step.recipe_id],
    references: [recipe.id]
  })
}))

export const recipeRelations = relations(recipe, ({ many }) => ({
  steps: many(step)
}))
