var browser = {};

browser.HTTP = {
	post: function (url, myData, successCallback, errorCallback) {
		$.ajax({
			url: url,
			type: "POST",
			data: myData,
			success: successCallback,
			error: errorCallback
		});
	}
}

browser.Animations = {
	showMessage: function (selector, message) {
		$(selector).text(message);
		$(selector).removeClass("error");
		$(selector).fadeIn(2000);
	},
	showError: function (selector, error) {
		$(selector).text(error);
		$(selector).addClass("error");
		$(selector).fadeIn(2000);
	}
}

function LoginPageLogic(view, authenticationService) {
	this.init = function () {
		view.onLogin(this.validateCredentials)
	};
	function credentialsAreValid(username, password) {
		return (username && username !== "") && (password && password !== "");
	}

	this.validateCredentials = function () {
		var username = view.getUsername();
		var password = view.getPassword();
		if (credentialsAreValid(username, password)) {
			authenticationService.login(username, password,
				view.showLoginSuccessful, view.showLoginError);
		} else {
			view.showInvalidCredentialsError();
		}
	}
}

function AuthenticationService(serviceUrl) {
	this.login = function (username, password, successCallback, errorCallback) {
		browser.HTTP.post(serviceUrl, {username: username, password: password},
			successCallback, errorCallback);
	};
}

function test() {
    var browser = {HTTP: {post: function() {return true}}}
    when:
    var service = new AuthenticationService(url);
}

function LoginPageView() {

    this.getSelector = function(selector) {
        return $(selector).val();
    }
	this.getUsername = function () {
		return $("#username").val();
	};
	this.getPassword = function () {
		return $("#password").val();
	};
	this.onLogin = function (callback) {
		$("#loginButton").click(function (e) {
			e.preventDefault();
			callback();
		});
	};
	this.showLoginSuccessful = function () {
		browser.Animations.showMessage("#message", "Welcome back!");
	};
	this.showInvalidCredentialsError = function () {
		browser.Animations.showError("#message", "Please enter your login details");
	};
	this.showLoginError = function () {
		browser.Animations.showError("#message",
			"We were unable to log you in with the details supplied");
	};
}

$(document).ready(function () {
	var serviceUrl = "http://localhost/authentication";
	var authService = new AuthenticationService(serviceUrl);
	var loginPageView = new LoginPageView();
	var loginPageLogic = new LoginPageLogic(loginPageView, authService);
	loginPageLogic.init();
});
