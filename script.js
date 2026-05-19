// Initial Data: Leaderboard
let participants = [
    { id: 1, name: "Alex Mercer", points: 2450 },
    { id: 2, name: "Sarah Chen", points: 2310 },
    { id: 3, name: "Marcus Johnson", points: 2100 },
    { id: 4, name: "Emma Watson", points: 1950 },
    { id: 5, name: "David Kim", points: 1820 }
];

// Initial Data: Challenges
const challenges = [
    { id: 1, title: "Summer Sprint 100km", desc: "Run 100km before the end of the month.", progress: 75 },
    { id: 2, title: "30 Days of Yoga", desc: "Complete a yoga session every day.", progress: 40 },
    { id: 3, title: "Heavy Lifter", desc: "Log 10 weightlifting sessions.", progress: 90 }
];

// Initial Data: Workout Logs
let workoutLogs = [
    { id: 1, type: "Running", duration: 45, points: 150, date: new Date().toLocaleDateString() },
    { id: 2, type: "Yoga", duration: 30, points: 50, date: new Date().toLocaleDateString() }
];

// --- TAB SWITCHING LOGIC ---
window.switchTab = function (tabId) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Add active class to clicked tab
    event.currentTarget.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// --- LEADERBOARD LOGIC ---
const leaderboardEl = document.getElementById('leaderboard-list');

function renderLeaderboard() {
    participants.sort((a, b) => b.points - a.points);
    leaderboardEl.innerHTML = '';

    participants.forEach((user, index) => {
        const rank = index + 1;
        const li = document.createElement('li');
        li.className = `participant rank-${rank}`;

        const initials = user.name.split(' ').map(n => n[0]).join('');

        li.innerHTML = `
            <div class="rank">${rank}</div>
            <div class="user-info">
                <div class="avatar">${initials}</div>
                <div class="name">${user.name}</div>
            </div>
            <div class="points">${user.points.toLocaleString()} pts</div>
        `;
        leaderboardEl.appendChild(li);
    });
}

window.simulateActivity = function () {
    const randomIndex = Math.floor(Math.random() * participants.length);
    const pointsToAdd = Math.floor(Math.random() * 150) + 50;
    participants[randomIndex].points += pointsToAdd;
    renderLeaderboard();
}

// --- CHALLENGES LOGIC ---
const challengesEl = document.getElementById('challenges-list');

function renderChallenges() {
    challengesEl.innerHTML = '';
    challenges.forEach(challenge => {
        const div = document.createElement('div');
        div.className = 'challenge-card';
        div.innerHTML = `
            <div class="challenge-title">${challenge.title}</div>
            <div class="challenge-desc">${challenge.desc}</div>
            <div style="text-align:right; font-size: 0.8rem; color: var(--text-muted);">${challenge.progress}%</div>
            <div class="progress-bar-container">
                <div class="progress-bar" style="width: ${challenge.progress}%;"></div>
            </div>
        `;
        challengesEl.appendChild(div);
    });
}

// --- WORKOUT LOGS LOGIC ---
const historyListEl = document.getElementById('history-list');

function renderWorkoutLogs() {
    historyListEl.innerHTML = '';
    workoutLogs.forEach(log => {
        const li = document.createElement('li');
        li.className = 'history-item';
        li.innerHTML = `
            <div>
                <strong>${log.type}</strong> (${log.duration} mins) - <span style="color:var(--text-muted); font-size:0.8rem;">${log.date}</span>
            </div>
            <div class="history-points">+${log.points} pts</div>
        `;
        historyListEl.appendChild(li);
    });
}

window.submitWorkout = function (event) {
    event.preventDefault(); // Prevent page reload

    const type = document.getElementById('workout-type').value;
    const duration = parseInt(document.getElementById('duration').value);

    // Simple point calculation: duration * 2
    const points = duration * 2;

    // Add to logs
    workoutLogs.unshift({
        id: workoutLogs.length + 1,
        type: type,
        duration: duration,
        points: points,
        date: new Date().toLocaleDateString()
    });

    // Automatically add points to the first user (Mock logic)
    participants[0].points += points;

    // Re-render
    renderWorkoutLogs();
    renderLeaderboard();

    // Reset form
    document.getElementById('workout-form').reset();

    // Show a quick alert
    alert(`Workout Logged! You earned ${points} points.`);
}

// --- INITIALIZE EVERYTHING ---
renderLeaderboard();
renderChallenges();
renderWorkoutLogs();

// Simulate live activity every 3 seconds
setInterval(() => {
    window.simulateActivity();
}, 3000);
