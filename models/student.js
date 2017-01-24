 


 	var mongoose = require('mongoose');
 	var StudentSchema = new mongoose.Schema(
 		{
 		
    		regNo :{
    			 type : String,
    			 unique : true,
    			 required : true
    			
    		},
    		
    		rollNo : Number,
    		name : {
    				firstname : String,
    				lastname : String
    		},
    		age : Number,
    		collegeName : String,
    		address : {
    			city : String,
    			country : String,
    			state : String
    		}
    	
 		}
 	);

 	module.exports = mongoose.model("Student", StudentSchema);

 	/* var Student = require('/models/student)*/