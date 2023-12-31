$(document).ready(function demoChat() {

    setTimeout(function () {

        $("#chat-body").append(`
        <div class="user-message message">
            I need help with planning permissions for my kitchen extension in London, what should I do?
        </div>
        `)

    }, 1000);

    setTimeout(function () {

        $("#chat-body").append(`
            <div class="bot-message message">
                Navigating planning permissions in London can be quite specific. I can guide you through the application process and even set up a consultation with a local expert who can manage the necessary paperwork for you.
            </div>
        `);

    }, 2000);


    setTimeout(function () {

        endDemo()

    }, 3000);

})


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

    const sendUserMessage = {
        userMessage
      };

    // Make a POST request to the Node.js application
    fetch('https://ccsync.buildbuddy.co/save-message/', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendUserMessage), // convert the userMessage object to a JSON string
        })
        .then((response) => {
            if (response.ok) {
                return response.json(); // or response.text() if the server sends a non-JSON response
            } else {
                // If the server response was not ok, read and return the response text for more details
                return response.text().then(text => { throw new Error('Request failed: ' + text) });
            }
        })
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

}

function endDemo() {
    $("#chat-compose").css("display", "flex");
    $("#chat-body").css("border-radius", 0)
}