function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

const form = document.getElementById('emailForm');
const statusBox = document.getElementById('statusBox');

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    statusBox.innerHTML = '';

    const email = document.getElementById('your_email').value;
    const pass = document.getElementById('app_pass').value;
    const subject = document.getElementById('subject').value;
    const body = document.getElementById('mail_content').value;
    const gap = parseInt(document.getElementById('time_gap').value) * 1000;
    const raw = document.getElementById('recipients').value;

    if (pass.length !== 16) {
        statusBox.innerHTML += `<div class="status-item" style="color:red;">❌ App password must be exactly 16 characters.</div>`;
        return;
    }

    const recipients = raw.split(',').map(x => x.trim()).filter(x => x);
    if (recipients.length === 0) {
        statusBox.innerHTML += `<div class="status-item" style="color:red;">❌ No valid recipients found.</div>`;
        return;
    }

    // Step 1: Verify authentication with backend
    statusBox.innerHTML += `<div class="status-item">🔐 Verifying Gmail authentication...</div>`;
    
    try {
        const verifyResponse = await fetch('/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                appPassword: pass
            })
        });

        // Check if response is ok
        if (!verifyResponse.ok) {
            throw new Error(`HTTP error! status: ${verifyResponse.status}`);
        }

        // Check if response has content
        const responseText = await verifyResponse.text();
        if (!responseText) {
            throw new Error('Empty response from server');
        }

        let verifyResult;
        try {
            verifyResult = JSON.parse(responseText);
        } catch (parseError) {
            throw new Error(`Invalid JSON response: ${responseText}`);
        }
        
        if (!verifyResult.success) {
            let errorMsg = verifyResult.message;
            if (verifyResult.details) {
                errorMsg += `<br><small>Details: ${verifyResult.details}</small>`;
            }
            statusBox.innerHTML += `<div class="status-item" style="color:red;">❌ Authentication failed: ${errorMsg}</div>`;
            return;
        }

        statusBox.innerHTML += `<div class="status-item" style="color:green;">✔️ Authentication successful!</div>`;

        // Step 2: Send first email using backend
        const firstRecipient = recipients[0];
        statusBox.innerHTML += `<div class="status-item">📧 Sending first email to ${firstRecipient}...</div>`;

        try {
            const backendResponse = await fetch('/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    appPassword: pass,
                    to: firstRecipient,
                    subject: subject,
                    body: body
                })
            });

            const backendResult = await backendResponse.json();
            
            if (backendResult.success) {
                statusBox.innerHTML += `<div class="status-item" style="color:green;">1. ${firstRecipient} - ✅ Sent</div>`;
            } else {
                throw new Error(backendResult.message);
            }
        } catch (err) {
            console.error('Backend email error:', err);
            statusBox.innerHTML += `<div class="status-item" style="color:red;">1. ${firstRecipient} - ❌ Failed<br><small>${err.message}</small></div>`;
            return;
        }

        // Step 3: Now wait and send remaining emails
        const remainingRecipients = recipients.slice(1);
        if (remainingRecipients.length > 0) {
            statusBox.innerHTML += `<div class="status-item">⏳ Waiting ${gap / 1000} seconds before continuing...</div>`;
        }

        // Step 4: Send all remaining emails using backend
        remainingRecipients.forEach((to, i) => {
            setTimeout(async () => {
                try {
                    const backendResponse = await fetch('/send-email', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: email,
                            appPassword: pass,
                            to: to,
                            subject: subject,
                            body: body
                        })
                    });

                    const backendResult = await backendResponse.json();
                    
                    if (backendResult.success) {
                        statusBox.innerHTML += `<div class="status-item">${i + 2}. ${to} - ✅ Sent</div>`;
                    } else {
                        throw new Error(backendResult.message);
                    }
                } catch (err) {
                    console.error(`Backend email ${i + 2} error:`, err);
                    statusBox.innerHTML += `<div class="status-item" style="color:red;">${i + 2}. ${to} - ❌ Failed<br><small>${err.message}</small></div>`;
                }
            }, (i + 1) * gap); // delay for each subsequent email
        });

    } catch (error) {
        statusBox.innerHTML += `<div class="status-item" style="color:red;">❌ Verification request failed.<br><small>${error.message}</small></div>`;
    }
});
