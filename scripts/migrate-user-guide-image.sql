BEGIN;

ALTER TABLE user_guides ADD COLUMN IF NOT EXISTS image_id integer;
ALTER TABLE user_guides ADD COLUMN IF NOT EXISTS image_alt character varying;

DO $do$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'user_guides_image_id_media_id_fk'
  ) THEN
    ALTER TABLE user_guides
      ADD CONSTRAINT user_guides_image_id_media_id_fk
      FOREIGN KEY (image_id) REFERENCES media(id) ON DELETE SET NULL;
  END IF;
END
$do$;

CREATE INDEX IF NOT EXISTS user_guides_image_idx ON user_guides(image_id);

ALTER TABLE user_guides DROP COLUMN IF EXISTS cover_title;
ALTER TABLE user_guides DROP COLUMN IF EXISTS cover_tone;

ALTER TABLE _user_guides_v ADD COLUMN IF NOT EXISTS version_image_id integer;
ALTER TABLE _user_guides_v ADD COLUMN IF NOT EXISTS version_image_alt character varying;

DO $do$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = '_user_guides_v_version_image_id_media_id_fk'
  ) THEN
    ALTER TABLE _user_guides_v
      ADD CONSTRAINT _user_guides_v_version_image_id_media_id_fk
      FOREIGN KEY (version_image_id) REFERENCES media(id) ON DELETE SET NULL;
  END IF;
END
$do$;

CREATE INDEX IF NOT EXISTS _user_guides_v_version_image_idx ON _user_guides_v(version_image_id);

ALTER TABLE _user_guides_v DROP COLUMN IF EXISTS version_cover_title;
ALTER TABLE _user_guides_v DROP COLUMN IF EXISTS version_cover_tone;

DROP TYPE IF EXISTS enum_user_guides_cover_tone;
DROP TYPE IF EXISTS enum__user_guides_v_version_cover_tone;

COMMIT;
