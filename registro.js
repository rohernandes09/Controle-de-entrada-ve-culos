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

    document.getElementById('registroSaidaForm').reset();
}

function baixarPlanilha() {
    const wb = XLSX.utils.book_new();
    const ws_data = [["Tipo", "Placa do Carro", "Hora", "Motorista", "Empresa"]];

    const entradas = document.querySelectorAll("#tabelaEntradas tr");
    entradas.forEach(row => {
        const cols = row.querySelectorAll("td");
        if (cols.length > 0) {
            ws_data.push(["Entrada", cols[0].textContent, cols[1].textContent, cols[2].textContent, cols[3].textContent]);
        }
    });

    const saidas = document.querySelectorAll("#tabelaSaidas tr");
    saidas.forEach(row => {
        const cols = row.querySelectorAll("td");
        if (cols.length > 0) {
            ws_data.push(["Saída", cols[0].textContent, cols[1].textContent, cols[2].textContent, cols[3].textContent]);
        }
    });

    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, "Diário de Veículos");

    XLSX.writeFile(wb, "diario_de_veiculos.xlsx");
}