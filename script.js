// Base URL for D&D 5e API
const apiUrl = 'https://www.dnd5eapi.co/api/spells';

// Function to fetch spells from the API
async function fetchSpells() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.results; // This will contain the list of spells
    } catch (error) {
        console.error('Error fetching spells:', error);
    }
}

// Populate the spell selector with fetched spells
async function populateSpellSelector() {
    const spellSelector = document.getElementById('spellSelector');
    const spells = await fetchSpells();

    spells.forEach(spell => {
        const option = document.createElement('option');
        option.value = spell.index;
        option.textContent = spell.name;
        spellSelector.appendChild(option);
    });
}

// Fetch spell details from the API
async function getSpellDetails(spellIndex) {
    try {
        const response = await fetch(`${apiUrl}/${spellIndex}`);
        const spell = await response.json();
        return spell;
    } catch (error) {
        console.error('Error fetching spell details:', error);
    }
}
// Cast spell function
async function castSpell() {
    const selectedSpellIndex = document.getElementById('spellSelector').value;

    if (!selectedSpellIndex) {
        document.getElementById('spellResult').textContent = "Please select a spell.";
        return;
    }

    const spell = await getSpellDetails(selectedSpellIndex);
    if (!spell) {
        document.getElementById('spellResult').textContent = "Error fetching spell details.";
        return;
    }

    // Display spell information
    const spellDamage = spell.damage ? spell.damage : 'No damage information';
    const spellDescription = spell.desc.join(' '); // Assuming description is an array of strings

    document.getElementById('spellResult').textContent = `${spell.name}: ${spellDescription} Damage: ${spellDamage}`;
}

// Initialize the spell selector when the page loads
window.onload = populateSpellSelector;

function rollDice() {
    let numDice = parseInt(document.getElementById("numDice").value);
    let diceType = parseInt(document.getElementById("diceType").value);
    let modifier = parseInt(document.getElementById("modifier").value);

    let total = 0;
    let rolls = [];

    for (let i = 0; i < numDice; i++) {
        let rollResult = Math.floor(Math.random() * diceType) + 1;
        rolls.push(rollResult);
        total += rollResult;
    }

    total += modifier;

    let resultText = `Rolling ${numDice}d${diceType} + ${modifier}: `;
    resultText += `${rolls.join(", ")} + ${modifier} = ${total}`;

    document.getElementById("result").textContent = resultText;

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    
    
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    
}    