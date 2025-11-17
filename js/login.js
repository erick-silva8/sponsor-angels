// ==========================
// login.js — Sponsor Angels
// ==========================
// Autor: Elarssen Code Solutions
// Versão: 1.0
// --------------------------

// SweetAlert2 CDN (caso ainda não esteja incluso no HTML)
if (!window.Swal) {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
    document.head.appendChild(script);
}

// ========== FUNÇÕES AUXILIARES ==========

// Salvar usuário no LocalStorage
function salvarUsuario(tipo, dados) {
    const usuarios = JSON.parse(localStorage.getItem(tipo)) || [];
    usuarios.push(dados);
    localStorage.setItem(tipo, JSON.stringify(usuarios));
}

// Buscar usuário no LocalStorage
function buscarUsuario(tipo, email, senha) {
    const usuarios = JSON.parse(localStorage.getItem(tipo)) || [];
    return usuarios.find(
        (u) => u.email === email && u.senha === senha
    );
}

// Criar sessão do usuário
function criarSessao(usuario, tipo) {
    sessionStorage.setItem("usuarioLogado", JSON.stringify({ ...usuario, tipo }));
}

// Encerrar sessão
function encerrarSessao() {
    sessionStorage.removeItem("usuarioLogado");
    Swal.fire({
        icon: "success",
        title: "Logout realizado!",
        text: "Você foi desconectado com sucesso.",
        showConfirmButton: false,
        timer: 1800,
    }).then(() => {
        window.location.href = "index.html";
    });
}

// Preencher nome no dashboard
function renderizarUsuario() {
    const dadosSessao = JSON.parse(sessionStorage.getItem("usuarioLogado"));
    if (dadosSessao) {
        const infoDiv = document.querySelector(".info b");
        const smallText = document.querySelector(".info small");
        if (infoDiv) infoDiv.textContent = dadosSessao.nome;
        if (smallText) {
            if (dadosSessao.tipo === "empresas") smallText.textContent = "Empresa";
            if (dadosSessao.tipo === "instituicoes") smallText.textContent = "Instituição";
            if (dadosSessao.tipo === "admin") smallText.textContent = "Administrador";
        }
    }
}

// ========== REGISTRO DE EMPRESA ==========
const formEmpresa = document.getElementById("form-registro-empresa");
if (formEmpresa) {
    formEmpresa.addEventListener("submit", (e) => {
        e.preventDefault();

        const nome = document.getElementById("nomeEmpresa").value.trim();
        const email = document.getElementById("emailEmpresa").value.trim();
        const senha = document.getElementById("senhaEmpresa").value.trim();
        const cnpj = document.getElementById("cnpjEmpresa").value.trim();

        if (!nome || !email || !senha || !cnpj) {
            Swal.fire({
                icon: "error",
                title: "Campos obrigatórios!",
                text: "Preencha todos os campos para continuar.",
            });
            return;
        }

        salvarUsuario("empresas", { nome, email, senha, cnpj });

        Swal.fire({
            icon: "success",
            title: "Empresa registrada!",
            text: "Seu cadastro foi concluído com sucesso.",
            showConfirmButton: false,
            timer: 2000,
        }).then(() => {
            window.location.href = "login.html";
        });
    });
}

// ========== REGISTRO DE INSTITUIÇÃO ==========
const formInstituicao = document.getElementById("form-registro-instituicao");
if (formInstituicao) {
    formInstituicao.addEventListener("submit", (e) => {
        e.preventDefault();

        const nome = document.getElementById("nomeInstituicao").value.trim();
        const email = document.getElementById("emailInstituicao").value.trim();
        const senha = document.getElementById("senhaInstituicao").value.trim();
        const cnpj = document.getElementById("cnpjInstituicao").value.trim();

        if (!nome || !email || !senha || !cnpj) {
            Swal.fire({
                icon: "error",
                title: "Campos obrigatórios!",
                text: "Preencha todos os campos para continuar.",
            });
            return;
        }

        salvarUsuario("instituicoes", { nome, email, senha, cnpj });

        Swal.fire({
            icon: "success",
            title: "Instituição registrada!",
            text: "Cadastro realizado com sucesso.",
            showConfirmButton: false,
            timer: 2000,
        }).then(() => {
            window.location.href = "login.html";
        });
    });
}

// ========== LOGIN ==========
const formLogin = document.getElementById("form-login");
if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("emailLogin").value.trim();
        const senha = document.getElementById("senhaLogin").value.trim();

        // Admin fixo
        if (email === "admin@sponsorangels.org" && senha === "admin123") {
            criarSessao({ nome: "Administrador" }, "admin");
            Swal.fire({
                icon: "success",
                title: "Bem-vindo, Administrador!",
                text: "Login realizado com sucesso.",
                showConfirmButton: false,
                timer: 2000,
            }).then(() => {
                window.location.href = "admin-dashboard.html";
            });
            return;
        }

        const empresa = buscarUsuario("empresas", email, senha);
        const instituicao = buscarUsuario("instituicoes", email, senha);

        if (empresa) {
            criarSessao(empresa, "empresas");
            Swal.fire({
                icon: "success",
                title: `Bem-vindo, ${empresa.nome}!`,
                text: "Login realizado com sucesso.",
                showConfirmButton: false,
                timer: 1800,
            }).then(() => {
                window.location.href = "empresa-dashboard.html";
            });
        } else if (instituicao) {
            criarSessao(instituicao, "instituicoes");
            Swal.fire({
                icon: "success",
                title: `Bem-vindo, ${instituicao.nome}!`,
                text: "Login realizado com sucesso.",
                showConfirmButton: false,
                timer: 1800,
            }).then(() => {
                window.location.href = "instituicao-dashboard.html";
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Falha no login!",
                text: "Email ou senha incorretos. Tente novamente.",
            });
        }
    });
}

// ========== LOGOUT ==========
const logoutLink = document.querySelector("a[href='#'] span.material-icons-sharp");
if (logoutLink && logoutLink.textContent.trim() === "logout") {
    logoutLink.parentElement.addEventListener("click", (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Deseja sair?",
            text: "Sua sessão será encerrada.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, sair",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                encerrarSessao();
            }
        });
    });
}

// ========== RENDERIZAÇÃO AUTOMÁTICA ==========
document.addEventListener("DOMContentLoaded", renderizarUsuario);
