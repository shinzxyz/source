const app = {
    // Configuration
    GITHUB_USERNAME: 'shinzxyz',
    GITHUB_TOKEN = process.env.token,
    REPO: 'webku',
    FILE_PATH: 'data.json',
    THEME_KEY: 'selectedTheme',

    // Global variables
    data: {
        apis: [],
        scripts: [],
        codes: [],
        music: null
    },
    isLoggedIn: false,
    currentUsername: '',
    currentToken: '',
    currentTheme: 'default',

    // Initialize the app
    init: function() {
        this.checkSession();
        this.setupEventListeners();
        this.loadData();
        this.setupSectionNavigation();
        this.showSection('apis');
        
        // Initialize music player
        const music = document.getElementById('bgMusic');
        music.volume = 0.3;
        
        // Initialize theme
        const savedTheme = localStorage.getItem(this.THEME_KEY);
        if (savedTheme) {
            this.currentTheme = savedTheme;
        }
        this.applyTheme();
    },

    // Theme functions
    showThemeSelector: function() {
        document.getElementById('themeModal').style.display = 'block';
    },

    closeThemeModal: function() {
        document.getElementById('themeModal').style.display = 'none';
    },

    changeTheme: function(themeName) {
        this.currentTheme = themeName;
        this.applyTheme();
        localStorage.setItem(this.THEME_KEY, themeName);
        this.closeThemeModal();
    },

    applyTheme: function() {
        const root = document.documentElement;
        
        switch(this.currentTheme) {
    case 'neon':
    root.style.setProperty('--primary-color', '#39ff14');
    root.style.setProperty('--secondary-color', '#0affef');
    root.style.setProperty('--accent-color', '#ff0266');
    root.style.setProperty('--dark-color', '#000000');
    root.style.setProperty('--light-color', '#121212');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#000000');
    root.style.setProperty('--title-color', '#000000'); // judul juga putih
    root.style.setProperty('--button-label-color', '#ffffff');
    break;

case 'ocean':
    root.style.setProperty('--primary-color', '#0077be');
    root.style.setProperty('--secondary-color', '#3399cc');
    root.style.setProperty('--accent-color', '#005f8b');
    root.style.setProperty('--dark-color', '#002f4b');
    root.style.setProperty('--light-color', '#cceeff');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--title-color', '#e0f7ff');
    break;
case 'fire':
    root.style.setProperty('--primary-color', '#ff4500');
    root.style.setProperty('--secondary-color', '#ff6347');
    root.style.setProperty('--accent-color', '#ffa500');
    root.style.setProperty('--dark-color', '#330000');
    root.style.setProperty('--light-color', '#ffe5b4');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#ff6347');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#330000');
    break;
    case 'sakura':
    root.style.setProperty('--primary-color', '#ffb7c5');
    root.style.setProperty('--secondary-color', '#ffe4ec');
    root.style.setProperty('--accent-color', '#ffdce0');
    root.style.setProperty('--dark-color', '#c47a92');
    root.style.setProperty('--light-color', '#fff6f9');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#5c2a3c');
    root.style.setProperty('--button-bg', '#ffffff');
    root.style.setProperty('--button-label-color', '#5c2a3c');
    root.style.setProperty('--title-color', '#5c2a3c');
    break;
    case 'monochrome':
    root.style.setProperty('--primary-color', '#cccccc');
    root.style.setProperty('--secondary-color', '#aaaaaa');
    root.style.setProperty('--accent-color', '#888888');
    root.style.setProperty('--dark-color', '#333333');
    root.style.setProperty('--light-color', '#f0f0f0');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#000000');
    root.style.setProperty('--button-bg', '#ffffff');
    root.style.setProperty('--button-label-color', '#222222');
    root.style.setProperty('--title-color', '#111111');
    break;
    case 'lavender':
    root.style.setProperty('--primary-color', '#b497bd');
    root.style.setProperty('--secondary-color', '#d4b8e7');
    root.style.setProperty('--accent-color', '#e6c7f1');
    root.style.setProperty('--dark-color', '#5e4b63');
    root.style.setProperty('--light-color', '#f9f5fc');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#3e2f4f');
    root.style.setProperty('--button-bg', '#ffffff');
    root.style.setProperty('--button-label-color', '#3e2f4f');
    root.style.setProperty('--title-color', '#3e2f4f');
    break;
    case 'arctic':
    root.style.setProperty('--primary-color', '#d0f0ff');
    root.style.setProperty('--secondary-color', '#a0d8ef');
    root.style.setProperty('--accent-color', '#70c1e5');
    root.style.setProperty('--dark-color', '#3a506b');
    root.style.setProperty('--light-color', '#f0faff');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#1a1a1a');
    break;

case 'bronze':
    root.style.setProperty('--primary-color', '#cd7f32');
    root.style.setProperty('--secondary-color', '#b87333');
    root.style.setProperty('--accent-color', '#8c5a2d');
    root.style.setProperty('--dark-color', '#4b3621');
    root.style.setProperty('--light-color', '#f5e0c3');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#2d1b0f');
    break;

case 'emerald':
    root.style.setProperty('--primary-color', '#50c878');
    root.style.setProperty('--secondary-color', '#3cb371');
    root.style.setProperty('--accent-color', '#2e8b57');
    root.style.setProperty('--dark-color', '#1e4d3a');
    root.style.setProperty('--light-color', '#d8fce1');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#0f2a1f');
    break;

case 'candy':
    root.style.setProperty('--primary-color', '#ff69b4');
    root.style.setProperty('--secondary-color', '#ffb6c1');
    root.style.setProperty('--accent-color', '#ffa07a');
    root.style.setProperty('--dark-color', '#ff1493');
    root.style.setProperty('--light-color', '#fff0f5');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#730047');
    break;

case 'desert':
    root.style.setProperty('--primary-color', '#edc9af');
    root.style.setProperty('--secondary-color', '#e0b084');
    root.style.setProperty('--accent-color', '#c2a56c');
    root.style.setProperty('--dark-color', '#8b6f47');
    root.style.setProperty('--light-color', '#fdf6e3');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#3b2e19');
    break;
    case 'cyberpunk':
    root.style.setProperty('--primary-color', '#ff0090');
    root.style.setProperty('--secondary-color', '#2f004f');
    root.style.setProperty('--accent-color', '#00ffe7');
    root.style.setProperty('--dark-color', '#0d0d0d');
    root.style.setProperty('--light-color', '#1a1a1a');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#0d0d0d');
    root.style.setProperty('--button-bg', '#00ffe7');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#000000');
    break;
case 'forest':
    root.style.setProperty('--primary-color', '#2e8b57');
    root.style.setProperty('--secondary-color', '#3cb371');
    root.style.setProperty('--accent-color', '#228b22');
    root.style.setProperty('--dark-color', '#1a3a1a');
    root.style.setProperty('--light-color', '#d0f0d0');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#102610');
    root.style.setProperty('--title-color', '#0b3d0b');
    break;

case 'sunset':
    root.style.setProperty('--primary-color', '#ff7e5f');
    root.style.setProperty('--secondary-color', '#feb47b');
    root.style.setProperty('--accent-color', '#ff6e7f');
    root.style.setProperty('--dark-color', '#4b2c5e');
    root.style.setProperty('--light-color', '#fff0ec');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#4b2c5e');
    root.style.setProperty('--title-color', '#3a1c71');
    break;

case 'matrix':
    root.style.setProperty('--primary-color', '#003b00');
    root.style.setProperty('--secondary-color', '#006400');
    root.style.setProperty('--accent-color', '#00aa00');
    root.style.setProperty('--dark-color', '#000000');
    root.style.setProperty('--light-color', '#ccffcc');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#000000');
    root.style.setProperty('--title-color', '#66ff66');
    break;

case 'pastel':
    root.style.setProperty('--primary-color', '#ffd1dc');
    root.style.setProperty('--secondary-color', '#c1f0f6');
    root.style.setProperty('--accent-color', '#dcd3ff');
    root.style.setProperty('--dark-color', '#aaa');
    root.style.setProperty('--light-color', '#ffffff');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#444444');
    root.style.setProperty('--title-color', '#333333');
    break;

case 'dark':
    root.style.setProperty('--primary-color', '#1e1e1e');
    root.style.setProperty('--secondary-color', '#2c2c2c');
    root.style.setProperty('--accent-color', '#3d3d3d');
    root.style.setProperty('--dark-color', '#000000');
    root.style.setProperty('--light-color', '#4a4a4a');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--title-color', '#000000'); // ← diubah
    root.style.setProperty('--button-label-color', '#ffffff'); // teks di atas tombol
    break;

case 'vintage':
    root.style.setProperty('--primary-color', '#c9b29b');
    root.style.setProperty('--secondary-color', '#a67c52');
    root.style.setProperty('--accent-color', '#66533c');
    root.style.setProperty('--dark-color', '#3b3024');
    root.style.setProperty('--light-color', '#f4e8d1');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#3b3024');
    root.style.setProperty('--title-color', '#402d20');
    break;

case 'midnight':
    root.style.setProperty('--primary-color', '#1a1a40');
    root.style.setProperty('--secondary-color', '#2e2e60');
    root.style.setProperty('--accent-color', '#3a3a80');
    root.style.setProperty('--dark-color', '#0d0d1a');
    root.style.setProperty('--light-color', '#4d4d80');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--title-color', '#ccccff');
    break;

case 'coffee':
    root.style.setProperty('--primary-color', '#6f4e37');
    root.style.setProperty('--secondary-color', '#a67b5b');
    root.style.setProperty('--accent-color', '#d2b48c');
    root.style.setProperty('--dark-color', '#3b2f2f');
    root.style.setProperty('--light-color', '#f5f5dc');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#2e1a0f');
    root.style.setProperty('--title-color', '#1c0f08');
    break;

case 'rose':
    root.style.setProperty('--primary-color', '#ff5c8a');
    root.style.setProperty('--secondary-color', '#ff99aa');
    root.style.setProperty('--accent-color', '#ffccd5');
    root.style.setProperty('--dark-color', '#7a2e4d');
    root.style.setProperty('--light-color', '#fff0f5');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#3d1f2b');
    root.style.setProperty('--title-color', '#4b0e24');
    break;

case 'ice':
    root.style.setProperty('--primary-color', '#b3e5fc');
    root.style.setProperty('--secondary-color', '#81d4fa');
    root.style.setProperty('--accent-color', '#4fc3f7');
    root.style.setProperty('--dark-color', '#0288d1');
    root.style.setProperty('--light-color', '#e1f5fe');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#01579b');
    root.style.setProperty('--title-color', '#013e6b');
    break;
case 'default':
    root.style.setProperty('--primary-color', '#a8d8ea');
    root.style.setProperty('--secondary-color', '#7ab3d0');
    root.style.setProperty('--accent-color', '#4c8cb5');
    root.style.setProperty('--dark-color', '#2c4a63');
    root.style.setProperty('--light-color', '#e0f7fa');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#333333');
    root.style.setProperty('--button-bg', ''); // reset
    root.style.setProperty('--button-label-color', '');
    root.style.setProperty('--title-color', '');
    break;
case 'space':
    root.style.setProperty('--primary-color', '#0b0033');
    root.style.setProperty('--secondary-color', '#3700b3');
    root.style.setProperty('--accent-color', '#6200ea');
    root.style.setProperty('--dark-color', '#000000');
    root.style.setProperty('--light-color', '#d1c4e9');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--title-color', '#9e9eff');
    break;
    default: // Default theme
        root.style.setProperty('--primary-color', '#a8d8ea');
        root.style.setProperty('--secondary-color', '#7ab3d0');
        root.style.setProperty('--accent-color', '#4c8cb5');
        root.style.setProperty('--dark-color', '#2c4a63');
        root.style.setProperty('--light-color', '#e0f7fa');
        root.style.setProperty('--text-color', '#000000');
        root.style.setProperty('--button-text', '#333333');
}
    },

    loadLocalThemes: function() {
        const localThemes = JSON.parse(localStorage.getItem(this.LOCAL_THEMES_KEY)) || [];
        const container = document.getElementById('localThemes');
        container.innerHTML = '';
        
        localThemes.forEach(theme => {
            const button = document.createElement('button');
            button.className = 'theme-option pixel-button';
            button.onclick = () => this.changeTheme(theme.name);
            button.innerHTML = `
                <div class="theme-preview" style="background: ${theme.color}"></div>
                ${theme.name}
            `;
            container.appendChild(button);
        });
    },

    addCustomTheme: function() {
        const themeName = document.getElementById('themeName').value.trim();
        if (!themeName) {
            this.showAlert('Please enter a theme name');
            return;
        }
        
        const localThemes = JSON.parse(localStorage.getItem(this.LOCAL_THEMES_KEY)) || [];
        
        const newTheme = {
            name: themeName,
            color: `#${Math.floor(Math.random()*16777215).toString(16)}`
        };
        
        localThemes.push(newTheme);
        localStorage.setItem(this.LOCAL_THEMES_KEY, JSON.stringify(localThemes));
        this.loadLocalThemes();
        document.getElementById('themeName').value = '';
        this.showAlert('Theme added!');
    },

    // Music Player Functionality
    toggleMusic: function() {
        const music = document.getElementById('bgMusic');
        const musicStatus = document.getElementById('musicStatus');
        
        if (music.children.length === 0) {
            const source = document.createElement('source');
            source.type = 'audio/mpeg';
            music.appendChild(source);
        }
        
        const source = music.querySelector('source');
        source.src = this.data.music || 'https://files.catbox.moe/igy3ft.mp3';
        
        if (music.paused) {
            music.play()
                .then(() => musicStatus.textContent = 'Pause')
                .catch(e => this.showAlert('Autoplay blocked: ' + e.message));
        } else {
            music.pause();
            musicStatus.textContent = 'Play';
        }
    },

    changeMusic: function(type) {
        const music = document.getElementById('bgMusic');
        const musicStatus = document.getElementById('musicStatus');
        const currentMusicName = document.getElementById('currentMusicName');
        
        if (type === 'default') {
            // Clear existing sources
            while (music.firstChild) {
                music.removeChild(music.firstChild);
            }
            
            const source = document.createElement('source');
            source.src = 'https://files.catbox.moe/igy3ft.mp3';
            source.type = 'audio/mpeg';
            music.appendChild(source);
            
            currentMusicName.textContent = 'Default';
            this.data.music = null;
        } else if (type === 'custom' && this.data.music) {
            // Already set up in loadData()
            currentMusicName.textContent = 'Custom';
        }
        
        music.load();
        if (musicStatus.textContent === 'Pause') {
            music.play().catch(e => {
                console.log('Autoplay prevented:', e);
            });
        }
    },

    closeMusicModal: function() {
        document.getElementById('musicModal').style.display = 'none';
    },

    // Pixel Art Alert System
    showAlert: function(message, duration = 3000) {
        const alertBox = document.getElementById('pixelAlert');
        const alertMessage = document.getElementById('pixelAlertMessage');
        const alertClose = document.getElementById('pixelAlertClose');
        const overlay = document.createElement('div');
        overlay.className = 'alert-overlay';
        document.body.appendChild(overlay);
        
        alertMessage.textContent = message;
        alertBox.style.display = 'block';
        overlay.style.display = 'block';
        
        alertClose.onclick = () => {
            alertBox.style.display = 'none';
            overlay.style.display = 'none';
        };
        
        if (duration > 0) {
            setTimeout(() => {
                alertBox.style.display = 'none';
                overlay.style.display = 'none';
            }, duration);
        }
    },

confirmAlert: function(message) {
    return new Promise((resolve) => {
        const alertBox = document.getElementById('pixelAlert');
        const alertMessage = document.getElementById('pixelAlertMessage');
        const alertClose = document.getElementById('pixelAlertClose');
        const overlay = document.createElement('div');
        overlay.className = 'alert-overlay';
        document.body.appendChild(overlay);

        alertMessage.innerHTML = `
            <p>${message}</p>
            <div class="confirm-buttons">
                <button id="confirmYes" class="pixel-button">Yes</button>
                <button id="confirmNo" class="pixel-button">No</button>
            </div>
        `;
        alertBox.style.display = 'block';
        overlay.style.display = 'block';

        document.getElementById('confirmYes').onclick = () => {
            alertBox.style.display = 'none';
            overlay.remove();
            resolve(true);
        };
        document.getElementById('confirmNo').onclick = () => {
            alertBox.style.display = 'none';
            overlay.remove();
            resolve(false);
        };

        alertClose.onclick = () => {
            alertBox.style.display = 'none';
            overlay.remove();
            resolve(false);
        };
    });
},
    setupSectionNavigation: function() {
        const nav = document.querySelector('.pixel-nav');
        
        nav.addEventListener('click', (e) => {
            const button = e.target.closest('button[data-section]');
            if (button) {
                this.showSection(button.dataset.section);
            }
        });
    },

    showSection: function(sectionId) {
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        document.querySelectorAll('.pixel-nav button').forEach(button => {
            button.classList.remove('active');
        });
        
        const section = document.getElementById(sectionId);
        if (section) section.classList.add('active');
        
        const activeBtn = document.querySelector(`.pixel-nav button[data-section="${sectionId}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    },

    setupEventListeners: function() {
        document.getElementById('itemType').addEventListener('change', (e) => {
            const type = e.target.value;
            
            // Hide all fields first
            document.getElementById('itemName').style.display = 'none';
            document.querySelectorAll('.api-field').forEach(field => field.style.display = 'none');
            document.querySelectorAll('.script-field').forEach(field => field.style.display = 'none');
            document.getElementById('itemCode').style.display = 'none';
            document.querySelector('.music-field').style.display = 'none';
            
            // Show relevant fields
            if (type === 'apis') {
                document.getElementById('itemName').style.display = 'block';
                document.querySelectorAll('.api-field').forEach(field => field.style.display = 'block');
            } else if (type === 'scripts') {
                document.getElementById('itemName').style.display = 'block';
                document.querySelectorAll('.script-field').forEach(field => field.style.display = 'block');
            } else if (type === 'codes') {
                document.getElementById('itemName').style.display = 'block';
                document.getElementById('itemCode').style.display = 'block';
            } else if (type === 'music') {
                document.querySelector('.music-field').style.display = 'block';
            }
        });
    },

    copyToClipboard: function(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                this.showAlert('Copied to clipboard!');
            } else {
                throw new Error('Copy command failed');
            }
        } catch (err) {
            console.error('Failed to copy:', err);
            this.showAlert('Failed to copy: ' + err.message);
        } finally {
            document.body.removeChild(textarea);
        }
    },

    copyCode: function(code) {
        navigator.clipboard.writeText(code).then(() => {
            this.showAlert('Code copied to clipboard!');
        }).catch(err => {
            this.showAlert('Failed to copy code.');
            console.error('Copy failed:', err);
        });
    },

    checkSession: function() {
        const username = sessionStorage.getItem('githubUsername');
        const token = sessionStorage.getItem('githubToken');
        
        if (username && token && username === this.GITHUB_USERNAME && token === this.GITHUB_TOKEN) {
            this.currentUsername = username;
            this.currentToken = token;
            this.isLoggedIn = true;
            this.updateUI();
        }
    },

    login: function() {
        const username = document.getElementById('githubUsername').value;
        const token = document.getElementById('githubToken').value;
        
        if (!username || !token) {
            this.showAlert('Please enter both username and token');
            return;
        }
        
        if (username !== this.GITHUB_USERNAME || token !== this.GITHUB_TOKEN) {
            this.showAlert('Invalid GitHub credentials');
            return;
        }
        
        this.currentUsername = username;
        this.currentToken = token;
        this.isLoggedIn = true;
        
        sessionStorage.setItem('githubUsername', username);
        sessionStorage.setItem('githubToken', token);
        
        this.updateUI();
        this.loadData();
    },

    logout: function() {
        this.isLoggedIn = false;
        this.currentUsername = '';
        this.currentToken = '';
        
        sessionStorage.removeItem('githubUsername');
        sessionStorage.removeItem('githubToken');
        
        this.updateUI();
    },

    updateUI: function() {
        if (this.isLoggedIn) {
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('userInfo').style.display = 'flex';
            document.getElementById('addBtn').style.display = 'block';
            document.getElementById('loggedInUser').textContent = `Logged in as ${this.currentUsername}`;
        } else {
            document.getElementById('loginForm').style.display = 'flex';
            document.getElementById('userInfo').style.display = 'none';
            document.getElementById('addBtn').style.display = 'none';
            document.getElementById('addForm').style.display = 'none';
        }
    },

    async loadData() {
        try {
            const response = await fetch(`https://api.github.com/repos/${this.GITHUB_USERNAME}/${this.REPO}/contents/${this.FILE_PATH}`, {
                headers: {
                    'Authorization': `token ${this.GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            
            const fileData = await response.json();
            const content = atob(fileData.content);
            this.data = JSON.parse(content);
            
            // Load and initialize music if available
            if (this.data.music) {
                const music = document.getElementById('bgMusic');
                // Clear existing sources
                while (music.firstChild) {
                    music.removeChild(music.firstChild);
                }
                // Add new source
                const source = document.createElement('source');
                source.src = this.data.music;
                source.type = 'audio/mpeg';
                music.appendChild(source);
                
                // Load the new source
                music.load();
                
                // Update music info
                if (document.getElementById('currentMusicName')) {
                    document.getElementById('currentMusicName').textContent = 'Custom';
                }
            }
            
            this.renderData();
        } catch (error) {
            console.error('Error loading data:', error);
            this.showAlert('Failed to load data. ' + error.message);
            
            // Initialize with empty data if loading fails
            this.data = {
                apis: [],
                scripts: [],
                codes: [],
                music: null
            };
            this.renderData();
        }
    },

    renderData: function() {
        this.renderApiItems();
        this.renderScriptItems();
        this.renderCodeItems();
    },

    renderApiItems: function() {
        const container = document.getElementById('apiItems');
        container.innerHTML = '';
        
        this.data.apis.forEach((api, index) => {
            const card = document.createElement('div');
            card.className = 'item-card pixel-box';
            
            const shortEndpoint = api.endpoint.length > 30 
                ? api.endpoint.substring(0, 27) + '...' 
                : api.endpoint;
                
            card.innerHTML = `
                <h3>${api.name}</h3>
                <p><strong>Endpoint:</strong> 
                    <span title="${api.endpoint}">${shortEndpoint}</span>
                </p>
                <p><strong>Type:</strong> ${api.type}</p>
                <div class="item-actions">
                    <button onclick="app.tryApi('${api.endpoint}', '${api.type}')" class="pixel-button">Try it</button>
                    <button onclick="app.copyToClipboard('${api.endpoint}')" class="pixel-button">Copy Endpoint</button>
                    ${this.isLoggedIn ? `<button onclick="app.deleteItem('apis', ${index})" class="pixel-button"><i class="fas fa-trash"></i></button>` : ''}
                </div>
            `;
            container.appendChild(card);
        });
    },

    renderScriptItems: function() {
        const container = document.getElementById('scriptItems');
        container.innerHTML = '';
        
        this.data.scripts.forEach((script, index) => {
            const card = document.createElement('div');
            card.className = 'item-card pixel-box';
            card.innerHTML = `
                <h3>${script.name}</h3>
                <p><strong>Link:</strong> ${script.link}</p>
                <div class="item-actions">
                    <button onclick="window.open('${script.link}', '_blank')" class="pixel-button">Go to Link</button>
                    <button onclick="app.copyToClipboard('${script.link}')" class="pixel-button">Copy Link</button>
                    ${this.isLoggedIn ? `<button onclick="app.deleteItem('scripts', ${index})" class="pixel-button"><i class="fas fa-trash"></i></button>` : ''}
                </div>
            `;
            container.appendChild(card);
        });
    },

    renderCodeItems: function() {
        const container = document.getElementById('codeItems');
        container.innerHTML = '';

        this.data.codes.forEach((code, index) => {
            const card = document.createElement('div');
            card.className = 'item-card pixel-box';

            const codeContent = document.createElement('div');
            codeContent.className = 'code-container';
            codeContent.innerHTML = `<pre><code>${this.escapeHtml(code.code)}</code></pre>`;

            const copyButton = document.createElement('button');
            copyButton.className = 'pixel-button';
            copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy Code';
            copyButton.addEventListener('click', () => {
                this.copyToClipboard(code.code);
            });

            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'item-actions';
            actionsDiv.appendChild(copyButton);

            if (this.isLoggedIn) {
                const deleteButton = document.createElement('button');
                deleteButton.className = 'pixel-button';
                deleteButton.innerHTML = '<i class="fas fa-trash"></i> Delete';
                deleteButton.addEventListener('click', () => this.deleteItem('codes', index));
                actionsDiv.appendChild(deleteButton);
            }

            const title = document.createElement('h3');
            title.textContent = code.name;

            card.appendChild(title);
            card.appendChild(codeContent);
            card.appendChild(actionsDiv);

            container.appendChild(card);
        });
    },

    async tryApi(endpoint, type) {
        if (type === 'json') {
            const modal = document.getElementById('outputModal');
            const output = document.getElementById('apiOutput');
            
            output.innerHTML = '<div class="loading-spinner"></div><p>Loading...</p>';
            modal.style.display = 'block';

            try {
                if (!endpoint.startsWith('http')) {
                    throw new Error('Invalid URL - must start with http:// or https://');
                }

                const response = await fetch(endpoint, {
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const jsonData = await response.json();
                output.innerHTML = `
                    <div class="response-header">
                        <h4>JSON Response</h4>
                        <button onclick="app.copyToClipboard(JSON.stringify(${JSON.stringify(jsonData, null, 2)}))" 
                                class="pixel-button small">
                            <i class="fas fa-copy"></i> Copy JSON
                        </button>
                    </div>
                    <pre>${JSON.stringify(jsonData, null, 2)}</pre>
                `;
            } catch (error) {
                output.innerHTML = `
                    <div class="error-message">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h4>Error</h4>
                        <p>${error.message}</p>
                    </div>
                `;
            }
        } else {
            window.open(endpoint, '_blank');
        }
    },

    closeModal: function() {
        document.getElementById('outputModal').style.display = 'none';
    },

    showAddForm: function(type = null) {
        document.getElementById('addForm').style.display = 'block';
        document.getElementById('itemName').value = '';
        document.getElementById('itemEndpoint').value = '';
        document.getElementById('itemScriptLink').value = '';
        document.getElementById('itemCode').value = '';
        document.getElementById('itemMusicUrl').value = '';
        
        if (type) {
            document.getElementById('itemType').value = type;
        } else {
            document.getElementById('itemType').value = 'apis';
        }
        
        // Trigger change event to show correct fields
        const event = new Event('change');
        document.getElementById('itemType').dispatchEvent(event);
    },

    hideAddForm: function() {
        document.getElementById('addForm').style.display = 'none';
    },

    async addItem() {
        const type = document.getElementById('itemType').value;
        
        if (type === 'music') {
            const musicUrl = document.getElementById('itemMusicUrl').value.trim();
            
            if (!musicUrl) {
                this.showAlert('Please enter a music URL');
                return;
            }
            
            if (!musicUrl.startsWith('http://') && !musicUrl.startsWith('https://')) {
                this.showAlert('Please enter a valid URL starting with http:// or https://');
                return;
            }
            
            if (!musicUrl.toLowerCase().endsWith('.mp3')) {
                this.showAlert('Warning: The URL might not be an MP3 file');
            }
            
            this.data.music = musicUrl;
            await this.saveData();
            this.showAlert('Custom music saved!');
            this.hideAddForm();
            
            // Update the player
            const music = document.getElementById('bgMusic');
            const source = music.querySelector('source') || document.createElement('source');
            source.src = musicUrl;
            source.type = 'audio/mpeg';
            if (!music.contains(source)) {
                music.appendChild(source);
            }
            music.load();
            return;
        }
        
        const name = document.getElementById('itemName').value.trim();
        
        if (!name) {
            this.showAlert('Please enter a name');
            return;
        }
        
        let newItem;
        
        if (type === 'apis') {
            const endpoint = document.getElementById('itemEndpoint').value.trim();
            const apiType = document.getElementById('itemApiType').value;
            
            if (!endpoint) {
                this.showAlert('Please enter an endpoint');
                return;
            }
            
            newItem = {
                name,
                endpoint,
                type: apiType
            };
        } else if (type === 'scripts') {
            const link = document.getElementById('itemScriptLink').value.trim();
            
            if (!link) {
                this.showAlert('Please enter a link');
                return;
            }
            
            newItem = {
                name,
                link
            };
        } else if (type === 'codes') {
            const code = document.getElementById('itemCode').value.trim();
            
            if (!code) {
                this.showAlert('Please enter code');
                return;
            }
            
            newItem = {
                name,
                code
            };
        }
        
        try {
            this.data[type].push(newItem);
            await this.saveData();
            this.renderData();
            this.hideAddForm();
            this.showAlert('Item added successfully!');
        } catch (error) {
            this.showAlert('Failed to add item: ' + error.message);
        }
    },

    async deleteItem(type, index) {
    const confirmed = await this.confirmAlert('Are you sure you want to delete this item?');
    if (!confirmed) return;

    try {
        this.data[type].splice(index, 1);
        await this.saveData();
        this.renderData();
        this.showAlert('Item deleted successfully!');
    } catch (error) {
        this.showAlert('Failed to delete item: ' + error.message);
    }
},

    async saveData() {
        if (!this.isLoggedIn) {
            throw new Error('You must be logged in to make changes');
        }
        
        try {
            const getResponse = await fetch(`https://api.github.com/repos/${this.GITHUB_USERNAME}/${this.REPO}/contents/${this.FILE_PATH}`, {
                headers: {
                    'Authorization': `token ${this.GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            
            if (!getResponse.ok) {
                throw new Error('Failed to fetch current file data');
            }
            
            const fileData = await getResponse.json();
            const sha = fileData.sha;
            const content = JSON.stringify(this.data, null, 2);
            const encodedContent = btoa(unescape(encodeURIComponent(content)));
            
            const updateResponse = await fetch(`https://api.github.com/repos/${this.GITHUB_USERNAME}/${this.REPO}/contents/${this.FILE_PATH}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${this.GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: 'Update data.json',
                    content: encodedContent,
                    sha: sha
                })
            });
            
            if (!updateResponse.ok) {
                throw new Error('Failed to update file');
            }
        } catch (error) {
            console.error('Error saving data:', error);
            throw error;
        }
    },

    escapeHtml: function(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    },

    escapeJsString: function(str) {
        return str
            .replace(/\\/g, '\\\\')
            .replace(/'/g, "\\'")
            .replace(/"/g, '\\"')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t');
    },

    // Start the application
    start: function() {
        document.addEventListener('DOMContentLoaded', () => this.init());
    }
};

// Initialize the app
app.start();