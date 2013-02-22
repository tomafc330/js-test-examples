function add(a, b) {
	var result = a + b;
	$("input#ResultTestBox").val(result);

}

function test() {
	$('<input id="ResultTestBox" type="text"/>').appendTo('#qunit-fixture');
	var result = add(a, b);

	equals(result, $('input#ResultTestBox').val(), "testing result box value");
}
