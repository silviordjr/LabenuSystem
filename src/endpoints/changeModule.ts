import { Request, Response } from "express";
import { ClassDatabase } from "../data/ClassDatabase";

export default async function changeModule (req:Request, res: Response): Promise<void> {
    try{
        const id = req.params.id
        const module = req.body.module

        const classDB = new ClassDatabase()
        await classDB.changeModule(id, module)

        res.status(200).send('Módulo alterado com sucesso!')
    } catch (error) {
        if (res.statusCode === 200)
            // res.status(500).send("Sistema temporariamente indisponível. Tente novamente mais tarde!")
            res.send(error.sqlMessage || error.message)

        else
            res.send(error.sqlMessage || error.message)
    }
}