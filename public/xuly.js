var socket = io("https://app-chat-tuta.herokuapp.com");

// var socket = io("http://localhost:3000");

socket.on("server-send-dki-thatbai", function(){
    alert("có người dk ten nay roi !!!");
});

socket.on("server-send-dki-thanhcong", function(data){
    $("#currentUser").html(data);
    $("#loginForm").hide(2000);
    $("#chatForm").show(1000);
});

socket.on("server-send-danhsach-Users", function(data){
    $("#boxContent").html("");
    data.forEach(element => {
        $("#boxContent").append("<div class='user'>" + element + "</div>");
    });
});

socket.on("server-send-message", function(data){
    $("#listMessage").append("<div class='ms'>"+ data.un + ":" + data.nd+"</div>");
});

socket.on("ai-do-dang-go-chu", function(data){
    $("#thongbao").html(data + "<img width=20px src='typing.gif'>");
});

socket.on("ai-do-stop-go-chu", function(){
    $("#thongbao").html("");
});

$(document).ready(function(){
    $("#loginForm").show();
    $("#chatForm").hide();

    $("#btnRegister").click(function(){
        socket.emit("client-send-Username", $("#txtUserName").val());
    });

    $("#btnLogout").click(function(){
        socket.emit("logout");
        $("#loginForm").show(1000);
        $("#chatForm").hide(2000);
    });

    $("#btnSend").click(function(){
        socket.emit("user-send-message", $("#txtMessage").val());
    });

    $("#txtMessage").focusin(function(){
        socket.emit("toi-dang-go-chu");
    });

    $("#txtMessage").focusout(function(){
        socket.emit("toi-stop-go-chu");
    });
});
// khi tải trang web thì phần login hiện ra và phần chat ấn đi

