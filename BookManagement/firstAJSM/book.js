var bookModule = angular.module('bookModule', ['ngMaterial']);

bookModule.controller('bookCtrl', function ($scope) {
    $scope.bookData = [
        { id: 1, name: 'Harry Potter', author: 'JKR', rating: 5 },
        { id: 2, name: 'Your Name', author: 'SM', rating: 9 },
        { id: 3, name: 'Bloody Exam', author: 'LM', rating: 6 }
    ];
    $scope.icons = ["fingerprint", "grade", "get_app", "home", "launch"];
	$scope.levels = [1, 2, 3, 4, 5];
    $scope.viewing = true;
    $scope.modifying = false;
    $scope.isEditing = {};
    $scope.isSame = {};
    length = $scope.bookData.length;
    for (var i = 0; i < length; i++) {
        //$scope.viewing = true;
        //$scope.modifying = false;
        $scope.isEditing[$scope.bookData[i].id] = false;
        $scope.isSame[$scope.bookData[i].id] = false;
    }
    $scope.edit = function (bookData) {
        //$scope.viewing = false;
        //$scope.modifying = true;
        $scope.isEditing[bookData.id] = true;
    }
    $scope.save = function (bookData) {
        //$scope.viewing = true;
        //$scope.modifying = false;
        $scope.isEditing[bookData.id] = false;
    }
    $scope.delete = function (index) {
        $scope.bookData.splice(index, 1);
    }
    $scope.add = function () {
        $scope.bookData.push({
            id: $scope.inputID,
            name: $scope.inputName,
            author: $scope.inputAuthor,
            rating: $scope.inputRating
        });
    }
});