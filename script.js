container = document.getElementById("card_content");
front = 'card_front';
back = 'card_back';

techs =
    ["bootstrap",
        "css",
        "electron",
        "firebase",
        "html",
        "javascript",
        "jquery",
        "mongo",
        "node",
        "react"
    ]
//lista verificadora de pares
pair = [];
//lista verificadora de elementos
elements = [];
//contador de pares
count = 0;


//carrega a carta dentro do card_content
function loadCard(techs) {
    for (tech of techs) {
        // console.log(tech);
        //element card
        cardElement = document.createElement('div');
        cardElement.id = tech.id;
        cardElement.classList.add('card')
        cardElement.setAttribute('icon', tech.icon)
        cardElement.setAttribute('fliped', tech.fliped)

        //front card
        frontCard = document.createElement('div');
        frontCard.classList.add(front);
        frontCard.innerHTML = '<img src="assets/' + tech.icon + '.png">'

        //back card
        backCard = document.createElement('div');
        backCard.classList.add(back);
        backCard.innerHTML = '&lt/&gt'

        //add elements in to cardElemnt 
        cardElement.appendChild(frontCard);
        cardElement.appendChild(backCard);

        //add cardElement in to container cards;
        container.appendChild(cardElement);

        //evento de virar a carta
        cardElement.onclick = turning;
    }

    //funcao virar a carta e verificar se forma par
    function turning() {
        this.setAttribute('fliped', true);
        flip = this.getAttribute('fliped');
        flip = (flip === 'true');

        icon = this.getAttribute('icon');

        id = this.id;

        if (flip == true) {
            this.classList = 'card flip';
            if (pair.length < 2) {
                pair.push(icon);
                elements.push(id);
                if (pair.length == 2) {
                    techA = pair[0];
                    techB = pair[1];

                    cardA = elements[0];
                    cardB = elements[1];


                    if (techA === techB) {
                        console.log('par')
                        pair = [];
                        elements = [];
                        count++;
                        console.log(count);

                        if (count == 10) {
                            gameOver = document.getElementById('gameOver');
                            gameOver.style.display = 'flex';
                        }
                    }
                    else if (techA !== techB) {
                        console.log('nao formou par')
                        pair = [];

                        if (cardB) {
                            cardA = document.getElementById(cardA);
                            cardB = document.getElementById(cardB);

                            elements = [];

                            setTimeout(() => {
                                cardA.classList = 'card';
                                cardB.classList = 'card';
                            }, 1000);
                        }





                    }
                }
            }

        }

    }
}

cards = []

function startGame() {
    //cria lista de objeto carta
    cards = createCard(techs);

    //embaralhar objetos carta
    shuffleCards(cards);

    //carrega cartas a partir da lista de objetos embaralhada
    loadCard(cards)
}

//embaralhar lista de objetos carta
function shuffleCards(cards) {
    let currentCard = cards.length;
    let indexCard = 0;

    while (currentCard != 0) {
        indexCard = Math.floor(Math.random() * currentCard);
        currentCard--;

        [cards[currentCard], cards[indexCard]] = [cards[indexCard], cards[currentCard]];
    }
}

//criar id aleatório para cada carta
function createId(tech) {
    return tech + parseInt(Math.random() * 1000);
}

//criar o objeto carta
function createCard(techs) {
    for (tech of techs) {
        cards.push([{
            id: createId(tech),
            icon: tech,
            fliped: false
        }, {
            id: createId(tech),
            icon: tech,
            fliped: false
        }])
    }

    return cards.flatMap(cards => cards);
}

//funcao recarrega página após game over
function reloadWindow() {
    window.location.reload();
}

//inicia a logica do game
startGame()
