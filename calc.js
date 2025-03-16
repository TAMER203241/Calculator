let currentOperation = '';
let shiftMode = false;

function toggleShift() {
    shiftMode = !shiftMode;
    updateTrigButtons();
}

function updateTrigButtons() {
    const buttons = [
        { id: 'sinBtn', main: 'sin', inverse: 'sin⁻¹' },
        { id: 'cosBtn', main: 'cos', inverse: 'cos⁻¹' },
        { id: 'tanBtn', main: 'tan', inverse: 'tan⁻¹' }
    ];

    buttons.forEach(btn => {
        const button = document.getElementById(btn.id);
        const smallText = document.getElementById(btn.id.replace('Btn', 'Small'));
        
        if (shiftMode) {
            button.innerHTML = `<span class='small-text'>${btn.main}</span>${btn.inverse}`;
        } else {
            button.innerHTML = `<span class='small-text'>${btn.inverse}</span>${btn.main}`;
        }
    });
}

function appendValue(value) {
    currentOperation += value;
    updateDisplay();
}

function appendOperator(operator) {
    if (currentOperation && !/[+\-*/]$/.test(currentOperation)) {
        currentOperation += operator;
        updateDisplay();
    }
}

function appendPi() {
    currentOperation += Math.PI.toFixed(6);
    updateDisplay();
}

function clearDisplay() {
    currentOperation = '';
    document.getElementById('result').textContent = '0';
    document.getElementById('operation').textContent = '';
}

function calculateResult() {
    try {
        const result = eval(currentOperation);
        document.getElementById('result').textContent = result;
    } catch {
        alert('معادلة غير صحيحة!');
    }
}

function calculateTrig(func) {
    try {
        const value = parseFloat(currentOperation);
        if (isNaN(value)) {
            alert('يرجى إدخال رقم أولاً!');
            return;
        }
        let result;
        if (shiftMode) {
            switch (func) {
                case 'sin': result = Math.asin(value) * (180 / Math.PI); break;
                case 'cos': result = Math.acos(value) * (180 / Math.PI); break;
                case 'tan': result = Math.atan(value) * (180 / Math.PI); break;
            }
        } else {
            const radians = value * (Math.PI / 180);
            switch (func) {
                case 'sin': result = Math.sin(radians); break;
                case 'cos': result = Math.cos(radians); break;
                case 'tan': result = Math.tan(radians); break;
            }
        }
        document.getElementById('result').textContent = result.toFixed(6);
        updateDisplay();
    } catch {
        alert('حصل خطأ في العملية!');
    }
}

function updateDisplay() {
    document.getElementById('operation').textContent = currentOperation;
}