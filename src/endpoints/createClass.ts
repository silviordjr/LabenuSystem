import { Request, Response } from "express"
import { ClassDatabase } from "../data/ClassDatabase"
import { ClassFormat } from "../types"

export default async function createClass (req: Request, res: Response): Promise<void> {
    try{
        const {name} = req.body
        const classId = Date.now().toString(36) + Math.random().toString(36).substr(2);
        const classDB = new ClassDatabase()
        const newClass = new ClassFormat(classId, name, "0")

        await classDB.create(newClass)

        res.status(200).send("Nova turma criada!")

    } catch (error){
        if (res.statusCode === 200)
            // res.status(500).send("Sistema temporariamente indisponível. Tente novamente mais tarde!")
            res.send(error.sqlMessage || error.message)

        else
            res.send(error.sqlMessage || error.message)
    }
}