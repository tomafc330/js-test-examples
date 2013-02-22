TestCase("Tests", {
	test_show_error_displays_error_correctly: function() {
		/*:DOC += <div id="message" class="message"></div> */
		browser.Animations.showError("#message", "error message");
		assertEquals($("#message").text(), "error message");
		assertTrue($("#message").hasClass("error"));
	},
	test_shows_login_error_if_password_not_entered:function() {
		var loginPageViewMock = mock(LoginPageView);
		var loginPageLogic = new LoginPageLogic(loginPageViewMock, null);
		loginPageLogic.init();
		when(loginPageViewMock).getUsername().thenReturn("username");
		when(loginPageViewMock).getPassword().thenReturn("");
		loginPageLogic.validateCredentials();
		verify(loginPageViewMock).showInvalidCredentialsError();
	},
	test_calls_auth_service_with_correct_callbacks : function () {
		var loginPageViewMock = mock(LoginPageView);
		var authServiceMock = mock(AuthenticationService);
		var loginPageLogic = new LoginPageLogic(loginPageViewMock,
			authServiceMock);
		loginPageLogic.init();
		when(loginPageViewMock).getUsername().thenReturn("username");
		when(loginPageViewMock).getPassword().thenReturn("password");
		loginPageLogic.validateCredentials();
		verify(authServiceMock).login(is(equalTo("username")),
			is(equalTo("password")),
			is(equalTo(loginPageViewMock.showLoginSuccessful)),
			is(equalTo(loginPageViewMock.showLoginError))
		);
	}
});