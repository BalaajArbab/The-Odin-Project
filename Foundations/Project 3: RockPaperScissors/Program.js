const buttons = document.querySelectorAll("#Buttons div");

const output = document.querySelector("#Output Span");

const scores = document.querySelectorAll("#Score .Count");
let scoreCounts = [0, 0, 0];

buttons.forEach(button => button.addEventListener("click", Game));

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
    let winrar = null;

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

    return obj;
}

function Game(e)
{
    const result = PlayRound(this.id, GetComputerChoice());

    output.textContent = result.text;

    this.classList.add("Scale");

    setTimeout(() => this.classList.remove("Scale"), 200);

    UpdateColours(this, result.winner);
    UpdateScores(this, result.winner);
}

function UpdateScores(element, winner)
{
    switch (winner)
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

    for (let i = 0; i < 3; ++i) scores[i].textContent = scoreCounts[i];
}

function UpdateColours(element, winner)
{
    buttons.forEach(button => button.style.cssText = "background-color: #00000000");
    console.log(element);

    switch (winner)
    {
        case 1:
            element.style.cssText = "background-color: #42FF94";
            break;
        case 0:
            element.style.cssText = "background-color: #E6B220";
            break;
        case -1:
            element.style.cssText = "background-color: #FC303E";
            break;
        default:
            console.error("Error in scoring.");
    }
}