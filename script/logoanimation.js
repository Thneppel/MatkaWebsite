document.addEventListener("DOMContentLoaded", function () {
    const elemento = document.getElementById("svg-element");
    let estado = 0;

    function animarRotacao() {
        if (estado === 0) {
            // Primeiro giro: normal até -90°
            elemento.style.transition = "transform 0.6s ease-in-out";
            elemento.style.transform = "rotate(-90deg)";
            estado = 1;
        } else {
            // Segundo giro: normal até -360° (sem overshoot)
            elemento.style.transition = "transform 1.2s ease-in-out";
            elemento.style.transform = "rotate(-360deg)";

            setTimeout(() => {
                // Remove a transição antes de resetar para 0°
                elemento.style.transition = "none";

                // Garante que o navegador processe o reset corretamente
                requestAnimationFrame(() => {
                    elemento.style.transform = "rotate(0deg)";
                });
            }, 1250); // Aguarda a animação antes de resetar

            estado = 0;
        }
    }

    setInterval(animarRotacao, 5000);
});
