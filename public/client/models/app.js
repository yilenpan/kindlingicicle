var app = Backbone.Model.extend({
  //might be useful later on.
  //for now the app model is only a container for the eventCollection
  
  audioLibChange : function () {
    console.log("i heard this in the app model but what do I do now?");
  },

//to receive data and pushing data to the eventCollection
  initialize : function(){

//connect sockets on initialize
    var socket = io();

//binds addNewEvent function to be called form within socket listener
    var newEvent = this.addNewEvent.bind(this);

    socket.on('event', function(event) {
      console.log('heard the event');
      //if the appropriate sound for the event is available, play it
      if (loaded[event.type]) {
        playSound(loaded[event.type]);
      } else {
        //play default (note: to be refactored to default)
        playSound(loaded['pull_denied']);
      }
      
//update the feed
      newEvent({data:event});
    });

  },

  addNewEvent : function (gitEvent) {
    var newEvent = new eventModel(gitEvent);
    this.get('eventList').push(newEvent);
  }

});