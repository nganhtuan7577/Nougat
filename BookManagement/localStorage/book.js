var bookModule = angular.module('bookModule', ['ngMaterial']);
bookModule.service('bookService', function () {
    this.edit = function () {
    }
    this.save = function () {
    }
    this.delete = function () {
    }
    this.add = function () {
    }
});
bookModule.controller('bookCtrl', function ($scope, bookService) {
    if (localStorage.bookData) {
        $scope.bookData = JSON.parse(localStorage.bookData);
    } else {
        $scope.bookData = [
            { id: 1, name: 'Harry Potter', author: 'JKR', rating: 5 },
            { id: 2, name: 'Your Name', author: 'SM', rating: 9 },
            { id: 3, name: 'Bloody Exam', author: 'LM', rating: 6 }
        ];
        localStorage.bookData = angular.toJson($scope.bookData, true);
    }
    $scope.levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (rate) {
        return { abbrev: rate };
    });
    $scope.viewing = true;
    $scope.modifying = false;
    $scope.isEditing = {};
    length = $scope.bookData.length;
    for (var i = 0; i < length; i++) {
        //$scope.viewing = true;
        //$scope.modifying = false;
        $scope.isEditing[$scope.bookData[i].id] = false;
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
    $scope.saveLocalStorage = function () {
        localStorage.bookData = angular.toJson($scope.bookData, true);
    }
});