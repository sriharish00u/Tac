// Modern Traffic Awareness Hub - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = navLinks.classList.contains('active') 
                ? 'rotate(45deg) translate(5px, 5px)' : '';
            spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '';
            spans[2].style.transform = navLinks.classList.contains('active') 
                ? 'rotate(-45deg) translate(5px, -5px)' : '';
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '1';
                spans[2].style.transform = '';
            }
        });
    });

    // Active navigation link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .card, .question').forEach(el => {
        observer.observe(el);
    });

    // Quiz functionality
    if (typeof checkQuiz === 'function') {
        window.checkQuiz = function() {
            const correct = ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'];
            let score = 0;
            let answered = 0;

            for (let i = 1; i <= 8; i++) {
                const selected = document.querySelector(`input[name="q${i}"]:checked`);
                if (selected) {
                    answered++;
                    if (selected.value === correct[i - 1]) {
                        score++;
                        // Highlight correct answer
                        selected.parentElement.style.background = '#C8E6C9';
                        selected.parentElement.style.color = '#2E7D32';
                    } else {
                        // Highlight wrong answer
                        selected.parentElement.style.background = '#FFCDD2';
                        selected.parentElement.style.color = '#C62828';
                    }
                }
                
                // Show correct answers for unanswered questions
                const options = document.querySelectorAll(`input[name="q${i}"]`);
                options.forEach(opt => {
                    if (opt.value === correct[i - 1] && !opt.checked) {
                        opt.parentElement.style.background = '#E8F5E9';
                    }
                });
            }

            // Calculate percentage
            const percentage = (score / 8) * 100;
            
            let message = '';
            let emoji = '';
            
            if (percentage === 100) {
                message = '🏆 Perfect Score! Outstanding knowledge of road safety!';
            } else if (percentage >= 75) {
                message = '🌟 Great job! You have excellent road safety awareness!';
            } else if (percentage >= 50) {
                message = '👍 Good effort! Keep learning to stay safe on roads.';
            } else if (percentage >= 25) {
                message = '📚 Keep studying! Road safety is crucial for everyone.';
            } else {
                message = '⚠️ Please review the content and try again. Safety matters!';
            }

            const resultDiv = document.getElementById('quiz-result');
            resultDiv.classList.add('show');
            resultDiv.innerHTML = `
                <h3>Your Score: ${score} / 8 (${percentage}%)</h3>
                <p>${emoji} ${message}</p>
                <p style="margin-top: 1rem; font-size: 0.9rem; color: #64748B;">
                    Questions answered: ${answered}/8
                </p>
                <button class="btn" onclick="resetQuiz()" style="margin-top: 1.5rem; padding: 0.75rem 2rem;">
                    Try Again
                </button>
            `;
            
            // Scroll to result
            resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        };
    }

    // Add hover effects to cards
    document.querySelectorAll('.card, .poster-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});

// Reset Quiz Function
function resetQuiz() {
    // Clear all selections
    document.querySelectorAll('input[type="radio"]').forEach(input => {
        input.checked = false;
        input.parentElement.style.background = '';
        input.parentElement.style.color = '';
    });
    
    // Hide result
    const resultDiv = document.getElementById('quiz-result');
    resultDiv.classList.remove('show');
    
    // Scroll back to quiz
    document.getElementById('quiz').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

// Smooth reveal on scroll
window.addEventListener('scroll', reveal);

function reveal() {
    var reveals = document.querySelectorAll('.card, .poster-card, .slogans-grid li');
    
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].style.opacity = '1';
            reveals[i].style.transform = 'translateY(0)';
        }
    }
}

// Add initial styles for animation
document.addEventListener('DOMContentLoaded', function() {
    var reveals = document.querySelectorAll('.card, .poster-card, .slogans-grid li');
    for (var i = 0; i < reveals.length; i++) {
        reveals[i].style.opacity = '0';
        reveals[i].style.transform = 'translateY(30px)';
        reveals[i].style.transition = 'all 0.6s ease';
    }
});

