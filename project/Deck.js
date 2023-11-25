export default class Deck{
    deck;

    constructor(deck){
        this.deck = deck;
        if(typeof deck === "undefined") this.deck = [];
    }

    add(card, placement){
        if(placement === "bottom"){
            this.deck.unshift(card)
        }else{
            this.deck.push(card);
        }
        
    }

    draw(){
        return this.deck.pop();
    }

    shuffle(){
        let newDeck = [];
        while(this.deck.length){
            let randNum = Math.floor(Math.random() * this.deck.length); 
            newDeck.push(this.deck[randNum]);
            this.deck.splice(randNum,1);
        }
        this.deck = newDeck;
    }
}