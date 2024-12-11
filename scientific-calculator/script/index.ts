// HTML Elements
const btn: any = document.querySelectorAll('#normal button');
let result = document.querySelector('.result') as HTMLInputElement;
let scientific = document.querySelector('#scientific') as HTMLDivElement;
let normal = document.querySelector('#normal') as HTMLDivElement;
let time = document.querySelector('#time') as HTMLInputElement;
let time1 = document.querySelector('#time1') as HTMLInputElement;

setInterval(() => {
    let now = new Date()
    let hour = now.getHours();
    let min = now.getMinutes();
    let secs = now.getSeconds();
    let printedHours: string, printedMins: string, printedSecs: string;

    if (hour < 10)
        printedHours = '0' + hour;
    else
        printedHours = hour + ''

    if (min < 10)
        printedMins = '0' + min;
    else
        printedMins = min + ''

    if (secs < 10)
        printedSecs = '0' + secs;
    else
        printedSecs = secs + ''


    time.value = printedHours + ' : ' + printedMins + ' : ' + printedSecs;
    time1.value = printedHours + ' : ' + printedMins + ' : ' + printedSecs;

}, 1000)
// Asign buttons events listener

const btnN: any = document.querySelectorAll('#scientific button');
let first: boolean = true;
let before: boolean = false;
let after: boolean = false;
let blockOp1: boolean = false;
let alreadyDot: boolean = false;
let alreadyOperation: boolean = false;
let operand1: string = '';
let operand2: string = '';
let operation: string;
let answer: number = null;
let garde: string = '';
let blockFriends: boolean = false;
let end: string = '';
let end1: string = '';
let restSymbol: string = '';
let val: string = '';
let blockOpertion: boolean = false;
let blockAll: boolean = false;

