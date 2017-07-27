var app = angular.module('app', ['googleplus']);

app.config(['GooglePlusProvider', function(GooglePlusProvider) {
     GooglePlusProvider.init({
        clientId: 'YOUR_CLIENT_ID',
        apiKey: 'YOUR_API_KEY'
     });
}]);

app.controller('AuthCtrl', ['$scope', 'GooglePlus', function ($scope, GooglePlus) {
    $scope.login = function () {
        GooglePlus.login().then(function (authResult) {
            console.log(authResult);

            GooglePlus.getUser().then(function (user) {
                console.log(user);
            });
        }, function (err) {
            console.log(err);
        });
    };
}]);