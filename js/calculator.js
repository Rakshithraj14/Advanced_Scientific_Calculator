class ScientificCalculator {
    constructor() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = null;
        this.waitingForOperand = false;
        this.memory = 0;
        this.angleMode = 'deg'; // 'deg' or 'rad'
        this.history = '';
        this.parenthesesCount = 0;
    }

    // Display methods
    updateDisplay() {
        const display = document.getElementById('display');
        const history = document.getElementById('history');
        
        if (this.currentInput.length > 12) {
            display.innerHTML = parseFloat(this.currentInput).toExponential(6);
        } else {
            display.innerHTML = this.currentInput;
        }
        
        history.innerHTML = this.history;
        
        // Update memory status
        document.getElementById('memoryStatus').textContent = `M: ${this.memory}`;
        document.getElementById('angleMode').textContent = this.angleMode.toUpperCase();
    }

    // Number input
    inputNumber(num) {
        if (this.waitingForOperand) {
            this.currentInput = num;
            this.waitingForOperand = false;
        } else {
            this.currentInput = this.currentInput === '0' ? num : this.currentInput + num;
        }
    }

    // Decimal point
    inputDecimal() {
        if (this.waitingForOperand) {
            this.currentInput = '0.';
            this.waitingForOperand = false;
        } else if (this.currentInput.indexOf('.') === -1) {
            this.currentInput += '.';
        }
    }

    // Clear functions
    clear() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = null;
        this.waitingForOperand = false;
        this.history = '';
        this.parenthesesCount = 0;
    }

    clearEntry() {
        this.currentInput = '0';
    }

    backspace() {
        if (this.currentInput.length > 1) {
            this.currentInput = this.currentInput.slice(0, -1);
        } else {
            this.currentInput = '0';
        }
    }

    // Basic operations
    inputOperator(nextOperator) {
        const inputValue = parseFloat(this.currentInput);

        if (this.previousInput === '') {
            this.previousInput = inputValue;
        } else if (this.operator) {
            const currentValue = this.previousInput || 0;
            const newValue = this.performCalculation(currentValue, inputValue, this.operator);

            this.currentInput = `${parseFloat(newValue.toFixed(7))}`;
            this.previousInput = newValue;
        } else {
            this.previousInput = inputValue;
        }

        this.waitingForOperand = true;
        this.operator = nextOperator;
        this.history = `${this.previousInput} ${nextOperator}`;
    }

    performCalculation(firstValue, secondValue, operator) {
        switch (operator) {
            case '+':
                return firstValue + secondValue;
            case '-':
                return firstValue - secondValue;
            case '*':
                return firstValue * secondValue;
            case '/':
                return secondValue !== 0 ? firstValue / secondValue : NaN;
            case '^':
                return Math.pow(firstValue, secondValue);
            default:
                return secondValue;
        }
    }

    calculate() {
        const inputValue = parseFloat(this.currentInput);

        if (this.previousInput !== '' && this.operator) {
            const newValue = this.performCalculation(this.previousInput, inputValue, this.operator);
            
            if (isNaN(newValue) || !isFinite(newValue)) {
                this.currentInput = 'Error';
            } else {
                this.currentInput = `${parseFloat(newValue.toFixed(10))}`;
            }

            this.history = `${this.previousInput} ${this.operator} ${inputValue} =`;
            this.previousInput = '';
            this.operator = null;
            this.waitingForOperand = true;
        }
    }

    // Scientific functions
    toRadians(degrees) {
        return this.angleMode === 'deg' ? degrees * (Math.PI / 180) : degrees;
    }

    toDegrees(radians) {
        return this.angleMode === 'deg' ? radians * (180 / Math.PI) : radians;
    }

    sin() {
        const value = parseFloat(this.currentInput);
        const result = Math.sin(this.toRadians(value));
        this.currentInput = `${parseFloat(result.toFixed(10))}`;
        this.history = `sin(${value})`;
        this.waitingForOperand = true;
    }

    cos() {
        const value = parseFloat(this.currentInput);
        const result = Math.cos(this.toRadians(value));
        this.currentInput = `${parseFloat(result.toFixed(10))}`;
        this.history = `cos(${value})`;
        this.waitingForOperand = true;
    }

    tan() {
        const value = parseFloat(this.currentInput);
        const result = Math.tan(this.toRadians(value));
        this.currentInput = `${parseFloat(result.toFixed(10))}`;
        this.history = `tan(${value})`;
        this.waitingForOperand = true;
    }

    asin() {
        const value = parseFloat(this.currentInput);
        if (value >= -1 && value <= 1) {
            const result = this.toDegrees(Math.asin(value));
            this.currentInput = `${parseFloat(result.toFixed(10))}`;
            this.history = `asin(${value})`;
        } else {
            this.currentInput = 'Error';
        }
        this.waitingForOperand = true;
    }

    acos() {
        const value = parseFloat(this.currentInput);
        if (value >= -1 && value <= 1) {
            const result = this.toDegrees(Math.acos(value));
            this.currentInput = `${parseFloat(result.toFixed(10))}`;
            this.history = `acos(${value})`;
        } else {
            this.currentInput = 'Error';
        }
        this.waitingForOperand = true;
    }

    atan() {
        const value = parseFloat(this.currentInput);
        const result = this.toDegrees(Math.atan(value));
        this.currentInput = `${parseFloat(result.toFixed(10))}`;
        this.history = `atan(${value})`;
        this.waitingForOperand = true;
    }

    log() {
        const value = parseFloat(this.currentInput);
        if (value > 0) {
            const result = Math.log10(value);
            this.currentInput = `${parseFloat(result.toFixed(10))}`;
            this.history = `log(${value})`;
        } else {
            this.currentInput = 'Error';
        }
        this.waitingForOperand = true;
    }

    ln() {
        const value = parseFloat(this.currentInput);
        if (value > 0) {
            const result = Math.log(value);
            this.currentInput = `${parseFloat(result.toFixed(10))}`;
            this.history = `ln(${value})`;
        } else {
            this.currentInput = 'Error';
        }
        this.waitingForOperand = true;
    }

    exp() {
        const value = parseFloat(this.currentInput);
        const result = Math.exp(value);
        this.currentInput = `${parseFloat(result.toFixed(10))}`;
        this.history = `e^${value}`;
        this.waitingForOperand = true;
    }

    sqrt() {
        const value = parseFloat(this.currentInput);
        if (value >= 0) {
            const result = Math.sqrt(value);
            this.currentInput = `${parseFloat(result.toFixed(10))}`;
            this.history = `√${value}`;
        } else {
            this.currentInput = 'Error';
        }
        this.waitingForOperand = true;
    }

    square() {
        const value = parseFloat(this.currentInput);
        const result = value * value;
        this.currentInput = `${parseFloat(result.toFixed(10))}`;
        this.history = `${value}²`;
        this.waitingForOperand = true;
    }

    reciprocal() {
        const value = parseFloat(this.currentInput);
        if (value !== 0) {
            const result = 1 / value;
            this.currentInput = `${parseFloat(result.toFixed(10))}`;
            this.history = `1/${value}`;
        } else {
            this.currentInput = 'Error';
        }
        this.waitingForOperand = true;
    }

    factorial() {
        const value = parseInt(this.currentInput);
        if (value >= 0 && value <= 170) {
            let result = 1;
            for (let i = 2; i <= value; i++) {
                result *= i;
            }
            this.currentInput = `${result}`;
            this.history = `${value}!`;
        } else {
            this.currentInput = 'Error';
        }
        this.waitingForOperand = true;
    }

    abs() {
        const value = parseFloat(this.currentInput);
        const result = Math.abs(value);
        this.currentInput = `${result}`;
        this.history = `|${value}|`;
        this.waitingForOperand = true;
    }

    random() {
        const result = Math.random();
        this.currentInput = `${parseFloat(result.toFixed(10))}`;
        this.history = 'rand()';
        this.waitingForOperand = true;
    }

    percentage() {
        const value = parseFloat(this.currentInput);
        const result = value / 100;
        this.currentInput = `${result}`;
        this.history = `${value}%`;
        this.waitingForOperand = true;
    }

    toggleSign() {
        if (this.currentInput !== '0') {
            this.currentInput = this.currentInput.startsWith('-') 
                ? this.currentInput.slice(1) 
                : '-' + this.currentInput;
        }
    }

    // Memory functions
    memoryRecall() {
        this.currentInput = `${this.memory}`;
        this.waitingForOperand = true;
    }

    memoryClear() {
        this.memory = 0;
    }

    memoryAdd() {
        this.memory += parseFloat(this.currentInput);
    }

    memorySubtract() {
        this.memory -= parseFloat(this.currentInput);
    }

    // Constants
    insertPi() {
        this.currentInput = `${Math.PI}`;
        this.waitingForOperand = true;
    }

    insertE() {
        this.currentInput = `${Math.E}`;
        this.waitingForOperand = true;
    }

    // Angle mode toggle
    toggleAngleMode() {
        this.angleMode = this.angleMode === 'deg' ? 'rad' : 'deg';
    }
}

