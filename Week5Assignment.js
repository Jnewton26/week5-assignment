// Coding Steps:
// 	•	Create a menu app as seen in this week’s video. What you create is up to you as long as it meets the following requirements.
// 	•	Use at least one array.
// 	•	Use at least two classes.
// 	•	Your menu should have the options to create, view, and delete elements.

class player {
    constructor(name, position) {
        this.name = name;
        this.position = position;
    }

    describe() {
        return `${this.name} plays ${this.position}.`;
    }
}

class Team {
    constructor(name) {
        this.name = name;
        this.players = [];
    }

    addPlayer(player) {
        if (player instanceof player) {
            this.players.push(player);
        } else {
            throw new Error(`You can only add an instance of Player. Argument is not a player: ${player}`);
        }
    }

    describe() {
        return `${this.name} has ${this.players.length} players.`;
    }
}

class Menu {
    constructor() {
        this.teams = []
        this.selectedTeam = null;
    }

    start() {
        let selection = this.showMainMenuOptions();

        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createTeam();
                    break;
                case '2':
                    this.viewTeam();
                    break;
                case '3':
                    this.deleteTeam();
                    break;
                case '4':
                    this.displayTeams();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!');
    }

    showMainMenuOptions() {
        return prompt(`
        0) exit
        1) create new team
        2) view team
        3) delete team
        4) display all teams
        `);
    }

    showTeamMenuOptions(teamInfo) {
        return prompt(`
        0) back
        1) create player
        2) delete player
        -----------------------
        ${teamInfo}
        
        `);
    }

    displayTeams() {
        let teamString = '';
        for (let i = 0; i < this.teams.length; i++) {
            teamString += i + ')' + this.teams[i].name + '\n';
        }
        alert(teamString);
    }
    createTeam() {
        let name = prompt('Enter name for new team:');
        this.teams.push(new Team(name));
    }

    viewTeam() {

        let index = prompt('Enter the index of the team you wish to view');
        if (index > -1 && index < this.teams.length) {
            this.selectedTeam = this.teams[index];
            let description = 'Team Name:  ' + this.selectedTeam.name + '\n';

            for (let i = 0; i < this.selectedTeam.player.length; i++) {
                description += i + ') ' + this.selectedTeam.player[i].name
                    + ' - ' + this.selectedTeam.players[i].position + '\n';
            }

            let selection = this.showMainMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createPlayer();
                    break;
                case '2':
                    this.deletePlayer();
            }
        }
    }


    deleteTeam() {
        let index = prompt('Enter the index fot the team you wish to delete: ');
        if (index > -1 && index < this.teams.length) {
            this.teams.splice(index, 1);
        }
    }

    createPlayer() {
        let name = prompt('Enter name for a new player');
        let position = prompt('Enter position for player');
        this.selectedTeam.player.push(new player(name, position));
    }

    deletePlayer() {
        let index = prompt('Enter the index of the player you wish to delete');
        if (index > -1 && index < this.selectedTeam.player.length) {
            this.selectedTeam.player.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();