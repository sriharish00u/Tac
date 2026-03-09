// script.js
function checkQuiz() {
    const correct = ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'];
    let score = 0;

    for (let i = 1; i <= 8; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected && selected.value === correct[i - 1]) {
            score++;
        }
    }

    let message = '';
    if (score >= 7) {
        message = 'Excellent understanding of road safety principles.';
    } else if (score >= 4) {
        message = 'Good effort – continue reviewing key rules.';
    } else {
        message = 'Valuable participation – please explore the awareness content.';
    }

    document.getElementById('quiz-result').innerHTML = 
        `Your Score: ${score} / 8<br>${message}`;
}
