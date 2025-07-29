let submitBtn= document.getElementById("rsvp")

submitBtn.addEventListener("click", addParticipant)
function addParticipant(event){
    let name = document.getElementById("rsvpname").value;
    let guests = document.getElementById("rsvpguests").value;
    let email = document.getElementById("rsvpemail").value;

    let payload = {
        name,
        guests,
        email
    };

    fetch('https://corsproxy.io/?https://script.google.com/macros/s/AKfycbzQZu5lu3d448mccljpJSuJ05_CVs7GB0QSRA9fHCE/dev', {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
        "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(() => {
        document.getElementById("attending").innerHTML = `
            <p class="info palanquin-regular">${name} has RSVPed ${guests} guests!</p>
        `;
        })
}