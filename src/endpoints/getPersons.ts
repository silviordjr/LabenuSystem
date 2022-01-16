import { Request, Response } from "express";
import { ClassDatabase } from "../data/ClassDatabase";

export default async function getPersons (req:Request, res: Response): Promise<void> {
    try {
        const classId = req.params.classId

        const classDB = new ClassDatabase()
        const persons = await classDB.getPersons(classId)

        res.status(200).send(persons)

    } catch (error){
        if (res.statusCode === 200)
        res.send(error.sqlMessage || error.message)
            // res.status(500).send("Sistema temporariamente indisponível. Tente novamente mais tarde!")
        else
            res.send(error.sqlMessage || error.message)
    }
}