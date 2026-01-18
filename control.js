const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // stops page reload

    
    const un = document.getElementById("un").value.trim();
    const tel = document.getElementById("tel").value.trim();
    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("pass").value.trim();
    const cpass = document.getElementById("cpass").value.trim();
    const date1 = document.getElementById("date").value.trim();
    function yearsBetween(d1, d2) {
        let diff = d2.getFullYear() - d1.getFullYear();
        // If the current date is before the month/day of d1, subtract 1
        if (
            d2.getMonth() < d1.getMonth() || 
            (d2.getMonth() === d1.getMonth() && d2.getDate() < d1.getDate())
        ) {
            diff--;
        }
        return diff;
    }
    const now = new Date();
    const date= new Date (date1)


    if (!un || !tel || !email || !pass || !cpass) {
        return showNotification("All fields are required!", "error");
    }
    if (yearsBetween(date,now)<18){
        return showNotification("Too younng, go get mommy!", "error");
    }
    if (pass !== cpass) {
        return showNotification("Passwords do not match!", "error");
    }
    if ((!/^\d+$/.test(tel))) {
        return showNotification("Tel must be numbers only!", "error");
    }
    if (((tel).length !=8)){
        return showNotification("Tel must be 8 numbers only!", "error");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return showNotification("Invalid email format!", "error");
    }
    
    
    const formData = new FormData(form);
    const res = await fetch("register.php", {
        method: "POST",
        body: formData
    });

    const data = await res.json(); // parse JSON from PHP

    // Handle response
    if (data.status === "ok") {
        form.reset(); // clears inputs
        showNotification(data.msg, "success"); // neon popup
    } else {
        showNotification(data.msg, "error");
    }
});


/*notif handeling */
function showNotification(msg, type) {
    const n = document.getElementById("notif");
    n.textContent = msg;
    n.className = type;
    n.style.opacity = "1";
    n.style.transform = "translateY(0)";

    setTimeout(() => {
        n.style.opacity = "0";
        n.style.transform = "translateY(-10px)";
    }, 2500);
}

const formn = document.querySelector(".neon-form");

document.addEventListener("mousemove", (e) => {
    const rect = formn.getBoundingClientRect();

    // Centered coordinates relative to form
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const maxOffset = 45;

    const glowX = (x / rect.width) * maxOffset;
    const glowY = (y / rect.height) * maxOffset;

    formn.style.boxShadow = `
        ${glowX}px ${glowY}px 30px rgba(200, 110, 255, 0.9),
        ${glowX * 2}px ${glowY * 2}px 90px rgba(140, 60, 255, 0.45),
        ${-glowX}px ${-glowY}px 70px rgba(80, 190, 255, 0.35)
    `;
});

// Optional: keep a "default glow" when mouse is really far away
document.addEventListener("mouseleave", () => {
    formn.style.boxShadow = `
        0 0 25px 6px rgba(155, 80, 255, 0.55),
        0 0 60px 20px rgba(155, 80, 255, 0.35)
    `;
});
