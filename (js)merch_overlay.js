const merchDivs = document.querySelectorAll('.merchItem');

function merchItemHandler() {
    merchDivs.forEach(div => {
        let hasOverlay = false;

        div.addEventListener('click', () => {
            if (hasOverlay) return;

            const overlay = document.createElement('div');
            overlay.classList.add('merchItemOverlay');
            const modularDiv = document.createElement('div');
            modularDiv.classList.add('modularDiv');
            const closeButton = document.createElement('button');
            closeButton.classList.add('formButton');
            closeButton.innerText = 'Close';
            

            closeButton.addEventListener('click', () => {
                document.body.removeChild(overlay);
                hasOverlay = false;
            });

            modularDiv.appendChild(closeButton);
            document.body.appendChild(overlay);
            overlay.appendChild(modularDiv);
            hasOverlay = true;
        });
    });
}

merchItemHandler();