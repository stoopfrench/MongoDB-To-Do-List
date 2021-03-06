var mainVm = new Vue({

	el: '#app',
	data: {

		tasks: [],
		newTasks: 
		{
			taskName: '',
			isCompleted: false,
		},
		

},
	methods: {

		postNewTask: function(event){

			event.preventDefault()

			var task = mainVm.newTasks				

			if(task.taskName === "") {
				
				console.log('empty input')
			}

			else {
		
			$.post('/todo', task, function(data){
				
				mainVm.getNewTasks()

			})
				
				mainVm.newTasks.taskName = ""
		}
	
	},

		getNewTasks: function(){

			$.get('/todo', function(data){

				mainVm.tasks = data

			})
		},

		updateTask: function(task){


			$.post('/update', task, function(data){

				console.log('updated ' + task.taskName)

				// console.log(data)
			})
		},

		removeTask: function(task){


	      	var index = this.tasks.indexOf(task);

	      	this.tasks.splice(index, 1);

	      	$.post('/delete', task, function(data){

	      		console.log('deleted: ' + task.taskName)

	      	})
		},

},
	created: function(){

		this.getNewTasks()
	}
})