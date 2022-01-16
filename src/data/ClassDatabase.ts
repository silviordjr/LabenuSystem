import knex from "knex";
import { ClassFormat } from "../types";
import dotenv from "dotenv"

dotenv.config()


export class ClassDatabase {
    private connection = knex({
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

     async create(classe: ClassFormat) {
         await this.connection('Class')
            .insert({
                id: classe.getId(),
                name: classe.getName()
            })

     }

     async getAll(){
         const results: any = await this.connection('Class').select()
         const classResult: ClassFormat[] = []

         for (let result of results) {
            const classes = new ClassFormat(result.id, result.name, result.module)
            classResult.push(classes)
        }

        return (classResult)
     }

     async getActiveClass (){
        const results: any = await this.connection('Class').select().where('module', "<>", "0")
        const classResult: ClassFormat[] = []

        for (let result of results) {
           const classes = new ClassFormat(result.id, result.name, result.module)
           classResult.push(classes)
       }

       return (classResult)
     }

     async changeModule (id: string, module: string){
         if (module !== "1" && module !== "2" && module !== "3" && module !== "4" && module !== "5" && module !== "6" && module !== "0"){
             throw new Error("Modulo não válido")
         }

        await this.connection('Class')
         .where('id', '=', id)
         .update({
             module: module
         })
     }

    async getPersons (classId: string){
        const teachers: any = await this.connection(`Teacher`)
            .where(`Teacher.class_id`, '=', classId)
            .select('id', 'name')
        
        const students: any = await this.connection("Student")
            .where("Student.classId", '=', classId)
            .select('id', 'name')
        
        const persons = {
            teachers: teachers,
            students: students
        }

        return (persons)
            
    }
}