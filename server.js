var express = require('express')
var bodyParser = require('body-parser')
var mongo = require('mongodb')

var app = express()

var MongoClient = mongo.MongoClient

MongoClient.connect('mongodb://localHost:27017/mongo-todo', function(err, db) {

	if(err) {

		console.log('failed to connect to mongo')
		console.log(err)
	}

		console.log('success')

	app.use(express.static('./public'))

	app.use(bodyParser.urlencoded({extended: true}))
	app.use(bodyParser.json())


	app.get('/', function(req, res) {

		res.sendFile('./html/index.html', {root: './public'})
	})

//STORE NEW TASK
	app.post('/todo', function(req, res){

		body = req.body

		if (body.isCompleted === 'false') {

			body.isCompleted = false
		}
		
		// console.log(body)	

			db.collection('Tasks').insert(body, function(err){

				if(err){
					
					console.log(err)
					
					res.send('something went wrong')
				}
				
			})

			res.send('recieved')

	})

//GET NEW TASKS
	app.get('/todo', function(req, res){

		db.collection('Tasks').find().toArray(function(err, docs){

			if(err) {

				console.log(err)
				
				res.send('something went wrong')
			}

			res.send(docs)
		})
	})

//REMOVE TASK
	app.post('/delete', function(req, res){

		body = req.body

		// console.log(body)

		db.collection('Tasks').remove({taskName: body.taskName}, function(err, results){
			
			if(err){

				console.log(err)
			}

			// console.log(results)

			res.send('item deleted')
		})	
	})



	app.listen(8082, function(){

		console.log("'mongo-todo' running on port 8082")
	})
})

