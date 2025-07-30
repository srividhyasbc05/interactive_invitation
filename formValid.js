let submitBtn= document.getElementById("rsvp")

/*submitBtn.addEventListener("click", addParticipant)
function addParticipant(event){
    let name = document.getElementById("rsvpname").value;
    let guests = document.getElementById("rsvpguests").value;
    let email = document.getElementById("rsvpemail").value;

    let payload = {
        name,
        guests,
        email
    };

    fetch('https://script.google.com/macros/s/AKfycbyVvYSQyE8yFkp9LenCsCnkCnIT78UrTS-A8QstFCVtGBhzs5T-McWkPP6dg8gruMBN/exec', {
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
} */
document.getElementById("RSVP").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission


    // Perform an AJAX request to submit the form
    var xhr = new XMLHttpRequest();
    xhr.open("POST", this.action);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // Successful response
          var response = xhr.responseText;
          console.log(response)
          document.getElementById("myForm").reset(); //Clear the form fields
        } else {
          // Error response
          console.log(response)
        }
      }
    };
    xhr.send(new FormData(this));
  });
