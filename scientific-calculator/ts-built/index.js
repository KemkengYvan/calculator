var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// HTML Elements
var btn = document.querySelectorAll('#normal button');
var result = document.querySelector('.result');
var scientific = document.querySelector('#scientific');
var normal = document.querySelector('#normal');
var time = document.querySelector('#time');
var time1 = document.querySelector('#time1');
setInterval(function () {
    var now = new Date();
    var hour = now.getHours();
    var min = now.getMinutes();
    var secs = now.getSeconds();
    var printedHours, printedMins, printedSecs;
    if (hour < 10)
        printedHours = '0' + hour;
    else
        printedHours = hour + '';
    if (min < 10)
        printedMins = '0' + min;
    else
        printedMins = min + '';
    if (secs < 10)
        printedSecs = '0' + secs;
    else
        printedSecs = secs + '';
    time.value = printedHours + ' : ' + printedMins + ' : ' + printedSecs;
    time1.value = printedHours + ' : ' + printedMins + ' : ' + printedSecs;
}, 1000);
// Asign buttons events listener
var btnN = document.querySelectorAll('#scientific button');
var first = true;
var before = false;
var after = false;
var blockOp1 = false;
var alreadyDot = false;
var alreadyOperation = false;
var operand1 = '';
var operand2 = '';
var operation;
var answer = null;
var garde = '';
var blockFriends = false;
var end = '';
var end1 = '';
var restSymbol = '';
var val = '';
var blockOpertion = false;
var blockAll = false;
var Scientific = /** @class */ (function () {
    function Scientific(type, element) {
        switch (type) {
            case 'base':
                if (blockOpertion || alreadyOperation || operand1 == '' || blockAll)
                    return;
                else {
                    val = this.calculateAnswerBase(operand1, element);
                    blockAll = true;
                    this.getOutput();
                }
            case 'fact':
                if (blockAll)
                    return;
                try {
                    if (operand1 == '')
                        return;
                    else {
                        answer = this.fact(parseFloat(operand1));
                        this.getOutput();
                    }
                }
                catch (RangeError) {
                    result.value = 'Math Error';
                }
                return;
            case 'rest':
                if (blockAll)
                    return;
                if (blockFriends)
                    return;
                if (garde != '')
                    return;
                else {
                    restSymbol = element;
                    blockFriends = true;
                    result.value = restSymbol;
                    blockOpertion = true;
                }
                return;
            case 'number':
                if (blockAll)
                    return;
                if (blockOpertion) {
                    if (!blockOp1)
                        operand1 = this.printOperand(element);
                    else
                        operand2 = this.printOperand(element);
                    blockOpertion = false;
                }
                else if (!blockOp1)
                    operand1 = this.printOperand(element);
                else
                    operand2 = this.printOperand(element);
                return;
            case 'equal':
                // if(blockAll)
                //     return;
                if (blockFriends) {
                    if (operand1 == '') {
                        return;
                    }
                    else {
                        this.getOutput();
                        blockFriends = false;
                        return;
                    }
                }
                this.getOutput();
                return;
            case 'AC':
                this.reset();
                return;
            case 'del':
                if (blockAll) {
                    this.reset();
                    return;
                }
                this.delete();
                return;
            case 'operation':
                if (blockAll)
                    return;
                if (blockOpertion)
                    return;
                if (restSymbol == '') {
                    if (operand1 == '' || operand1 == '.')
                        return;
                    if (alreadyOperation) {
                        if (operand2 == '')
                            return;
                        else {
                            this.getOutput();
                            operand1 = answer + '';
                            operation = element;
                            switch (element) {
                                case 'power':
                                    result.value += '^';
                                    break;
                                default:
                                    result.value += element;
                                    break;
                            }
                            garde = '';
                            alreadyOperation = true;
                            return;
                        }
                    }
                    else {
                        operation = element;
                        garde = '';
                        switch (element) {
                            case 'power':
                                result.value += '^';
                                break;
                            default:
                                result.value += element;
                                break;
                        }
                        alreadyOperation = true;
                        blockOp1 = true;
                    }
                }
                else {
                    if (alreadyOperation) {
                        if (operand2 == '')
                            return;
                        this.getOutput();
                        operand1 = answer + '';
                        operation = element;
                        switch (element) {
                            case 'power':
                                result.value += '^';
                                break;
                            default:
                                result.value += element;
                                break;
                        }
                        garde = '';
                        alreadyOperation = true;
                        restSymbol = '';
                        blockFriends = false;
                        blockOpertion = false;
                        blockOp1 = true;
                        return;
                    }
                    else {
                        operation = element;
                        garde = '';
                        alreadyOperation = true;
                        blockOp1 = true;
                    }
                    this.getOutput();
                    operand1 = answer + '';
                    operation = element;
                    switch (element) {
                        case 'power':
                            result.value += '^';
                            break;
                        default:
                            result.value += element;
                            break;
                    }
                    garde = '';
                    alreadyOperation = true;
                    restSymbol = '';
                    blockFriends = false;
                    blockOpertion = false;
                    blockOp1 = true;
                    return;
                }
                return;
            case 'Norm':
                this.showNormal();
                return;
            case 'Science':
                this.showScience();
                return;
        }
    }
    Scientific.prototype.showNormal = function () {
        scientific.style.display = 'none';
        normal.style.display = 'block';
    };
    Scientific.prototype.showScience = function () {
        scientific.style.display = 'block';
        normal.style.display = 'none';
    };
    Scientific.prototype.getOutput = function () {
        if (blockAll) {
            result.value = val;
            return;
        }
        if (restSymbol != '') {
            if (operand2 == '') {
                answer = this.calculateAnswerRest(operand1, restSymbol);
                restSymbol = '';
                console.log('enter');
            }
            else {
                operand2 = this.calculateAnswerRest(operand2, restSymbol) + '';
                blockOpertion = false;
                blockFriends = false;
            }
        }
        if (operand1 != '' && operand2 != '' && operation != '') {
            answer = this.calculateAnswer(operand1, operation, operand2);
        }
        if (answer == null)
            return;
        if ((answer.toFixed(2) + '').length > 10)
            result.value = 'Math Error';
        else {
            result.value = answer.toFixed(2) + "";
            operand1 = answer + "";
            alreadyOperation = false;
        }
        return;
    };
    Scientific.prototype.fact = function (n) {
        if (n == 0 || n == 1)
            return 1;
        else
            return n * this.fact(n - 1);
    };
    Scientific.prototype.printOperand = function (el) {
        if (restSymbol == '')
            if (garde.length < 13) {
                if (el == '.')
                    if (alreadyDot)
                        return;
                    else
                        alreadyDot = true;
                garde += el;
                result.value = garde;
                return garde;
            }
            else
                return;
        else {
            if (garde.length < 13) {
                if (el == '.')
                    if (alreadyDot)
                        return;
                    else
                        alreadyDot = true;
                garde += el;
                result.value = restSymbol + garde;
                return garde;
            }
            else
                return;
        }
    };
    Scientific.prototype.calculateAnswer = function (operand1, element, operand2) {
        var op1 = parseFloat(operand1);
        var op2 = parseFloat(operand2);
        switch (element) {
            case '+':
                return op1 + op2;
            case '-':
                return op1 - op2;
            case '*':
                return op1 * op2;
            case '/':
                return op1 / op2;
            case 'power':
                return Math.pow(op1, op2);
            case 'mod':
                return op1 % op2;
        }
    };
    Scientific.prototype.calculateAnswerRest = function (operand1, element) {
        var op1 = parseFloat(operand1);
        switch (element) {
            case 'cos':
                return Math.cos(op1 * (Math.PI / 180));
            case 'sin':
                return Math.sin(op1 * (Math.PI / 180));
            case 'tan':
                return Math.tan(op1 * (Math.PI / 180));
            case 'log':
                return Math.log(op1) / Math.LN10;
            case 'In':
                return Math.log(op1);
            case 'e':
                return Math.exp(op1);
            case '√':
                return Math.sqrt(op1);
        }
    };
    Scientific.prototype.calculateAnswerBase = function (operand1, element) {
        var op1 = parseInt(operand1);
        switch (element) {
            case 'bin':
                return op1.toString(2);
            case 'oct':
                return op1.toString(8);
            case 'hex':
                return op1.toString(16);
            case 'dec':
                return op1.toString(10);
        }
    };
    Scientific.prototype.reset = function () {
        first = true;
        before = false;
        after = false;
        blockOp1 = false;
        alreadyDot = false;
        alreadyOperation = false;
        operand1 = '';
        operand2 = '';
        operation = '';
        answer = null;
        garde = '';
        result.value = '';
        blockFriends = false;
        blockOpertion = false;
        end = '';
        restSymbol = '';
        end1 = '';
        blockAll = false;
    };
    Scientific.prototype.delete = function () {
        if (result.value != '' && restSymbol == '') {
            end = garde.slice(garde.length - 1, garde.length);
            end1 = result.value.slice(result.value.length - 1, result.value.length);
            if (end == '.') {
                garde = garde.slice(0, garde.length - 1);
                alreadyDot = false;
                result.value = garde;
            }
            else if (end == '1' || end == '2' || end == '3' || end == '4' || end == '5' || end == '6' || end == '7' || end == '8' || end == '9' || end == '0') {
                garde = garde.slice(0, garde.length - 1);
                result.value = garde;
                if (!blockOp1)
                    operand1 = garde;
                else
                    operand2 = garde;
            }
            if (end1 == 'd') {
                operation = '';
                garde = result.value.slice(0, result.value.length - 3);
                result.value = garde;
                operand1 = garde;
                blockOp1 = false;
                alreadyOperation = false;
                return;
            }
            if (end1 == '+' || end1 == '-' || end1 == '*' || end1 == '/' || end1 == '^') {
                operation = '';
                garde = result.value.slice(0, result.value.length - 1);
                result.value = garde;
                operand1 = garde;
                blockOp1 = false;
                alreadyOperation = false;
                return;
            }
            return;
        }
        if (restSymbol != '') {
            end = garde.slice(garde.length - 1, garde.length);
            end1 = result.value.slice(0, restSymbol.length);
            if (end == '') {
                restSymbol = '';
                blockFriends = false;
                result.value = garde;
            }
            else {
                garde = garde.slice(0, garde.length - 1);
                result.value = restSymbol + garde;
                if (!blockOp1)
                    operand1 = garde;
                else
                    operand2 = garde;
            }
        }
    };
    return Scientific;
}());
var Calc = /** @class */ (function (_super) {
    __extends(Calc, _super);
    function Calc(type, element) {
        return _super.call(this, type, element) || this;
    }
    return Calc;
}(Scientific));
var _loop_1 = function (i) {
    if (i == 19)
        btnN[i].addEventListener('click', function () {
            new Scientific('del', btnN[i].value);
        });
    if (i == 18) {
        btnN[i].addEventListener('click', function () {
            new Scientific('AC', btnN[i].value);
        });
    }
    if (i == 32) {
        btnN[i].addEventListener('click', function () {
            new Scientific('equal', btnN[i].value);
        });
    }
    if (i == 0) {
        btnN[i].addEventListener('click', function () {
            new Scientific('Norm', btnN[i].value);
        });
    }
    else if (i < 5) {
        btnN[i].addEventListener('click', function () {
            new Scientific('base', btnN[i].value);
        });
    }
    else if (i == 7) {
        btnN[i].addEventListener('click', function () {
            new Scientific('fact', btnN[i].value);
        });
    }
    else if (i < 15 && (i != 5 && i != 9))
        btnN[i].addEventListener('click', function () {
            new Scientific('rest', btnN[i].value);
        });
    if ((i > 14 && i < 18) || (i > 19 && i < 23) || (i > 24 && i < 28) || (i > 29 && i < 32)) {
        btnN[i].addEventListener('click', function () {
            new Scientific('number', btnN[i].value);
        });
    }
    if ((i > 22 && i < 25) || (i > 27 && i < 30) || i == 5 || i == 9) {
        btnN[i].addEventListener('click', function () {
            new Scientific('operation', btnN[i].value);
        });
    }
};
for (var i = 0; i < 33; i++) {
    _loop_1(i);
}
var _loop_2 = function (i) {
    if (i < 11)
        btn[i].addEventListener('click', function () {
            new Calc('number', btn[i].value);
        });
    if (i >= 11 && i < 16 && i != 12)
        btn[i].addEventListener('click', function () {
            new Calc('operation', btn[i].value);
        });
    if (i == 16)
        btn[i].addEventListener('click', function () {
            new Calc('AC', btn[i].value);
        });
    if (i == 17)
        btn[i].addEventListener('click', function () {
            new Calc('Science', btn[i].value);
        });
    if (i == 18)
        btn[i].addEventListener('click', function () {
            new Calc('equal', btn[i].value);
        });
    if (i == 12)
        btn[i].addEventListener('click', function () {
            new Calc('del', btn[i].value);
        });
};
for (var i = 0; i < btn.length; i++) {
    _loop_2(i);
}
