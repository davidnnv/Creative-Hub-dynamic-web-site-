//START OF REGISTER AND LOGIN FORMS//
document.addEventListener("DOMContentLoaded", function() {
    const registerBtn = document.getElementById("register-btn");
    const modal = document.getElementById("modal");
    const closeBtn = document.getElementById("close-btn");
    const registerError = document.getElementById("register-error");

    registerError.style.color = 'red';

    const validateInput = (inputValue) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
        return regex.test(inputValue);
    };

    // Otvaranje na register modalot
    registerBtn.addEventListener("click", () => {
        modal.style.display = "block";
        registerError.textContent = ""; // Clear error message
    });

    // Zatvaranje na register modalot
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        registerError.textContent = ""; // Clear error message
    });

    // Da se zatvori ako prisisnes nadvor od modalot
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
            registerError.textContent = ""; // Clear error message
        }
    });

    // Register forma
    const registerForm = document.getElementById("register-form");
    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!validateInput(password)) {
            registerError.textContent = "Password must have at least 10 characters, including one capital letter and one special character.";
            return;
        }

        // Prakanje povik kon serverot posle uspesen login
        console.log("Email:", email);
        console.log("Password:", password);

        try {
            // Fetch na korisnikot so koristenje na API
            const response = await fetch('https://63407044d1fcddf69cb8c368.mockapi.io/users');
            const data = await response.json();
            const userCount = data.count;

            if (userCount === 0) {
                registerError.textContent = "No registered users available";
                return;
            }

            // Generiranje random broj
            const randomIndex = Math.floor(Math.random() * userCount) + 1;

            // Fetch
            const userResponse = await fetch(`https://63407044d1fcddf69cb8c368.mockapi.io/users/${randomIndex}`);
            const userData = await userResponse.json();

            const randomUsername = userData.username;

            // Save vo local storage
            localStorage.setItem('randomUsername', randomUsername);

            // Otvaranje na modal
            loginModal.style.display = "block";
            loginError.textContent = ""; // Clear error message

            // Zatvaranje na register modalot
            modal.style.display = "none";
            registerError.textContent = ""; // Clear error message
        } catch (error) {
            console.error("Error fetching random user:", error);
        }
    });

    

    const loginBtn = document.getElementById("login-btn");
    const loginModal = document.getElementById("login-modal");
    const closeLoginBtn = document.getElementById("close-login-btn");
    const loginError = document.getElementById("login-error");

    loginError.style.color = 'red';

    // Login modal
    loginBtn.addEventListener("click", () => {
        loginModal.style.display = "block";
        loginError.textContent = ""; // Clear error message
    });

    // Login modal zatvaranje
    closeLoginBtn.addEventListener("click", () => {
        loginModal.style.display = "none";
        loginError.textContent = ""; // Clear error message
    });

    //Zatvaranje login ako se klikne nadvor
    window.addEventListener("click", (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = "none";
            loginError.textContent = ""; // Clear error message
        }
    });

    // Login form
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("login-password").value;

        if (username === "username") {
            loginError.textContent = 'Please enter a valid username';
            return;
        }
        if (username.length < 5 || username.length > 10) {
            loginError.textContent = "Username must be between 5 and 10 characters";
            return;
        }
        if (password.length < 10 || password.length > 20) {
            loginError.textContent = "Password must be between 10 and 20 characters";
            return;
        }

        // Prakanje povik kon serverot posle uspesen login
        console.log("Username:", username);
        console.log("Password:", password);

        // Zatvaranje na modalot
        loginModal.style.display = "none";
        loginError.textContent = ""; // Clear error message
        
    });

    
});
//END OF REGISTER AND LOGIN FORMS//


