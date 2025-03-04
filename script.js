// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Navigation menu toggle for mobile
    const menuToggle = document.getElementById("menu-toggle")
    const navLinks = document.getElementById("nav-links")
  
    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active")
        menuToggle.classList.toggle("active")
      })
    }
  
    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll(".nav-links a")
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active")
          menuToggle.classList.remove("active")
        }
      })
    })
  
    // Header scroll effect
    const header = document.querySelector("header")
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll("section")
    const navLinks2 = document.querySelectorAll(".nav-links a")
  
    window.addEventListener("scroll", () => {
      let current = ""
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
  
        if (pageYOffset >= sectionTop - 200) {
          current = section.getAttribute("id")
        }
      })
  
      navLinks2.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href").substring(1) === current) {
          link.classList.add("active")
        }
      })
    })
  
    // Project filtering
    const filterBtns = document.querySelectorAll(".filter-btn")
    const projectItems = document.querySelectorAll(".project-item")
  
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons
        filterBtns.forEach((btn) => btn.classList.remove("active"))
  
        // Add active class to clicked button
        this.classList.add("active")
  
        const filter = this.getAttribute("data-filter")
  
        projectItems.forEach((item) => {
          if (filter === "all") {
            item.style.display = "block"
          } else if (item.getAttribute("data-category") === filter) {
            item.style.display = "block"
          } else {
            item.style.display = "none"
          }
        })
      })
    })
  
    // Animate skill bars when in viewport
    const skillBars = document.querySelectorAll(".skill-progress")
  
    function animateSkillBars() {
      skillBars.forEach((bar) => {
        const barPosition = bar.getBoundingClientRect().top
        const screenPosition = window.innerHeight / 1.3
  
        if (barPosition < screenPosition) {
          const width = bar.style.width
          bar.style.width = "0"
          setTimeout(() => {
            bar.style.width = width
          }, 100)
        }
      })
    }
  
    // Initial animation
    setTimeout(animateSkillBars, 500)
  
    // Animate on scroll
    window.addEventListener("scroll", animateSkillBars)
  
    // Form submission
    const contactForm = document.getElementById("contactForm")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Get form values
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const subject = document.getElementById("subject").value
        const message = document.getElementById("message").value
  
        // Here you would typically send the form data to a server
        // For demonstration, we'll just log it to console
        console.log("Form submitted:", { name, email, subject, message })
  
        // Show success message (in a real app, do this after successful submission)
        alert("Merci pour votre message ! Je vous répondrai dès que possible.")
  
        // Reset form
        contactForm.reset()
      })
    }
  })
  
  