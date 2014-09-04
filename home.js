function TaskController($scope) {
    //var undoArray = [];
    console.log(localStorage.getItem('TaskArray'));
    $scope.TaskArray = [];
    $scope.undoArray = [];
    $scope.redoArray = [];
    $scope.val = true;
    $scope.redohide = true;
    if (localStorage.getItem('TaskArray')) {

        $scope.val = false;
        $scope.TaskArray = localStorage["TaskArray"] ? JSON.parse(localStorage["TaskArray"]) : [];
        $scope.undoArray = localStorage["undoArray"] ? JSON.parse(localStorage["undoArray"]) : [];
        $scope.redoArray = localStorage["redoArray"] ? JSON.parse(localStorage["redoArray"]) : [];

        if (!$scope.redoArray || !$scope.redoArray.length || $scope.redoArray.length < 1) {
            $scope.redohide = true;

        } else
            $scope.redohide = false;


    }

    /* adding tasks*/
    $scope.add = function (obj) {

        var tempArray = [];
        $scope.TaskArray.forEach(function (data) {
            tempArray.push(data);
        });
        $scope.undoArray.push(tempArray);

        var newTask = {
            Task: $scope.task,
            imgUrl: "image/unMarked.png"

        };

        if ($scope.task.length > 0) {
            $scope.TaskArray.push(newTask);
            $scope.task = '';
            $scope.val = false;


        }
        localStorage.clear();
        localStorage.setItem("TaskArray", JSON.stringify($scope.TaskArray));
        localStorage.setItem("undoArray", JSON.stringify($scope.undoArray));
        $scope.redoArray && localStorage.setItem("redoArray", JSON.stringify($scope.redoArray));


    }
    /* removing tasks */
    $scope.remove = function (index) {
        var tempArray = [];

        $scope.TaskArray.forEach(function (data) {
            tempArray.push(data);
        });


        $scope.undoArray.push(tempArray);

        var answer = confirm("Do you want to delete ");
        if (answer) {
            $scope.TaskArray.splice(index, 1);
            if ($scope.TaskArray.length == 0) {
                $scope.val = true;
            }

        }
        localStorage.clear();
        localStorage.setItem("TaskArray", JSON.stringify($scope.TaskArray));
        localStorage.setItem("undoArray", JSON.stringify($scope.undoArray));
        $scope.redoArray && localStorage.setItem("redoArray", JSON.stringify($scope.redoArray));


    }
    /*editing tasks */
    $scope.edit = function (index) {
        var tempArray = [];
        $scope.TaskArray.forEach(function (data) {
            tempArray.push(data);
        });
        $scope.undoArray.push(tempArray);
        var arr = $scope.TaskArray.splice(index, 1);
        var ele = arr[0].Task;
        var img = arr[0].imgUrl;
        var answer = prompt("Edit the task", ele);
        var editTask = {
            Task: answer,
            imgUrl:img
        }
        $scope.TaskArray.splice(index, 0, editTask);

        localStorage.clear();
        localStorage.setItem("TaskArray", JSON.stringify($scope.TaskArray));
        localStorage.setItem("undoArray", JSON.stringify($scope.undoArray));
        $scope.redoArray && localStorage.setItem("redoArray", JSON.stringify($scope.redoArray));


    }
    /* marking star unstar a task*/
    $scope.changeImg = function (index) {
        var tempArray = [];
        $scope.TaskArray.forEach(function (data) {
            tempArray.push(data);
        });
        $scope.undoArray.push(tempArray);
        var arr = $scope.TaskArray.splice(index, 1);
        var ele = arr[0].Task;
        var img = arr[0].imgUrl;
        if(img=="image/unMarked.png"){
            img = "image/marked.png";
        }
        else
        {
            img = "image/unMarked.png";
        }
        var editTask = {
            Task: ele,
            imgUrl:img
        }
        $scope.TaskArray.splice(index, 0, editTask);

        localStorage.clear();
        localStorage.setItem("TaskArray", JSON.stringify($scope.TaskArray));
        localStorage.setItem("undoArray", JSON.stringify($scope.undoArray));
        $scope.redoArray && localStorage.setItem("redoArray", JSON.stringify($scope.redoArray));

    }
    /* undo a task*/
    $scope.undo = function () {
        $scope.redoArray.push($scope.TaskArray);
        var arr = [];
        arr = $scope.undoArray.pop();

        $scope.TaskArray = [];
        arr.forEach(function (data) {
            $scope.TaskArray.push(data);
        });
        if ($scope.redoArray.length < 1) {
            $scope.redohide = true;
        }
        else
            $scope.redohide = false;

        localStorage.clear();
        localStorage.setItem("TaskArray", JSON.stringify($scope.TaskArray));
        localStorage.setItem("undoArray", JSON.stringify($scope.undoArray));
        $scope.redoArray && localStorage.setItem("redoArray", JSON.stringify($scope.redoArray));

    }
    /* redo a task*/
    $scope.redo = function () {
        $scope.undoArray.push($scope.TaskArray);
        if (!$scope.redoArray || !$scope.redoArray.length || $scope.redoArray.length < 1) {
            $scope.redohide = true;
            return;
        }
        var ss = [];
        ss = $scope.redoArray.pop();
        $scope.TaskArray = [];
        ss.forEach(function (data) {
            $scope.TaskArray.push(data);
        });
        if ($scope.redoArray.length < 1) {
            $scope.redohide = true;
        }
        else
            $scope.redohide = false;

        localStorage.clear();
        localStorage.setItem("TaskArray", JSON.stringify($scope.TaskArray));
        localStorage.setItem("undoArray", JSON.stringify($scope.undoArray));
        $scope.redoArray && localStorage.setItem("redoArray", JSON.stringify($scope.redoArray));


    }
}
angular.module('myapp', [])
    .controller('TaskController', TaskController);
