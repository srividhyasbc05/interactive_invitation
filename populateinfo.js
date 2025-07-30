let performances = document.getElementById("performances")
let pieceContainer = document.getElementById("content")
let eventName= document.getElementById('event')
document.addEventListener("DOMContentLoaded", () => {
fetch("info.json")
  .then(response => response.json())
  .then(data => {
    
        eventName.innerHTML=`<h1>${data.event.name}</h1>`
        data.event.locations.forEach(location => {
            let venue= document.createElement('div')
            venue.className="performance"
            venue.innerHTML=`<div class="address">
                    <h3> ${location.venue}</h3>
                    <p>${location.address}</p>
                </div>
                <div class="dateTime">
                    <h4>
                        ${location.date}
                    </h4>
                    <h4> @${location.time}</h4>
                </div>`
            
            performances.appendChild(venue)

            let performance= document.createElement('div')
            performance.className='pieceWeapper'
            performance.innerHTML=`<div class="pieceCard">
                <div class="pieceIMG">
                    <img src="${location.cover}">
                </div>
                <div class="info">
                    <h3>${location.name}</h3>
                    <ul>
                        <li>
                            ${location.venue}
                        </li>
                         <li>
                            ${location.date}
                        </li>
                         <li>
                            @${location.time}
                        </li>
                    </ul>
                </div>`
                performance.addEventListener("click", () => showPieces(location.pieces));
                pieceContainer.appendChild(performance)
        });
});
  });

function showPieces(performance) {
    let overlay = document.querySelector(".overlay");
    overlay.classList.remove('overlayHidden');

    const piecesContainer = document.getElementById("pieces");

    performance.forEach(piece => {
        let card = document.createElement('div');
        card.className = 'pieceWrapper';

        card.innerHTML = `
            <div class="overlayCard overlayHidden">
                <p class="palanquin-dark-regular">${piece.desc}</p>
                <span class="closeOverlay">&times;</span>
            </div>
            <div class="pieceCard">
                <div class="pieceIMG">
                    <img src="${piece.image}">
                </div>
                <div class="info">
                    <h3>${piece.number}. ${piece.title}</h3>
                    <ul>
                        <li>Ragam: ${piece.ragam}</li>
                        <li>Talam: ${piece.talam}</li>
                        <li>Composer: ${piece.composer}</li>
                        <li>Choreographer: ${piece.choreographer}</li>
                    </ul>
                </div>
            </div>
        `;

        piecesContainer.appendChild(card);

        // Only select *within* this card
        const desc = card.querySelector(".overlayCard");
        const closeDesc = card.querySelector(".closeOverlay");

        // When card is clicked, show its description
        card.querySelector(".pieceCard").addEventListener("click", () => {
            desc.classList.remove("overlayHidden");
        });

        // When close (×) inside overlayCard is clicked, hide it
        closeDesc.addEventListener("click", (e) => {
            e.stopPropagation(); // prevents card click from reopening it
            desc.classList.add("overlayHidden");
        });
    });

    // Global close button for entire overlay (outside for-loop)
    const overlayClose = document.querySelector(".performancecloseOverlay");
    overlayClose.addEventListener("click", () => {
        overlay.classList.add("overlayHidden");
    });
}