class Scientific {
    constructor(type: string, element: string) {
        switch (type) {
            case 'base':                
                if(blockOpertion || alreadyOperation || operand1 == '' || blockAll)
                    return ;
                else{
                    val = this.calculateAnswerBase(operand1, element);
                    blockAll = true;
                    this.getOutput();
                }               

            case 'fact':
                if(blockAll)
                    return;
                try {
                    if (operand1 == '')
                        return;
                    else {
                        answer = this.fact(parseFloat(operand1));
                        this.getOutput();
                    }

                } catch (RangeError) {
                    result.value = 'Math Error'
                }

                return;

            case 'rest':
                if(blockAll)
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
                if(blockAll)
                    return;
                if (blockOpertion) {
                    if (!blockOp1)
                        operand1 = this.printOperand(element);
                    else
                        operand2 = this.printOperand(element);

                    blockOpertion = false;
                } else
                    if (!blockOp1)
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
                    } else {
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
                if(blockAll){
                    this.reset();
                    return;
                }
                this.delete();
                return;

            case 'operation':
                if(blockAll)
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
                    } else {

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
                } else {

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
                        blockFriends = false
                        blockOpertion = false
                        blockOp1 = true;
                        return;

                    } else {
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
                    blockFriends = false
                    blockOpertion = false
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

    showNormal() {
        scientific.style.display = 'none';
        normal.style.display = 'block';
    }

    showScience() {
        scientific.style.display = 'block';
        normal.style.display = 'none';
    }

    getOutput() {
        if(blockAll){
            result.value = val;
           return;
        }

        if (restSymbol != '') {

            if (operand2 == '') {
                answer = this.calculateAnswerRest(operand1, restSymbol);
                restSymbol = '';
               console.log('enter');
                
            } else {
                operand2 = this.calculateAnswerRest(operand2, restSymbol) + '';
                blockOpertion = false
                blockFriends = false
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


    }

    fact(n: number) {
        if (n == 0 || n == 1)
            return 1;
        else
            return n * this.fact(n - 1);
    }

    printOperand(el: string) {

        if (restSymbol == '')
            if (garde.length < 13) {
                if (el == '.')
                    if (alreadyDot)
                        return;
                    else
                        alreadyDot = true
                garde += el;
                result.value = garde;
                return garde
            } else
                return;
        else {
            if (garde.length < 13) {
                if (el == '.')
                    if (alreadyDot)
                        return;
                    else
                        alreadyDot = true
                garde += el;
                result.value = restSymbol + garde;
                return garde
            } else
                return;
        }
    }
    calculateAnswer(operand1: string, element: string, operand2: string) {
        let op1 = parseFloat(operand1);
        let op2 = parseFloat(operand2);
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
    }

    calculateAnswerRest(operand1: string, element: string) {
        let op1 = parseFloat(operand1);
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
    }

    calculateAnswerBase(operand1: string, element: string) {
        let op1 = parseInt(operand1);
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
    }
    reset() {
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
        result.value = ''
        blockFriends = false;
        blockOpertion = false;
        end = '';
        restSymbol = '';
        end1 = '';
        blockAll = false;
    }

    delete() {
        if (result.value != '' && restSymbol == '') {
            end = garde.slice(garde.length - 1, garde.length)
            end1 = result.value.slice(result.value.length - 1, result.value.length);
            if (end == '.') {
                garde = garde.slice(0, garde.length - 1);
                alreadyDot = false;
                result.value = garde
            } else
                if (end == '1' || end == '2' || end == '3' || end == '4' || end == '5' || end == '6' || end == '7' || end == '8' || end == '9' || end == '0') {
                    garde = garde.slice(0, garde.length - 1);
                    result.value = garde
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
                alreadyOperation = false
                return;
            }



            if (end1 == '+' || end1 == '-' || end1 == '*' || end1 == '/' || end1 == '^') {
                operation = ''
                garde = result.value.slice(0, result.value.length - 1);
                result.value = garde;
                operand1 = garde;
                blockOp1 = false;
                alreadyOperation = false

                return;

            }

            return;


        }
        if (restSymbol != '') {
            end = garde.slice(garde.length - 1, garde.length)
            end1 = result.value.slice(0, restSymbol.length);
            if (end == '') {
                restSymbol = ''
                blockFriends = false
                result.value = garde;
            } else {
                garde = garde.slice(0, garde.length - 1);
                result.value = restSymbol + garde

                if (!blockOp1)
                    operand1 = garde;
                else
                    operand2 = garde;
            }

        }
    }

}

class Calc extends Scientific {
    constructor(type: string, element: string) {
        super(type, element);
    }

}



for (let i = 0; i < 33; i++) {
    if (i == 19)
        btnN[i].addEventListener('click', () => {
            new Scientific('del', btnN[i].value);
        })

    if (i == 18) {
        btnN[i].addEventListener('click', () => {
            new Scientific('AC', btnN[i].value);

        });


    }
    if (i == 32) {
        btnN[i].addEventListener('click', () => {
            new Scientific('equal', btnN[i].value);

        });


    }
    if (i == 0) {
        btnN[i].addEventListener('click', () => {
            new Scientific('Norm', btnN[i].value);

        });


    } else
        if (i < 5) {
            btnN[i].addEventListener('click', () => {
                new Scientific('base', btnN[i].value);
            });

        } else

            if (i == 7) {
                btnN[i].addEventListener('click', () => {
                    new Scientific('fact', btnN[i].value);
                });

            } else

                if (i < 15 && (i != 5 && i != 9))
                    btnN[i].addEventListener('click', () => {
                        new Scientific('rest', btnN[i].value);
                    });
    if ((i > 14 && i < 18) || (i > 19 && i < 23) || (i > 24 && i < 28) || (i > 29 && i < 32)) {
        btnN[i].addEventListener('click', () => {

            new Scientific('number', btnN[i].value);
        });

    }

    if ((i > 22 && i < 25) || (i > 27 && i < 30) || i == 5 || i == 9) {
        btnN[i].addEventListener('click', () => {

            new Scientific('operation', btnN[i].value);
        });

    }



}

for (let i = 0; i < btn.length; i++) {
    if (i < 11)
        btn[i].addEventListener('click', () => {
            new Calc('number', btn[i].value);
        })
    if (i >= 11 && i < 16 && i != 12)
        btn[i].addEventListener('click', () => {
            new Calc('operation', btn[i].value);
        })

    if (i == 16)
        btn[i].addEventListener('click', () => {
            new Calc('AC', btn[i].value);
        })

    if (i == 17)
        btn[i].addEventListener('click', () => {
            new Calc('Science', btn[i].value);
        })
    if (i == 18)
        btn[i].addEventListener('click', () => {
            new Calc('equal', btn[i].value);
        })

    if (i == 12)
        btn[i].addEventListener('click', () => {
            new Calc('del', btn[i].value);
        })
}
