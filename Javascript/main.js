
var studentApi= "http://localhost:3000/courses";

function start() {
	getStudents(renderStudents);
	handleCreateForm();
};


function getStudents(callback) {
	fetch(studentApi)
	.then(function(responsie) {
		return responsie.json();
	})
	.then(callback);  
}

function renderStudents(students) {
	var listStudentBlock = document.querySelector('#list-students');
	var htmls = students.map(function(student) {
		return `
			<li class="student-item-${student.id}">
				<h4 class= "student-name-${student.id}">${student.name}</h4>
				<p class= "student-nickname-${student.id}">${student.nickname}</p>
				<p class= "student-age-${student.id}">${student.age}</p>
				<button onclick= "handleDeleteStudent(${student.id})"">Delete</button>
				<button id="edit-student-${student.id}" onclick= "handleEditStudent(${student.id})">Edit</button>
			</li>
			`
	})
	listStudentBlock.innerHTML = htmls.join('');
}

function clearInputValue() {
	document.querySelectorAll('input[name]').forEach(function(inputValue) {
		inputValue.value = ''
	 });
}

function createStudents(data, callback) {
	var options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	};
	fetch(studentApi, options)
		.then(function(response) {
			response.json();
		})
		.then(callback)

}

function putStudent(data,id, callback) {
	var options = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	};
	fetch(studentApi + '/' + id, options)
		.then(function(response) {
			response.json();
		})
		.then(callback)

}


function handleCreateForm() {
	var createBtn = document.querySelector('#create');

	createBtn.onclick = function() {
		var name = document.querySelector('input[name="name"]').value;
		var nickname = document.querySelector('input[name="nickname"]').value;
		var age = document.querySelector('input[name="age"]').value;

		var formData = {
			name: name,
			nickname: nickname,
			age: age
		};
		clearInputValue();
		createStudents(formData, function() {
			getStudents(renderStudents);
		});
	}
}

function handleDeleteStudent(id) {
	var options = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	};
	fetch(studentApi + '/' + id, options)
		.then(function(response) {
			response.json();
		})
		.then(function() {
			var studenItem = document.querySelector('.student-item-' + id)
			if (studenItem) {
				studenItem.remove();
			}
		})
}

function handleEditStudent(id) {
	document.querySelector('input[name="name"]').value = document.querySelector('.student-name-' + id).innerText;
	document.querySelector('input[name="nickname"]').value = document.querySelector('.student-nickname-' + id).innerText;
	document.querySelector('input[name="age"]').value = document.querySelector('.student-age-' + id).innerText;
	
	document.getElementById('create').style.display = "none";
	document.querySelector('#save').style.display = "block";
	
	var saveBtn = document.getElementById('save')
	saveBtn.onclick = function() {
		var inputNameValue = document.querySelector('input[name="name"]').value;
		var inputNicknameValue = document.querySelector('input[name="nickname"]').value;
		var inputAgeValue = document.querySelector('input[name="age"]').value;
		// document.querySelector('.student-name-' + id).innerText = inputNameValue;
		// document.querySelector('.student-nickname-' + id).innerText = inputNicknameValue;
		// document.querySelector('.student-age-' + id).innerText = inputAgeValue;

		var formData = {
			name: inputNameValue,
			nickname: inputNicknameValue,
			age: inputAgeValue
		}

		putStudent(formData, id, function(){
			document.getElementById('create').style.display = "block";
			document.querySelector('#save').style.display = "none";
			clearInputValue()
			getStudents(renderStudents)
		})
	
	
	
	}
}
start();
