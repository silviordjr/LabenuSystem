import { Request, Response } from "express"
import { StudentsDatabase } from "../data/StudentsDatabase"

const updateStudentClass = async (req: Request, res: Response) => {

    try {

        const id = req.params.id
        const classId = req.body.classId

        if (!id && !classId) {
            res.statusCode = 422
            throw new Error(`Por favor, insira o id do aluno(a) e o "classId" da nova turma a qual ele(a) fará parte!`)
        }

        const studentDBS = new StudentsDatabase()
        await studentDBS.changeStudentClass(id, classId)

        console.log({ id, classId })

        res.status(200).send("Alteração realizada com sucesso!")

    } catch (error) {
        if (res.statusCode === 200)
            res.status(500).send("Sistema temporariamente indisponível. Tente novamente mais tarde!")
        else
            res.send(error.sqlMessage || error.message)
    }

}

export default updateStudentClass