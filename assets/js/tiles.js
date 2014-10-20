var canvas;
var context;

var HEX_SIZE = 50;

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

function drawRadialGrid() {
    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);

    var max_radius = 4;
    var colors = ["green", "orange", "purple", "aquamarine"];

    for (var q = -(max_radius-1); q < max_radius; q++) {
        for (var r = -(max_radius-1); r < max_radius; r++){
            if (q + r > (max_radius-1) || r+q < -(max_radius-1)){
                continue;
            }
            drawRadial(q, r, colors[getLayer(q, r) % colors.length]);
        }

    }

    context.restore();
}

function getLayer(q, r) {
    var l = Math.max(Math.abs(q), Math.abs(r));
    if (q + r > l || -(q + r) > l) {
        return l + 1;
    } else {
        return l;
    }
}

function hoverHex(e) {
    var x = e.pageX - canvas.offsetLeft - canvas.width / 2.0;
    var y = e.pageY - canvas.offsetTop - canvas.height / 2.0;

    //var across = Math.round( (x - canvas.width / 2.0) / HEX_SIZE );
    //var down = Math.round( (y - canvas.height / 2.0) / HEX_SIZE );
    var q = 2 / 3.0 * x / HEX_SIZE;
    var r = (-1/3.0 * x + 1/3.0 * Math.sqrt(3) * y) / HEX_SIZE;


    canvas.width = canvas.width;
    drawRadialGrid();


    context.save()
    context.translate(canvas.width / 2, canvas.height / 2);
    drawRadial(Math.round(q), Math.round(r), "black");
    context.restore();
    //console.log(across, down);
}

$(function() {
    'use strict';
    canvas = $("canvas")[0];
    context = canvas.getContext("2d");

    drawRadialGrid();
    $(canvas).mousemove(hoverHex);
});
