function submitMessage(event) {
    // Prevent page reload on form submit
    event.preventDefault();

    // Save the users input to a variable
    var userMessage = $("#compose-message-field").val();

    // Display the users message in chat body
    $("#chat-body").append(`
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

function botResponse() {
    $("#chat-body").append(`
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

function saveInput(userMessage) {

    // Make a POST request to the Node.js application
    fetch('https://ccsync.buildbuddy.co/save-message/', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userMessage), // convert the userMessage object to a JSON string
        })
        .then((response) => {
            if (response.ok) {
                return response.json(); // or response.text() if the server sends a non-JSON response
            }
            throw new Error('Network response was not ok.');
        })
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });


}