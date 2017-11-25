
var videoFrame = document.getElementById("video-frame");
var modal = document.getElementById('myModal');
var inputSearch = document.getElementById("keyword");

$(document).ready(function(){
	$("#btnLogOut").click(function(){
		if(confirm("Bạn có chắc muốn đăng xuất không?")){
		localStorage.removeItem("secretToken");
		localStorage.removeItem("userId");
		window.location.href = "index.html";
	}	
	});
	inputSearch.onkeydown = function(event){
		if (event.keyCode == 13){
			loadVideo(this.value);
		}
	}
	loadVideo("Linkin Park");
})


function loadVideo(keyword){
	var YOUTUBE_API = "https://content.googleapis.com/youtube/v3/search?q=" + keyword + "&type=video&videoEmbeddable=true&videoSyndicated=true&maxResults=12&part=snippet&key=AIzaSyAwUjk3CwtXCiB_W6Xi0colfOKPgm90hHc";
	$.ajax({
		url : YOUTUBE_API,
		type : "GET",
		success : function(response){
			var htmlContent = "";
			
			for (var i = 0; i < response.items.length; i++) {
				if(response.items[i].id.kind == 'youtube#channel'){
					continue;
				}
				var videoId = response.items[i].id.videoId;
				var videoTitle = response.items[i].snippet.title;
				var videoDescription = response.items[i].snippet.description;
				var videoThumbnail = response.items[i].snippet.thumbnails.medium.url;		
				htmlContent += '<div class="col-xs-12 col-lg-4"  onclick="showVideo(\'' + videoId + '\')">'
					htmlContent += '<img src="' + videoThumbnail + '">'
					htmlContent += '<div class="title">' + videoTitle + '</div>'
				htmlContent += '</div>'
			}
		document.getElementById("list-video").innerHTML = htmlContent;
		},
		error : function(response, message) {
			console.log('Fail');
		}
	});
}


function showVideo(videoId){		
	videoFrame.src = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
	setTimeout(function(){ 
		modal.style.display = "block";
	}, 300);	
}

