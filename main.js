const State = Object.freeze({
    CORRECT: "correct",
    INCORRECT: "incorrect",
    PRESENT: "present",
});

const Horse = "HORSE"
const rows = document.getElementById("board").getElementsByClassName("row")
const keys = document.getElementsByClassName("key")

let rowIdx = 0;
let slotIdx = 0;
let gameOver = false

function handleKeyEvent (event) {
    if (gameOver) {
        return
    }
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
    let slots = rows[rowIdx].getElementsByTagName("div")
    let currentSlot = slots[slotIdx]
    console.log(slotIdx);
    switch (event.key) {
    case "Enter":
        if (slotIdx == 5) {
            console.log("submitting");
            Submit(rows[rowIdx]);
            rowIdx += 1;
            slotIdx = 0;
        }
        break;
    case "Backspace":
        console.log(slotIdx);
        currentSlot.innerHTML = ""
        if (slotIdx > 0) {
            slotIdx -= 1;
        }
        break;
    default:
        if ("abcdefghijklmnopqrstuvwxyz".includes(event.key)) {
            if (slotIdx < 5) {
                currentSlot.innerHTML = event.key
                slotIdx += 1;
            }
        }
        break;
    }
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}

function Submit(row){
    let slots = row.getElementsByTagName("div")
    let word = ""
    
    for (var i = 0; i < 5; i++) {
        s = slots[i]
        word += s.innerText
        s.classList.add("flipping")
        if (Horse[i] == s.innerText) {
            setAttrTimeout(s, State.CORRECT, i)
        } else if (Horse.includes(s.innerText)) {
            setAttrTimeout(s, State.PRESENT, i)
        } else {
            setAttrTimeout(s, State.INCORRECT, i)
        }        
    }

    if (word == Horse) {
        console.log("You win!")
        gameOver = true
           
    }
}

function setAttrTimeout(s, state, i) {
    const baseTimeout = 500
    const delay = 100
    setTimeout(()=> {s.setAttribute("data-state", state)}, baseTimeout + delay * i )
}

// Register the Keyboard handler
window.addEventListener("keydown", handleKeyEvent)

Array.from(keys).forEach((key) => {
    key.addEventListener("click", (event) => {
        let letter = event.target.innerText
        if (letter.length == 1) {
            letter = letter.toLowerCase();
        }
        console.log(letter)
        handleKeyEvent({
            key: letter,
            preventDefault: () => {},
        })
    });
});
