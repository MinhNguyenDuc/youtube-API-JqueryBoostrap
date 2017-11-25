var MEMBER_API = "https://youtube-api-challenger.appspot.com/members";
var LOGIN_API = "https://youtube-api-challenger.appspot.com/authentication";


var usernameInput = document.forms["sign-up-form"]["username"];
var passwordInput = document.forms["sign-up-form"]["password"];;
var repasswordInput =document.forms["sign-up-form"]["re-password"];;
var emailInput = document.forms["sign-up-form"]["email"];;
var fullNameInput = document.forms["sign-up-form"]["fullname"];;
var birthDayInput = document.forms["sign-up-form"].[]

$(document).ready(function(){
	$("#btnSignIn").click(function(event){
		if(validateLoginData()){
			loginHandle();
		}
	});

	// $("#sign-up-button").click(function(event) {
	// 	saveMember();
	// });	
});


//============== START Xử lý đăng ký tài khoản =============

// Gửi dữ liệu lên API để đăng ký tài khoản.
function saveMember(){
	var member = {
        "data": {
                "type": "Member",
                "attributes": {
                    "username": usernameInput.value,
                    "password": passwordInput.value,
                    "fullName": fullNameInput.value,
                    "email": emailInput.value,
                    "birthDay":1509449900790,
                    "gender":1
                }
            }
        }

    $.ajax({
    	url: MEMBER_API,
    	type: "POST",
    	data: JSON.stringify(member),
    	success : function(response){
    		alert("Đăng ký thành công.");
    		console.log('Success');
    	},
    	error : function(response, msg){
			console.log(response.status); 
			alert("Đăng ký fail");
		}
    });
    return false;
}

// Xử lý validate dữ liệu.
function validateRegisterData(){
	var isValidUsername = false;
	var isValidPassword = false;
	var isValidReenterPassword = false;
	var isValidFullName = false;
	var isValidEmail = false;

	usernameInput.onkeyup = function () {
	    checkValidUsername();
	}

	passwordInput.onkeyup = function () {
	    checkValidPassword();
	}

	fullNameInput.onkeyup = function () {
	    checkValidFullName();
	}

	repasswordInput.onkeyup = function () {
	    checkValidReEnterPass();
	}

	emailInput.onkeyup = function () {
	    checkvalidEmail();
	}
	return isValidUsername && isValidPassword && isValidReenterPassword && isValidFullName && isValidEmail;
}


function checkValidUsername() {
    var spanUsernameMsg = usernameInput.nextElementSibling;
    if(usernameInput.value.length < 8){
        spanUsernameMsg.classList = "error-msg";
        spanUsernameMsg.innerHTML = "*Username không hợp lệ*";
        isValidUsername = false;
    }
    else {
        spanUsernameMsg.classList = "success-msg";
        spanUsernameMsg.innerHTML = "OK";
        isValidUsername = true;
    }
}

function checkValidPassword() {
    var spanPasswordMsg = passwordInput.nextElementSibling;
    if(passwordInput.value.length < 8){
        spanPasswordMsg.classList = "error-msg";
        spanPasswordMsg.innerHTML = "*Password không hợp lệ*";
        isValidPassword = false;
    }
    else {
        spanPasswordMsg.classList = "success-msg";
        spanPasswordMsg.innerHTML = "OK";
        isValidPassword = true;
    }
}

function checkValidReEnterPass() {
    var spanMsg = re_passwordInput.nextElementSibling;
    if(re_passwordInput.value != passwordInput.value){
        spanMsg.classList = "error-msg";
        spanMsg.innerHTML = "*Password nhập lại không giống*";
        isValidReenterPassword = false;
    }
    else {
        spanMsg.classList = "success-msg";
        spanMsg.innerHTML = "OK";
        isValidReenterPassword = true;
    }
}

function checkValidFullName() {
    var spanFullnameMsg = fullNameInput.nextElementSibling;
    if(fullNameInput.value.length < 8){
        spanFullnameMsg.classList = "error-msg";
        spanFullnameMsg.innerHTML = "*Vui lòng nhập tên đầy đủ*";
        isValidFullName = false;
    }
    else {
        spanFullnameMsg.classList = "success-msg";
        spanFullnameMsg.innerHTML = "OK";
        isValidFullName = true;
    }
}

function checkvalidEmail() {
    var spanMsg = emailInput.nextElementSibling;
    if(emailInput.value.search("@") <0){
        spanMsg.classList = "error-msg";
        spanMsg.innerHTML = "*Email không hợp lệ*";
        isValidEmail = false;
    }
    else {
        spanMsg.classList = "success-msg";
        spanMsg.innerHTML = "OK";
        isValidEmail = true;
    }
}

//============== END Xử lý đăng ký tài khoản ==============

//============== START Xử lý login ==============
function validateLoginData(){
	var usernameLoginInput = $("[name = 'usernameLogin']").val();
	var passwordLoginInput = $("[name = 'passwordLogin']").val();
	if(usernameLoginInput.length == 0){
		alert("Vui lòng nhập Username");
		return false;
	}
	else if (usernameLoginInput.length < 7){
		alert("Độ dài Username phải lớn hơn 7 kí tự. Vui lòng nhập lại.");
		return false;
	}

	if (passwordLoginInput.length == 0){
		alert("Vui lòng nhập password");
		return false;
	}
	else if(passwordLoginInput.length < 7){
		alert("Độ dài Password phải lớn hơn 7 kí tự. Vui lòng nhập lại");
		return false;
	}
	return true;
}

// Gửi thông tin login lên api. Trong trường hợp lỗi thì hiển thị thông báo 
// cho người dùng. Trường hợp login thành công thì lưu secretToken, load thông tin
// người dùng.
function loginHandle(){
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
			alert("Đăng nhập thành công");
			window.location.href = "my-index.html";
			console.log('Login Successful');
			localStorage.setItem("secretToken", response.data.attributes.secretToken);
			localStorage.setItem("userId", response.data.attributes.userId);
			},
			error : function(response, message){
			console.log("Fail"); 
			alert("Fail");
			}
		});
		return false;
}

// Kiểm tra thông tin secretToken và userId, trong trường hợp chưa tồn tại thì yêu cầu 
// login, trường hợp tồn tại thì gọi API lấy thông tin người dùng.
function loadMemberInfor(){
	var memberInfor = {};
	return memberInfor;
}
//============== END Xử lý login ==============

//============== START Xử lý cập nhật thông tin Member ==============
// Lấy thông tin của member hiện tại, hiển thị ra form.
function fillMemberInfor(){
	var memberInfor = loadMemberInfor();
	// Đưa thông tin member ra form.
}

// Validate thông tin member. Gọi lên hàm validate member ở trên.
function validateMemberForm(){
	return false;
}

// Lưu thông tin member. Gọi đến hàm saveMember với method PUT và id
// lấy từ localStorage.


//============== END Xử lý cập nhật thông tin Member ==============

//============== START Xử lý Playlist ==============
// Load danh sách playlist.
function loadPlaylists(){

}

function loadPlaylistDetail(id){

}

//Validate playlist.
function validatePlaylist(){
	return false;
}

// Lưu thông tin playlist.
function savePlaylist(playlistData, method, playlistId){

}
//============== END Xử lý Playlist ==============

//============== START Xử lý Video ==============
// Search video from youtube
function searchYoutubeVideo(){
	
}

// Load danh sách video.
function loadVideos(page, limit){

}

function loadVideoDetail(id){

}

//Validate video.
function validateVideo(){
	return false;
}

// Lưu thông tin video.
function saveVideo(videoData, method, videoId){

}
//============== END Xử lý Playlist ==============

