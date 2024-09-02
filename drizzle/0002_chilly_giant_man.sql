CREATE TABLE IF NOT EXISTS "gg_incredient" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"amount" integer NOT NULL,
	"unit_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gg_recipe" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text,
	"name" text NOT NULL,
	"prepTime" integer,
	"size" integer,
	"description" text,
	"step_id" integer,
	"incredient_id" integer,
	"createdAt" timestamp,
	"lastEdit" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gg_step" (
	"id" serial PRIMARY KEY NOT NULL,
	"number" integer NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gg_unit" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gg_incredient" ADD CONSTRAINT "gg_incredient_unit_id_gg_unit_id_fk" FOREIGN KEY ("unit_id") REFERENCES "public"."gg_unit"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gg_recipe" ADD CONSTRAINT "gg_recipe_user_id_gg_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."gg_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gg_recipe" ADD CONSTRAINT "gg_recipe_step_id_gg_step_id_fk" FOREIGN KEY ("step_id") REFERENCES "public"."gg_step"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gg_recipe" ADD CONSTRAINT "gg_recipe_incredient_id_gg_incredient_id_fk" FOREIGN KEY ("incredient_id") REFERENCES "public"."gg_incredient"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
