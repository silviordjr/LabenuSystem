import { Request, Response } from "express"
import connection from "../connection"
import { StudentsDatabase } from "../data/StudentsDatabase"
import { Students } from "../types"

export const createStudent = async (req: Request, res: Response) => {
    try {
        const id = Date.now().toString()
        const { name, email, birthdate, classId, hobbies } = req.body

        if (!name || !email || !birthdate || !classId || !hobbies) {
            res.statusCode = 422
            throw new Error("Os campos 'name', 'email', 'birthdate','classId' e 'hobbies' são obrigatórios")
        }

        if (!email.includes("@") || !email.includes(".com")) {
            res.statusCode = 422
            throw new Error('Formato de e-mail inválido. O e-mail deve conter "@" e ".com" ');
        }

        const sdb = new StudentsDatabase()
        const student = new Students(id, name, email, birthdate, classId, hobbies)

        await sdb.create(student)

        res.status(201).send('Estudante criado com sucesso!');


    } catch (error) {
        if (res.statusCode === 200)
            res.status(500).send("Sistema temporariamente indisponível. Tente novamente mais tarde!")
        else
            res.send(error.sqlMessage || error.message)
    }


}