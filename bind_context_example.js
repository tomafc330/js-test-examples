/**
 * Created with IntelliJ IDEA.
 * User: tchan
 * Date: 11/01/13
 * Time: 6:42 PM
 * To change this template use File | Settings | File Templates.
 */


Function.prototype.bind = function () {
    var fn = this;
    var args = Array.prototype.slice.call(arguments);
    var object = args.shift();
    return function () {
        return fn.apply(object, args.concat(Array.prototype.slice.call(arguments)));
    };
};
var myObject = {};
function myFunction() {
    return this;
}

assert(!myFunction(), "Context is not set yet");
var aFunction = myFunction.bind(myObject)
assert(aFunction(), "Context is set properly")