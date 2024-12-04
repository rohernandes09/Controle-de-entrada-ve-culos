function validarCPF(cpf) {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regex.test(cpf);
}

document.getElementById('entradaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nomeEntrada').value;
    const cpf = document.getElementById('cpfEntrada').value;
    const dataHoraEntrada = document.getElementById('dataHoraEntrada').value;

    if (!validarCPF(cpf)) {
        alert('CPF inválido. O formato deve ser xxx.xxx.xxx-xx.');
        return;
    }

    const entrada = { nome, cpf, dataHoraEntrada };
    let entradas = JSON.parse(localStorage.getItem('entradas')) || [];
    entradas.push(entrada);
    localStorage.setItem('entradas', JSON.stringify(entradas));
    alert('Entrada registrada com sucesso!');
    this.reset();
    carregarAcessos(); // Atualiza a tabela após registrar a entrada
});

document.getElementById('saidaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nomeSaida').value;
    const cpf = document.getElementById('cpfSaida').value;
    const dataHoraSaida = document.getElementById('dataHoraSaida').value;

    if (!validarCPF(cpf)) {
        alert('CPF inválido. O formato deve ser xxx.xxx.xxx-xx.');
        return;
    }

    const saida = { nome, cpf, dataHoraSaida };
    let saidas = JSON.parse(localStorage.getItem('saidas')) || [];
    saidas.push(saida);
    localStorage.setItem('saidas', JSON.stringify(saidas));
    alert('Saída registrada com sucesso!');
    this.reset();
    carregarAcessos(); // Atualiza a tabela após registrar a saída
});

function carregarAcessos() {
    const entradas = JSON.parse(localStorage.getItem('entradas')) || [];
    const saidas = JSON.parse(localStorage.getItem('saidas')) || [];
    const tabela = document.querySelector('#tabelaAcessos tbody');
    tabela.innerHTML = '';
    entradas.forEach(entrada => {
        const saida = saidas.find(s => s.cpf === entrada.cpf);
        const row = tabela.insertRow();
        row.insertCell(0).textContent = entrada.nome;
        row.insertCell(1).textContent = entrada.cpf;
        row.insertCell(2).textContent = entrada.dataHoraEntrada;
        row.insertCell(3).textContent = saida ? saida.dataHoraSaida : 'Ainda no local';
    });
}

document.getElementById('exportarExcel').addEventListener('click', function() {
    const tabela = document.getElementById('tabelaAcessos');
    const wb = XLSX.utils.table_to_book(tabela, { sheet: "Acessos" });
    XLSX.writeFile(wb, 'controle_acessos.xlsx');
});

window.onload = carregarAcessos;