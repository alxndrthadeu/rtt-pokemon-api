-- Remove user_id foreign key and column from runs
ALTER TABLE "runs" DROP CONSTRAINT IF EXISTS "runs_user_id_fkey";
ALTER TABLE "runs" DROP COLUMN IF EXISTS "user_id";

-- Add session_id (anonymous UUID)
ALTER TABLE "runs" ADD COLUMN "session_id" TEXT NOT NULL DEFAULT '';

-- Drop index on user_id if exists
DROP INDEX IF EXISTS "runs_user_id_idx";

-- Create index on session_id
CREATE INDEX IF NOT EXISTS "runs_session_id_idx" ON "runs"("session_id");

-- Drop users table
DROP TABLE IF EXISTS "users";
