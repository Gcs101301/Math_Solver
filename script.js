let selectedOperation = '+';
let correctAnswersCount = 0;

function selectOperation(operation) {
  // Reinicia el contador al cambiar la operación
  correctAnswersCount = 0;

  selectedOperation = operation;
  generateQuestion();
  updateCounter(); // Actualiza el contador para mostrar 0
}

function generateQuestion() {
  const operand1 = Math.floor(Math.random() * 10) + 1;
  const operand2 = Math.floor(Math.random() * 10) + 1;

  let question = '';
  let correctAnswer;

  switch (selectedOperation) {
    case '+':
      question = `${operand1} + ${operand2} = ?`;
      correctAnswer = operand1 + operand2;
      break;
    case '-':
      question = `${operand1} - ${operand2} = ?`;
      correctAnswer = operand1 - operand2;
      break;
    case '*':
      question = `${operand1} * ${operand2} = ?`;
      correctAnswer = operand1 * operand2;
      break;
    case '/':
      // Ensure that the division is exact
      if (operand1 % operand2 !== 0) {
        // If not exact, generate new numbers
        generateQuestion();
        return;
      }
      question = `${operand1} / ${operand2} = ?`;
      correctAnswer = operand1 / operand2;
      break;
  }

  document.getElementById('question').innerText = question;
  generateOptions(correctAnswer);
}

function generateOptions(correctAnswer) {
  const optionsContainer = document.getElementById('options');
  optionsContainer.innerHTML = '';

  // Generate 3 incorrect options
  const options = [];
  for (let i = 0; i < 3; i++) {
    let option;
    do {
      option = generateRandomOption(correctAnswer - 5, correctAnswer + 5);
    } while (options.includes(option) || option === correctAnswer);
    options.push(option);
  }

  // Add the correct option
  options.push(correctAnswer);

  // Shuffle the options
  options.sort(() => Math.random() - 0.5);

  // Display options
  options.forEach((option, index) => {
    const optionElement = document.createElement('div');
    optionElement.classList.add('option');
    optionElement.innerText = option;
    optionElement.addEventListener('click', () => checkAnswer(option, correctAnswer));
    optionsContainer.appendChild(optionElement);
  });
}

function generateRandomOption(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkAnswer(selectedOption, correctAnswer) {
  const answerMessage = document.getElementById('answer-message');

  if (selectedOption == correctAnswer) {
    answerMessage.textContent = '¡Respuesta correcta!';
    correctAnswersCount++;
    updateCounter();

    if (correctAnswersCount === 10) {
      answerMessage.textContent = '¡Ganaste!';
      correctAnswersCount = 0; // Reinicia el contador al ganar
      updateCounter();
    }
  } else {
    answerMessage.textContent = 'Respuesta incorrecta. Inténtalo de nuevo.';
    // Reinicia el contador al obtener una respuesta incorrecta
    correctAnswersCount = 0;
    updateCounter(); // Actualiza el contador para mostrar 0
  }

  generateQuestion();
}

function updateCounter() {
  const counterElement = document.getElementById('correct-answers-counter');
  counterElement.textContent = `Respuestas correctas: ${correctAnswersCount}`;
}

// Verificar la orientación de la pantalla y mostrar un mensaje si no es horizontal
function checkOrientation() {
  if (window.screen.orientation.type !== 'landscape-primary') {
    alert('Por favor, gira tu dispositivo a horizontal para una mejor experiencia.');
  }
}

// Llamar a la función al cargar la página
window.addEventListener('load', checkOrientation);

// Llamar a la función cuando cambia la orientación de la pantalla
window.addEventListener('orientationchange', checkOrientation);

// Generar la primera pregunta al cargar la página
generateQuestion();
