let fs = require('fs');

function main() {
    const model = new Model();
    const logic = new Logic();
function candleCreator() {
    let date = new Date();
    let hours = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let number = logic.getRandom();
    let secondData = logic.getSecondData(number, second);
    model.addSecond(secondData);
    console.log('model.addSecond(secondData) '+secondData.ratio)
    if (second === 59) {
        let array = model.arrayOfSeconds;
        model.arrayOfSeconds = [];
        let candle = logic.getOCHL(array, date);
        model.addCandles(candle);
        let string = 'Date: ' + hours+','+minute+', '+second + ', open: ' + candle.open + ', close: ' + candle.close + ' low: ' + candle.low + ', high: ' + candle.high+'#\n';
        write(string);
    }
}
    setInterval(candleCreator, 1000);
    }
        function write(string) {
            fs.appendFile('text.txt', string, function () {
                console.log('Записано новое число!')});
        }

main();

var http = require('http');
var url = require('url');
var querystring = require('querystring');
var static = require('node-static');
var file = new static.Server('.', {
    cache: 0
});

function accept(req, res) {
    if (req.url == '/text.txt') {
        setTimeout(function () {
            file.serve(req, res);
        }, 500);
    } else {
        file.serve(req, res);
    }
}

if (!module.parent) {
    http.createServer(accept).listen(8080);
} else {
    exports.accept = accept;
}


function Model()
{
    this.arrayOfSeconds = [];
    this.arrayOfCandles = [];
}

Model.prototype.addSecond = function (second) {
    this.arrayOfSeconds[this.arrayOfSeconds.length]=second;
    return this.arrayOfSeconds;
};
Model.prototype.addCandles = function (candle) {
    this.arrayOfSeconds[this.arrayOfCandles.length]=candle;
    return this.arrayOfCandles;
};




function Logic() {
    this.username = "";
}

Logic.prototype.getSecondData = function (num, sec) {
    const secondData = {};
    secondData.ratio = num;
    secondData.time = sec;
    return secondData;
};
Logic.prototype.getRandom = function () {
    return (Math.random() * (1.799 - 1.100) + 1.100).toFixed(4);
};
Logic.prototype.getOCHL = function (array, date) {
    console.log(' array[0].ratio;'+array[0].ratio)
    let open = array[0].ratio;
    let close = array[array.length-1].ratio;
    let sortedArray = this.sortArray(array)
    let high = sortedArray[0].ratio;
    let low = sortedArray[sortedArray.length-1].ratio;
    const candle = {};
    candle.open = open;
    candle.close = close;
    candle.high = high;
    candle.low = low;
    candle.date = date;
    return candle;
};
Logic.prototype.sortArray = function (array) {
    function compare(a, b) {
        if (a.ratio < b.ratio) {
            return -1;
        }
        if (a.ratio > b.ratio) {
            return 1;
        }
        return 0;
    }
    return array.sort(compare);
};





