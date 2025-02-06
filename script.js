function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

document.addEventListener("scroll", () => {
    document.querySelectorAll("section").forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && rect.bottom >= 0) {
            section.classList.add("visible");
        }
    });
});

window.addEventListener("load", () => {
    document.getElementById("hero").classList.add("visible");
    updateGridDots({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 });
});

// Parallax nos cards da seção "sobre mim"
document.addEventListener("mousemove", (e) => {
    document.querySelectorAll(".sobre-card").forEach((card) => {
        const rect = card.getBoundingClientRect();
        const moveX = ((e.clientX - (rect.left + rect.width / 2)) / rect.width) * -10;
        const moveY = ((e.clientY - (rect.top + rect.height / 2)) / rect.height) * -10;
        card.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// Efeito de rotação 3D nos cards de projetos
document.querySelectorAll(".projeto-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const rotateX = ((e.clientY - (rect.top + rect.height / 2)) / rect.height) * 25;
        const rotateY = ((e.clientX - (rect.left + rect.width / 2)) / rect.width) * -25;
        card.style.transform = `scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "scale(1) rotateX(0deg) rotateY(0deg)";
    });
});

// Criando pontos da malha
const gridContainer = document.getElementById("gridContainer");
function createGridDots() {
    const spacing = 10;
    for (let x = 0; x < window.innerWidth; x += spacing) {
        for (let y = 0; y < window.innerHeight; y += spacing) {
            const dot = document.createElement("div");
            dot.classList.add("grid-dot");
            dot.style.left = `${x}px`;
            dot.style.top = `${y}px`;
            gridContainer.appendChild(dot);
        }
    }
}
createGridDots();

document.addEventListener("mousemove", updateGridDots);
document.addEventListener("touchmove", updateGridDots, { passive: true });

function updateGridDots(event) {
    const mouseX = event.touches ? event.touches[0].clientX : event.clientX;
    const mouseY = event.touches ? event.touches[0].clientY : event.clientY;
    document.querySelectorAll(".grid-dot").forEach((dot) => {
        const dist = Math.hypot(mouseX - dot.offsetLeft, mouseY - dot.offsetTop);
        dot.style.opacity = Math.max(0, 1 - dist / 200);
    });
}

// Efeito de digitação com Typed.js
$(document).ready(() => {
    new Typed(".typing", {
        strings: ["Designer", "Full Stack", "Web Designer", "Freelancer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true,
    });
});

// Habilitando eventos de toque como mouse
document.addEventListener("touchmove", (event) => {
    if (event.touches.length > 0) {
        const touch = event.touches[0];
        event.clientX = touch.clientX;
        event.clientY = touch.clientY;
    }
}, { passive: false });

// Efeito de desfoque na rolagem
window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    const homeContent = document.querySelector(".home-content");
    const herotitle = document.querySelector(".hero-title");
    const typing = document.querySelector(".typing");
    const herosubtitles = document.querySelectorAll(".hero-subtitles");
    
    const blurValue = Math.min(scrollPosition / 100, 10);
    homeContent.style.filter = `blur(${blurValue}px)`;
    
    if (window.innerWidth < 650) {
        const opacitySize = Math.max(1 - scrollPosition / 900, 0);
        herotitle.style.opacity = typing.style.opacity = opacitySize;
        herosubtitles.forEach(subtitle => subtitle.style.opacity = opacitySize);
    } else {
        const fontSize = Math.max(3 - scrollPosition / 400, 0);
        herotitle.style.fontSize = typing.style.fontSize = `${fontSize}rem`;
        herosubtitles.forEach(subtitle => subtitle.style.fontSize = `${fontSize}rem`);
    }
});

// Envio de WhatsApp
function enviarWhatsApp() {
    const nome = document.getElementById("nome").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();
    if (!nome || !mensagem) return alert("Preencha seu nome e mensagem.");
    window.open(`https://wa.me/+5521968500643?text=${encodeURIComponent(`Olá, meu nome é ${nome}.\nMensagem: ${mensagem}`)}`, "_blank");
}

// Envio de e-mail
function enviarEmail() {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();
    if (!nome || !email || !mensagem) return alert("Preencha seu nome, e-mail e mensagem.");
    const destinatario = "herysonford.hf@gmail.com";
    const assunto = "Contato via Portfólio";
    const corpoEmail = `Nome: ${nome}\nMensagem: ${mensagem}`;
    const dominio = email.split("@")[1]?.split(".")[0]?.toLowerCase();
    const emailUrls = {
        gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${destinatario}&su=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpoEmail)}`,
        outlook: `https://outlook.live.com/mail/deeplink/compose?to=${destinatario}&subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpoEmail)}`,
        yahoo: `https://compose.mail.yahoo.com/?to=${destinatario}&subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpoEmail)}`,
    };
    window.open(emailUrls[dominio] || `mailto:${destinatario}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpoEmail)}`, "_blank");
}
