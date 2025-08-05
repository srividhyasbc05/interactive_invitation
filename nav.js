const navSlide = () =>{
    const burger= document.querySelector('.burger')
    const nav=document.getElementById('navbar')
    const navLinks= document.querySelectorAll( '#navbar li')
    burger.addEventListener('click', ()=>{
         nav.classList.toggle('nav-active')
            navLinks.forEach(link =>{
                link.style.animation= `navLinkFade 0.5s ease forwards 0.25s`
        })
        burger.classList.toggle('toggle')
    }) 
    
}
navSlide();