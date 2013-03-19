//
// test/unit/controllers/controllersSpec.js
//
describe("Unit: Testing Controllers", function () {

    beforeEach(module('phonecat'));

    it('should have a phone list controller', function () {
        expect(PhoneListCtrl).not.to.equal(null);
    });

    it('should have a phone details controller', function () {
        expect(PhoneDetailCtrl).not.to.equal(null);
    });

    it('should call out to get text on constructor invokation', inject(function ($rootScope, $controller, $httpBackend) {
        $httpBackend.when('GET', '/init').respond('init');

        var $scope = $rootScope.$new();
        $controller('PhoneDetailCtrl', {
            $scope: $scope
        });

        $httpBackend.flush();

        expect($scope.status).to.equal('init');
    }));

    it('should call out to get text when getPhones() is invoked', inject(function ($rootScope, $controller, $httpBackend) {
        $httpBackend.when('GET', '/init').respond('init');
        $httpBackend.when('GET', '/foo/bar').respond('data');

        var $scope = $rootScope.$new();
        $controller('PhoneDetailCtrl', {
            $scope: $scope,
            $routeParams: {
                phonesUrl: '/foo/bar'
            }
        });

        $scope.getStatus();

        $httpBackend.flush();


        expect($scope.status).to.equal('data');
    }));

});
