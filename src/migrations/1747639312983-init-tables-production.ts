import { MigrationInterface, QueryRunner } from "typeorm";

export class InitTablesProduction1747639312983 implements MigrationInterface {
    name = 'InitTablesProduction1747639312983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "amentities" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "iconSvg" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "hotelId" integer, CONSTRAINT "PK_c3680b07dde491ccc8e4c0a5a3d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."hotels_svctype_enum" AS ENUM('Hotels', 'Tours')`);
        await queryRunner.query(`CREATE TABLE "hotels" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "star" integer DEFAULT '0', "price" numeric NOT NULL, "hasBreakfast" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "svcType" "public"."hotels_svctype_enum" NOT NULL, "location" character varying, CONSTRAINT "PK_2bb06797684115a1ba7c705fc7b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rooms" ("id" SERIAL NOT NULL, "room" integer NOT NULL, "size" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "hotelId" integer, CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."profiles_gender_enum" AS ENUM('Male', 'Female', 'Other')`);
        await queryRunner.query(`CREATE TABLE "profiles" ("id" SERIAL NOT NULL, "address" character varying NOT NULL, "gender" "public"."profiles_gender_enum" NOT NULL, CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("firstName" character varying(255), "lastName" character varying(255), "id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "profileId" integer, CONSTRAINT "REL_b1bda35cdb9a2c1b777f5541d8" UNIQUE ("profileId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "carts" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "amentities" ADD CONSTRAINT "FK_f24cb21d9f6bef44303aa2cae83" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "rooms" ADD CONSTRAINT "FK_e9d4d68c8c47b7fe47b8e233f60" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87"`);
        await queryRunner.query(`ALTER TABLE "rooms" DROP CONSTRAINT "FK_e9d4d68c8c47b7fe47b8e233f60"`);
        await queryRunner.query(`ALTER TABLE "amentities" DROP CONSTRAINT "FK_f24cb21d9f6bef44303aa2cae83"`);
        await queryRunner.query(`DROP TABLE "carts"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "profiles"`);
        await queryRunner.query(`DROP TYPE "public"."profiles_gender_enum"`);
        await queryRunner.query(`DROP TABLE "rooms"`);
        await queryRunner.query(`DROP TABLE "hotels"`);
        await queryRunner.query(`DROP TYPE "public"."hotels_svctype_enum"`);
        await queryRunner.query(`DROP TABLE "amentities"`);
    }

}
