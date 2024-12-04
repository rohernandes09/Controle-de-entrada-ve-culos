function validarPlaca(placa) {
    const regexAntigo = /^[A-Z]{3}-\d{4}$/;
    const regexNovo = /^[A-Z]{3}\d[A-Z]\d{2}$/;
    return regexAntigo.test(placa) || regexNovo.test(placa);
}

function registrarEntrada() {
    const placa = document.getElementById('placaEntrada').value.toUpperCase();
    const dataEntrada = document.getElementById('dataEntrada').value;
    const horaEntrada = document.getElementById('horaEntrada').value;
    const motorista = document.getElementById('motoristaEntrada').value;
    const empresa = document.getElementById('empresaEntrada').value;

    if (!validarPlaca(placa)) {
        alert('Placa inválida! Por favor, insira uma placa no formato correto.');
        return;
    }

    if (!dataEntrada || !horaEntrada || !motorista || !empresa) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const tabela = document.getElementById('tabelaEntradas');
    const novaLinha = tabela.insertRow();

    const celulaPlaca = novaLinha.insertCell(0);
    const celulaDataEntrada = novaLinha.insertCell(1);
    const celulaHoraEntrada = novaLinha.insertCell(2);
    const celulaMotorista = novaLinha.insertCell(3);
    const celulaEmpresa = novaLinha.insertCell(4);

    celulaPlaca.textContent = placa;
    celulaDataEntrada.textContent = dataEntrada;
    celulaHoraEntrada.textContent = horaEntrada;
    celulaMotorista.textContent = motorista;
    celulaEmpresa.textContent = empresa;

    const entradas = JSON.parse(localStorage.getItem('entradas')) || [];
    entradas.push({ placa, data: dataEntrada, hora: horaEntrada, motorista, empresa });
    localStorage.setItem('entradas', JSON.stringify(entradas));

    document.getElementById('registroEntradaForm').reset();
    carregarDados(); // Atualiza a tabela consolidada
}

function registrarSaida() {
    const placa = document.getElementById('placaSaida').value.toUpperCase();
    const dataSaida = document.getElementById('dataSaida').value;
    const horaSaida = document.getElementById('horaSaida').value;
    const motorista = document.getElementById('motoristaSaida').value;
    const empresa = document.getElementById('empresaSaida').value;

    if (!validarPlaca(placa)) {
        alert('Placa inválida! Por favor, insira uma placa no formato correto.');
        return;
    }

    if (!dataSaida || !horaSaida || !motorista || !empresa) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const tabela = document.getElementById('tabelaSaidas');
    const novaLinha = tabela.insertRow();

    const celulaPlaca = novaLinha.insertCell(0);
    const celulaDataSaida = novaLinha.insertCell(1);
    const celulaHoraSaida = novaLinha.insertCell(2);
    const celulaMotorista = novaLinha.insertCell(3);
    const celulaEmpresa = novaLinha.insertCell(4);

    celulaPlaca.textContent = placa;
    celulaDataSaida.textContent = dataSaida;
    celulaHoraSaida.textContent = horaSaida;
    celulaMotorista.textContent = motorista;
    celulaEmpresa.textContent = empresa;

    const saidas = JSON.parse(localStorage.getItem('saidas')) || [];
    saidas.push({ placa, data: dataSaida, hora: horaSaida, motorista, empresa });
    localStorage.setItem('saidas', JSON.stringify(saidas));

    document.getElementById('registroSaidaForm').reset();
    carregarDados(); // Atualiza a tabela consolidada
}

function carregarDados() {
    const tabelaConsolidada = document.getElementById('tabelaConsolidada');
    tabelaConsolidada.innerHTML = ''; // Limpa a tabela antes de recarregar os dados

    const entradas = JSON.parse(localStorage.getItem('entradas')) || [];
    const saidas = JSON.parse(localStorage.getItem('saidas')) || [];

    entradas.forEach(entrada => {
        const novaLinha = tabelaConsolidada.insertRow();
        novaLinha.insertCell(0).textContent = 'Entrada';
        novaLinha.insertCell(1).textContent = entrada.placa;
        novaLinha.insertCell(2).textContent = entrada.data;
        novaLinha.insertCell(3).textContent = entrada.hora;
        novaLinha.insertCell(4).textContent = entrada.motorista;
        novaLinha.insertCell(5).textContent = entrada.empresa;
    });

    saidas.forEach(saida => {
        const novaLinha = tabelaConsolidada.insertRow();
        novaLinha.insertCell(0).textContent = 'Saída';
        novaLinha.insertCell(1).textContent = saida.placa;
        novaLinha.insertCell(2).textContent = saida.data;
        novaLinha.insertCell(3).textContent = saida.hora;
        novaLinha.insertCell(4).textContent = saida.motorista;
        novaLinha.insertCell(5).textContent = saida.empresa;
    });
}

function baixarPlanilha() {
    const wb = XLSX.utils.book_new();
    const ws_data = [["Tipo", "Placa do Carro", "Data", "Hora", "Motorista", "Empresa"]];

    const entradas = JSON.parse(localStorage.getItem('entradas')) || [];
    const saidas = JSON.parse(localStorage.getItem('saidas')) || [];

    entradas.forEach(entrada => {
        ws_data.push(["Entrada", entrada.placa, entrada.data, entrada.hora, entrada.motorista, entrada.empresa]);
    });

    saidas.forEach(saida => {
        ws_data.push(["Saída", saida.placa, saida.data, saida.hora, saida.motorista, saida.empresa]);
    });

    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, "Diário de Veículos");

    XLSX.writeFile(wb, "diario_de_veiculos.xlsx");
}

window.onload = function() {
    carregarDados();
};