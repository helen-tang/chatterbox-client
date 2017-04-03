// YOUR CODE HERE:

var App = function() {
  this.server = 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages';
};

App.prototype.init = function() {

  this.fetch();
  
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
      console.log(data.results);
      console.log(app);

      var uniqRooms = {};

      for (var i = 0; i < data.results.length; i++) {
        if (uniqRooms[data.results.roomname] === undefined) {
          uniqRooms[data.results.roomname] = 1;
        }
      }

     
      data.results.forEach(function(message) {
        app.renderMessage(message);
      });

      for (var key in uniqRooms) {
        app.renderRoom(key);
      }

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

  if (message) {

    var username = message.username;
    var created = message.createdAt;
    var roomname = message.roomname;
    var text = message.text;

    var elementToAppend = `<div class="row">
                            <div class="four columns">
                              <h3>` + username + `</h3>
                            </div>
                            <div class="four columns">
                              <p>` + created + `</p>
                            </div>
                            <div class="six columns">
                              <h5>` + text + `</h5>
                            </div>
                          </div>`;


    $('#chats').append(elementToAppend);  
  }


};

App.prototype.renderRoom = function(room) {
  
  var roomToAppend = '<option value=' + room + '>' + room + '</option>';
  $('#roomSelect').append(roomToAppend);

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


