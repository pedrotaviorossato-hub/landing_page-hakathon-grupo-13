const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalClose = document.getElementById("modalClose");

let lastFocused = null;

function openModal(item) {
    lastFocused = item;

    modalImage.src = item.dataset.image;
    modalImage.alt = item.dataset.title;
    modalTitle.textContent = item.dataset.title;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    modalClose.focus();
}

function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (lastFocused) {
        lastFocused.focus();
    }
}

document.querySelectorAll(".gallery-item").forEach(item => {
    item.addEventListener("click", () => openModal(item));
});

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", event => {
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener("keydown", event => {
    if (!modal.classList.contains("open")) {
        return;
    }

    if (event.key === "Escape") {
        closeModal();
    }

    // o botão de fechar é o único item focável: mantém o foco dentro do modal
    if (event.key === "Tab") {
        event.preventDefault();
        modalClose.focus();
    }
});


// entradas curtas: o fluxo se monta quando o bloco aparece na tela
const drawItems = document.querySelectorAll(".draw");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    drawItems.forEach(item => observer.observe(item));
} else {
    drawItems.forEach(item => item.classList.add("in"));
}

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
    contactForm.addEventListener("submit", event => {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();

        formStatus.textContent = `Obrigado, ${nome}! Sua mensagem foi preparada.`;

        contactForm.reset();
    });
}
