var folderModule = angular.module('folderModule', ['ngMaterial','ngRightClick']);
folderModule.service('folderService', function () {
    this.setStatus = function (folderData, isShowing) {
        for (var i = 0; i < folderData.length; i++) {
            if (folderData[i].parentFolder === null) {
                isShowing[folderData[i].id] = true;
            } else {
                isShowing[folderData[i].id] = false;
            }
        }
    }

    this.showFolder = function (folderData, parentId, isShowing) {
        for (var i = 0; i < folderData.length; i++) {
            if (folderData[i].parentFolder === parentId) {
                isShowing[folderData[i].id] = true;
            } else {
                isShowing[folderData[i].id] = false;
            }
        }
    }


    this.edit = function (folderData, isShowing) {
        isShowing[folderData.id] = false;
    }
    this.save = function (folderData, isShowing) {
        isShowing[folderData.id] = false;
    }
    this.delete = function (folderData, index) {
        folderData.splice(index, 1);
    }
    this.add = function (folderData, inputID, inputName, inputParent) {
        folderData.push({
            id: inputID,
            name: inputName,
            parentFolder: inputParent
        });
    }
});
folderModule.controller('folderCtrl', function ($scope, folderService) {
    if (localStorage.folderData) { //Pull data from Local Storage if it exists
        $scope.folderData = JSON.parse(localStorage.folderData);
    } else { //Create one if it does not exist
        $scope.folderData = [
            { id: 1, name: 'Folder 1', parentFolder: null },
            { id: 2, name: 'Folder 2', parentFolder: null },
            { id: 3, name: 'Folder 3', parentFolder: null },
            { id: 4, name: 'Folder 4', parentFolder: 1 },
            { id: 5, name: 'Folder 5', parentFolder: 1 },
            { id: 6, name: 'Folder 6', parentFolder: 4 }
        ];
        localStorage.folderData = angular.toJson($scope.folderData, true);
    }
    $scope.isShowing = {};
    length = $scope.folderData.length;

    folderService.setStatus($scope.folderData, $scope.isShowing);

    $scope.showFolder = function (index) {
        folderService.showFolder($scope.folderData, $scope.folderData[index].id, $scope.isShowing);
    }

    $scope.goBack = function(index) {
        folderService.showFolder($scope.folderData, $scope.folderData[$scope.folderData[index].parentFolder].parentFolder, $scope.isShowing)
    }

    //Edit folder data
    $scope.edit = function (index) {
        folderService.edit($scope.folderData[index], $scope.isShowing);
    }
    //Save data after finish edit
    $scope.save = function (index) {
        folderService.save($scope.folderData[index], $scope.isShowing);
    }
    //Delete one row in table
    $scope.delete = function (index) {
        folderService.delete($scope.folderData, index);
    }
    //Add new row in table
    $scope.add = function () {
        folderService.add($scope.folderData, $scope.folderData.length + 1, $scope.inputName, $scope.inputAuthor, $scope.inputRating);
    }
    //Push data to Local Storage
    $scope.saveLocalStorage = function () {
        localStorage.folderData = angular.toJson($scope.folderData, true);
    }
});