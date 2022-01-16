import knex from "knex";
import { Teacher } from "../types";
import formatDate from "../services/formatDate"
import dotenv from "dotenv"

dotenv.config()


export class TeacherDatabase {

    private connection: any = knex({
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

    async create(teacher: Teacher) {

        await this.connection(`Teacher`)
            .insert({
                id: teacher.getId(),
                name: teacher.getName(),
                email: teacher.getEmail(),
                birthdate: teacher.getBirthdate(),
                class_id: teacher.getTurmaId()
            })

        const expertises = teacher.getExpertise()

        const expertiseId = (): string => {
            return (Date.now().toString(36) + Math.random().toString(36).substr(2))
        }

        const teacherExpertiseId = (): string => {
            return (Date.now().toString(36) + Math.random().toString(36).substr(2))
        }

        const expertisesOnList = await this.connection('Expertise').select()

        for (let exp of expertises) {
            const index = expertisesOnList.findIndex((element) => element.name.toUpperCase() === exp.toUpperCase())
            let expertiseID: string

            if (index === -1){
                expertiseID = expertiseId()

                await this.connection('Expertise')
                    .insert({
                        id: expertiseID,
                        name: exp
                    })

                await this.connection('Teacher_expertise')
                    .insert({
                        id: teacherExpertiseId(),
                        teacher_id: teacher.getId(),
                        expertise_id: expertiseID
                    })
            } else {
                expertiseID = expertisesOnList[index].id

                await this.connection('Teacher_expertise')
                    .insert({
                        id: teacherExpertiseId(),
                        teacher_id: teacher.getId(),
                        expertise_id: expertiseID
                    })
            }
            
        }
    }

    async getAll(): Promise<Teacher[]> {
        const results: any = await this.connection(`Teacher`)
            .join('Class', 'Class.id', '=', 'Teacher.class_id')
            .select(`Teacher.id as id`, `Teacher.name as name`, `Teacher.email as email`, `Teacher.birthdate as birthdate`, 'Class.name as class')

        const expertises: any = await this.connection(`Teacher`)
            .join('Teacher_expertise', `Teacher.id`, '=', 'Teacher_expertise.teacher_id')
            .join('Expertise', 'Expertise.id', '=', 'Teacher_expertise.expertise_id')
            .select(`Teacher.id as id`, 'Expertise.name as expertise')

        const teachersResult: Teacher[] = []

        for (let result of results) {
            let expertisesList = []

            for (let exp of expertises){
                if (result.id === exp.id){
                    expertisesList.push(exp.expertise)
                }
            }

            const teachers = new Teacher(result.id, result.name, result.email, formatDate(result.birthdate), result.class, expertisesList)
            teachersResult.push(teachers)
        }

        return (teachersResult)
    }

    async changeClass(id: string, classId: string): Promise<void> {
        await this.connection(`Teacher`)
            .where('id', '=', id)
            .update({
                class_id: classId
            })
    }

    async getTeacherByExpertise (expertise: string) {
        const results: any = await this.connection(`Teacher`)
            .join('Class', 'Class.id', '=', 'Teacher.class_id')
            .select(`Teacher.id as id`, `Teacher.name as name`, `Teacher.email as email`, `Teacher.birthdate as birthdate`, 'Class.name as class')

        const expertises: any = await this.connection(`Teacher`)
            .join('Teacher_expertise', `Teacher.id`, '=', 'Teacher_expertise.teacher_id')
            .join('Expertise', 'Expertise.id', '=', 'Teacher_expertise.expertise_id')
            .select(`Teacher.id as id`, 'Expertise.name as expertise')

        const teachersResult: any = []

        for (let result of results) {
            let expertisesList = []

            for (let exp of expertises){
                if (result.id === exp.id){
                    expertisesList.push(exp.expertise)
                }
            }

            const teachers = new Teacher(result.id, result.name, result.email, formatDate(result.birthdate), result.class, expertisesList)
            teachersResult.push(teachers)
        }


        let teachersExpertise = []

        for (let teach of teachersResult){
            const index = teach.expertise.findIndex((element) => element === expertise)
            
            if (index !== -1){
                teachersExpertise.push(teach)
            }
        }

        return (teachersExpertise)

    }
}