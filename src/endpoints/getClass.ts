import { Request, Response } from "express";
import { ClassDatabase } from "../data/ClassDatabase";
import { ClassFormat } from "../types";


export default async function getClass (req: Request, res: Response): Promise<void> {
    try{
        const classDB = new ClassDatabase()
        const classes: ClassFormat[] = await classDB.getAll()

        res.status(200).send(classes)

    } catch (error){
        if (res.statusCode === 200)
            // res.status(500).send("Sistema temporariamente indisponível. Tente novamente mais tarde!")
            res.send(error.sqlMessage || error.message)

        else
            res.send(error.sqlMessage || error.message)
    }
}