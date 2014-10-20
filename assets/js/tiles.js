var canvas;
var context;


var max_radius = 7;
var scrollSpeed = 1.01;

var xOffset = 0;
var yOffset = 0;
var lastX = 0;
var lastY = 0;
var down = false;

var HEX_SIZE = 40;
var BASE_HEX_SIZE = HEX_SIZE;
var FONT_SIZE = 12;
var zoomLevel = 1.0;

function drawCircle (x, y, r, color) {
    context.beginPath();
    context.fillStyle = color;
    context.arc(x, y, 0, Math.PI * 2, r, false);
    context.stroke();
    context.fill();
}

function drawHex(x_base, y_base, color, options) {
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

    if (options.label === 0 || options.label) {
        context.save();
            //context.translate(-2, 2);
            var fontSize = FONT_SIZE * (HEX_SIZE / BASE_HEX_SIZE);
            context.font = fontSize + "pt Helvetica";
            context.fillStyle = "white";
            context.fillText(options.label, -5, 5);
        context.restore();
    }

    context.restore();
}

function drawRadial(q, r, color, options) {
    var x = HEX_SIZE * 3 / 2.0 * q;
    var y = HEX_SIZE * Math.sqrt(3) * (r + q / 2.0);

    drawHex(x, y, color, options || {});
}

function drawRadialGrid() {
    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);
    context.translate(xOffset, yOffset);
    context.scale(zoomLevel, zoomLevel);

    var colors = ["green", "orange", "purple", "aquamarine", "deepskyblue", "lavender", "yellowgreen"];

    for (var q = -(max_radius-1); q < max_radius; q++) {
        for (var r = -(max_radius-1); r < max_radius; r++){
            if (q + r > (max_radius-1) || r+q < -(max_radius-1)){
                continue;
            }
            var layer = getLayer(q, r);
            drawRadial(q, r, colors[layer % colors.length], {
                //label: layer + "(" + q + "," + r + ")"
                label: layer
            });
        }
    }

    context.restore();
}

function sign (x) {
    return x > 0 ? 1 : -1;
}

function getLayer(q, r) {
    if (sign(q) == sign(r)) {
        return Math.abs(q + r);
    }

    var l = Math.max(Math.abs(q), Math.abs(r));
    if (q + r > l || -(q + r) > l) {
        return l + 1;
    } else {
        return l;
    }
}

function hoverHex(e) {
    var x = e.pageX - canvas.offsetLeft - canvas.width / 2.0 - xOffset;
    var y = e.pageY - canvas.offsetTop - canvas.height / 2.0 - yOffset;

    var q = Math.round(2 / 3.0 * x / (HEX_SIZE * zoomLevel));
    var r = Math.round((-1/3.0 * x + 1/3.0 * Math.sqrt(3) * y) / (HEX_SIZE * zoomLevel));
    var layer = getLayer(q, r);

    if (down) {
        var dx = e.clientX - lastX;
        var dy = e.clientY - lastY;
        xOffset += dx;
        yOffset += dy;
        lastX = e.clientX;
        lastY = e.clientY;

        if (Math.abs(xOffset) > canvas.width / 4) {
            // number of levels to display
            var req = Math.abs(Math.round(xOffset / HEX_SIZE * 0.8 / zoomLevel));
            //console.log(req);
            if (max_radius < req) {
                max_radius++;
            }
        } else if (Math.abs(yOffset) > canvas.height / 4) {
            var req = Math.abs(Math.round(yOffset / HEX_SIZE * 0.8 / zoomLevel));
            //console.log(req);
            if (max_radius < req) {
                max_radius++;
            }
        }
    }

    context.save();

        canvas.width = canvas.width;
        drawRadialGrid();


        if (! down && layer < max_radius) {
            context.save();
                context.translate(canvas.width / 2, canvas.height / 2);
                context.translate(xOffset, yOffset);
                context.scale(zoomLevel, zoomLevel);
                drawRadial(Math.round(q), Math.round(r), "black", {
                    //label: layer + "(" + q + "," + r + ")"
                    label: layer
                });
            context.restore();
        }
    context.restore();
}

function noWheel(e) {
    e.preventDefault();

    // cross-browser support
    if (e.detail && ! e.wheelDelta) {
        e.wheelDelta = e.detail;
    }

    if (e.wheelDelta < 0) {
        // down, zoom out
        zoomLevel /= scrollSpeed;
    } else {
        // up, zoom in
        zoomLevel *= scrollSpeed;
    }

    if (((1 / zoomLevel) - 1) * 200 > Math.pow(max_radius, 2)) {
        max_radius++;
    }

    canvas.width = canvas.width;
    drawRadialGrid();
}

$(function() {
    'use strict';

    // set canvas size based on viewport
    var w = $(document).width() * 0.9;
    $("canvas").prop({ "width": w });

    canvas = $("canvas")[0];
    context = canvas.getContext("2d");

    drawRadialGrid();
    $(canvas).mousemove(hoverHex);

    $(window).mousedown(function (e) {
        lastX = e.clientX;
        lastY = e.clientY;
        down = true;
    });

    $(window).mouseup(function (e) {
        down = false;
    });


    // TODO detect chrome vs firefox here
    if (true) {
        window.onmousewheel = document.onmousewheel = noWheel;
    } else {
        document.addEventListener("DOMMouseScroll", noWheel, false);
    }
});
