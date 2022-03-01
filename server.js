var express = require('express');
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(process.env.PORT || 3000);
// server.listen(3000);

var mangUser=[];

io.on("connection", function(socket){
    console.log("co nguoi ket noi len server " + socket.id);

    socket.on("client-send-Username", function(data){
        //console.log(data);
        if(mangUser.indexOf(data)>=0){
            socket.emit("server-send-dki-thatbai");
        }else{
            mangUser.push(data);
            socket.Username=data;
            socket.emit("server-send-dki-thanhcong", data);
            io.sockets.emit("server-send-danhsach-Users", mangUser);
        }
    });

    socket.on("logout", function(){
        mangUser.splice(
            mangUser.indexOf(socket.Username), 1
        );

        socket.broadcast.emit("server-send-danhsach-Users", mangUser);
    });

    socket.on("user-send-message", function(data){
        io.sockets.emit("server-send-message", {un:socket.Username, nd: data});
    });

    socket.on("toi-dang-go-chu", function(){
        //console.log(socket.Username + " dang go chu");
        var s = socket.Username + " dang go chu";
        io.sockets.emit("ai-do-dang-go-chu", s);
    });

    socket.on("toi-stop-go-chu", function(){
        //console.log(socket.Username + " stop go chu");
        io.sockets.emit("ai-do-stop-go-chu");
    });

    socket.on("disconnect", function(){
        mangUser.splice(
            mangUser.indexOf(socket.Username), 1
        );

        socket.broadcast.emit("server-send-danhsach-Users", mangUser);
    });
});

app.get("/", function(req, res){
    res.render("trangchu1");
});