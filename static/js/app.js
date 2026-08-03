function switchScreen(screenId, element) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    
    document.getElementById(screenId).classList.add('active');
    if(element) element.classList.add('active');
}

function startAnalysis() {
    const problemText = document.getElementById('problem-input').value;
    if(!problemText.trim()) {
        alert("Veuillez saisir un problème à résoudre.");
        return;
    }
    
    // Echo in chat and diagnostic
    document.getElementById('user-problem-echo').innerText = problemText;
    document.getElementById('diag-problem-text').innerText = problemText;
    
    // Switch to Screen 2 (Chat)
    switchScreen('screen-2', document.querySelectorAll('.nav-item')[1]);
}

function sendChatReply() {
    const input = document.getElementById('chat-reply-input');
    if(!input.value.trim()) return;
    
    const chatContainer = document.querySelector('.chat-container');
    
    // Add user message
    const userDiv = document.createElement('div');
    userDiv.className = 'chat-message user';
    userDiv.innerHTML = `<div class="bubble">${input.value}</div><div class="avatar"><i class="fa-solid fa-user"></i></div>`;
    chatContainer.appendChild(userDiv);
    
    const val = input.value;
    input.value = '';
    
    // Simulate AI response after 1s
    setTimeout(() => {
        const aiDiv = document.createElement('div');
        aiDiv.className = 'chat-message ai';
        aiDiv.innerHTML = `<div class="avatar"><i class="fa-solid fa-robot"></i></div><div class="bubble">Parfait ! J'ai analysé tes contraintes (« ${val} »). Passons au diagnostic complet.</div>`;
        chatContainer.appendChild(aiDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        // Automatically offer button to jump to diagnostic
        setTimeout(() => {
            switchScreen('screen-3', document.querySelectorAll('.nav-item')[2]);
        }, 1200);
    }, 800);
}
