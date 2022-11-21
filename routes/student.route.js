const express = require('express')
const router = express.Router();
const studentSchema = require('../models/student.model')


// get = display all items in the database in the page
router.get('/', async (req, res)=>{
    // database here

    const students = await studentSchema.find().sort({ postDate: -1 })
    // attaching some data to the page || It is here we will attach the items from the database to the page
    res.render('students', {allStudents: students})
})

// get:id: get a particular studnet
router.get('/:id', (req, res)=>{
    const id = req.params.id
    const findStudent = studentSchema.findById({_id:id}, (err, data) => {
        if(err){
            console.log(err)
            console.log('no user found')
        } else {
            if(data){ 
                console.log(data)
            } else {
                console.log(' cant find user')
            }
        }
    })
    console.log(id)
})

//post: add new information to the /student resource
router.post('/', async (req, res)=>{
    let newStudent = new studentSchema ({
        firstName:req.body.firstName,
        lastName: req.body.lastName,
        studentId: req.body.studentId,
        nin: req.body.nin,
        intId: req.body.intId,
        email: req.body.email,
        department: req.body.department,
        programme: req.body.programme,
        intake: req.body.intake,
        status: req.body.status,
    })
    // the DB
    const students = await studentSchema.find().sort({ addedDate: -1 })
    
    // DO THE VALIDATION HERE
    if(newStudent.firstName ==="" || newStudent.lastName === "" || newStudent.studentId === "" || newStudent.nin === "" || newStudent.intId === "" || newStudent.email === "" || newStudent.department === "" || newStudent.programme === "" || newStudent.intake === "" || newStudent.status === ""){
        console.log('Please check the contents of your student')
        res.render('students', {allStudents: students})
        return
    } else {
        try {
            newStudent = await newStudent.save();
            res.redirect(`/students/`)
            console.log(`Student with the name of: ${newStudent.firstName} successfully submitted`)
        } catch (err) {
            if(err){
                console.log(err)
            }
        }
    }
})


router.get('/delete/:id', async(req, res) => {
    const id = req.params.id;
    if(id.length == 24) {
        const checkStudent = await studentSchema.findOne({_id:id})
        if(checkStudent){
            const deleteStudent = await studentSchema.findOneAndDelete({_id:id})
            return res.redirect('/students')
        } else {
            return res.redirect('/students');
        }
    } else {
        return res.redirect('/students');
    }
})


router.get('/edit/:id', async(req, res) => {
    const id = req.params.id;
    if(id.length == 24 ){
        const checkStudent = await studentSchema.findOne({_id:id})
        console.log(checkStudent)
        if(checkStudent){
           return res.render('edit_student',{Student:checkStudent});
        } else {
            return res.redirect('/students')
        }
    } else {
        return res.redirect('/students')
    }
})

router.post('/edit/:id', async(req, res) => {
    const id = req.params.id;
    const collect = req.body;
    if(id.length == 24 ){
        const checkStudent = await studentSchema.findOne({_id:id})
        if(checkStudent){
            if(collect.firstName != null && 
                collect.lastName != null && 
                collect.studentId != null &&
                collect.nin != null &&
                collect.intId != null && 
                collect.email != null && 
                collect.department != null && 
                collect.programme != null && 
                collect.intake != null &&
                collect.status != null 
                ) {
                    const updateStudent = await studentSchema.findByIdAndUpdate({_id:id},
                        {firstName:collect.firstName, 
                        lastName:collect.lastName, 
                        studentId:collect.studentId,
                        nin:collect.nin,
                        intId:collect.intId,
                        email:collect.email,
                        department:collect.department,
                        programme:collect.programme,
                        intake:collect.intake,
                        status:collect.status
                    },(err, data) => {
                        if(err){
                            console.log(err)
                            console.log('not updated')
                        } else {
                            if(data){
                              
                                return res.redirect('/students')
                            }
                        }
                    })
                }
        } else {
            console.log('student not found')
        }
    } else {
        console.log('invalid id')
    }
})


module.exports = router;