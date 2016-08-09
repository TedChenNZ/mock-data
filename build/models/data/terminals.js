(function() {
  var API, Guid, _, location, moment, names, status;

  _ = require('lodash');

  moment = require('moment');

  Guid = require('guid');

  status = ['active'];

  names = ['Home Terminal', 'Auckland Branch'];

  location = ['NZ', 'AU', 'US', 'CN'];

  API = function() {};

  API.get = function(count, callback) {
    var data, name, x;
    data = [];
    x = 0;
    while (x < count) {
      name = _.sample(names);
      data.push({
        id: Guid.create(),
        name: name,
        timezone: "Pacific Auckland",
        startTime: "00:00:00",
        active: "true",
        "default": "true"
      });
      x++;
    }
    return _.delay(function() {
      return callback(null, data);
    }, 300);
  };

  module.exports = API;

}).call(this);
