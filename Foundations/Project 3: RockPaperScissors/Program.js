function GetComputerChoice()
{
    switch(RandomInt(0, 3))
    {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2: 
            return "scissors";
        default:
            console.error("Computer roll range error");
    }

}

// min is inclusive, max is exclusive.
function RandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min)) + min;
}

function PlayRound(playerSelection, computerSelection)
{
    let winrar = 0;

    if (playerSelection === computerSelection) winrar;
    else if (playerSelection === "rock")
    {
        if (computerSelection === "paper") --winrar;
        if (computerSelection === "scissors") ++winrar;
    }
    else if (playerSelection === "paper")
    {
        if (computerSelection === "rock") ++winrar;
        if (computerSelection === "scissors") --winrar;
    }
    else if (playerSelection === "scissors")
    {
        if (computerSelection === "rock") --winrar;
        else ++winrar;
    }

    switch(winrar)
    {
        case 0:
        return "Draw!";
        case 1:
            return `You win! ${playerSelection} beats ${computerSelection}`;
        case -1:
            return `You lose! ${playerSelection} loses to ${computerSelection}`;
        default:
            return "you broke the game.";
    }

}

function Game()
{
    while (true)
    {
        playerSelection = prompt("Enter rock, paper, or scissors!");
        playerSelection = playerSelection.toLowerCase();

        if (!"rock paper scissors".includes(playerSelection)) 
        {
            alert("Invalid entry. Try again.");
            continue;
        }

        computerSelection = GetComputerChoice();

        console.log(PlayRound(playerSelection, computerSelection));

    }
}

Game();