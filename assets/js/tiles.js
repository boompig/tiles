var canvas;
var context;

function drawPolygon(vertices, color) {
    //context.lineWidth = 0;
    context.fillStyle = color;

    context.beginPath();
    context.moveTo(vertices[0][0], vertices[0][1]);
    for (var i = 1; i < vertices.length; i++) {
        context.lineTo(vertices[i][0], vertices[i][1]);
    }
    context.stroke();
    context.fill();
}

$(function() {
    'use strict';
    canvas = $("canvas")[0];
    context = canvas.getContext("2d");

    drawPolygon([
            [100, 100],
            [200, 100],
            [200, 200],
            [100, 200],
        ], "red"
    );
});
