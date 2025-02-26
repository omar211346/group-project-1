

// ==== NAVIGATION: Handles the display of sections based on clicked buttons ==== //
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section"); 
    const buttons = document.querySelectorAll(".toggle__button"); 

    function hideAllSections(){
        sections.forEach(section => section.classList.add("hidden"));
    }

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const targetSection = button.getAttribute("data-section");

            hideAllSections();

            document.getElementById(targetSection).classList.toggle("hidden");

            buttons.forEach(btn => btn.classList.toggle("active")); 

            button.classList.add("active"); 
        });
    });
}); 