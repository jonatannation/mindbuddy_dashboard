document.addEventListener('DOMContentLoaded', function() {
    const content = document.getElementById('content');
    let pageName = document.location.pathname.split("/").pop().replace('.html', '');
    
    // If pageName is empty (i.e., we're on the index page), set it to 'index'
    if (!pageName) {
        pageName = 'index';
    }

    // Set the active menu item
    const menuItems = document.querySelectorAll('aside nav a');
    menuItems.forEach(item => {
        if (item.getAttribute('href') === pageName + '.html' || (pageName === 'index' && item.getAttribute('href') === 'index.html')) {
            item.classList.add('text-mindbuddy-lightblue');
            item.classList.remove('text-gray-600');
        }
    });

    // Load page-specific content
    fetch(pageName + '-content.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP error ' + response.status);
            }
            return response.text();
        })
        .then(html => {
            content.innerHTML = html;
            // After loading content, initialize dashboard if it's the index page
            if (pageName === 'index') {
                initializeDashboard();
            }
            // Add this condition to initialize the Reports page
            if (pageName === 'reports') {
                initializeReportsPage();
            }
            // Add this condition to initialize the Logged Sessions page
            if (pageName === 'loggedSessions') {
                initializeLoggedSessionsPage();
            }
            // Add this condition to initialize the Messaging page
            if (pageName === 'messaging') {
                initializeMessagingPage();
            }
            // Add this condition to initialize the Settings page
            if (pageName === 'settings') {
                initializeSettingsPage();
            }
            // Add this condition to initialize the Calendar page
            if (pageName === 'calendar') {
                initializeCalendarPage();
            }
        })
        .catch(error => {
            console.error('Error loading content:', error);
            content.innerHTML = '<h1 class="text-3xl font-bold mb-8 text-mindbuddy-navy font-space-grotesk">Error loading content</h1>';
        });
});

function initializeDashboard() {
    const teams = ['u15', 'u17', 'u19'];
    const colors = {
        red: '#FF7970',
        yellow: '#FFA828',
        green: '#68FC9B'
    };

    const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

    teams.forEach(team => {
        // Simulated data - replace with actual data in a real application
        const taskCompletion = Math.floor(Math.random() * (100 - 70) + 70); // 70-100%
        const joy = Math.floor(Math.random() * (100 - 50) + 50); // 50-100
        const motivation = Math.floor(Math.random() * (100 - 50) + 50); // 50-100
        const overallScore = (taskCompletion + joy + motivation) / 3;

        // Update task completion, joy, and motivation
        document.getElementById(`${team}-task-completion`).textContent = `${taskCompletion}%`;
        document.getElementById(`${team}-joy`).textContent = `${joy}/100`;
        document.getElementById(`${team}-motivation`).textContent = `${motivation}/100`;

        // Update team status color
        const statusElement = document.getElementById(`${team}-status`);
        const cardElement = document.getElementById(`${team}-card`);
        
        if (overallScore < 70) {
            statusElement.style.backgroundColor = colors.red;
            cardElement.style.borderLeftColor = colors.red;
        } else if (overallScore < 85) {
            statusElement.style.backgroundColor = colors.yellow;
            cardElement.style.borderLeftColor = colors.yellow;
        } else {
            statusElement.style.backgroundColor = colors.green;
            cardElement.style.borderLeftColor = colors.green;
        }

        // Create more realistic chart data
        const chartData = Array.from({length: 12}, (_, i) => {
            const baseValue = 70; // Start from a base value
            const maxVariation = 15; // Maximum variation up or down
            return baseValue + Math.floor(Math.random() * maxVariation * 2) - maxVariation;
        });

        // Create line chart
        const ctx = document.getElementById(`${team}-chart`).getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'Overall',
                    data: chartData,
                    borderColor: '#68B2FC',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    });

    // Popup functionality
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popupTitle');
    const popupContent = document.getElementById('popupContent');
    const closePopup = document.getElementById('closePopup');

    function showPopup(title, content) {
        popupTitle.textContent = title;
        popupContent.textContent = content;
        overlay.style.display = 'block';
        popup.style.display = 'block';
    }

    function hidePopup() {
        overlay.style.display = 'none';
        popup.style.display = 'none';
    }

    if (closePopup) {
        closePopup.addEventListener('click', hidePopup);
    }
    if (overlay) {
        overlay.addEventListener('click', hidePopup);
    }

     // Add click event listeners to specific links
     document.querySelectorAll('a[data-popup]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.getAttribute('data-popup');
            let popupTitle, popupContent;

            switch(linkText) {
                case 'team-details':
                    popupTitle = 'Team Details';
                    popupContent = 'Here you can view and edit detailed information about the team.';
                    break;
                case 'recommendation-details':
                    popupTitle = 'Recommendation Details';
                    popupContent = 'This section provides more information about the recommended action.';
                    break;
                case 'send-reminder':
                    popupTitle = 'Send Reminder';
                    popupContent = 'You can send a reminder to this player about their upcoming session or task.';
                    break;
                case 'player-profile':
                    popupTitle = 'Player Profile';
                    popupContent = 'View detailed information about this player, including their performance history and personal details.';
                    break;
                default:
                    popupTitle = 'Information';
                    popupContent = 'Additional information will be displayed here.';
            }

            showPopup(popupTitle, popupContent);
        });
    });
}

