// App configuratie
const appConfig = {
    difficulty: 'easy', // easy, medium, hard
    audioEnabled: true,
    pictogramType: 'emoji', // emoji, sclera, custom
    currentGame: null
};

// Custom pictogrammen storage
let customPictograms = {};

// Sclera pictogrammen mapping - gebruik van correcte URL's
const scleraPictograms = {
    bord: 'https://www.sclera.be/picto/overview/plate.png',
    beker: 'https://www.sclera.be/resources/pictos/beker.png',
    vork: 'https://www.sclera.be/picto/overview/fork.png',
    mes: 'https://www.sclera.be/picto/overview/knife.png',
    boterham: 'https://www.sclera.be/picto/overview/bread.png',
    boter: 'https://www.sclera.be/picto/overview/butter.png',
    kaas: 'https://www.sclera.be/picto/overview/cheese.png',
    'tosti ijzer': 'https://www.sclera.be/picto/overview/sandwich.png',
    ham: 'https://www.sclera.be/picto/overview/meat.png',
    melk: 'https://www.sclera.be/picto/overview/milk.png'
};

// Fallback emoji's voor als Sclera pictogrammen niet laden
const fallbackEmojis = {
    bord: '🍽️',
    beker: '🥤',
    vork: '🍴',
    mes: '🔪',
    boterham: '🍞',
    boter: '🧈',
    kaas: '🧀',
    'tosti ijzer': '🥪',
    ham: '🥓',
    melk: '🥛'
};

// Woordenlijst met Sclera pictogrammen en audio
const vocabulary = {
    bord: { pictogram: scleraPictograms.bord, fallback: fallbackEmojis.bord, audio: 'bord' },
    beker: { pictogram: scleraPictograms.beker, fallback: fallbackEmojis.beker, audio: 'beker' },
    vork: { pictogram: scleraPictograms.vork, fallback: fallbackEmojis.vork, audio: 'vork' },
    mes: { pictogram: scleraPictograms.mes, fallback: fallbackEmojis.mes, audio: 'mes' },
    boterham: { pictogram: scleraPictograms.boterham, fallback: fallbackEmojis.boterham, audio: 'boterham' },
    boter: { pictogram: scleraPictograms.boter, fallback: fallbackEmojis.boter, audio: 'boter' },
    kaas: { pictogram: scleraPictograms.kaas, fallback: fallbackEmojis.kaas, audio: 'kaas' },
    'tosti ijzer': { pictogram: scleraPictograms['tosti ijzer'], fallback: fallbackEmojis['tosti ijzer'], audio: 'tosti ijzer' },
    ham: { pictogram: scleraPictograms.ham, fallback: fallbackEmojis.ham, audio: 'ham' },
    melk: { pictogram: scleraPictograms.melk, fallback: fallbackEmojis.melk, audio: 'melk' }
};

// Game state
let gameState = {
    memory: {
        cards: [],
        flippedCards: [],
        matchedPairs: 0,
        totalPairs: 6
    },
    drag: {
        items: [],
        targets: [],
        completed: 0,
        total: 5
    },
    table: {
        items: [],
        placed: 0,
        total: 4
    },
    tosti: {
        ingredients: [],
        placed: 0,
        total: 6
    }
};

// DOM elementen
const elements = {
    settingsBtn: document.getElementById('settingsBtn'),
    settingsPanel: document.getElementById('settingsPanel'),
    closeSettings: document.getElementById('closeSettings'),
    difficultySelect: document.getElementById('difficultySelect'),
    pictogramType: document.getElementById('pictogramType'),
    customPictogramsGroup: document.getElementById('customPictogramsGroup'),
    customPictogramUpload: document.getElementById('customPictogramUpload'),
    uploadBtn: document.getElementById('uploadBtn'),
    uploadedPictograms: document.getElementById('uploadedPictograms'),
    audioToggle: document.getElementById('audioToggle'),
    mainMenu: document.getElementById('mainMenu'),
    memoryBtn: document.getElementById('memoryBtn'),
    dragBtn: document.getElementById('dragBtn'),
    tableBtn: document.getElementById('tableBtn'),
    tostiBtn: document.getElementById('tostiBtn'),
    memoryGame: document.getElementById('memoryGame'),
    dragGame: document.getElementById('dragGame'),
    tableGame: document.getElementById('tableGame'),
    tostiGame: document.getElementById('tostiGame'),
    feedbackModal: document.getElementById('feedbackModal'),
    feedbackIcon: document.getElementById('feedbackIcon'),
    feedbackText: document.getElementById('feedbackText'),
    feedbackBtn: document.getElementById('feedbackBtn')
};

