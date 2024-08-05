document.addEventListener('DOMContentLoaded', function () {
    const svg = document.getElementsByTagName('svg')[0];
    const menu = document.getElementsByClassName('nav-list')[0];
    const signup = document.getElementsByClassName('btn-signin')[0];
    const demo = document.getElementsByClassName('btn-demo')[0];
    const menuBlock = document.getElementsByClassName('nav-items-vertical')[0];
    const navBar = document.getElementsByClassName('navbar')[0];
    const bannerText = document.getElementsByClassName('banner-text')[0];
    let rotate = 0;

    // event listener for Sign Up button
    signup.addEventListener('click', function () {
        window.location.href = 'signup.html';
    });

    // event listener for Demo button
    demo.addEventListener('click', function () {
        window.location.href = 'home.html'; 
    });

    // event listener for SVG click
    svg.addEventListener('click', () => {
        console.log('I am listening');
        if (rotate == 0) {
            svg.style.transform = 'rotate(90deg)';
            rotate = 1;
            console.log("rotate = 1");
            menu.style.display = 'block';
            menuBlock.style.height = '150px';
            menuBlock.style.width = "100%";
            navBar.style.position = 'relative';
            bannerText.style.height = '60vh';
        } else if (rotate == 1) {
            svg.style.transform = 'rotate(0deg)';
            rotate = 0;
            console.log("rotate = 0");
            menuBlock.style.height = '0';
            navBar.style.position = 'absolute';
            bannerText.style.height = '80vh';
            menu.style.display = 'none';
        }
    });

    // Form submission handling
    document.getElementsByClassName('login-form')[0].addEventListener('submit', async (event) => {
        event.preventDefault();
        let isValid = true;
        const username = document.getElementById('username').value;
        const password = document.getElementById('InputPassword').value;
        
        // Check if all fields are filled
        if (!username) {
            isValid = false;
            document.querySelector('.v-username').style.display = 'block';
        } else {
            document.querySelector('.v-username').style.display = 'none';
        }
        
        if (!password) {
            isValid = false;
            document.querySelector('.v-pass').style.display = 'block';
        } else {
            document.querySelector('.v-pass').style.display = 'none';
        }

        if (isValid) {
            console.log('listening');
            // Proceed with form submission or further processing
            try {
                const response = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "userName": username, password })
                });
                const data = await response.json();
                if (response.ok) {
                    // Handle success (e.g., save token, redirect to another page, etc.)
                    localStorage.setItem('token', data.token);
                    alert('Login successful!');
                    window.location.href = '/home.html';
                } else {
                    alert(`Error: ${data.message}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred during login. Please try again.');
            }
        }
    });
});
