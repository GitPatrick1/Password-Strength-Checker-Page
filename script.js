// Function to check the password strength
function checkPasswordStrength() {
    const password = document.getElementById('password').value;
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('password-strength');

    let strength = 0;

    // Password checks
    if (password.length >= 8) strength += 1;
    if (password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[a-z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[@$!%*?&]/)) strength += 1;

    // Update strength bar and text
    if (strength === 0) {
        strengthBar.style.width = '0%';
        strengthText.textContent = '';
        strengthText.className = '';
    } else if (strength <= 2) {
        strengthBar.style.width = '33%';
        strengthText.textContent = 'Weak';
        strengthText.className = 'weak';
    } else if (strength === 3) {
        strengthBar.style.width = '66%';
        strengthText.textContent = 'Moderate';
        strengthText.className = 'moderate';
    } else {
        strengthBar.style.width = '100%';
        strengthText.textContent = 'Strong';
        strengthText.className = 'strong';
    }
}

// Function to generate a random password
function generatePassword() {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$!%*?&";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    document.getElementById("generated-password").value = password;
}

// Function to copy the generated password
function copyPassword() {
    const passwordField = document.getElementById("generated-password");
    passwordField.select();
    document.execCommand("copy");
    alert("Password copied!");
}

// Function to toggle between dark mode and light mode
function toggleMode() {
    const body = document.body;
    const modeButton = document.getElementById('mode-toggle');
    const modeText = document.getElementById('mode-text');

    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        modeText.textContent = 'Light Mode';
        modeButton.textContent = '🌙';  // Moon icon for dark mode
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        modeText.textContent = 'Dark Mode';
        modeButton.textContent = '☀️';  // Sun icon for light mode
    }
}

// Set the initial mode to light mode
document.body.classList.add('light-mode');

// Generate a suggested password on page load
generatePassword();