// Initialize calculator
const calc = new ScientificCalculator();

// Event handlers
function appendNumber(num) {
    calc.inputNumber(num);
    calc.updateDisplay();
}

function appendDecimal() {
    calc.inputDecimal();
    calc.updateDisplay();
}

function appendOperator(op) {
    calc.inputOperator(op);
    calc.updateDisplay();
}

function calculate() {
    calc.calculate();
    calc.updateDisplay();
}

function clearAll() {
    calc.clear();
    calc.updateDisplay();
}

function clearEntry() {
    calc.clearEntry();
    calc.updateDisplay();
}

function backspace() {
    calc.backspace();
    calc.updateDisplay();
}

function toggleSign() {
    calc.toggleSign();
    calc.updateDisplay();
}

// Scientific functions
function calculateSin() {
    calc.sin();
    calc.updateDisplay();
}

function calculateCos() {
    calc.cos();
    calc.updateDisplay();
}

function calculateTan() {
    calc.tan();
    calc.updateDisplay();
}

function calculateAsin() {
    calc.asin();
    calc.updateDisplay();
}

function calculateAcos() {
    calc.acos();
    calc.updateDisplay();
}

function calculateAtan() {
    calc.atan();
    calc.updateDisplay();
}

function calculateLog() {
    calc.log();
    calc.updateDisplay();
}

