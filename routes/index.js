var express = require('express');
var router = express.Router();
/*requiring the student model of moongoose*/
var Student = require('../models/student');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/student/add', function(req, res, next) {
  res.render('add_student_data', { title: 'Add Student Data' });
});

router.get('/student/list/:rollNo?/:regNo?', function(req,res,next){
	var filter = {};
	if(req.params.rollNo !== undefined) filter.rollNo= req.params.rollNo
	if(req.params.regNo !== undefined) filter.regNo= req.params.regNo
	Student.find(filter)
	.exec(function(err,students){
		if(err){

		}
		res.render('list', {title : 'Student Details',students : students});
		//return res.json(students);
	});
});

router.post('/student/add', function(req, res, next) {
 // var student= req.body.student;
 	//console.log(req.body.studentData);
 	// var student = JSON.parse(req.body).studentData;
 	// console.lo(student);
 	var student = JSON.parse(req.body.studentData);

 	var student1 = new Student(student);
 	//console.log(student1);//the moongoose object with the unique _id
 	//console.log(student);
 	student1.save(function(err,result){
 		if(err){
 			return res.json({
 				error : true,
 				reason : err
 			});
 		}
 		return res.json({
 			error : false
 		});
 	});

  //res.json(student);
});


router.get('/student/edit/:studentId', function(req,res,next){
	//console.log(req.params.studentId)

	

	Student.findOne({_id : req.params.studentId})
		.exec(function(err,student){
			if(err) {
				res.send('ERROR')
			}
			res.render('edit_student_data', { title : 'Edit Student Details', student : student});
		})
	
});






router.put('/student/edit/:studentId', function(req,res,next){

	// console.log(req.params.studentId)
	
	//console.log(req.body.studentData);

		Student.findByIdAndUpdate(req.params.studentId, req.body.studentData, { new: true }, function (err, stud) {
  			if (err) {
  				//res.send('ERROR');
  				console.log(err)
  			}
  			//console.log('student data updated')
  			res.send(stud);
		});
});




router.get('/student/delete/:studentId' , function(req,res,next){
	res.render('delete_student_data');
});

router.delete('/student/delete/:studentId', function(req,res,next){

		Student.findByIdAndRemove(req.params.studentId, function (err, stud) {
			if(err){
				console.log(err)
			}

    		res.send('Student deleted successfully');

		}); 

});

module.exports = router;
