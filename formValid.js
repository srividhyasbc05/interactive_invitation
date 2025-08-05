document.getElementById("RSVP").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    const form = document.getElementById("RSVP");
    const Guest = {
        name: document.getElementById('rsvpname').value, 
        numGuests: document.getElementById('rsvpguests').value, 
        email: document.getElementById('rsvpemail').value
    };

    if (!validateForm(Guest)) return;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", form.action);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
                addParticipant(Guest);
                toggleModal(Guest);
                form.reset();
            } else {
                console.error("Error submitting form:", xhr.statusText);
            }
        }
    };

    xhr.send(new FormData(form));
});

const addParticipant = (person) => {
    document.getElementById("attending").innerHTML = `
        <p class="info palanquin-regular">${person.name} has RSVPed ${person.numGuests} guests!</p>
    `;
};

const toggleModal = (person) => {
    let modal = document.getElementById('success-modal');
    let text = document.querySelector('#modal-text p');
    modal.style.display = "flex";
    text.innerText = `${person.name}, Thank you so much for RSVP-ing! I look forward to seeing you at the event!`;

    setTimeout(() => {
        modal.style.display = "none";
    }, 5000);
};

const validateForm = (Guest) => {
    let containsErrors = false;

    const rsvpInputs = document.getElementById("RSVP").elements;
    Array.from(rsvpInputs).forEach((input) => {
    const id = input.id;

    if (id === "rsvpname" && input.value.trim().length < 3) {
        containsErrors = true;
        input.classList.add("error");
    } else if (id === "rsvpemail" && (!input.value.includes('@') || !input.value.includes('.'))) {
        containsErrors = true;
        input.classList.add("error");
    } else if (id === "rsvpguests" && (isNaN(input.value) || parseInt(input.value) < 1)) {
        containsErrors = true;
        input.classList.add("error");
    } else {
        input.classList.remove("error");
    }   
    });

    return !containsErrors;
};

document.getElementById("guestbook").addEventListener("submit", function(event) {
    event.preventDefault();

    const form = document.getElementById("guestbook");

    const xhr = new XMLHttpRequest();
    xhr.open("POST", form.action);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
                form.reset();
                alert(`Your note has been submitted. Thank you!`);
            } else {
                console.error("Error submitting guestbook:", xhr.statusText);
                alert(`There was an error in your submission!`);
            }
        }
    };

    xhr.send(new FormData(form));
});
