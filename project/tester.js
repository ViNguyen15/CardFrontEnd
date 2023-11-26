import Card from './Card.js';
import Deck from './Deck.js';
// let orderedList = [...Array(10).keys()];

    class PlayerInfo{
        constructor(name,cards){
            this.name = name;
            this.cards = cards;
        }
    }

    let deck = new Deck();
    let hand = [];
    let spade = '&#9824;';
    let club = '&#9827;';
	let heart = '&#9829;';
	let diamond = '&#9830;';
    let player;
    let name = "";


    function main(){
        let suits = ["diamond","heart","spade","club"];
        let ranks = "A234567890JQK";

        for(let rank of ranks){
            if (rank === "0") rank = "10";
            for(let suit of suits){
                deck.add(new Card(rank,suit));
            }
        }
        console.log(deck);

        renderPage();
        const btnShuffle = document.getElementById("btnShuffle");
        const btnDraw = document.getElementById("btnDraw");
        const btnSave = document.getElementById("save");
        const btnLoad = document.getElementById("load");

        btnShuffle.addEventListener('click',shuffle);
        btnDraw.addEventListener('click',draw);
        btnSave.addEventListener('click',save);
        btnLoad.addEventListener('click',load);

        
    }

    function save(){

        name = document.getElementById("playerName").value;

        if(name.length == 0){
            console.log("save failed");
            alert("name is blank");
            return;
        }
        console.log("saving");
        let playerInfo = new PlayerInfo(name,hand);
        console.log(playerInfo);
        postData(playerInfo);

    }

    function load(){
        name = document.getElementById("playerName").value;
        if(name.length == 0){
            console.log("load failed");
            alert("name is blank");
            return;
        }

        console.log("loading");
        console.log(player);
        for(let prop of player.players){
            
            if(prop.name === name){
                console.log("name: ", prop.name);
                hand = [];
                for(let card of prop.card){
                    console.log(card);
                    hand.push(new Card(card.rank,card.suit));
                }
                renderHand();
            }
        }
    }
    

    function shuffle(){
        deck.shuffle();
        console.log(deck);
    }


    function draw(){
        let num = document.getElementById("cardDraw").value;
        for(let i = 0; i < num; i++){
            let card = deck.draw();
            hand.push(card);
            console.log(hand);
            renderHand();
        }

        
    }

    function renderHeader(){
        console.log("rendering header")
        document.getElementById("mainHead").innerHTML = `
            <input id="playerName" placeholder="name"> 
            <button id="save">Save</button>
            <button id="load">load</button>
        `;
    }

    function renderPage(){
        console.log("rendering page");
        renderHeader();
        document.getElementById("mainBox").innerHTML = "";
        document.getElementById("mainBox").innerHTML += `
        
        <div id="btnHeader">
            <button id="btnShuffle">Shuffle</button>
            <button id="btnDraw">Draw</button>
            <input type="number" id="cardDraw" value="1" />

        </div>
        `;
        

        document.getElementById("mainBox").innerHTML += `
            <div id="cardCanvas"></div>
        `;

    }

    function renderHand(){
        document.getElementById("cardCanvas").innerHTML = ``;
        for(let card of hand){
            renderCard(card);
        }
    }

    function renderCard(card){
        document.getElementById("cardCanvas").innerHTML += `
            <div class="card ${card.color}">
                <div>${card.rank}</div>
                <div class="suit">${symbolSelector(card.suit)}</div>
            </div>`;
        
    }

    function symbolSelector(suit){
        switch (suit){
            case "spade":
                return spade;
            case "diamond":
                return diamond;
            case "club":
                return club;
            case "heart":
                return heart;
            default:
                return suit;
        }
    }

    //GET
    async function logPlayers() {
        const response = await fetch("http://127.0.0.1:5000/players");
        const players = await response.json();
        player = players;
        console.log(players);
    }

    //POST
    async function postData(data) {
        let url = "http://127.0.0.1:5000/player"
        // Default options are marked with *
        const response = await fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
      }


    logPlayers();
    main();