function openModal(modalId, imageSrc = '') {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        if (modalId === 'imageModal' && imageSrc) {
            const modalImage = modal.querySelector('img');
            if (modalImage) {
                modalImage.src = imageSrc;
            }
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Add this function to your existing template.js file
function initializeReportsPage() {
    const reportForm = document.getElementById('reportForm');
    const timePeriod = document.getElementById('timePeriod');
    const customDateRange = document.getElementById('customDateRange');
    const recentReports = document.getElementById('recentReports');
    const loadingAnimation = document.getElementById('loadingAnimation');
    const generatedReport = document.getElementById('generatedReport');
    const reportContent = document.getElementById('reportContent');

    // Show/hide custom date range based on time period selection
    timePeriod.addEventListener('change', function() {
        if (this.value === 'custom') {
            customDateRange.classList.remove('hidden');
        } else {
            customDateRange.classList.add('hidden');
        }
    });

    // Handle report form submission
    reportForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const reportData = Object.fromEntries(formData.entries());
        
        startLoading();
        // In a real application, you'd pass reportData to your backend here
    });

    function startLoading() {
        const loadingText = document.getElementById('loadingText');
        const loadingMessages = [
            "Analyzing team data...",
            "Crunching the numbers...",
            "Generating insights...",
            "Preparing your report..."
        ];
        let messageIndex = 0;

        loadingAnimation.classList.remove('hidden');
        
        const messageInterval = setInterval(() => {
            loadingText.textContent = loadingMessages[messageIndex];
            messageIndex = (messageIndex + 1) % loadingMessages.length;
        }, 1500);

        // Simulate report generation (replace with actual API call in production)
        setTimeout(() => {
            clearInterval(messageInterval);
            loadingAnimation.classList.add('hidden');
            generateReport({
                team: document.getElementById('team').value,
                timePeriod: timePeriod.value,
                sections: Array.from(document.querySelectorAll('input[name="sections"]:checked')).map(el => el.value)
            });
        }, 6000); // Adjust time as needed
    }

    function generateReport(reportData) {
        // Simulate report generation
        let reportHtml = '';

        reportHtml += `
            <h2 class="text-2xl font-semibold mb-4">${reportData.team} Team Report</h2>
            <p>Time Period: ${getFullText(reportData.timePeriod)}</p>
        `;

        if (reportData.sections.includes('playersJoy')) {
            const joyScore = 85;
            reportHtml += `
                <div class="mb-6 bg-mindbuddy-lightgray p-4 rounded-lg">
                    <h4 class="text-lg font-semibold mb-2">Players Joy</h4>
                    <p class="mb-2">${getTrafficLight(joyScore)} Average joy score: ${joyScore}/100 (Target: 80+)</p>
                    <p class="mb-2">Key insights:</p>
                    <ul class="list-disc list-inside ml-4 space-y-1">
                        <li>Improved team morale (30% increase in positive feedback)</li>
                        <li>Increased participation in voluntary team activities (up by 25%)</li>
                        <li>Reduced interpersonal conflicts (down by 40% this quarter)</li>
                    </ul>
                    <p class="mt-2">Top joy-inducing activities:</p>
                    <ol class="list-decimal list-inside ml-4 space-y-1">
                        <li>Group meditation sessions (85% participation)</li>
                        <li>Team-building escape room challenge (100% participation)</li>
                        <li>Post-practice social gatherings (78% average attendance)</li>
                    </ol>
                </div>
            `;
        }

        if (reportData.sections.includes('playerRewards')) {
            const rewardParticipation = 85;
            reportHtml += `
                <div class="mb-6 bg-mindbuddy-lightgray p-4 rounded-lg">
                    <h4 class="text-lg font-semibold mb-2">Player Rewards</h4>
                    <p class="mb-2">${getTrafficLight(rewardParticipation)} Reward program participation: ${rewardParticipation}% (Target: 75%)</p>
                    <p class="mb-2">Recent awards:</p>
                    <ul class="list-disc list-inside ml-4 space-y-1">
                        <li>"Team Player of the Month": Sarah Johnson (for exceptional leadership)
                            <ul class="list-circle list-inside ml-4 space-y-1">
                                <li>Organized 3 team-building events</li>
                                <li>Mentored 2 junior team members</li>
                            </ul>
                        </li>
                        <li>"Most Improved": Michael Chen (significant progress in mental resilience)
                            <ul class="list-circle list-inside ml-4 space-y-1">
                                <li>Reduced pre-game anxiety by 40%</li>
                                <li>Improved performance under pressure by 25%</li>
                            </ul>
                        </li>
                        <li>"Mindfulness Champion": Emma Thompson (consistent practice and team encouragement)
                            <ul class="list-circle list-inside ml-4 space-y-1">
                                <li>Completed 30-day mindfulness challenge</li>
                                <li>Led 5 group meditation sessions</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            `;
        }

        if (reportData.sections.includes('appUsage')) {
            const appUsageRate = 68;
            reportHtml += `
                <div class="mb-6 bg-mindbuddy-lightgray p-4 rounded-lg">
                    <h4 class="text-lg font-semibold mb-2">App Usage</h4>
                    <p class="mb-2">${getTrafficLight(appUsageRate)} Daily active users: ${appUsageRate}% (Target: 75%)</p>
                    <p class="mb-2">Usage insights:</p>
                    <ul class="list-disc list-inside ml-4 space-y-1">
                        <li>Most used features:
                            <ol class="list-decimal list-inside ml-4 space-y-1">
                                <li>Team Chat (92% engagement)</li>
                                <li>Mood Tracker (85% daily use)</li>
                                <li>Guided Meditations (78% weekly use)</li>
                            </ol>
                        </li>
                        <li>Least used feature: Personal Goal Setting (23% engagement)</li>
                        <li>Growing popularity: Mindfulness exercises (45% increase this month)</li>
                    </ul>
                    <p class="mt-2">User feedback:</p>
                    <ul class="list-disc list-inside ml-4 space-y-1">
                        <li>88% find the app "very helpful" for mental preparation</li>
                        <li>72% report improved team communication through the app</li>
                        <li>95% would recommend the app to other athletes</li>
                    </ul>
                </div>
            `;
        }

        if (reportData.sections.includes('teamTogetherness')) {
            const togethernessScore = 82;
            reportHtml += `
                <div class="mb-6 bg-mindbuddy-lightgray p-4 rounded-lg">
                    <h4 class="text-lg font-semibold mb-2">Team Togetherness</h4>
                    <p class="mb-2">${getTrafficLight(togethernessScore)} Team cohesion score: ${togethernessScore}/100 (Target: 80+)</p>
                    <p class="mb-2">Key insights:</p>
                    <ul class="list-disc list-inside ml-4 space-y-1">
                        <li>Improved communication during practice sessions (30% increase in effective interactions)</li>
                        <li>Increased participation in voluntary team activities (up by 25%)</li>
                        <li>Reduced interpersonal conflicts (down by 40% this quarter)</li>
                    </ul>
                    <p class="mt-2">Team-building initiatives:</p>
                    <ol class="list-decimal list-inside ml-4 space-y-1">
                        <li>Weekly team dinners (85% average attendance)</li>
                        <li>Monthly outdoor adventure activities (92% participation rate)</li>
                        <li>Peer-to-peer mentoring program (100% of senior players participating)</li>
                    </ol>
                    <p class="mt-2">Areas for improvement:</p>
                    <ul class="list-disc list-inside ml-4 space-y-1">
                        <li>Integration of new team members (current satisfaction: 65%)</li>
                        <li>Cross-positional understanding and cooperation (rated 7/10 by players)</li>
                    </ul>
                </div>
            `;
        }

        // Add the download button at the end of the report
        reportHtml += `
            <div class="mt-8 text-center">
                <button id="downloadReportBtn" class="bg-mindbuddy-navy text-white px-6 py-2 rounded-md hover:bg-opacity-80 transition duration-300">
                    <i class="fas fa-download mr-2"></i>Download Report
                </button>
            </div>
        `;

        reportContent.innerHTML = reportHtml;
        generatedReport.classList.remove('hidden');
    }

    function getFullText(timePeriod) {
        switch (timePeriod) {
            case 'lastWeek':
                return 'Last Week';
            case 'lastMonth':
                return 'Last Month';
            case 'lastQuarter':
                return 'Last Quarter';
            case 'lastYear':
                return 'Last Year';
            case 'custom':
                return 'Custom Date Range';
            default:
                return 'Unknown';
        }
    }

    function getTrafficLight(score) {
        if (score < 70) {
            return '<span class="text-mindbuddy-red">🔴</span>';
        } else if (score < 85) {
            return '<span class="text-mindbuddy-yellow">🟡</span>';
        } else {
            return '<span class="text-mindbuddy-green">🟢</span>';
        }
    }
}

