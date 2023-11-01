function submitMessage(event) {
    // Prevent page reload on form submit
    event.preventDefault();

    // Save the users input to a variable
    var userMessage = $("#compose-message-field").val();

    // Display the users message in chat body
    $("#chat-body").append( `
    <div class="user-message message">
    ${userMessage}
    </div>
    `);

    // Clear the text field
    $("#compose-message-field").val("");

    saveInput(userMessage);

    // Timeout for loading effect
    setTimeout(function () {
        // Call the bots response
        botResponse();

        // Deactivate message box
        disableInput();
    }, 1000);


}

function botResponse(){
    $("#chat-body").append( `
    <div class="bot-sign-up-prompt">
        <div class="bot-message message">
            To get detailed, personalized assistance, please sign up for BuildBuddy. It's quick, easy, and opens up a world of tailored advice for your project.
        </div>

        <a class="chat-button" href="https://app.buildbuddy.co/register">Sign Up</a>
    </div>
    `);
}

// Disable further user messages once the bot has responded
function disableInput() {
    // Disable the Textarea
    $("#compose-message-field").prop('disabled', true);
    $("#compose-message-field").addClass("disabled");
    $("#compose-message-field").val("To continue using the chatbot, please sign up using the link above.");

    // Disable the button
    $("#submit-message").prop('disabled', true);
    $("#submit-message").addClass("disabled")

}

function saveInput(userMessage){
    // Assuming your Google Apps Script expects an object with a property 'message'
    var jsonObject = {
        "message": userMessage
    };

    // Convert object to JSON
    var jsonPayload = JSON.stringify(jsonObject);

    fetch('https://cors-anywhere.herokuapp.com/https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
        method: 'POST',
        body: jsonPayload,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Handle success, such as displaying a success message
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle errors, such as displaying an error message
    });
}

// -----------
