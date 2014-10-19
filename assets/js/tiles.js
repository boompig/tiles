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

function drawHex(x_base, y_base, color) {
    context.save();
    context.translate(x_base, y_base);

    context.fillStyle = color;
    context.strokeStyle = "black";
    context.lineWidth = 2;

    var sideLength = 50;

    context.beginPath();
    context.rotate(Math.PI / 12);
    context.moveTo(0, 0);
    context.lineTo(sideLength, sideLength);

    for (var i = 0; i < 6; i++) {
        context.rotate(Math.PI / 3);
        context.lineTo(sideLength, sideLength);
    }


    context.stroke();
    context.fill();
    context.restore();
}

function drawHexGrid() {
    var numRows = canvas.height / HEX_HEIGHT;
    var numCols = (canvas.width / (HEX_WIDTH * 2.5));
    for (var k = 0; k < numCols; k++) {
        for (var i = 0; i < numRows; i++) {
            var color = (k + i) % 2 ? "red" : "blue";
            drawHex(k * 2 * 1.5 * HEX_WIDTH, i * HEX_HEIGHT, color);
        }

        for (var i = 0; i < numRows; i++) {
            var color = (k + i) % 2 ? "red" : "blue";
            drawHex((k * 2 + 1) * 1.5 * HEX_WIDTH, -0.5 * HEX_HEIGHT + i * HEX_HEIGHT, color);
        }
    }
}

$(function() {
    'use strict';
    canvas = $("canvas")[0];
    context = canvas.getContext("2d");

    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);

    var max_radius = 3;

    for (var k = 0; k < max_radius; k++) {
        console.log(k);
        if (k == 0) {
            drawHex(0, 0, "green");
        } else {
            var color = (k === 1) ? "orange" : "purple";

            for (var i = 0; i < 6 * k; i++) {
                // the angle should divide the circle into 6 * k pieces
                // and we weight where the angle is by i
                // but the angles are initially shifted by 1
                var angle = i * (Math.PI * 2 / (k * 6)) + Math.PI / 6;

                var r = 125;
                drawHex(r * k * Math.cos(angle), r * k * Math.sin(angle), color);
            }
        }
    }

    context.restore();
});
