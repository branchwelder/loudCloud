var onSuccessLogin = function(data, status){
	window.location.href = "/config";
};
var onErrorLogin = function(data,status){
	console.log("status", status);
	console.log("error", data);
};

$("#loginForm").submit(function(event){
	event.preventDefault();

	var username = $("#loginForm").find("[name='username']").val()

	$.post("/api/login", {
		username: username;
	})

	.done(onSuccessLogin)
	.done(onErrorLogin);
});
