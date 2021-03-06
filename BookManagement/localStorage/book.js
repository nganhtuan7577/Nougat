var bookModule = angular.module('bookModule', ['ngMaterial']);
bookModule.service('bookService', function () {
    this.setStatus = function (bookData, isEditing) {
        for (var i = 0; i < bookData.length; i++) {
            isEditing[bookData[i].id] = false;
        }
    }
    this.edit = function (bookData, isEditing) {
        isEditing[bookData.id] = true;
    }
    this.save = function (bookData, isEditing) {
        isEditing[bookData.id] = false;
    }
    this.delete = function (bookData, index) {
        bookData.splice(index, 1);
    }
    this.add = function (bookData, inputID, inputName, inputAuthor, inputRating) {
        bookData.push({
            id: inputID,
            name: inputName,
            author: inputAuthor,
            rating: inputRating
        });
    }
});
bookModule.controller('bookCtrl', function ($scope, bookService) {
    if (localStorage.bookData) { //Pull data from Local Storage if it exists
        $scope.bookData = JSON.parse(localStorage.bookData);
    } else { //Create one if it does not exist
        $scope.bookData = [
            { id: 1, name: 'Harry Potter', author: 'JKR', rating: 5 },
            { id: 2, name: 'Your Name', author: 'SM', rating: 9 },
            { id: 3, name: 'Bloody Exam', author: 'LM', rating: 6 }
        ];
        localStorage.bookData = angular.toJson($scope.bookData, true);
    }
    //Rating levels
    $scope.levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (rate) {
        return { abbrev: rate };
    });
    $scope.isEditing = {};
    length = $scope.bookData.length;
    //Set all status to false
    bookService.setStatus($scope.bookData, $scope.isEditing);
    //Edit book data
    $scope.edit = function (index) {
        bookService.edit($scope.bookData[index], $scope.isEditing);
    }
    //Save data after finish edit
    $scope.save = function (index) {
        bookService.save($scope.bookData[index], $scope.isEditing);
    }
    //Delete one row in table
    $scope.delete = function (index) {
        bookService.delete($scope.bookData, index);
    }
    //Add new row in table
    $scope.add = function () {
        bookService.add($scope.bookData, $scope.bookData.length + 1, $scope.inputName, $scope.inputAuthor, $scope.inputRating);
    }
    //Push data to Local Storage
    $scope.saveLocalStorage = function () {
        localStorage.bookData = angular.toJson($scope.bookData, true);
    }
});