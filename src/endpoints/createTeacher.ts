import { Request, Response } from "express";
import { TeacherDatabase } from "../data/TeacherDatabase";
import { Teacher } from "../types";

export default async function createTeacher(req: Request, res: Response): Promise<void>{
    try{
        const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
        const {name, email, birthdate, classId, expertises} = req.body
        const teacherDB = new TeacherDatabase()
        const newTeacher = new Teacher(id, name, email, birthdate, classId, expertises)

        await teacherDB.create(newTeacher)

        res.status(200).send("Professor criado!")
    } catch (error){
        if (res.statusCode === 200)
            // res.status(500).send("Sistema temporariamente indisponível. Tente novamente mais tarde!")
            res.send(error.sqlMessage || error.message)

        else
            res.send(error.sqlMessage || error.message)
    }
}