var App = function() {
  this.server = 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages';
  this.username = 'Helen Da Bo$$';
  this.friends = [];
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
    data: {
      order: '-createdAt',
      limit: 400
    },
    success: function (data) {
      
      console.log(data.results);

      for (var i = 0; i < data.results.length; i++) {

        if (!_.has(data.results[i], 'text') || !_.has(data.results[i], 'username')) {
          data.results.splice(i, 1);
          i--;
          continue;
        }
        if (data.results[i].text && data.results[i].text.match('<.*>')) { 
          data.results.splice(i, 1);
          i--;
          continue;
        }
        if (data.results[i].username && data.results[i].username.match('<.*>')) {
          data.results.splice(i, 1);
          i--;
          continue;
        }
        if (data.results[i].createdAt && data.results[i].createdAt.match('<.*>')) {
          data.results.splice(i, 1);
          i--;
          continue;
        }
        if (data.results[i].updatedAt && data.results[i].updatedAt.match('<.*>')) {
          data.results.splice(i, 1);
          i--;
          continue;
        }
        if (data.results[i].username && data.results[i].username === 'hi') {
          data.results.splice(i, 1);
          i--;
          continue;
        }
        if (data.results[i].username && data.results[i].username === 'plasticbugs') {
          data.results.splice(i, 1);
          i--;
          continue;
        }

      }

      console.log('chatterbox: Message recieved');

      var uniqRooms = {};

      for (var i = 0; i < data.results.length; i++) {
        if (uniqRooms[data.results[i].roomname] === undefined && data.results[i].roomname !== undefined) {
          uniqRooms[data.results[i].roomname] = 1;
        }
      }

      for (var key in uniqRooms) {
        app.renderRoom(key);
      }
     
      data.results.forEach(function(message) {
        app.renderMessage(message);
      });


    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });

};

App.prototype.clearMessages = function() {

  $('#chats').children().remove();
  
};

App.prototype.renderMessage = function(message) {

  if (message) {

    var username = message.username;
    var created = $.timeago(message.createdAt);
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
  app.clearMessages();
  app.fetch();
};

var app = new App();

$(document).ready(function() {
  $('time.timeago').timeago();
  $.timeago.settings.allowFuture = false;
  app.init();

  $('#refresh').on('click', function(event) {
    event.preventDefault();
    app.clearMessages();
    app.fetch();
  });

  $('#postMessage').on('click', function(event) {
    event.preventDefault();

    var myText = $('textarea#exampleMessage').val();
    $('textarea#exampleMessage').val('');
    console.log(myText);

    var newMessage = {
      username: app.username,
      createdAt: $.now(),   
      text: myText
    };

    app.send(newMessage);
    app.clearMessages();
    app.fetch();
  });

});


