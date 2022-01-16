import { Request, Response } from "express" 
import app from "./app" 
import changeClass from "./endpoints/changeClass" 
import changeModule from "./endpoints/changeModule" 
import createClass from "./endpoints/createClass" 
import { createStudent } from "./endpoints/createStudent"
import createTeacher from "./endpoints/createTeacher" 
import getActiveClass from "./endpoints/getActiveClass" 
import getAllTeachers from "./endpoints/getAllTeachers" 
import getClass from "./endpoints/getClass" 
import getPersons from "./endpoints/getPersons"
import getStudentsById from "./endpoints/getStudentsByName"
import getTeacherByExpertise from "./endpoints/getTeacherByExpertise"
import updateStudentClass from "./endpoints/updateStudentClass"

app.get("/", (req: Request, res: Response) => { res.send("Hello World!") }) 
app.get("/teachers", getAllTeachers) 
app.get('/classes', getClass) 
app.get('/active/classes', getActiveClass) 
app.get('/students/:name', getStudentsById)
app.get('/persons/class/:classId', getPersons)
app.get('/teachers/expertise/:expertise', getTeacherByExpertise)

app.post('/classes', createClass) 
app.post('/teachers', createTeacher) 
app.post(`/students`, createStudent)
app.post(`/students/:id`, updateStudentClass)

app.put('/classes/:id', changeModule) 
app.put('/teachers/class/:id', changeClass) 




