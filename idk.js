const form = document.querySelector(".neon-form");

document.addEventListener("mousemove", (e) => {
    const rect = form.getBoundingClientRect();

    // Centered coordinates relative to form
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const maxOffset = 45;

    const glowX = (x / rect.width) * maxOffset;
    const glowY = (y / rect.height) * maxOffset;

    form.style.boxShadow = `
        ${glowX}px ${glowY}px 30px rgba(200, 110, 255, 0.9),
        ${glowX * 2}px ${glowY * 2}px 90px rgba(140, 60, 255, 0.45),
        ${-glowX}px ${-glowY}px 70px rgba(80, 190, 255, 0.35)
    `;
});

// Optional: keep a "default glow" when mouse is really far away
document.addEventListener("mouseleave", () => {
    form.style.boxShadow = `
        0 0 25px 6px rgba(155, 80, 255, 0.55),
        0 0 60px 20px rgba(155, 80, 255, 0.35)
    `;
});
