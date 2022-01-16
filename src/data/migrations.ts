import { connection } from "../connection"

const printError = (error) => { console.log(error.sqlMessage || error.message) }

const createTables = () => connection
   .raw(`

   CREATE TABLE IF NOT EXISTS Class (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      module ENUM ("0", "1", "2", "3", "4", "5", "6") DEFAULT "0"
   );

   CREATE TABLE IF NOT EXISTS Student (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      birthdate DATE NOT NULL,
      classId VARCHAR(255) NOT NULL,
      FOREIGN KEY (class_id) REFERENCES Class(id)
   );

   CREATE TABLE IF NOT EXISTS Hobbie (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE
   );

   CREATE TABLE IF NOT EXISTS Student_Hobbie (
      id VARCHAR(255) PRIMARY KEY,
      student_id VARCHAR(255) NOT NULL,
      hobbie_id VARCHAR(255) NOT NULL,
      FOREIGN KEY (student_id) REFERENCES Student(id),
      FOREIGN KEY (hobbie_id) REFERENCES Hobbie(id)
   );

   CREATE TABLE IF NOT EXISTS Teacher (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      birthdate DATE NOT NULL,
      class_id VARCHAR(255) NOT NULL ,
      FOREIGN KEY (class_id) REFERENCES Class(id)
   );

   CREATE TABLE IF NOT EXISTS Expertise (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE
   );

   CREATE TABLE IF NOT EXISTS Teacher_expertise (
      id VARCHAR(255) PRIMARY KEY,
      teacher_id VARCHAR(255) NOT NULL,
      expertise_id VARCHAR(255) NOT NULL,
      FOREIGN KEY (teacher_id) REFERENCES Teacher(id),
      FOREIGN KEY (expertise_id) REFERENCES Expertise(id)
   );

`)
   .then(() => { console.log("Tabelas criadas") })
   .catch(printError)

createTables()