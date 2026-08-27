const registrationForm = document.getElementById("registrationForm");
const confirmationMessage = document.getElementById("confirmationMessage");
const participantList = document.getElementById("participantList");

let participants = JSON.parse(
    localStorage.getItem("medicalCampParticipants")
) || [];


registrationForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value;
    const phone = document.getElementById("phone").value.trim();
    const camp = document.getElementById("camp").value;


    // Required field validation
    if (!name || !age || !phone || !camp) {
        showMessage("Please complete all required fields.");
        return;
    }


    // Age validation
    if (age < 1 || age > 120) {
        showMessage("Please enter a valid age between 1 and 120.");
        return;
    }


    // Phone validation
    if (!/^[0-9]{10}$/.test(phone)) {
        showMessage("Please enter a valid 10-digit contact number.");
        return;
    }


    // Create participant
    const participant = {
        name: name,
        age: age,
        phone: phone,
        camp: camp
    };


    // Store participant
    participants.push(participant);

    localStorage.setItem(
        "medicalCampParticipants",
        JSON.stringify(participants)
    );


    // Success message
    showMessage(
        "Registration successful! Thank you, " + name + "."
    );


    registrationForm.reset();

    displayParticipants();
});


// Display message
function showMessage(message) {

    confirmationMessage.style.display = "block";
    confirmationMessage.textContent = message;
}


// Display participants
function displayParticipants() {

    if (participants.length === 0) {

        participantList.innerHTML =
            "<p>No participants registered yet.</p>";

        return;
    }


    participantList.innerHTML = "";


    participants.forEach(function (participant, index) {

        const card = document.createElement("div");

        card.className = "participant-card";


        card.innerHTML = `
            <h3>Participant ${index + 1}</h3>

            <p>
                <strong>Name:</strong>
                ${participant.name}
            </p>

            <p>
                <strong>Age:</strong>
                ${participant.age}
            </p>

            <p>
                <strong>Contact:</strong>
                ${participant.phone}
            </p>

            <p>
                <strong>Camp:</strong>
                ${participant.camp}
            </p>

            <button onclick="deleteParticipant(${index})">
                Delete
            </button>
        `;


        participantList.appendChild(card);
    });
}


// Delete participant
function deleteParticipant(index) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this participant?"
    );


    if (!confirmDelete) {
        return;
    }


    participants.splice(index, 1);


    localStorage.setItem(
        "medicalCampParticipants",
        JSON.stringify(participants)
    );


    displayParticipants();

    showMessage("Participant deleted successfully.");
}


// Load saved participants
displayParticipants();