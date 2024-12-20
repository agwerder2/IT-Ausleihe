let historyData = JSON.parse(localStorage.getItem('history')) || [];

document.getElementById('loan-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const className = document.getElementById('class').value;
    const device = document.getElementById('device').value;
    const returnDate = document.getElementById('return-date').value;
    const returnStatus = "Noch in Ausleihe";
    const email = document.getElementById('email').value;
    const date = new Date().toLocaleDateString();

    const loan = {
        firstName,
        lastName,
        className,
        device,
        returnStatus,
        returnDate,
        email,
        date
    };

    historyData.push(loan);
    localStorage.setItem('history', JSON.stringify(historyData));

    clearForm();
    alert('Ausleihvorgang gespeichert!');
});

function showForm() {
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('history-container').style.display = 'none';
}

function showHistory() {
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('history-container').style.display = 'block';
    renderHistory();
}

function renderHistory() {
    const historyTable = document.getElementById('history-table').getElementsByTagName('tbody')[0];
    historyTable.innerHTML = '';

    historyData.forEach((loan, index) => {
        const row = historyTable.insertRow();
        row.insertCell(0).innerText = loan.firstName;
        row.insertCell(1).innerText = loan.lastName;
        row.insertCell(2).innerText = loan.className;
        row.insertCell(3).innerText = loan.device;

        const statusCell = row.insertCell(4);
        const statusDropdown = document.createElement('select');
        ['Noch in Ausleihe', 'Zurückgebracht'].forEach(status => {
            const option = document.createElement('option');
            option.value = status;
            option.text = status;
            option.selected = loan.returnStatus === status;
            statusDropdown.appendChild(option);
        });
        statusDropdown.addEventListener('change', () => {
            loan.returnStatus = statusDropdown.value;
            localStorage.setItem('history', JSON.stringify(historyData));
        });
        statusCell.appendChild(statusDropdown);

        row.insertCell(5).innerText = loan.email;
        row.insertCell(6).innerText = loan.date;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Löschen';
        deleteButton.onclick = () => deleteLoan(index);
        row.insertCell(7).appendChild(deleteButton);
    });
}

function deleteLoan(index) {
    historyData.splice(index, 1);
    localStorage.setItem('history', JSON.stringify(historyData));
    renderHistory();
}

function clearHistory() {
    localStorage.removeItem('history');
    historyData = [];
    renderHistory();
}

function clearForm() {
    document.getElementById('loan-form').reset();
}
