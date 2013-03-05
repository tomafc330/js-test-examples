var myObject = function () {
    function privateFunc() {
        console.log("client cannot access this method");
    }

    return {
        publicFunc: function () {
            console.log("method that can be called by clients.");
        }
    }
}();
myObject.privateFunc(); //no access
myObject.publicFunc(); //success