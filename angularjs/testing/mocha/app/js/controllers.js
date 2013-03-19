'use strict';

/* Controllers */

function PhoneListCtrl($scope, Phone) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';
}

//PhoneListCtrl.$inject = ['$scope', 'Phone'];


function PhoneDetailCtrl($scope, $routeParams, $http) {
    $scope.status = 'none';

    //init
    $http.get('/init').success(function(data) {
        $scope.status = data;
    })

    $scope.getStatus = function () {
        $http.get($routeParams.phonesUrl).success(function (data) {
            $scope.status = data;
        })
    }


}

//PhoneDetailCtrl.$inject = ['$scope', '$routeParams', $http];
