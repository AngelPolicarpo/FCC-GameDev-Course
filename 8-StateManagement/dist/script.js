"use strict";
exports.__esModule = true;
var player_js_1 = require("./dist/player.js");
window.addEventListener('DOMContentLoaded', function () {
    var loading = document.getElementById('loading');
    loading.style.display = 'none';
    var canvas = document.getElementById('canvas1');
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var player = new player_js_1["default"](canvas.width, canvas.height);
    console.log(player);
});
