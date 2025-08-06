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
                toggleModal(Guest, `${Guest.name}, Thank you so much for RSVP-ing! I look forward to seeing you at the event!`);
                updateGuestCount();
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

const toggleModal = (person, msg) => {
    let modal = document.getElementById('success-modal');
    let text = document.querySelector('#modal-text p');
    modal.style.display = "flex";
    text.innerText = msg;

    const img = document.getElementById("modal-img");
      img.classList.remove("show");
      void img.offsetWidth; 
      img.classList.add("show");

    setTimeout(() => {
        modal.style.display = "none";
    }, 5000);
};


const validateForm = (Guest) => {
    let containsErrors = false;

    const rsvpInputs = document.getElementById("RSVP").elements;
    Array.from(rsvpInputs).forEach((input) => {
    const id = input.id;

    if (id === "rsvpname" && input.value.trim().length < 2) {
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

const updateGuestCount = () => {
    fetch('https://script.google.com/macros/s/AKfycbyVvYSQyE8yFkp9LenCsCnkCnIT78UrTS-A8QstFCVtGBhzs5T-McWkPP6dg8gruMBN/exec')
        .then(res => res.json())
        .then(data => {
            const totalGuests = data.totalGuests || 0;
            const counter = document.getElementById("guest-count");
            counter.innerText = `Total guests attending: ${totalGuests}`;
        })
        .catch(err => console.error("Failed to fetch guest count:", err));
};

document.getElementById("guestbook").addEventListener("submit", function(event) {
    event.preventDefault();
    const Guest = {
        name: document.getElementById('guestname').value, 
        email: document.getElementById('guestemail').value,
        msg: document.getElementById('guestmsg').value,
    };
    if (!validateGuestbookForm(Guest)) return;
    const form = document.getElementById("guestbook");

    const xhr = new XMLHttpRequest();
    xhr.open("POST", form.action);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
                toggleModal(Guest, `${Guest.name}, thank you so much for coming and supporting me on my artistic journey!`)
                form.reset();
            } else {
                console.error("Error submitting guestbook:", xhr.statusText);
                alert(`There was an error in your submission!`);
            }
        }
    };

    xhr.send(new FormData(form));
});
updateGuestCount();
const validateGuestbookForm = (Guest) => {
    let containsErrors = false;

    const guestInputs = document.getElementById("guestbook").elements;
    Array.from(guestInputs).forEach((input) => {
    const id = input.id;

    if (id === "guestname" && input.value.trim().length < 2) {
        containsErrors = true;
        input.classList.add("error");
    } else if (id === "guestemail" && (!input.value.includes('@') || !input.value.includes('.'))) {
        containsErrors = true;
        input.classList.add("error");
    } else if (id === "guestmsg" && input.value.trim().length < 3) {
        containsErrors = true;
        input.classList.add("error");
    } else {
        input.classList.remove("error");
    }   
    });

    return !containsErrors;
};