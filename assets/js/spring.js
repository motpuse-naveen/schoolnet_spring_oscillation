var cv = document.getElementById('cv'),
    ctx = cv.getContext('2d'),
    mouse = capture(cv),
    box = new Box(80, 40, 0, 16),
    spring = new Spring(160, 50, 10, 0.03, 0.9),
    vx = 0,
    vy = 0;

function Spring(restLenght, width, numRounds, k, f) {
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;
    this.restLenght = restLenght;
    this.width = width;
    this.numRounds = numRounds;
    this.k = k;
    this.f = f;
    this.color = "gray";
    this.lineWidth = 2;
}

Spring.prototype.draw = function (ctx) {
    var sPX, sPY, cP1X, cP1Y, cP2X, cP2Y, ePX, ePY;
    ctx.save();
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;

    var vx = this.x2 - this.x1;
    var vy = this.y2 - this.y1;
    var vm = Math.sqrt(vx * vx + vy * vy);
    ctx.translate(this.x1, this.y1);
    ctx.rotate(Math.atan2(vy, vx));

    ctx.beginPath();
    ctx.moveTo(0, 0);
    // length of one spring's round
    var l = vm / (this.numRounds + 2);
    // Initial segment, from spring anchor point to the first round
    sPX = l;
    sPY = 0;
    ctx.lineTo(sPX, sPY);
    // half width of spring's rounds
    var hw = 0.5 * this.width;
    for (var i = 0, n = this.numRounds; i < n; i++) {
        cP1X = sPX + l * (i + 0.0);
        cP1Y = sPY + hw;
        cP2X = sPX + l * (i + 0.5);
        cp2Y = sPY + hw;
        ePX = sPX + l * (i + 0.5);
        ePY = sPY;
        ctx.bezierCurveTo(cP1X, cP1Y, cP2X, cp2Y, ePX, ePY);
        cP1X = sPX + l * (i + 0.5);
        cP1Y = sPY - hw;
        cP2X = sPX + l * (i + 1.0);
        cp2Y = sPY - hw;
        ePX = sPX + l * (i + 1.0);
        ePY = sPY;
        ctx.bezierCurveTo(cP1X, cP1Y, cP2X, cp2Y, ePX, ePY);
    }
    // Final segment, from last springs round to the center of mass
    ctx.lineTo(vm, 0);
    //ctx.closePath();
    //ctx.fill();
    ctx.stroke();
    ctx.restore();
};

function Box(w, h, mx, my) {
    this.x = 0;
    this.y = 0;
    this.w = w;
    this.h = h;
    this.mx = mx;
    this.my = my;
    this.vx = 0;
    this.vy = 0;
    this.rotation = 0;
    this.color = "red";
    this.lineWidth = 1;
}

Box.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = "black";
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.rect(-0.5 * this.w, -0.5 * this.h, this.w, this.h);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = "yellow";
    ctx.fillStyle = "yellow";
    ctx.arc(this.mx, 0.5 * this.h - this.my, 6, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();
    ctx.restore();
};

window.requestAnimFrame = (
    function (callback) {
        return window.setTimeout(callback, 1000 / 30);
    });

(function drawFrame() {
    window.requestAnimFrame(drawFrame, cv);
    ctx.clearRect(0, 0, cv.width, cv.height);

    var dx = box.x - mouse.x,
        dy = box.y - mouse.y,
        angle = Math.atan2(dy, dx),
        boxAngle = angle + 0.5 * Math.PI,
        targetX = mouse.x + Math.cos(angle) * spring.restLenght,
        targetY = mouse.y + Math.sin(angle) * spring.restLenght;

    vx += (targetX - box.x) * spring.k;
    vy += (targetY - box.y) * spring.k;
    vx *= spring.f;
    vy *= spring.f;
    box.rotation = 3.15;
    box.x = 30;
    box.y = 160;
    console.log("Box:" + boxAngle + ", " + box.x + ", " + box.y)
    box.draw(ctx);
    spring.x1 = 30;
    spring.y1 = 10;
    spring.x2 = 30;
    spring.y2 = 150;
    console.log(spring.x1 + ", " + spring.y1 + ", " + spring.x2 + ", " + spring.y2)
    spring.draw(ctx);
    

}());


function capture(element) {
    var mouse = {
        x: 80,
        y: 10,
        event: null
    }
    
    ,
        body_scrollLeft = document.body.scrollLeft,
        element_scrollLeft = document.documentElement.scrollLeft,
        body_scrollTop = document.body.scrollTop,
        element_scrollTop = document.documentElement.scrollTop,
        offsetLeft = element.offsetLeft,
        offsetTop = element.offsetTop;

    element.addEventListener('mousemove', function (event) {
        var x, y;
        if (event.pageX || event.pageY) {
            x = event.pageX;
            y = event.pageY;
        } else {
            x = event.clientX + body_scrollLeft + element_scrollLeft;
            y = event.clientY + body_scrollTop + element_scrollTop;
        }
        x -= offsetLeft;
        y -= offsetTop;
        mouse.x = x;
        mouse.y = y;
        mouse.event = event;

    }, false);
    
    return mouse;
}
