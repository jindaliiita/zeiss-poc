// Get all the question elements
var questions = document.getElementsByClassName('question');

// Add click event listener to each question
for (var i = 0; i < questions.length; i++) {
  questions[i].addEventListener('click', toggleAnswer);
}

// Function to toggle the display of the answer
function toggleAnswer() {
  var answer = this.nextElementSibling;
  if (answer.style.display === 'block') {
    answer.style.display = 'none';
  } else {
    answer.style.display = 'block';
  }
}

export default function decorate(block) {
    
}
