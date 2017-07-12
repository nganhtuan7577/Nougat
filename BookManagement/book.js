var bookModule = angular.module('bookModule', []);

bookModule.controller('bookCtrl', function ($scope) {
    $scope.bookData = [
        { id: 1, name: 'Harry Potter', author: 'JKR' },
        { id: 2, name: 'Kimi no nawa', author: 'SM' },
        { id: 3, name: 'Bloody Exam', author: 'LM' }
    ];
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
            author: $scope.inputAuthor
        });
    }
});