// Functie om Sclera pictogram te maken
function createScleraPictogram(word, size = '2rem') {
    const img = document.createElement('img');
    img.src = vocabulary[word].pictogram;
    img.alt = word;
    img.style.width = size;
    img.style.height = size;
    img.style.objectFit = 'contain';
    img.style.display = 'block';
    img.style.margin = '0 auto';
    
    // Fallback als de afbeelding niet laadt
    img.onerror = function() {
        this.style.display = 'none';
        const fallback = document.createElement('span');
        fallback.textContent = vocabulary[word].fallback;
        fallback.style.fontSize = size;
        this.parentNode.appendChild(fallback);
    };
    
    return img;
}

// Functie om content te maken gebaseerd op moeilijkheidsniveau en pictogram type
function createContent(word, difficulty) {
    const container = document.createElement('div');
    container.style.textAlign = 'center';
    
    let pictogramElement;
    
    if (appConfig.pictogramType === 'emoji') {
        // Gebruik emoji's
        const emoji = document.createElement('span');
        emoji.textContent = vocabulary[word].fallback;
        emoji.style.fontSize = difficulty === 'easy' ? '3rem' : '2.5rem';
        pictogramElement = emoji;
    } else if (appConfig.pictogramType === 'sclera') {
        // Gebruik Sclera pictogrammen
        pictogramElement = createScleraPictogram(word, difficulty === 'easy' ? '3rem' : '2.5rem');
    } else if (appConfig.pictogramType === 'custom') {
        // Gebruik custom pictogrammen
        pictogramElement = createCustomPictogram(word, difficulty === 'easy' ? '3rem' : '2.5rem');
    }
    
    if (difficulty === 'easy') {
        container.appendChild(pictogramElement);
    } else if (difficulty === 'medium') {
        container.appendChild(pictogramElement);
        const text = document.createElement('div');
        text.textContent = word;
        text.style.fontSize = '0.9rem';
        text.style.marginTop = '5px';
        text.style.fontWeight = 'bold';
        container.appendChild(text);
    } else {
        const text = document.createElement('div');
        text.textContent = word;
        text.style.fontSize = '1.2rem';
        text.style.fontWeight = 'bold';
        container.appendChild(text);
    }
    
    return container;
}

// Functie om custom pictogram te maken
function createCustomPictogram(word, size = '2rem') {
    const img = document.createElement('img');
    
    if (customPictograms[word]) {
        img.src = customPictograms[word];
    } else {
        // Fallback naar emoji als geen custom pictogram beschikbaar is
        img.style.display = 'none';
        const fallback = document.createElement('span');
        fallback.textContent = vocabulary[word].fallback;
        fallback.style.fontSize = size;
        return fallback;
    }
    
    img.alt = word;
    img.style.width = size;
    img.style.height = size;
    img.style.objectFit = 'contain';
    img.style.display = 'block';
    img.style.margin = '0 auto';
    
    // Fallback als de afbeelding niet laadt
    img.onerror = function() {
        this.style.display = 'none';
        const fallback = document.createElement('span');
        fallback.textContent = vocabulary[word].fallback;
        fallback.style.fontSize = size;
        this.parentNode.appendChild(fallback);
    };
    
    return img;
}

// Audio functies
function speak(text) {
    if (!appConfig.audioEnabled) return;
    
    if ('speechSynthesis' in window) {
        // Stop eventuele lopende spraak
        speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'nl-NL';
        utterance.rate = 0.8;
        utterance.pitch = 1.2;
        speechSynthesis.speak(utterance);
    }
}

function playSound(type) {
    if (!appConfig.audioEnabled) return;
    
    try {
        // Eenvoudige geluiden met Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        switch(type) {
            case 'success':
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                break;
            case 'error':
                oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
                oscillator.frequency.setValueAtTime(300, audioContext.currentTime + 0.1);
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                break;
        }
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
        console.log('Audio error:', error);
    }
}

// Toegankelijkheidsfuncties
function setupKeyboardNavigation() {
    // Tab navigation voor alle knoppen
    const focusableElements = document.querySelectorAll('button, [tabindex]');
    
    focusableElements.forEach(element => {
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });
}

