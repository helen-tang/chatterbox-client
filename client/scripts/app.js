// YOUR CODE HERE:

var App = function() {
  this.server = 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages';
};

App.prototype.init = function() {

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message recieved');
      console.log(data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
  
};

App.prototype.send = function(message) {

  $.ajax({
    url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
  
};

App.prototype.fetch = function() {

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message recieved');
      console.log(data);
      data.forEach(function(message) {

        var username = message.username;
        var created = message.createdAt;
        var roomname = message.roomname;
        var text = message.text;

        var elementToAppend = `<div class="row">
                              <div class="four columns">
                                <h3>` + username + `</h3>
                              </div>
                              <div class="four columns">
                                <h3>` + created + `</h3>
                              </div>
                              <div class="six columns">
                                <p>` + text + `</p>
                              </div>
                            </div>`;

        console.log(elementToAppend);
        console.log($('#chats'));

        // $('#chats').append(elementToAppend);
        $('#chats').append(elementToAppend);
      });

    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });



};

App.prototype.clearMessages = function() {

  $('#chats').remove();
  
};

App.prototype.renderMessage = function(message) {

  this.send(message);
  this.fetch();


};

App.prototype.renderRoom = function() {
  
};

App.prototype.handleUsernameClick = function() {
  
};

App.prototype.handleSubmit = function() {
  
};

var app = new App();

$(document).ready(function() {

  app.init();

  $('#refresh').on('click', function(event) {
    event.preventDefault();
    app.fetch();
  });


  $('#postMessage').on('click', function(event) {
    event.preventDefault();
    app.send();
  });

});


