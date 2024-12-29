// Inizializza EmailJS con la tua chiave pubblica
emailjs.init("9DOPP49g8PHc71v4U");

// Function to toggle password visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleButton = document.querySelector('.toggle-password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleButton.textContent = '👁️';
    }
}

// Function to check the password strength
function checkPasswordStrength() {
    const password = document.getElementById('password').value;
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('password-strength');
    const score = calculateStrength(password);

    strengthBar.style.width = `${score}%`;

    if (score < 30) {
        strengthText.textContent = 'Weak';
        strengthText.className = 'strength-text weak';
    } else if (score < 60) {
        strengthText.textContent = 'Moderate';
        strengthText.className = 'strength-text moderate';
    } else {
        strengthText.textContent = 'Strong';
        strengthText.className = 'strength-text strong';
    }
}

// Function to calculate password strength
function calculateStrength(password) {
    let score = 0;
    if (password.length > 8) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;
    return score;
}

// Password generation
function generatePassword() {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    document.getElementById('generated-password').value = password;
}

// Copy password to clipboard
function copyPassword() {
    const passwordField = document.getElementById('generated-password');
    passwordField.select();
    document.execCommand('copy');
    alert('Password copied to clipboard!');
}

// Rating function
let ratingValue = 0;  // Variabile globale per memorizzare il valore del rating

function rate(starValue) {
    const stars = document.querySelectorAll('.star');
    
    // Aggiorna la variabile globale per il rating
    ratingValue = starValue;

    // Aggiungi la classe 'selected' a tutte le stelle fino a quella cliccata
    stars.forEach((star, index) => {
        if (index < starValue) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
    
    // Aggiorna il testo del rating
    const ratingDisplay = document.getElementById('rating-value');
    ratingDisplay.textContent = `You rated: ${starValue} stars`;
}

// Submit feedback function (using EmailJS to send feedback)
document.getElementById('submit-feedback').addEventListener('click', function() {
    const email = document.getElementById('user-email').value;
    const feedback = document.querySelector('.feedback-container textarea').value;

    // Verifica che l'utente abbia fornito email, feedback e rating
    if (email && feedback && ratingValue > 0) {
        const templateParams = {
            from_name: email,            // Nome dell'utente (Email)
            from_email: email,           // Email dell'utente
            rating: ratingValue,         // Valutazione (Rating)
            feedback: feedback           // Commento (Feedback)
        };

        // Invia il feedback con EmailJS
        emailjs.send('service_xxstonemanxx1', 'template_xxstonemanxx1', templateParams)
            .then(function(response) {
                alert('Feedback sent successfully!');
            }, function(error) {
                alert('Failed to send feedback: ' + error.text);
            });
    } else {
        alert('Please provide both email, feedback, and a rating.');
    }
});