// Settings functies
function initSettings() {
    elements.settingsBtn.addEventListener('click', () => {
        elements.settingsPanel.style.display = 'block';
        elements.settingsBtn.focus();
    });
    
    elements.closeSettings.addEventListener('click', () => {
        elements.settingsPanel.style.display = 'none';
    });
    
    elements.difficultySelect.addEventListener('change', (e) => {
        appConfig.difficulty = e.target.value;
        if (appConfig.currentGame) {
            restartCurrentGame();
        }
    });
    
    elements.pictogramType.addEventListener('change', (e) => {
        appConfig.pictogramType = e.target.value;
        
        // Toon/verberg custom pictogrammen sectie
        if (e.target.value === 'custom') {
            elements.customPictogramsGroup.style.display = 'block';
        } else {
            elements.customPictogramsGroup.style.display = 'none';
        }
        
        if (appConfig.currentGame) {
            restartCurrentGame();
        }
    });
    
    elements.audioToggle.addEventListener('change', (e) => {
        appConfig.audioEnabled = e.target.checked;
    });
    
    // Upload functionaliteit
    elements.uploadBtn.addEventListener('click', handleFileUpload);
    
    // Sluit settings met Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.settingsPanel.style.display === 'block') {
            elements.settingsPanel.style.display = 'none';
        }
    });
}

// Functie om bestanden te uploaden
function handleFileUpload() {
    const fileInput = elements.customPictogramUpload;
    const files = fileInput.files;
    
    if (files.length === 0) {
        alert('Selecteer eerst bestanden om te uploaden.');
        return;
    }
    
    Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) {
            alert(`Bestand ${file.name} is geen afbeelding.`);
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const word = prompt(`Voor welk woord is deze afbeelding (${file.name})?`);
            if (word && vocabulary[word]) {
                customPictograms[word] = e.target.result;
                updateUploadedPictograms();
                if (appConfig.currentGame) {
                    restartCurrentGame();
                }
            } else if (word) {
                alert(`Woord "${word}" bestaat niet in de woordenlijst.`);
            }
        };
        reader.readAsDataURL(file);
    });
    
    // Reset file input
    fileInput.value = '';
}

// Functie om geüploade pictogrammen bij te werken
function updateUploadedPictograms() {
    const container = elements.uploadedPictograms;
    container.innerHTML = '';
    
    Object.keys(customPictograms).forEach(word => {
        const item = document.createElement('div');
        item.className = 'uploaded-pictogram-item';
        
        const img = document.createElement('img');
        img.src = customPictograms[word];
        img.alt = word;
        
        const input = document.createElement('input');
        input.type = 'text';
        input.value = word;
        input.readOnly = true;
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-pictogram';
        removeBtn.textContent = 'X';
        removeBtn.onclick = () => {
            delete customPictograms[word];
            updateUploadedPictograms();
            if (appConfig.currentGame) {
                restartCurrentGame();
            }
        };
        
        item.appendChild(img);
        item.appendChild(input);
        item.appendChild(removeBtn);
        container.appendChild(item);
    });
}

// Game navigation
function showGame(gameId) {
    // Verberg alle games en menu
    [elements.mainMenu, elements.memoryGame, elements.dragGame, elements.tableGame, elements.tostiGame].forEach(el => {
        el.style.display = 'none';
    });
    
    // Toon geselecteerde game
    document.getElementById(gameId).style.display = 'block';
    appConfig.currentGame = gameId;
    
    // Initialiseer game
    switch(gameId) {
        case 'memoryGame':
            initMemoryGame();
            break;
        case 'dragGame':
            initDragGame();
            break;
        case 'tableGame':
            initTableGame();
            break;
        case 'tostiGame':
            initTostiGame();
            break;
    }
}

function showMainMenu() {
    [elements.memoryGame, elements.dragGame, elements.tableGame, elements.tostiGame].forEach(el => {
        el.style.display = 'none';
    });
    elements.mainMenu.style.display = 'block';
    appConfig.currentGame = null;
}

function restartCurrentGame() {
    if (appConfig.currentGame) {
        showGame(appConfig.currentGame);
    }
}

