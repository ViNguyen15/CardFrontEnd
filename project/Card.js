export default class Card{
    rank;
    suit;
    color;
    value;

    constructor(rank, suit){
        this.rank = rank;
        this.suit = suit;
        this.color = (suit === "diamond" || suit === "heart")?"red":"black";
        this.value = this.valueLogic(rank);
    }


    valueLogic(rank){
        switch(rank){
            case "A":
                return 1;
            case "J":
                return 11;
            case "Q":
                return 12;
            case "K":
                return 13;
            default:
                return parseInt(rank);
        }
    }
}