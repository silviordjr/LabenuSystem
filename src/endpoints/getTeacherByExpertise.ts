import { Request, Response } from "express";
import { TeacherDatabase } from "../data/TeacherDatabase"
import { Teacher } from "../types"

export default async function getTeacherByExpertise (req:Request, res: Response): Promise<void>{
    try{
        const expertise = req.params.expertise 

        const teacherDB = new TeacherDatabase()
        const teachers: Teacher[] = await teacherDB.getTeacherByExpertise(expertise)

        res.status(200).send(teachers)

    } catch (error){
        if (res.statusCode === 200)
            // res.status(500).send("Sistema temporariamente indisponível. Tente novamente mais tarde!")
            res.send(error.sqlMessage || error.message)

        else
            res.send(error.sqlMessage || error.message)
    }
}