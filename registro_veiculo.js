document.getElementById('vehicleForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const plate = document.getElementById('plate').value;
    const driver = document.getElementById('driver').value;
    const datetime = document.getElementById('datetime').value;
    const type = document.getElementById('type').value;
    const company = document.getElementById('company').value;

    const platePattern = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/i;

    if (!platePattern.test(plate)) {
        alert('Placa do veículo inválida. Formatos válidos.');
        return;
    }

    if (!driver || !datetime || !type || !company) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const table = document.getElementById('recordsTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.insertCell(0).textContent = plate;
    newRow.insertCell(1).textContent = driver;
    newRow.insertCell(2).textContent = datetime;
    newRow.insertCell(3).textContent = type;
    newRow.insertCell(4).textContent = company;

    document.getElementById('vehicleForm').reset();

    console.log('Registro adicionado, atualizando Excel...');
    updateExcel();
});

document.getElementById('downloadExcel').addEventListener('click', function() {
    console.log('Botão de download clicado, atualizando Excel...');
    updateExcel(true);
});

function updateExcel(download = false) {
    console.log('Atualizando Excel...');
    const table = document.getElementById('recordsTable');
    const workbook = XLSX.utils.table_to_book(table, {sheet: "Registros"});
    if (download) {
        console.log('Baixando arquivo Excel...');
        XLSX.writeFile(workbook, 'registros_veiculos.xlsx');
    }
}