document.addEventListener("DOMContentLoaded", loadEntries);

document.getElementById("anesthesiaForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let entries = JSON.parse(localStorage.getItem("anesthesiaLog")) || [];

    let entry = {
        caseId: document.getElementById("caseId").value,
        ageSex: document.getElementById("ageSex").value,
        procedureType: document.getElementById("procedureType").value,
        asaClass: document.getElementById("asaClass").value,
        anesthesiaType: document.getElementById("anesthesiaType").value,
        airwayManagement: document.getElementById("airwayManagement").value,
        intraopDetails: document.getElementById("intraopDetails").value,
        postOpNotes: document.getElementById("postOpNotes").value
    };

    let editIndex = document.getElementById("editIndex").value;
    if (editIndex !== "") {
        entries[editIndex] = entry; 
        document.getElementById("editIndex").value = ""; 
    } else {
        entries.push(entry);
    }

    localStorage.setItem("anesthesiaLog", JSON.stringify(entries));
    document.getElementById("anesthesiaForm").reset();
    loadEntries();
});

function loadEntries() {
    let table = document.getElementById("logTable");
    table.innerHTML = `<tr>
        <th>Case ID</th>
        <th>Age/Sex</th>
        <th>Procedure</th>
        <th>ASA Class</th>
        <th>Anesthesia Type</th>
        <th>Actions</th>
    </tr>`;

    let entries = JSON.parse(localStorage.getItem("anesthesiaLog")) || [];

    entries.forEach((entry, index) => {
        let row = table.insertRow();
        row.insertCell(0).textContent = entry.caseId;
        row.insertCell(1).textContent = entry.ageSex;
        row.insertCell(2).textContent = entry.procedureType;
        row.insertCell(3).textContent = entry.asaClass;
        row.insertCell(4).textContent = entry.anesthesiaType;

        let actionsCell = row.insertCell(5);
        
        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = function () {
            editEntry(index);
        };

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function () {
            deleteEntry(index);
        };

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
    });
}

function deleteEntry(index) {
    let entries = JSON.parse(localStorage.getItem("anesthesiaLog")) || [];
    entries.splice(index, 1);
    localStorage.setItem("anesthesiaLog", JSON.stringify(entries));
    loadEntries();
}

function editEntry(index) {
    let entries = JSON.parse(localStorage.getItem("anesthesiaLog")) || [];
    let entry = entries[index];

    document.getElementById("caseId").value = entry.caseId;
    document.getElementById("ageSex").value = entry.ageSex;
    document.getElementById("procedureType").value = entry.procedureType;
    document.getElementById("asaClass").value = entry.asaClass;
    document.getElementById("anesthesiaType").value = entry.anesthesiaType;
    document.getElementById("airwayManagement").value = entry.airwayManagement;
    document.getElementById("intraopDetails").value = entry.intraopDetails;
    document.getElementById("postOpNotes").value = entry.postOpNotes;
    document.getElementById("editIndex").value = index;
}

function printLog() {
    let printWindow = window.open("", "", "width=800,height=600");
    let entries = JSON.parse(localStorage.getItem("anesthesiaLog")) || [];

    let printContent = `<html>
    <head>
        <title>Anesthesia Case Log</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid black; padding: 10px; text-align: left; }
            th { background-color: lightgray; }
        </style>
    </head>
    <body>
        <h2>Anesthesia Case Log</h2>
        <table>
            <tr>
                <th>Case ID</th>
                <th>Age/Sex</th>
                <th>Procedure</th>
                <th>ASA Class</th>
                <th>Anesthesia Type</th>
            </tr>`;

    entries.forEach(entry => {
        printContent += `
            <tr>
                <td>${entry.caseId}</td>
                <td>${entry.ageSex}</td>
                <td>${entry.procedureType}</td>
                <td>${entry.asaClass}</td>
                <td>${entry.anesthesiaType}</td>
            </tr>`;
    });

    printContent += `</table></body></html>`;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
}
