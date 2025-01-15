document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    // Toggle the visibility of the navbar on menu click
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const successContainer = document.getElementById("successContainer");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // Prevent form submission until checks are passed
  
      // Email Validation
      const emailInput = document.getElementById("email").value;
      const emailPattern = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailPattern.test(emailInput)) {
        alert("Please enter a valid email address.");
        return; // Stop further execution
      }
  
      // Bot Check (Honeypot Field)
      const botCheck = document.querySelector('input[name="botcheck"]:checked');
      if (botCheck) {
        alert("Bot detected! Form submission blocked.");
        return; // Stop further execution
      }
  
      // If all checks pass, proceed with form submission
      const formData = new FormData(form);
  
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          // Hide form and show success message
          form.style.display = "none";
          successContainer.style.display = "block";
  
          // Reset after success
          setTimeout(() => {
            successContainer.style.display = "none";
            form.reset();
            form.style.display = "block";
          }, 3000); // Hide success message after 3 seconds
        } else {
          alert("Oops! Something went wrong. Please try again.");
        }
      } catch (error) {
        alert("An unexpected error occurred. Please try again later.");
      }
    });
  });
  
