let size = 16;

const modes = ["Click", "Hover"];
let mode = 0;

let colour = "#FF006F";

let grid = document.querySelector("#RightSide");

const colourInput = document.querySelector("#ColourInput input");
colourInput.addEventListener("input", e => colour = e.target.value);

const selectedColour = "#727A85";
const buttons = document.querySelectorAll("#LeftSide button");

document.querySelectorAll("button.Default").forEach(x => x.style.cssText = `background-color: ${selectedColour}`);

buttons[0].addEventListener("click", _ => 
{
    mode = 0
    buttons[0].style.cssText = `background-color: ${selectedColour}`;
    buttons[1].style.cssText = `background-color: #FFFFFF;`;
});

buttons[1].addEventListener("click", _ => 
{
    mode = 1
    buttons[1].style.cssText = `background-color: ${selectedColour}`;
    buttons[0].style.cssText = `background-color: #FFFFFF;`;
});

let erase = false;

buttons[3].addEventListener("click", _ => 
{
    if (erase === false) 
    {
        buttons[3].style.cssText = `background-color: ${selectedColour}`;
    }
    else 
    {
        buttons[3].style.cssText = `background-color: #FFFFFF`;
    }

    erase = !erase;
});

buttons[4].addEventListener("click", Clear);

const slider = document.querySelector("#Slider");
slider.addEventListener("input", UpdateSizeValue);
slider.addEventListener("mouseup", ConstructGrid);

function Clear()
{
    document.querySelectorAll(".GridPixel").forEach(x => x.style.cssText = `background-color: #FFFFFF;`);
}

function ConstructRow()
{
    let row = document.createElement("div");
    row.classList.add("GridRow");

    for (let i = 0; i < size; ++i)
    {
        let pixel = document.createElement("div");
        pixel.classList.add("GridPixel");
        row.append(pixel);
    }

    return row;
}

function ConstructGrid()
{
    EmptyGrid();

    for (let i = 0; i < size; ++i)
    {
        grid.append(ConstructRow());
    }

    AddPixelEvents();
}

function EmptyGrid()
{
    const mid = document.querySelector("#Mid")
    grid.remove();

    const newGrid = document.createElement("div");
    newGrid.setAttribute("id", "RightSide");
    newGrid.classList.add("Shadow");

    mid.append(newGrid);
    grid = newGrid;
}

function AddPixelEvents()
{
    const pixels = document.querySelectorAll(".GridPixel");

    pixels.forEach(pixel => pixel.addEventListener("mouseover", ColourIn));

    pixels.forEach(pixel => pixel.addEventListener("mousedown", e => e.target.style.cssText = `background-color: ${erase ? "#FFFFFF" : colour};`));
}

function ColourIn(e)
{
    const currentMode = modes[mode];

    const colourInColour = erase ? "#FFFFFF" : colour;

    if (currentMode == "Hover") this.style.cssText = `background-color: ${colourInColour};`;
    else if (currentMode == "Click")
    {
        if (e.buttons >= 1) this.style.cssText = `background-color: ${colourInColour};`;
    }

}

function UpdateSizeValue()
{
    size = Slider.value;

    document.querySelector("#SliderText").textContent = `${size}x${size}`;
}

ConstructGrid();