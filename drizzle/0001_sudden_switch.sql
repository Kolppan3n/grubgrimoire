CREATE TABLE IF NOT EXISTS "gg_authenticator" (
	"credentialID" text NOT NULL,
	"userId" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"credentialPublicKey" text NOT NULL,
	"counter" integer NOT NULL,
	"credentialDeviceType" text NOT NULL,
	"credentialBackedUp" boolean NOT NULL,
	"transports" text,
	CONSTRAINT "gg_authenticator_userId_credentialID_pk" PRIMARY KEY("userId","credentialID"),
	CONSTRAINT "gg_authenticator_credentialID_unique" UNIQUE("credentialID")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gg_session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gg_user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"emailVerified" timestamp,
	"image" text,
	CONSTRAINT "gg_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gg_verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "gg_verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
ALTER TABLE "person" RENAME TO "gg_account";--> statement-breakpoint
DROP INDEX IF EXISTS "unique_idx";--> statement-breakpoint
ALTER TABLE "gg_account" ADD CONSTRAINT "gg_account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId");--> statement-breakpoint
ALTER TABLE "gg_account" ADD COLUMN "userId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "gg_account" ADD COLUMN "type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "gg_account" ADD COLUMN "provider" text NOT NULL;--> statement-breakpoint
ALTER TABLE "gg_account" ADD COLUMN "providerAccountId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "gg_account" ADD COLUMN "refresh_token" text;--> statement-breakpoint
ALTER TABLE "gg_account" ADD COLUMN "access_token" text;--> statement-breakpoint
ALTER TABLE "gg_account" ADD COLUMN "expires_at" integer;--> statement-breakpoint
ALTER TABLE "gg_account" ADD COLUMN "token_type" text;--> statement-breakpoint
ALTER TABLE "gg_account" ADD COLUMN "scope" text;--> statement-breakpoint
ALTER TABLE "gg_account" ADD COLUMN "id_token" text;--> statement-breakpoint
ALTER TABLE "gg_account" ADD COLUMN "session_state" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gg_authenticator" ADD CONSTRAINT "gg_authenticator_userId_gg_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."gg_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gg_session" ADD CONSTRAINT "gg_session_userId_gg_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."gg_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gg_account" ADD CONSTRAINT "gg_account_userId_gg_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."gg_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "gg_account" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "gg_account" DROP COLUMN IF EXISTS "name";--> statement-breakpoint
ALTER TABLE "gg_account" DROP COLUMN IF EXISTS "email";--> statement-breakpoint
ALTER TABLE "gg_account" DROP COLUMN IF EXISTS "image";--> statement-breakpoint
ALTER TABLE "gg_account" DROP COLUMN IF EXISTS "createdAt";