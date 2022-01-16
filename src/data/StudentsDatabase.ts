import knex from "knex";
import Knex = require("knex")
import { Students } from "../types";
import dotenv from "dotenv"
import formatDate from "../services/formatDate"

dotenv.config()

export class StudentsDatabase {

    private connection: Knex = knex({
        client: "mysql",
        connection: {
            host: process.env.DB_HOST,
            port: 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_SCHEMA,
            multipleStatements: true
        }
    })

    async create(student: Students) {

        await this.connection("Student")
            .insert({
                id: student.getId(),
                name: student.getName(),
                email: student.getEmail(),
                birthdate: student.getBirthdate(),
                classId: student.getTurmaId()
            })

        const hobbies = student.getHobbies()

        const hobbieId = (): string => {
            return (Date.now().toString())
        }

        const studentHobbieId = (): string => {
            return (Date.now().toString())
        }

        for (let hobbie of hobbies) {
            const HobbieID = hobbieId()

            await this.connection('Hobbie')
                .insert({
                    id: HobbieID,
                    name: hobbie.toLowerCase()
                })

            await this.connection('Student_Hobbie')
                .insert({
                    id: studentHobbieId(),
                    student_id: student.getId(),
                    hobbie_id: HobbieID
                })
        }
    }

    async getStudentByID(name: string): Promise<Students[]> {
        const results = await this.connection("Student").where('name', "LIKE", `%${name}%`)
        const studentsResult: Students[] = []

        for (let result of results) {
            const students = new Students(result.id, result.name, result.email, formatDate(result.birthdate), result.classId, result.hobbies)
            studentsResult.push(students)
        }
        return (studentsResult)
    }

    async getHobbiesByStudent(name): Promise<void> {

        const results = await this.connection.raw(`
            SELECT Student.id as "Student_ID", 
            Student.name, 
            Student.email, 
            Student.birthdate, 
            Student.classId, 
            Hobbie.name as Student_hobbie
            FROM Student_Hobbie
            JOIN Student
            ON Student.id = Student_Hobbie.student_id
            JOIN Hobbie
            ON Hobbie.id = Student_Hobbie.hobbie_id
            WHERE Student.name = "${name}"; 
        `)

        const hobbiesResult: any = []

        for (let result of results[0]) {
            const eachHobbie: any = result.Student_hobbie
            hobbiesResult.push(eachHobbie)
        }

        return hobbiesResult
    }

    async changeStudentClass(id: string, classId: string): Promise<void> {
        await this.connection("Student").update({ classId }).where({ id })
    }


}