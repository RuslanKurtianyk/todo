            var todo = angular.module('todoApp', ['ngAnimate', 'ui.bootstrap']);

            todo.controller('TodoListController', function ($scope, $http) {

                var todoList = this;
<<<<<<< HEAD
				var currdate = new Date();
                todoList.todos = [];
				//
=======
                todoList.todos = [];
>>>>>>> a93d36d4feaa23f8e21a42548891ec66c8ae5331
                var showAllTodo = function () {
                    var posting = $http({
                        method: 'POST',
                        /*posting to /showalltodo */
                        url: '/showAllTodo',
                        data: {
                            currUser: $scope.user
                        },
                    })
                    posting.success(function (response) {
                        todoList.todos = response;
                        console.log("SUCCESS");
<<<<<<< HEAD
                        console.log(response);
                        //$scope.response.data = response;
                    });
                };
				//
                showAllTodo();
				// todo-item adding
                todoList.addTodo = function () {
					var currentTodo = { text: todoList.todoText,
										done: false,
										date: currdate
									  }
					// add to local array
                    todoList.todos.push(currentTodo);
					// add to database
                    $http.post('/addtodo',currentTodo).success(function (response) {
=======
                        console.log(response)
                        $scope.response.data = response;
                    });
                };
                showAllTodo();
                todoList.addTodo = function () {
                    todoList.todos.push({
                        text: todoList.todoText,
                        done: false
                    });
                    var posting = $http({
                        method: 'POST',
                        /*posting to /register */
                        url: '/addtodo',
                        data: {
                            text: todoList.todoText
                        },
                        processData: false
                    })
                    posting.success(function (response) {
>>>>>>> a93d36d4feaa23f8e21a42548891ec66c8ae5331
                        /*executed when server responds back*/
                        console.log(response);
                        $scope.response.data = response;
                    });
                    todoList.todoText = '';
                };
                // delete task
                todoList.delete = function (toDelete) {
                    var oldTodos = todoList.todos;
                    todoList.todos = [];
                    angular.forEach(oldTodos, function (todo) {
                        if (toDelete == todo) {
<<<<<<< HEAD
                            $http.post('/removetodo',{text: toDelete.text}).success(function (response) {
=======
                            var posting = $http({
                                method: 'POST',
                                /*posting to /removetodo */
                                url: '/removetodo',
                                data: {
                                    text: toDelete.text
                                },
                                processData: false
                            })
                            posting.success(function (response) {
>>>>>>> a93d36d4feaa23f8e21a42548891ec66c8ae5331
                                /*executed when server responds back*/
                                console.log(response);
                                $scope.response.data = response;
                            });
                        }
                        if (toDelete !== todo) todoList.todos.push(todo);
                    });
                };
            });

            todo.controller('DropdownCtrl', function ($scope, $log) {
                // get user from localStorage
                var localUser = localStorage.getItem('currentUser');
                $scope.user = JSON.parse(localUser);

                $scope.logout = function () {
<<<<<<< HEAD
                    $http.post('/logout','').success(function (response) {
=======
                    var posting = $http({
                        method: 'POST',
                        /*posting to /login */
                        url: '/logout',
                        data: '',
                    })
                    posting.success(function (response) {
>>>>>>> a93d36d4feaa23f8e21a42548891ec66c8ae5331
                        console.log('logout)');
                    });
                    localStorage.clear();
                };

                $scope.status = {
                    isopen: false
                };

                $scope.toggled = function (open) {
                    $log.log('Dropdown is now: ', open);
                };

                $scope.toggleDropdown = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.status.isopen = !$scope.status.isopen;
                };
            });

            // registration
            todo.controller('UserController', function ($scope, $http, $window) {
                $scope.data = {}
                $scope.response = {}
                $scope.createUser = function () {
<<<<<<< HEAD
                    $http.post('/register',$scope.data).success(function (response) {
=======
                    var posting = $http({
                        method: 'POST',
                        /*posting to /register */
                        url: '/register',
                        data: $scope.data,
                        processData: false
                    })
                    posting.success(function (response) {
                        /*executed when server responds back*/
>>>>>>> a93d36d4feaa23f8e21a42548891ec66c8ae5331
                        $window.location.href = response;
                        $scope.response.data = response;
                    });
                }
            });
            // login
            todo.controller('LoginController', function ($scope, $http, $window) {
<<<<<<< HEAD
                $scope.data = {};
                $scope.response = {};
				$scope.message = "";
                $scope.send = function () {
                    $http.post('/login', $scope.data).success(function (res) {
                        localStorage.setItem('currentUser', JSON.stringify($scope.data));
                        $scope.message = res;
						console.log($scope.message);
=======
                $scope.data = {}
                $scope.response = {}
                $scope.send = function () {
                    var posting = $http({
                        method: 'POST',
                        /*posting to /login */
                        url: '/login',
                        data: $scope.data,
                        processData: false
                    })
                    posting.success(function (response) {
                        $window.location.href = response;
                        localStorage.setItem('currentUser', JSON.stringify($scope.data));
                        $scope.response.data = response;
>>>>>>> a93d36d4feaa23f8e21a42548891ec66c8ae5331
                    });
                }
            });