function initializeLoggedSessionsPage() {
    const logNewSessionBtn = document.getElementById('logNewSessionBtn');
    const viewPreviousSessionsBtn = document.getElementById('viewPreviousSessionsBtn');
    const analyzeSessionsBtn = document.getElementById('analyzeSessionsBtn');
    const newSessionForm = document.getElementById('newSessionForm');
    const previousSessions = document.getElementById('previousSessions');
    const playerName = document.getElementById('playerName');
    const otherPlayerName = document.getElementById('otherPlayerName');
    const writeNotesBtn = document.getElementById('writeNotesBtn');
    const uploadAudioBtn = document.getElementById('uploadAudioBtn');
    const sessionNotes = document.getElementById('sessionNotes');
    const audioUpload = document.getElementById('audioUpload');
    const aiSummaryModal = document.getElementById('aiSummaryModal');
    const aiSummary = document.getElementById('aiSummary');
    const closeModal = document.getElementById('closeModal');
    const aiAnalysisSection = document.getElementById('aiAnalysisSection');
    const teamFilter = document.getElementById('teamFilter');
    const yearFilter = document.getElementById('yearFilter');
    const aiAnalyzeBtn = document.getElementById('aiAnalyzeBtn');
    const historicalSessions = document.getElementById('historicalSessions');
    const analysisProgress = document.getElementById('analysisProgress');
    const progressText = document.getElementById('progressText');
    const analysisResult = document.getElementById('analysisResult');
    const analysisText = document.getElementById('analysisText');

    logNewSessionBtn.addEventListener('click', function() {
        newSessionForm.classList.remove('hidden');
        previousSessions.classList.add('hidden');
        aiAnalysisSection.classList.add('hidden');
    });

    viewPreviousSessionsBtn.addEventListener('click', function() {
        newSessionForm.classList.add('hidden');
        previousSessions.classList.remove('hidden');
        aiAnalysisSection.classList.add('hidden');
    });

    analyzeSessionsBtn.addEventListener('click', function() {
        newSessionForm.classList.add('hidden');
        previousSessions.classList.add('hidden');
        aiAnalysisSection.classList.remove('hidden');
    });

    playerName.addEventListener('change', function() {
        if (this.value === 'other') {
            otherPlayerName.classList.remove('hidden');
        } else {
            otherPlayerName.classList.add('hidden');
        }
    });

    writeNotesBtn.addEventListener('click', function() {
        sessionNotes.classList.remove('hidden');
        audioUpload.classList.add('hidden');
    });

    uploadAudioBtn.addEventListener('click', function() {
        sessionNotes.classList.add('hidden');
        audioUpload.classList.remove('hidden');
    });

    newSessionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically send the form data to your backend
        // For this example, we'll just show a mock AI summary
        
        const mockAISummary = "AI-generated summary: The session focused on addressing pre-game anxiety. Key points discussed include deep breathing exercises, positive self-talk, and visualization techniques. The player showed progress in implementing these strategies. Recommended follow-up: Practice visualization daily and check in after the next game.";
        
        aiSummary.textContent = mockAISummary;
        aiSummaryModal.classList.remove('hidden');
    });

    closeModal.addEventListener('click', function() {
        aiSummaryModal.classList.add('hidden');
    });

    teamFilter.addEventListener('change', filterSessions);
    yearFilter.addEventListener('change', filterSessions);

    function filterSessions() {
        const team = teamFilter.value;
        const year = yearFilter.value;
        // Here you would filter the sessions based on the selected team and year
        console.log(`Filtering sessions for team: ${team}, year: ${year}`);
        // Update the historicalSessions div with the filtered results
    }

    aiAnalyzeBtn.addEventListener('click', function() {
        // Show progress animation and hide the button
        analysisProgress.classList.remove('hidden');
        aiAnalyzeBtn.classList.add('hidden');
        analysisResult.classList.add('hidden');

        // Simulate analysis
        let dots = '';
        const interval = setInterval(() => {
            dots = dots.length < 3 ? dots + '.' : '';
            progressText.textContent = `Analyzing sessions${dots}`;
        }, 500);

        // Show result after 5 seconds
        setTimeout(() => {
            clearInterval(interval);
            showAnalysisResult();
        }, 5000);
    });

    function showAnalysisResult() {
        analysisProgress.classList.add('hidden');
        analysisResult.classList.remove('hidden');
        aiAnalyzeBtn.classList.remove('hidden');

        // Mock analysis result - replace with actual AI analysis in production
        analysisText.textContent = "Based on the analysis of historical sessions, we've identified recurring patterns in pre-game anxiety among players. There's a noticeable improvement in performance when visualization techniques are consistently applied. The analysis also highlights a correlation between personalized goal-setting exercises and increased motivation levels among athletes.";
        
        // Mock recommendations
        const recommendations = [
            "Increase the frequency of visualization exercises",
            "Implement regular mindfulness sessions for all players",
            "Conduct monthly workshops on effective communication strategies",
        ];

        const recommendationsList = document.getElementById('recommendationsList');
        recommendationsList.innerHTML = recommendations.map(rec => `<li>${rec}</li>`).join('');
    }

    // Add event listeners for new buttons
    document.querySelector('button:contains("Download Report")').addEventListener('click', function() {
        // Implement download functionality
        console.log('Downloading report...');
    });

    document.querySelector('button:contains("Share Results")').addEventListener('click', function() {
        // Implement share functionality
        console.log('Sharing results...');
    });
}

