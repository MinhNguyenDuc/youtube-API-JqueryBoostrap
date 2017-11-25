var LOGIN_API = "https://youtube-api-challenger.appspot.com/authentication";
$("#btnSignIn").click(function(event) {	
	var loginData = {	
		"data": {
			"type": "MemberLogin",
			"attributes": {
			"username": $("[name='usernameLogin']").val(),
			"password": $("[name='passwordLogin']").val()
			}
		}
		}

		$.ajax({
			url: LOGIN_API,
			type: "POST",
			data: JSON.stringify(loginData),
			success : function(response){
			alert(response.data.attributes.secretToken);
			console.log('Success');
			},
			error : function(response, msg){
			console.log(response.status); 
			alert(response.status);
			}
		});
		return false;
});

	

