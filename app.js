const baseURL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';

async function getOneCard() {
    try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
        const data = await response.json();
        const card = data.cards[0]; 
        console.log(`${card.value} of ${card.suit}`); 
    } catch (error) {
        console.error('Error:', error);
    }
}

getOneCard();

async function getTwoCards() {
    try {
        let response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        let data = await response.json();
        const deckId = data.deck_id;

        response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        data = await response.json();
        const firstCard = data.cards[0]; 

        response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        data = await response.json();
        const secondCard = data.cards[0]; 

        console.log(`${firstCard.value} of ${firstCard.suit}`, `${secondCard.value} of ${secondCard.suit}`);
    } catch (error) {
        console.error('Error:', error);
    }
}

getTwoCards();



(async function main() {
    let deckId = null;

    async function initializeDeck() {
        try {
            const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
            const data = await response.json();
            deckId = data.deck_id;
        } catch (error) {
            console.error('Error', error);
        }
    }

    async function drawCard() {
        if (deckId) {
            try {
                const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
                const data = await response.json();
                if (data.cards.length > 0) {
                    const card = data.cards[0];
                    document.getElementById('cardDisplay').innerHTML = `
                        <div class="card" style="width: 18rem; margin: 0 auto;">
                            <img src="${card.image}" class="card-img-top" alt="${card.value} of ${card.suit}">
                            <div class="card-body">
                                <h5 class="card-title">${card.value} of ${card.suit}</h5>
                            </div>
                        </div>
                    `;
                } else {
                    alert('There are no more cards in the deck.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    await initializeDeck();
    document.getElementById('drawCard').addEventListener('click', drawCard);
})();
