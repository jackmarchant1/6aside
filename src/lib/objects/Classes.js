export class Player {
    id;
    name = "Player Name";
    number = 0;
    bitmoji = "default";
    goals = 0;
    assists = 0;
    mom = 0;
    apps = 0;


    constructor(id, name, number, bitmoji, goals, assists, mom, apps) {
        this.id = id;
        this.name = name;
        this.number = number;
        this.bitmoji = bitmoji;
        this.goals = goals;
        this.assists = assists;
        this.mom = mom;
        this.apps = apps
    }
}