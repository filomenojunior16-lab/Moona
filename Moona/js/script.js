const SECRET = "717";

function validar(){

    const valor =
    document.getElementById("codigoInput").value.trim();

    const erro =
    document.getElementById("erroMsg");

    if(valor === SECRET){

        erro.textContent = "";

        document
        .getElementById("loginScreen")
        .classList.remove("active");

        document
        .getElementById("giftScreen")
        .classList.add("active");

        launchConfetti(150);

    }else{

        erro.textContent =
        "Código incorrecto. Tente novamente.";

        document.getElementById("codigoInput").value="";
    }
}

function revelarPresente(){

    document.getElementById(
        "voucherBlock"
    ).style.display="block";

    document.getElementById(
        "btnGift"
    ).style.display="none";

    launchConfetti(250);
}

function copiarCodigo(button){
    const codigo = button.dataset.code || button.previousElementSibling?.textContent;

    if (!codigo) {
        alert("Código não encontrado.");
        return;
    }

    if (!navigator.clipboard) {
        alert("Não foi possível copiar automaticamente. Use copiar manualmente.");
        return;
    }

    navigator.clipboard.writeText(codigo)
        .then(() => {
            alert("Código copiado!");
        })
        .catch(() => {
            alert("Erro ao copiar. Tente novamente.");
        });
}

/* Efeito Confetti */

const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

function ajustarCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

ajustarCanvas();

let particulas = [];

function launchConfetti(qtd) {
    for (let i = 0; i < qtd; i++) {
        particulas.push({
            x: Math.random() * canvas.width,
            y: -10,
            vx: (Math.random() - 0.5) * 4,
            vy: Math.random() * 4 + 2,
            size: Math.random() * 6 + 4,
            life: 100
        });
    }
}

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particulas.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        ctx.fillStyle = "gold";
        ctx.fillRect(p.x, p.y, p.size, p.size);

        if (p.life <= 0) {
            particulas.splice(index, 1);
        }
    });

    requestAnimationFrame(animar);
}

animar();

window.addEventListener("resize", ajustarCanvas);

