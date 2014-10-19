var canvas;
var context;

var HEX_HEIGHT = 100;
var HEX_WIDTH = HEX_HEIGHT * 0.8;

function drawPolygon(vertices, color) {
    "use strict";
    context.fillStyle = color;
    context.strokeStyle = "black";
    context.lineWidth = 2;

    context.beginPath();
    context.moveTo(vertices[0][0], vertices[0][1]);
    for (var i = 1; i < vertices.length; i++) {
        context.lineTo(vertices[i][0], vertices[i][1]);
    }
    context.stroke();
    context.fill();
}

function drawHex(x_base, y_base) {
    drawPolygon([
            [x_base, y_base],
            [x_base + HEX_WIDTH, y_base],
            [x_base + HEX_WIDTH * 1.5, y_base + HEX_HEIGHT * 0.5],
            [x_base + HEX_WIDTH, y_base + HEX_HEIGHT],
            [x_base, y_base + HEX_HEIGHT],
            [x_base - HEX_WIDTH * 0.5, y_base + HEX_HEIGHT * 0.5]
        ], "red"
    );
}

$(function() {
    'use strict';
    canvas = $("canvas")[0];
    context = canvas.getContext("2d");

    var numRows = canvas.height / HEX_HEIGHT;
    var numCols = (canvas.width / (HEX_WIDTH * 2.5));

    for (var k = 0; k < numCols; k++) {
        for (var i = 0; i < numRows; i++) {
            drawHex(k * 2 * 1.5 * HEX_WIDTH, i * HEX_HEIGHT);
        }

        for (var i = 0; i < numRows; i++) {
            drawHex((k * 2 + 1) * 1.5 * HEX_WIDTH, -0.5 * HEX_HEIGHT + i * HEX_HEIGHT);
        }
    }
});
