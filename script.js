const touchLayout = window.matchMedia("(max-width: 1024px), (hover: none)");


const eyes = document.querySelectorAll(".eye");
document.addEventListener("mousemove", (e) => {
    if (touchLayout.matches) return;
    eyes.forEach(eye => {
        const pupil = eye.querySelector(".pupil");
        const rect = eye.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
        const maxX = (rect.width - pupil.offsetWidth) / 2 - 3;
        const maxY = (rect.height - pupil.offsetHeight) / 2 - 3;
        const x = Math.cos(angle) * maxX;
        const y = Math.sin(angle) * maxY;
        pupil.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
});


const cards = document.querySelectorAll(".cards, .Hunter, .sort, .shooter, .calculator");


if ("IntersectionObserver" in window) {
    const reveal = new IntersectionObserver((entries) => {
        entries.forEach(en => {
            if (en.isIntersecting) {
                en.target.classList.replace("is-hidden", "is-shown");
                reveal.unobserve(en.target);
            }
        });
    }, { threshold: 0.15 });
    cards.forEach(c => {
        if (touchLayout.matches) { c.classList.add("is-hidden"); reveal.observe(c); }
    });


    const player = new IntersectionObserver((entries) => {
        entries.forEach(en => {
            const v = en.target;
            if (en.isIntersecting) v.play().catch(() => {});
            else v.pause();
        });
    }, { threshold: 0.4 });
    document.querySelectorAll("video").forEach(v => {
        if (touchLayout.matches) player.observe(v);
    });
}

cards.forEach(card => {
    card.addEventListener("click", (e) => {
        if (!touchLayout.matches || e.target.closest("a, video")) return;
        const wasOpen = card.classList.contains("is-open");
        cards.forEach(c => c.classList.remove("is-open"));
        if (!wasOpen) card.classList.add("is-open");
    });
});

document.querySelectorAll(".skilles li").forEach(li => {
    li.addEventListener("click", () => li.classList.toggle("is-on"));
});