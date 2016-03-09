var onSuccessLogin = function(data, status){
	console.log('sdfjsdkjhkjsdfskdjhfksjdhf');
	window.location.href = "/config";
};
var onErrorLogin = function(data,status){
	console.log("status", status);
	console.log("error", data);
};

$("#loginForm").submit(function(event){
	event.preventDefault();

	var username = $("#loginForm").find("[name='username']").val()
	console.log("subminnnnnttttt")
	$.post("/api/login", {
		username: username
	})

	.done(onSuccessLogin)
	.done(onErrorLogin);
});