function initializeMessagingPage() {
    // Implement the functionality for the Messaging page here
    // This function will be called when the Messaging page is loaded
}

function initializeSettingsPage() {
    // Account Settings Form
    const accountSettingsForm = document.getElementById('accountSettingsForm');
    accountSettingsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        console.log('Account settings updated');
    });

    // Password Change Form
    const passwordChangeForm = document.getElementById('passwordChangeForm');
    passwordChangeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        console.log('Password changed');
    });

    // Notification Preferences Form
    const notificationPreferencesForm = document.getElementById('notificationPreferencesForm');
    notificationPreferencesForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        console.log('Notification preferences updated');
    });

    // Data Management Buttons
    const downloadDataBtn = document.getElementById('downloadDataBtn');
    downloadDataBtn.addEventListener('click', function() {
        // Here you would typically trigger a data download
        console.log('Downloading user data');
    });

    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    deleteAccountBtn.addEventListener('click', function() {
        // Here you would typically show a confirmation dialog before deleting the account
        console.log('Account deletion requested');
    });
}

function initializeCalendarPage() {
    var calendarEl = document.getElementById('calendar');
    var newEventPopup = document.getElementById('newEventPopup');
    var popupContent = document.getElementById('popupContent');
    var eventTitle = document.getElementById('eventTitle');
    var eventDate = document.getElementById('eventDate');
    var eventTime = document.getElementById('eventTime');
    var eventDescription = document.getElementById('eventDescription');
    var cancelNewEventBtn = document.getElementById('cancelNewEvent');
    var saveNewEventBtn = document.getElementById('saveNewEvent');
    var eventType = document.getElementById('eventType');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'timeGridWeek',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek,dayGridMonth'
        },
        selectable: true,
        select: function(info) {
            eventDate.value = info.startStr.slice(0, 10);
            eventTime.value = info.startStr.slice(11, 16);
            showPopup();
        }
    });
    calendar.render();

    function showPopup() {
        newEventPopup.classList.remove('hidden');
        setTimeout(() => {
            popupContent.classList.remove('scale-90', 'opacity-0');
            popupContent.classList.add('scale-100', 'opacity-100');
        }, 10);
    }

    function hidePopup() {
        popupContent.classList.remove('scale-100', 'opacity-100');
        popupContent.classList.add('scale-90', 'opacity-0');
        setTimeout(() => {
            newEventPopup.classList.add('hidden');
        }, 300);
    }

    function clearForm() {
        eventType.value = '';
        eventTitle.value = '';
        eventDate.value = '';
        eventTime.value = '';
        eventDescription.value = '';
    }

    cancelNewEventBtn.addEventListener('click', () => {
        hidePopup();
        clearForm();
    });

    saveNewEventBtn.addEventListener('click', function() {
        if (eventTitle.value && eventDate.value && eventTime.value && eventDescription.value) {
            calendar.addEvent({
                title: eventTitle.value,
                start: eventDate.value + 'T' + eventTime.value,
                allDay: false,
                description: eventDescription.value
            });
            hidePopup();
            clearForm();
        } else {
            alert('Please fill in all fields');
        }
    });

    newEventPopup.addEventListener('click', (e) => {
        if (e.target === newEventPopup) {
            hidePopup();
            clearForm();
        }
    });
}