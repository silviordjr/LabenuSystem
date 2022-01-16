import { Request, Response } from "express";
import { TeacherDatabase } from "../data/TeacherDatabase";

export default async function changeClass (req:Request, res:Response): Promise<void> {
    try{
        const id = req.params.id
        const classId = req.body.classId 

        const teacherDB = new TeacherDatabase()
        await teacherDB.changeClass(id, classId)

        res.status(200).send("Turma alterada com sucesso!")
    } catch (error){
        if (res.statusCode === 200)
        // res.status(500).send("Sistema temporariamente indisponível. Tente novamente mais tarde!")
        res.send(error.sqlMessage || error.message)

        else
            res.send(error.sqlMessage || error.message)
    }
}