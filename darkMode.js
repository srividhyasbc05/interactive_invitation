let darkModebtn= document.getElementById("darkMode");

darkModebtn.addEventListener("click", toggleDarkMode);

function toggleDarkMode (){
    document.body.classList.toggle("darkmode");
}