// Memory Game
function initMemoryGame() {
    const grid = document.getElementById('memoryGrid');
    grid.innerHTML = '';
    
    // Maak kaarten
    const words = Object.keys(vocabulary).slice(0, 6);
    const cards = [...words, ...words];
    
    // Shuffle
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    
    gameState.memory.cards = cards;
    gameState.memory.flippedCards = [];
    gameState.memory.matchedPairs = 0;
    
    cards.forEach((word, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.word = word;
        card.dataset.index = index;
        card.tabIndex = 0;
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Kaart ${index + 1}`);
        
        card.addEventListener('click', () => flipCard(card));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                flipCard(card);
            }
        });
        
        grid.appendChild(card);
    });
    
    updateProgress('memory');
}

function flipCard(card) {
    if (gameState.memory.flippedCards.length >= 2) return;
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
    
    const word = card.dataset.word;
    card.classList.add('flipped');
    
    // Toon content gebaseerd op moeilijkheidsniveau
    card.innerHTML = '';
    card.appendChild(createContent(word, appConfig.difficulty));
    
    gameState.memory.flippedCards.push(card);
    
    if (appConfig.audioEnabled) {
        speak(word);
    }
    
    if (gameState.memory.flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [card1, card2] = gameState.memory.flippedCards;
    const word1 = card1.dataset.word;
    const word2 = card2.dataset.word;
    
    if (word1 === word2) {
        // Match gevonden
        card1.classList.add('matched');
        card2.classList.add('matched');
        gameState.memory.matchedPairs++;
        
        playSound('success');
        
        if (gameState.memory.matchedPairs === gameState.memory.totalPairs) {
            setTimeout(() => showFeedback('🎉', 'Je hebt alle kaarten gevonden!'), 500);
        }
    } else {
        // Geen match
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.innerHTML = '';
        card2.innerHTML = '';
        
        playSound('error');
    }
    
    gameState.memory.flippedCards = [];
    updateProgress('memory');
}

// Drag Game
function initDragGame() {
    const itemsContainer = document.getElementById('dragItems');
    const targetsContainer = document.getElementById('dragTargets');
    
    itemsContainer.innerHTML = '';
    targetsContainer.innerHTML = '';
    
    // Selecteer 5 items
    const words = Object.keys(vocabulary).slice(0, 5);
    gameState.drag.items = words;
    gameState.drag.targets = words;
    gameState.drag.completed = 0;
    
    // Shuffle targets
    const shuffledTargets = [...words].sort(() => Math.random() - 0.5);
    
    // Maak drag items
    words.forEach(word => {
        const item = document.createElement('div');
        item.className = 'drag-item';
        item.draggable = true;
        item.dataset.word = word;
        
        item.appendChild(createContent(word, appConfig.difficulty));
        
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', word);
            item.classList.add('dragging');
        });
        
        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
        });
        
        item.addEventListener('click', () => {
            if (appConfig.audioEnabled) speak(word);
        });
        
        itemsContainer.appendChild(item);
    });
    
    // Maak drop targets
    shuffledTargets.forEach(word => {
        const target = document.createElement('div');
        target.className = 'drag-target';
        target.dataset.word = word;
        
        target.appendChild(createContent(word, appConfig.difficulty));
        
        target.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        
        target.addEventListener('drop', (e) => {
            e.preventDefault();
            const droppedWord = e.dataTransfer.getData('text/plain');
            
            if (droppedWord === word) {
                target.classList.add('dropped');
                target.innerHTML = '';
                target.appendChild(createContent(word, appConfig.difficulty));
                
                gameState.drag.completed++;
                playSound('success');
                
                if (gameState.drag.completed === gameState.drag.total) {
                    setTimeout(() => showFeedback('🎉', 'Je hebt alles goed gesleept!'), 500);
                }
            } else {
                playSound('error');
            }
            
            updateProgress('drag');
        });
        
        targetsContainer.appendChild(target);
    });
    
    updateProgress('drag');
}

// Table Game
function initTableGame() {
    const itemsContainer = document.getElementById('tableItems');
    const tableSurface = document.getElementById('tableSurface');
    
    itemsContainer.innerHTML = '';
    tableSurface.innerHTML = '';
    
    // Selecteer 4 tafel items
    const tableWords = ['bord', 'beker', 'vork', 'mes'];
    gameState.table.items = tableWords;
    gameState.table.placed = 0;
    
    tableWords.forEach(word => {
        const item = document.createElement('div');
        item.className = 'table-item';
        item.draggable = true;
        item.dataset.word = word;
        
        item.appendChild(createContent(word, appConfig.difficulty));
        
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', word);
        });
        
        item.addEventListener('click', () => {
            if (appConfig.audioEnabled) speak(word);
        });
        
        itemsContainer.appendChild(item);
    });
    
    tableSurface.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    
    tableSurface.addEventListener('drop', (e) => {
        e.preventDefault();
        const word = e.dataTransfer.getData('text/plain');
        const rect = tableSurface.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const placedItem = document.createElement('div');
        placedItem.className = 'table-item placed';
        placedItem.style.left = `${x}px`;
        placedItem.style.top = `${y}px`;
        placedItem.dataset.word = word;
        
        placedItem.appendChild(createContent(word, appConfig.difficulty));
        
        tableSurface.appendChild(placedItem);
        
        gameState.table.placed++;
        playSound('success');
        
        if (gameState.table.placed === gameState.table.total) {
            setTimeout(() => showFeedback('🎉', 'De tafel is helemaal gedekt!'), 500);
        }
        
        updateProgress('table');
    });
    
    updateProgress('table');
}

// Tosti Game
function initTostiGame() {
    const ingredientsContainer = document.getElementById('ingredients');
    const tostiPan = document.getElementById('tostiPan');
    
    ingredientsContainer.innerHTML = '';
    tostiPan.innerHTML = '';
    
    // Tosti ingrediënten in de juiste volgorde: boterham, boter, kaas, ham, boter, boterham
    const tostiIngredients = ['boterham', 'boter', 'kaas', 'ham', 'boter', 'boterham'];
    gameState.tosti.ingredients = tostiIngredients;
    gameState.tosti.placed = 0;
    gameState.tosti.total = 6; // Update totaal naar 6
    
    // Maak ingrediënten beschikbaar voor het slepen
    tostiIngredients.forEach(word => {
        const ingredient = document.createElement('div');
        ingredient.className = 'ingredient';
        ingredient.draggable = true;
        ingredient.dataset.word = word;
        
        ingredient.appendChild(createContent(word, appConfig.difficulty));
        
        ingredient.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', word);
        });
        
        ingredient.addEventListener('click', () => {
            if (appConfig.audioEnabled) speak(word);
        });
        
        ingredientsContainer.appendChild(ingredient);
    });
    
    tostiPan.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    
    tostiPan.addEventListener('drop', (e) => {
        e.preventDefault();
        const word = e.dataTransfer.getData('text/plain');
        const rect = tostiPan.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const placedIngredient = document.createElement('div');
        placedIngredient.className = 'ingredient placed';
        placedIngredient.style.left = `${x}px`;
        placedIngredient.style.top = `${y}px`;
        placedIngredient.dataset.word = word;
        
        placedIngredient.appendChild(createContent(word, appConfig.difficulty));
        
        tostiPan.appendChild(placedIngredient);
        
        gameState.tosti.placed++;
        playSound('success');
        
        if (gameState.tosti.placed === gameState.tosti.total) {
            setTimeout(() => showFeedback('🥪', 'Je tosti is klaar!'), 500);
        }
        
        updateProgress('tosti');
    });
    
    updateProgress('tosti');
}

// Progress updates
function updateProgress(gameType) {
    const progressElement = document.getElementById(`${gameType}Progress`);
    if (!progressElement) return;
    
    switch(gameType) {
        case 'memory':
            progressElement.textContent = `${gameState.memory.matchedPairs}/${gameState.memory.totalPairs}`;
            break;
        case 'drag':
            progressElement.textContent = `${gameState.drag.completed}/${gameState.drag.total}`;
            break;
        case 'table':
            progressElement.textContent = `${gameState.table.placed}/${gameState.table.total}`;
            break;
        case 'tosti':
            progressElement.textContent = `${gameState.tosti.placed}/${gameState.tosti.total}`;
            break;
    }
}

// Feedback modal
function showFeedback(icon, text) {
    elements.feedbackIcon.textContent = icon;
    elements.feedbackText.textContent = text;
    elements.feedbackModal.style.display = 'flex';
}

// Event listeners
function initEventListeners() {
    // Game buttons
    elements.memoryBtn.addEventListener('click', () => showGame('memoryGame'));
    elements.dragBtn.addEventListener('click', () => showGame('dragGame'));
    elements.tableBtn.addEventListener('click', () => showGame('tableGame'));
    elements.tostiBtn.addEventListener('click', () => showGame('tostiGame'));
    
    // Back buttons
    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', showMainMenu);
    });
    
    // Feedback modal
    elements.feedbackBtn.addEventListener('click', () => {
        elements.feedbackModal.style.display = 'none';
        showMainMenu();
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (elements.feedbackModal.style.display === 'flex') {
                elements.feedbackModal.style.display = 'none';
            } else if (appConfig.currentGame) {
                showMainMenu();
            }
        }
    });
}

// Initialisatie
document.addEventListener('DOMContentLoaded', () => {
    initSettings();
    initEventListeners();
    setupKeyboardNavigation();
});
