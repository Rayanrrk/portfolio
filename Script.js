// Simple contact form submission
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Thank you for your message! I will get back to you soon.");
    this.reset();
});
