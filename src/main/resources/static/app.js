let tarefas = [];
let filtroAtual = "todas";
let tarefaEditada = null;

async function api(url, method = "GET", body) {
    const resposta = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined
    });
    if (!resposta.ok) throw new Error("Erro " + resposta.status);
    return resposta.status === 204 ? null : resposta.json();
}

function dataFormatada(data) {
    if (!data) return "";
    return new Date(data + "T00:00:00").toLocaleDateString("pt-BR");
}

function tarefasVisiveis() {
    if (filtroAtual === "pendentes") return tarefas.filter((t) => t.status !== "CONCLUIDA");
    if (filtroAtual === "concluidas") return tarefas.filter((t) => t.status === "CONCLUIDA");
    return tarefas;
}

function atualizarContadores() {
    document.getElementById("c-todas").textContent = tarefas.length;
    document.getElementById("c-pendentes").textContent = tarefas.filter((t) => t.status !== "CONCLUIDA").length;
    document.getElementById("c-concluidas").textContent = tarefas.filter((t) => t.status === "CONCLUIDA").length;
    document.getElementById("resultado").textContent = tarefasVisiveis().length + " tarefa(s)";
}

function criarTarefaVisual(tarefa) {
    const item = document.createElement("article");
    item.className = "task-item" + (tarefa.status === "CONCLUIDA" ? " done" : "");

    const check = document.createElement("button");
    check.className = "check";
    check.type = "button";
    check.setAttribute("aria-label", tarefa.status === "CONCLUIDA" ? "Marcar como pendente" : "Concluir tarefa");
    check.textContent = tarefa.status === "CONCLUIDA" ? "✓" : "";
    check.addEventListener("click", () => alterarStatus(tarefa));

    const details = document.createElement("div");
    details.className = "task-details";
    const title = document.createElement("h2");
    title.textContent = tarefa.titulo;
    details.appendChild(title);
    if (tarefa.descricao) {
        const description = document.createElement("p");
        description.textContent = tarefa.descricao;
        details.appendChild(description);
    }
    if (tarefa.dataEntrega) {
        const dueDate = document.createElement("small");
        dueDate.textContent = "Entrega: " + dataFormatada(tarefa.dataEntrega);
        details.appendChild(dueDate);
    }

    const actions = document.createElement("div");
    actions.className = "actions";
    const edit = document.createElement("button");
    edit.className = "action edit";
    edit.type = "button";
    edit.textContent = "Editar";
    edit.addEventListener("click", () => abrirEdicao(tarefa));
    const remove = document.createElement("button");
    remove.className = "action delete";
    remove.type = "button";
    remove.textContent = "Excluir";
    remove.addEventListener("click", () => excluirTarefa(tarefa));
    actions.append(edit, remove);
    item.append(check, details, actions);
    return item;
}

function render() {
    const lista = document.getElementById("lista-tarefas");
    lista.replaceChildren(...tarefasVisiveis().map(criarTarefaVisual));
    document.getElementById("vazio").hidden = tarefasVisiveis().length > 0;
    atualizarContadores();
}

async function carregar() {
    try {
        tarefas = await api("/api/tarefas");
        tarefas.sort((a, b) => Number(a.status === "CONCLUIDA") - Number(b.status === "CONCLUIDA"));
        render();
    } catch (erro) {
        alert("Não foi possível carregar as tarefas. Verifique se o servidor está rodando.");
    }
}

async function criarTarefa(evento) {
    evento.preventDefault();
    const titulo = document.getElementById("input-titulo");
    if (!titulo.value.trim()) return;
    try {
        await api("/api/tarefas", "POST", {
            titulo: titulo.value.trim(),
            descricao: document.getElementById("input-descricao").value.trim() || null,
            dataEntrega: document.getElementById("input-data").value || null,
            status: "A_FAZER"
        });
        evento.target.reset();
        await carregar();
    } catch (erro) {
        alert("Não foi possível criar a tarefa.");
    }
}

async function alterarStatus(tarefa) {
    try {
        await api("/api/tarefas/" + tarefa.id, "PUT", { ...tarefa, status: tarefa.status === "CONCLUIDA" ? "A_FAZER" : "CONCLUIDA" });
        await carregar();
    } catch (erro) {
        alert("Não foi possível atualizar a tarefa.");
    }
}

function abrirEdicao(tarefa) {
    tarefaEditada = tarefa;
    document.getElementById("editar-titulo").value = tarefa.titulo || "";
    document.getElementById("editar-descricao").value = tarefa.descricao || "";
    document.getElementById("editar-data").value = tarefa.dataEntrega || "";
    document.getElementById("dialog-editar").showModal();
}

async function salvarEdicao(evento) {
    evento.preventDefault();
    if (!tarefaEditada) return;
    try {
        await api("/api/tarefas/" + tarefaEditada.id, "PUT", {
            ...tarefaEditada,
            titulo: document.getElementById("editar-titulo").value.trim(),
            descricao: document.getElementById("editar-descricao").value.trim() || null,
            dataEntrega: document.getElementById("editar-data").value || null
        });
        document.getElementById("dialog-editar").close();
        tarefaEditada = null;
        await carregar();
    } catch (erro) {
        alert("Não foi possível salvar as alterações.");
    }
}

async function excluirTarefa(tarefa) {
    if (!confirm("Excluir a tarefa \"" + tarefa.titulo + "\"?")) return;
    try {
        await api("/api/tarefas/" + tarefa.id, "DELETE");
        await carregar();
    } catch (erro) {
        alert("Não foi possível excluir a tarefa.");
    }
}

document.getElementById("form-tarefa").addEventListener("submit", criarTarefa);
document.getElementById("form-editar").addEventListener("submit", salvarEdicao);
document.querySelectorAll(".filter").forEach((botao) => botao.addEventListener("click", () => {
    filtroAtual = botao.dataset.filtro;
    document.querySelectorAll(".filter").forEach((item) => item.classList.toggle("active", item === botao));
    render();
}));
document.getElementById("data-hoje").textContent =
    new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" }).toUpperCase();
carregar();
