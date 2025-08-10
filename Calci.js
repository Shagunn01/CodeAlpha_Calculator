let display = document.getElementById('display');
  let historyPanel = document.getElementById('historyPanel');
  let history = [];

  function appendChar(char) {
    if (display.textContent === '0') display.textContent = '';
    display.textContent += char;
  }

  function clearDisplay() {
    display.textContent = '0';
  }

  function calculate() {
    try {
      let expression = display.textContent;
      let result = eval(expression);
      display.textContent = result;
      history.unshift(expression + " = " + result);
      if (history.length > 10) history.pop();
      updateHistory();
    } catch (e) {
      display.textContent = 'Error';
    }
  }

  function updateHistory() {
    historyPanel.innerHTML = history.map(item => `<div>${item}</div>`).join('');
  }

  function toggleHistory() {
    historyPanel.style.display = historyPanel.style.display === 'none' ? 'block' : 'none';
  }

  document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (!isNaN(key) || ['+', '-', '*', '/', '.', '(', ')'].includes(key)) {
      appendChar(key);
    } else if (key === 'Enter') {
      calculate();
    } else if (key === 'Backspace') {
      display.textContent = display.textContent.slice(0, -1) || '0';
    }
  });