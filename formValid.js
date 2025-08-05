let submitBtn= document.getElementById("rsvp")

document.getElementById("RSVP").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    const form = document.getElementById("RSVP");
    const Guest={
    name: document.getElementById('rsvpname').value, 
    numGuests:document.getElementById('rsvpguests').value , 
    email: document.getElementById('rsvpemail').value
    }
    // Perform an AJAX request to submit the form
    var xhr = new XMLHttpRequest();
    xhr.open("POST", form.action);
    let name = document.getElementById("rsvpname").value;
    let guests = document.getElementById("rsvpguests").value;
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
          validateForm();
          form.reset(); // Clear the form fields
        } else {
          console.error("Error submitting form:", xhr.statusText);
        }
      }
    };
    xhr.send(new FormData(form));
    
    
});
const addParticipant=(person)=>{
  document.getElementById("attending").innerHTML = `
            <p class="info palanquin-regular">${person.name} has RSVPed ${person.numGuests} guests!</p>
        `;
}

const toggleModal = (person) => {

    let modal = document.getElementById('success-modal');
    let text=document.getElementById('modal-text') 
    modal.style.display = "flex";
    text.innerHTML=`<p class="palanquin-dark-regular"> ${person.name}, Thank you so much for RSVP-ing! I look forward to seeing you at the event!  </p>`
    setTimeout(() => {
    modal.style.display = "none";
}, 5000);

}
const validateForm =()=> {

  let containsErrors = false;

  var rsvpInputs = document.getElementById("RSVP").elements;
  Array.from(rsvpInputs).forEach((input) => {
    if (input.length<2){
      containsErrors=true
      input.classList.add("error")
    }else{
      input.classList.remove("error")
    }
  })
  if(rsvpInputs[1].value.includes('@')){
    containsErrors = false;
    rsvpInputs[1].classList.add("error")
  }else{
      rsvpInputs[1].classList.remove("error")
    }
  if(rsvpInputs[1].includes('.com')){
    containsErrors = false;
    rsvpInputs[1].classList.add("error")
  }else{
      rsvpInputs[1].classList.remove("error")
    }
  if(containsErrors==false){
          addParticipant(Guest)
          toggleModal(Guest)
    }
}
document.getElementById("guestbook").addEventListener("submit", function(event) {
    event.preventDefault();

    const form = document.getElementById("guestbook")

    var xhr = new XMLHttpRequest();
    xhr.open("POST", form.action);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
                form.reset();
                // Optionally update the UI with a thank-you message
                alert(`Your note has been submitted. Thank you!`);
            } else {
                console.error("Error submitting guestbook:", xhr.statusText);
                alert(`There was an error in your submission!`);
            }
        }
    };

    xhr.send(new FormData(form));
})