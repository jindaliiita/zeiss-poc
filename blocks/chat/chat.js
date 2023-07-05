function sendMessage(socket, message) {
  if (message !== '') {
    var chatMessage = {
        type: 'chat',
        sender: 'User',
        text: message
    };

    
    // Send the message to the server
    socket.send(JSON.stringify(chatMessage));
  }
}

function appendMessageServer(message) {
  var chatBody = document.querySelector('.chat-body');
  var messageElement = document.createElement('div');
  messageElement.innerHTML = "<span class='server-message'><b>Bot: </b>" + message + "</span>";
  chatBody.appendChild(messageElement);
}

function appendMessage(message) {
  // var input = document.getElementById('chat-input');
  // var message = input.value;
  // input.value = '';

  var chatBody = document.querySelector('.chat-body');
  var messageElement = document.createElement('div');
  messageElement.innerHTML = "<span class='client-message'><b>You: </b>" + message + "</span>";
  chatBody.appendChild(messageElement);
}

export default function decorate(block) {
    block.innerHTML = `<div class="chat-button">
        <button id="chat-button">Chat With Franklin</button>
      </div>
      <div class="chat-window">
        <div class="chat-header">
        <h3>Chatbot</h3>
      </div>
      <div class="chat-body">
        <!-- Chat messages will be appended here dynamically -->
      </div>
      <div class="chat-footer">
        <input type="text" id="chat-input" placeholder="Type your message !" />
      </div>
    </div>`;

  var chatButton = document.getElementById('chat-button');
  if (chatButton) {
    chatButton.onclick = () => {
        var chatWindow = document.querySelector('.chat-window');
        chatWindow.style.display = (chatWindow.style.display === 'none' || chatWindow.style.display === '') ? 'block' : 'none';
    }
  }

  // var close = document.getElementById("close");
  // close.onclick = () => {
  //   var chatWindow = document.querySelector('.chat-window');
  //   chatWindow.style.display = (chatWindow.style.display === 'none' || chatWindow.style.display === '') ? 'block' : 'none';
  // }

  // var chatInputButton = document.getElementById("chat-input-button");
  // if (chatInputButton) {
  //   chatInputButton.onclick = () => {
  //     var input = document.getElementById('chat-input');
  //     var message = input.value;
  //     input.value = '';
    
  //     var chatBody = document.querySelector('.chat-body');
  //     var messageElement = document.createElement('div');
  //     messageElement.innerHTML = "<b>You: </b>" + message;
  //     chatBody.appendChild(messageElement);
  //   }
  // }

  var chatInputBox = document.querySelector('#chat-input');
  chatInputBox.onkeydown = (event) => {
    if (event.key === "Enter") {
      var message = document.getElementById('chat-input');
      appendMessage(message.value);
      sendMessage(socket, message.value);
      document.getElementById('chat-input').value = '';
    }
  }

  var socket = new WebSocket('ws://localhost:3010'); // Replace with your WebSocket server URL

  socket.onopen = function() {
    console.log('WebSocket connection established.');
  };

  // Event listener for WebSocket messages
  socket.onmessage = function(event) {
    var message = JSON.parse(event.data);

    // Handle different message types from the server
    if (message.type === 'chat') {
      appendMessageServer(message.text);
      // appendMessage(message.sender, message.text, chatbox);
    }
  };
}
