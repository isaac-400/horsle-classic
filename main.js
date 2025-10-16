const State = Object.freeze({
    CORRECT: "correct",
    INCORRECT: "incorrect",
    PRESENT: "present",
});

const Horse = "HORSE"

const rows = document.getElementById("board").getElementsByClassName("row")
let rowIdx = 0;
let slotIdx = 0;

function handleKeyEvent (event) {
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
            s.setAttribute("data-state", State.CORRECT)
        } else if (Horse.includes(s.innerText)) {
            s.setAttribute("data-state", State.PRESENT)
        } else {
            s.setAttribute("data-state", State.INCORRECT)      
        }
        console.log(s.style)
        
    }

    if (word == Horse) {
        console.log("You win!")
        window.removeEventListener("keydown", handleKeyEvent)
        
    }
}

// Register the Keyboard handler
window.addEventListener("keydown", handleKeyEvent)

const keys = document.getElementsByClassName("key")
console.log(keys)
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
