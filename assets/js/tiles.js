var canvas;
var context;

var HEX_SIZE = 100;

function drawHex(x_base, y_base, color) {
    context.save();
    context.translate(x_base, y_base);

    context.fillStyle = color;
    context.strokeStyle = "black";
    context.lineWidth = 2;


    context.beginPath();
    //context.rotate(Math.PI / 12);
    context.moveTo(0, 0);

    for (var i = 0; i <= 6; i++) {
        var angle = (Math.PI / 3) * i;
        var x = HEX_SIZE * Math.cos(angle);
        var y = HEX_SIZE * Math.sin(angle);
        context.lineTo(x, y);
    }

    context.stroke();
    context.fill();
    context.restore();
}

function drawRadial(q, r, color) {
    var x = HEX_SIZE * 3 / 2.0 * q;
    var y = HEX_SIZE * Math.sqrt(3) * (r + q / 2.0);
    drawHex(x, y, color);
}

$(function() {
    'use strict';
    canvas = $("canvas")[0];
    context = canvas.getContext("2d");

    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);

    var max_radius = 1;
    var colors = ["green", "orange", "purple", "aquamarine"];

    for (var k = 0; k < max_radius; k++) {
        drawRadial(q, r, colors[k]);
    }

    context.restore();
});
