function validarCPF(cpf) {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regex.test(cpf);
}

document.getElementById('entradaSaidaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const dataHora = document.getElementById('dataHora').value;
    const tipo = document.getElementById('tipo').value;

    if (!validarCPF(cpf)) {
        alert('CPF inválido. O formato deve ser xxx.xxx.xxx-xx.');
        return;
    }

    const registro = { nome, cpf, dataHora, tipo };
    let registros = JSON.parse(localStorage.getItem('registros')) || [];
    registros.push(registro);
    localStorage.setItem('registros', JSON.stringify(registros));
    alert(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} registrada com sucesso!`);
    this.reset();
    carregarAcessos(); // Atualiza a tabela após registrar a entrada/saída
});

function carregarAcessos() {
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    const tabela = document.querySelector('#tabelaAcessos tbody');
    tabela.innerHTML = '';
    registros.forEach(registro => {
        const row = tabela.insertRow();
        row.insertCell(0).textContent = registro.nome;
        row.insertCell(1).textContent = registro.cpf;
        row.insertCell(2).textContent = registro.tipo.charAt(0).toUpperCase() + registro.tipo.slice(1);
        row.insertCell(3).textContent = new Date(registro.dataHora).toLocaleString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    });
}

document.getElementById('exportarExcel').addEventListener('click', function() {
    const tabela = document.getElementById('tabelaAcessos');
    const wb = XLSX.utils.table_to_book(tabela, { sheet: "Acessos" });
    XLSX.writeFile(wb, 'controle_acessos.xlsx');
});

window.onload = carregarAcessos;