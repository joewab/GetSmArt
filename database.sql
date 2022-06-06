
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "image" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"url" varchar(255555) NOT NULL,
	"description" varchar(2555) NOT NULL,
	"artist" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"year" varchar(255) NOT NULL,
	"media" varchar(255) NOT NULL);



CREATE TABLE "gallery" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL);



CREATE TABLE "classroom" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"class_name" varchar(255) NOT NULL);



CREATE TABLE "class_gallery" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"class_id" integer NOT NULL,
	"gallery_id" integer NOT NULL);



CREATE TABLE "user_class" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"class_id" integer NOT NULL);



CREATE TABLE "gallery_image" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"gallery_id" integer NOT NULL,
	"image_id" integer NOT NULL);



CREATE TABLE "score" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"score" integer DEFAULT 0,
	"user_id" integer DEFAULT 0,
	"gallery_id" integer DEFAULT 0);
	
