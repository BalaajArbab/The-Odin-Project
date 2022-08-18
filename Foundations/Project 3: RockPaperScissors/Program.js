const rock = document.querySelector("#Rock");
const paper = document.querySelector("#Paper");
const scissors = document.querySelector("#Scissors");

const output = document.querySelector("#Output Span");

const scores = document.querySelectorAll("#Score .Count");
let scoreCounts = [0, 0, 0];

rock.addEventListener("click", Game);
paper.addEventListener("click", Game);
scissors.addEventListener("click", Game);


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
    playerSelection = playerSelection.toLowerCase();
    let winrar = Infinity;

    console.log([playerSelection, computerSelection]);

    if (playerSelection === computerSelection) winrar = 0;
    else if (playerSelection === "rock")
    {
        if (computerSelection === "paper") winrar  = -1;
        if (computerSelection === "scissors") winrar = 1;
    }
    else if (playerSelection === "paper")
    {
        if (computerSelection === "rock") winrar = 1;
        if (computerSelection === "scissors") winrar  = -1;
    }
    else if (playerSelection === "scissors")
    {
        if (computerSelection === "rock") winrar  = -1;
        else winrar = 1;
    }

    let str;
    switch(winrar)
    {
        case 0:
            str = "Draw!";
            break;
        case 1:
            str = `You win! ${playerSelection} beats ${computerSelection}`;
            break;
        case -1:
            str = `You lose! ${playerSelection} loses to ${computerSelection}`;
            break;
        default:
            str = "you broke the game.";
            break;
    }

    const obj =
    {
        text: str,
        winner: winrar
    };

    console.log(obj);
    return obj;
}

function Game(e)
{
    const result = PlayRound(this.id, GetComputerChoice());
    console.log(this.id);

    output.textContent = result.text;

    switch (result.winner)
    {
        case 1:
            ++scoreCounts[0];
            break;
        case 0:
            ++scoreCounts[1];
            break;
        case -1:
            ++scoreCounts[2];
            break;
        default:
            console.error("Error in scoring.");
    }
    console.log(scoreCounts);
    UpdateScores();
}

function UpdateScores()
{
    for (let i = 0; i < 3; ++i) scores[i].textContent = scoreCounts[i];
}