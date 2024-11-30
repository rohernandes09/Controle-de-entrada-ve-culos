function validarPlaca(placa) {
    const regexAntigo = /^[A-Z]{3}-\d{4}$/;
    const regexNovo = /^[A-Z]{3}\d[A-Z]\d{2}$/;
    return regexAntigo.test(placa) || regexNovo.test(placa);
}

function registrarEntrada() {
    const placa = document.getElementById('placaEntrada').value.toUpperCase();
    const horaEntrada = document.getElementById('horaEntrada').value;
    const motorista = document.getElementById('motoristaEntrada').value;
    const empresa = document.getElementById('empresaEntrada').value;

    if (!validarPlaca(placa)) {
        alert('Placa inválida! Por favor, insira uma placa no formato correto.');
        return;
    }

    if (!horaEntrada || !motorista || !empresa) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const tabela = document.getElementById('tabelaEntradas');
    const novaLinha = tabela.insertRow();

    const celulaPlaca = novaLinha.insertCell(0);
    const celulaHoraEntrada = novaLinha.insertCell(1);
    const celulaMotorista = novaLinha.insertCell(2);
    const celulaEmpresa = novaLinha.insertCell(3);

    celulaPlaca.textContent = placa;
    celulaHoraEntrada.textContent = horaEntrada;
    celulaMotorista.textContent = motorista;
    celulaEmpresa.textContent = empresa;

    const entradas = JSON.parse(localStorage.getItem('entradas')) || [];
    entradas.push({ placa, hora: horaEntrada, motorista, empresa });
    localStorage.setItem('entradas', JSON.stringify(entradas));

    document.getElementById('registroEntradaForm').reset();
}

function registrarSaida() {
    const placa = document.getElementById('placaSaida').value.toUpperCase();
    const horaSaida = document.getElementById('horaSaida').value;
    const motorista = document.getElementById('motoristaSaida').value;
    const empresa = document.getElementById('empresaSaida').value;

    if (!validarPlaca(placa)) {
        alert('Placa inválida! Por favor, insira uma placa no formato correto.');
        return;
    }

    if (!horaSaida || !motorista || !empresa) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const tabela = document.getElementById('tabelaSaidas');
    const novaLinha = tabela.insertRow();

    const celulaPlaca = novaLinha.insertCell(0);
    const celulaHoraSaida = novaLinha.insertCell(1);
    const celulaMotorista = novaLinha.insertCell(2);
    const celulaEmpresa = novaLinha.insertCell(3);

    celulaPlaca.textContent = placa;
    celulaHoraSaida.textContent = horaSaida;
    celulaMotorista.textContent = motorista;
    celulaEmpresa.textContent = empresa;

    const saidas = JSON.parse(localStorage.getItem('saidas')) || [];
    saidas.push({ placa, hora: horaSaida, motorista, empresa });
    localStorage.setItem('saidas', JSON.stringify(saidas));

    document.getElementById('registroSaidaForm').reset();
}

function carregarDados() {
    const tabelaConsolidada = document.getElementById('tabelaConsolidada');

    const entradas = JSON.parse(localStorage.getItem('entradas')) || [];
    const saidas = JSON.parse(localStorage.getItem('saidas')) || [];

    entradas.forEach(entrada => {
        const novaLinha = tabelaConsolidada.insertRow();
        novaLinha.insertCell(0).textContent = 'Entrada';
        novaLinha.insertCell(1).textContent = entrada.placa;
        novaLinha.insertCell(2).textContent = entrada.hora;
        novaLinha.insertCell(3).textContent = entrada.motorista;
        novaLinha.insertCell(4).textContent = entrada.empresa;
    });

    saidas.forEach(saida => {
        const novaLinha = tabelaConsolidada.insertRow();
        novaLinha.insertCell(0).textContent = 'Saída';
        novaLinha.insertCell(1).textContent = saida.placa;
        novaLinha.insertCell(2).textContent = saida.hora;
        novaLinha.insertCell(3).textContent = saida.motorista;
        novaLinha.insertCell(4).textContent = saida.empresa;
    });
}

function baixarPlanilha() {
    const wb = XLSX.utils.book_new();
    const ws_data = [["Tipo", "Placa do Carro", "Hora", "Motorista", "Empresa"]];

    const entradas = JSON.parse(localStorage.getItem('entradas')) || [];
    const saidas = JSON.parse(localStorage.getItem('saidas')) || [];

    entradas.forEach(entrada => {
        ws_data.push(["Entrada", entrada.placa, entrada.hora, entrada.motorista, entrada.empresa]);
    });

    saidas.forEach(saida => {
        ws_data.push(["Saída", saida.placa, saida.hora, saida.motorista, saida.empresa]);
    });

    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, "Diário de Veículos");

    XLSX.writeFile(wb, "diario_de_veiculos.xlsx");
}

window.onload = function() {
    carregarDados();
};