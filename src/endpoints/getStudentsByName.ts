import { Request, Response } from "express"
import { Students } from "../types"
import { StudentsDatabase } from "../data/StudentsDatabase"

const getStudentsById = async (req: Request, res: Response) => {

    try {

        const studentsByNameDB = new StudentsDatabase()
        const students: Students[] = await studentsByNameDB.getStudentByID(req.params.name)

        const results = new StudentsDatabase()
        const hobbies = await results.getHobbiesByStudent(req.params.name)

        res.status(200).send({
            ...students[0],
            Hobbies: hobbies
        })

    } catch (error) {
        if (res.statusCode === 200)
            res.status(500).send("Sistema temporariamente indisponível. Tente novamente mais tarde!")
        else
            res.send(error.sqlMessage || error.message)
    }

}

export default getStudentsById