function calculateLn() {
    calc.ln();
    calc.updateDisplay();
}

function calculateExp() {
    calc.exp();
    calc.updateDisplay();
}

function calculateSquareRoot() {
    calc.sqrt();
    calc.updateDisplay();
}

function calculateSquare() {
    calc.square();
    calc.updateDisplay();
}

function calculateReciprocal() {
    calc.reciprocal();
    calc.updateDisplay();
}

function calculateFactorial() {
    calc.factorial();
    calc.updateDisplay();
}

function calculateAbs() {
    calc.abs();
    calc.updateDisplay();
}

function calculateRandom() {
    calc.random();
    calc.updateDisplay();
}

function calculatePercentage() {
    calc.percentage();
    calc.updateDisplay();
}

function calculatePower() {
    calc.inputOperator('^');
    calc.updateDisplay();
}

// Memory functions
function memoryRecall() {
    calc.memoryRecall();
    calc.updateDisplay();
}

function memoryClear() {
    calc.memoryClear();
    calc.updateDisplay();
}

function memoryAdd() {
    calc.memoryAdd();
    calc.updateDisplay();
}

function memorySubtract() {
    calc.memorySubtract();
    calc.updateDisplay();
}

// Constants
function insertPi() {
    calc.insertPi();
    calc.updateDisplay();
}

function insertE() {
    calc.insertE();
    calc.updateDisplay();
}

// Mode functions
function toggleAngleMode() {
    calc.toggleAngleMode();
    calc.updateDisplay();
}

function toggleMode(mode) {
    const buttons = document.querySelectorAll('.mode-btn');
    const advancedFunctions = document.getElementById('advancedFunctions');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    if (mode === 'scientific') {
        advancedFunctions.classList.remove('hidden');
    } else {
        advancedFunctions.classList.add('hidden');
    }
}

// Parentheses (placeholder for future implementation)
function openParenthesis() {
    // Implement parentheses functionality
    calc.currentInput += '(';
    calc.parenthesesCount++;
    calc.updateDisplay();
}

function closeParenthesis() {
    // Implement parentheses functionality
    if (calc.parenthesesCount > 0) {
        calc.currentInput += ')';
        calc.parenthesesCount--;
    }
    calc.updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '.') {
        appendDecimal();
    } else if (key === '+') {
        appendOperator('+');
    } else if (key === '-') {
        appendOperator('-');
    } else if (key === '*') {
        appendOperator('*');
    } else if (key === '/') {
        event.preventDefault();
        appendOperator('/');
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape') {
        clearAll();
    } else if (key === 'Backspace') {
        backspace();
    }
});



// Initialize display when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    calc.updateDisplay();
});
