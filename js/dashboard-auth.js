// ==========================
// dashboard-auth.js — Sponsor Angels
// ==========================
// Autor: Elarssen Code Solutions
// Versão: 1.0
// --------------------------

document.addEventListener("DOMContentLoaded", () => {

    const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));

    if (!usuarioLogado) {
        Swal.fire({
            icon: "error",
            title: "Acesso negado",
            text: "Você precisa estar logado para acessar o painel!",
            confirmButtonText: "Ir para Login",
        }).then(() => {
            window.location.href = "login.html";
        });
        return;
    }

    const paginaAtual = window.location.pathname;

    const páginaEmpresa = paginaAtual.includes("empresa-dashboard.html");
    const páginaInstituicao = paginaAtual.includes("instituicao-dashboard.html");
    const páginaAdmin = paginaAtual.includes("admin-dashboard.html");

    if (usuarioLogado.tipo === "empresa" && !páginaEmpresa) {
        acessoNegado();
        return;
    }
    if (usuarioLogado.tipo === "instituicao" && !páginaInstituicao) {
        acessoNegado();
        return;
    }
    if (usuarioLogado.tipo === "admin" && !páginaAdmin) {
        acessoNegado();
        return;
    }

    const nomeContainer = document.querySelector(".profile .info p b");
    const tipoContainer = document.querySelector(".profile .info small");

    if (nomeContainer) nomeContainer.textContent = usuarioLogado.nome;
    if (tipoContainer) tipoContainer.textContent =
        usuarioLogado.tipo === "empresa" ? "Empresa"
            : usuarioLogado.tipo === "instituicao" ? "Instituição"
                : "Administrador";

    let logoutBtn = null;

    document.querySelectorAll("a").forEach(a => {
        const span = a.querySelector("span.material-icons-sharp");
        if (span && span.textContent.trim() === "logout") {
            logoutBtn = a;
        }
    });

    if (!logoutBtn) {
        logoutBtn = [...document.querySelectorAll("a")].find(a =>
            a.innerText.trim().toLowerCase().includes("sair")
        );
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();

            Swal.fire({
                title: "Deseja realmente sair?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sim, sair",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {

                    sessionStorage.removeItem("usuarioLogado");

                    Swal.fire({
                        icon: "success",
                        title: "Logout realizado!",
                        showConfirmButton: false,
                        timer: 1200
                    });

                    setTimeout(() => {
                        window.location.href = "index.html";
                    }, 1200);
                }
            });
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();

            Swal.fire({
                title: "Deseja realmente sair?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sim, sair",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    sessionStorage.removeItem("usuarioLogado");

                    Swal.fire({
                        icon: "success",
                        title: "Logout realizado!",
                        showConfirmButton: false,
                        timer: 1200
                    });

                    setTimeout(() => {
                        window.location.href = "index.html";
                    }, 1200);
                }
            });
        });
    }

});


// ===============================
// Função auxiliar de acesso negado
// ===============================
function acessoNegado() {
    Swal.fire({
        icon: "error",
        title: "Acesso inválido",
        text: "Você não tem permissão para acessar este painel.",
        confirmButtonText: "Voltar ao Login",
    }).then(() => {
        window.location.href = "login.html";
    });
}
