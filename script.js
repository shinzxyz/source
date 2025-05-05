document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const settingsButton = document.getElementById('settings-button');
    const settingsMenu = document.getElementById('settings-menu');
    const closeSettingsButton = document.getElementById('close-settings-button');
    const themeSelector = document.getElementById('theme-selector');
    const clearChatButton = document.getElementById('clear-chat-button');
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    const gameButton = document.getElementById('game-button');
    const gameContainer = document.getElementById('game-container');
    const closeGameButton = document.getElementById('close-game-button');
    const puzzleContainer = document.getElementById('puzzle-container');
    const shuffleButton = document.getElementById('shuffle-button');
    const movesCount = document.getElementById('moves-count');
    const customAlert = document.getElementById('custom-alert');
    const alertTitle = document.getElementById('alert-title');
    const alertMessage = document.getElementById('alert-message');
    const alertCancel = document.getElementById('alert-cancel');
    const alertConfirm = document.getElementById('alert-confirm');

    // Game state
    let puzzleState = [];
    let emptyIndex = 15;
    let moves = 0;
    const puzzleSize = 16; // 4x4 grid
    const winningState = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

    // Initialize
    initTheme();
    initMusic();
    initGame();
    setupEventListeners();

    function initTheme() {
        const savedTheme = localStorage.getItem('pixelChatTheme') || 'default';
        document.body.className = `theme-${savedTheme}`;
        themeSelector.value = savedTheme;
    }

    function initMusic() {
        const musicEnabled = localStorage.getItem('pixelChatMusic') === 'true';
        if (musicEnabled) {
            bgMusic.play().catch(e => console.log("Autoplay prevented:", e));
            musicToggle.classList.add('music-on');
        }
    }

    function initGame() {
        // Initialize puzzle tiles
        puzzleState = [...winningState];
        renderPuzzle();
    }

    function setupEventListeners() {
        // Chat functionality
        userInput.addEventListener('input', autoResizeTextarea);
        sendButton.addEventListener('click', sendMessage);
        userInput.addEventListener('keydown', handleKeyDown);
        
        // Settings
        settingsButton.addEventListener('click', toggleSettings);
        closeSettingsButton.addEventListener('click', toggleSettings);
        themeSelector.addEventListener('change', changeTheme);
        clearChatButton.addEventListener('click', showClearChatAlert);
        
        // Music
        musicToggle.addEventListener('click', toggleMusic);
        
        // Game
        gameButton.addEventListener('click', toggleGame);
        closeGameButton.addEventListener('click', toggleGame);
        shuffleButton.addEventListener('click', shufflePuzzle);
        
        // Alert
        alertCancel.addEventListener('click', closeAlert);
        alertConfirm.addEventListener('click', confirmAction);
        
        // Add sound to all buttons
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', playPixelSound);
        });
        
        // Copy button functionality
        document.addEventListener('click', handleCopyButtonClick);
    }

    function autoResizeTextarea() {
        this.style.height = '40px';
        this.style.height = (Math.ceil(this.scrollHeight / 16) * 16) + 'px';
    }

    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        addMessage(message, 'user');
        userInput.value = '';
        userInput.style.height = '40px';
        
        showTypingIndicator();
        fetchAIResponse(message);
    }

    function addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = processCodeBlocks(content);
        
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = Math.ceil(chatMessages.scrollHeight / 16) * 16;
    }

    function showTypingIndicator() {
        const existingIndicator = document.querySelector('.typing-indicator');
        if (existingIndicator) existingIndicator.remove();
        
        const indicatorDiv = document.createElement('div');
        indicatorDiv.className = 'message bot-message typing-indicator';
        indicatorDiv.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(indicatorDiv);
        chatMessages.scrollTop = Math.ceil(chatMessages.scrollHeight / 16) * 16;
    }

    function hideTypingIndicator() {
        const indicator = document.querySelector('.typing-indicator');
        if (indicator) indicator.remove();
    }

    function fetchAIResponse(query) {
        const encodedQuery = encodeURIComponent(query);
        const apiUrl = `https://mannoffc-x.hf.space/ai/logic?q=${encodedQuery}&logic=disetiap%20start%20code%20dan%20end%20code%20harus%20ada%20\`\`\``;
        
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                hideTypingIndicator();
                if (data.status === 200 && data.result) {
                    addMessage(data.result, 'bot');
                } else {
                    addMessage("ERROR: COULDN'T PROCESS REQUEST", 'bot');
                }
            })
            .catch(error => {
                hideTypingIndicator();
                console.error('Error:', error);
                addMessage("NETWORK ERROR - TRY AGAIN", 'bot');
            });
    }

    function processCodeBlocks(text) {
        const codeBlockRegex = /```([\s\S]*?)```/g;
        return text.replace(codeBlockRegex, (match, code) => {
            const codeContent = code.replace(/^\w*\s+/gm, '').trim();
            return `<pre><code>${escapeHtml(codeContent)}</code><button class="copy-btn pixel-button">COPY</button></pre>`;
        });
    }

    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
            .replace(/\n/g, "<br>");
    }

    function toggleSettings() {
        settingsMenu.style.display = settingsMenu.style.display === 'flex' ? 'none' : 'flex';
    }

    function changeTheme() {
        const theme = this.value;
        document.body.className = `theme-${theme}`;
        localStorage.setItem('pixelChatTheme', theme);
    }

    function showClearChatAlert() {
        showAlert('CLEAR CHAT', 'Are you sure you want to clear the chat history?', () => {
            chatMessages.innerHTML = `
                <div class="message bot-message">
                    <div class="message-content">
                        <p>Chat cleared. How can I help you?</p>
                    </div>
                </div>
            `;
        });
    }

    function toggleMusic() {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.classList.add('music-on');
            localStorage.setItem('pixelChatMusic', 'true');
        } else {
            bgMusic.pause();
            musicToggle.classList.remove('music-on');
            localStorage.setItem('pixelChatMusic', 'false');
        }
    }

    function toggleGame() {
        gameContainer.style.display = gameContainer.style.display === 'flex' ? 'none' : 'flex';
        if (gameContainer.style.display === 'flex') {
            shufflePuzzle();
        }
    }

    function renderPuzzle() {
        puzzleContainer.innerHTML = '';
        puzzleState.forEach((tile, index) => {
            const tileElement = document.createElement('div');
            tileElement.className = 'puzzle-tile' + (tile === 0 ? ' empty' : '');
            tileElement.textContent = tile === 0 ? '' : tile;
            tileElement.dataset.index = index;
            tileElement.addEventListener('click', () => moveTile(index));
            puzzleContainer.appendChild(tileElement);
        });
    }

    function moveTile(index) {
        if (puzzleState[index] === 0) return;
        
        const row = Math.floor(index / 4);
        const col = index % 4;
        const emptyRow = Math.floor(emptyIndex / 4);
        const emptyCol = emptyIndex % 4;
        
        // Check if adjacent to empty space
        if ((Math.abs(row - emptyRow) === 1 && col === emptyCol) || 
            (Math.abs(col - emptyCol) === 1 && row === emptyRow)) {
            
            // Swap tiles
            [puzzleState[index], puzzleState[emptyIndex]] = [puzzleState[emptyIndex], puzzleState[index]];
            emptyIndex = index;
            moves++;
            movesCount.textContent = moves;
            renderPuzzle();
            
            // Check if puzzle is solved
            if (JSON.stringify(puzzleState) === JSON.stringify(winningState)) {
                showAlert('PUZZLE SOLVED!', `Congratulations! You solved it in ${moves} moves!`, () => {
                    toggleGame();
                });
            }
        }
    }

    function shufflePuzzle() {
        moves = 0;
        movesCount.textContent = moves;
        
        // Fisher-Yates shuffle algorithm
        for (let i = puzzleState.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [puzzleState[i], puzzleState[j]] = [puzzleState[j], puzzleState[i]];
        }
        
        // Find the new empty index
        emptyIndex = puzzleState.indexOf(0);
        renderPuzzle();
    }

    function showAlert(title, message, confirmCallback) {
        alertTitle.textContent = title;
        alertMessage.textContent = message;
        customAlert.style.display = 'flex';
        
        // Store the callback
        alertConfirm.callback = confirmCallback;
    }

    function closeAlert() {
        customAlert.style.display = 'none';
    }

    function confirmAction() {
        if (this.callback) {
            this.callback();
        }
        closeAlert();
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }

    function handleCopyButtonClick(e) {
        if (e.target.classList.contains('copy-btn')) {
            const codeBlock = e.target.parentElement;
            const code = codeBlock.querySelector('code').textContent.replace(/<br>/g, '\n');
            
            navigator.clipboard.writeText(code).then(() => {
                const originalText = e.target.innerHTML;
                e.target.innerHTML = 'COPIED!';
                setTimeout(() => {
                    e.target.innerHTML = originalText;
                }, 1000);
            }).catch(err => {
                console.error('Failed to copy:', err);
            });
        }
    }

    function playPixelSound() {
        const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...');
        audio.volume = 0.2;
        audio.play().catch(e => console.log("Audio play failed:", e));
    }
});