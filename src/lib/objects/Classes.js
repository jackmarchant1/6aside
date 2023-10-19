export class Player {
    id;
    name = "Player Name";
    number = 0;
    bitmoji = "default";


    constructor(id, name, number, bitmoji) {
        this.id = id;
        this.name = name;
        this.number = number;
        this.bitmoji = bitmoji;
    }
}