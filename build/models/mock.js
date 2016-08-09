(function() {
  var Drivers, Guid, Mock, Reports, Terminals, _, driverDB, levelup, moment, terminalDB;

  Reports = require('./data/reports');

  Drivers = require('./data/drivers');

  Terminals = require('./data/terminals');

  levelup = require('levelup');

  Guid = require('guid');

  _ = require('lodash');

  moment = require('moment');

  driverDB = levelup('./driverDB', {
    valueEncoding: 'json'
  });

  terminalDB = levelup('./terminalDB', {
    valueEncoding: 'json'
  });

  Mock = function() {};

  Mock.getReports = function(page, rows) {
    return new Promise(function(resolve, reject) {
      return Reports.get(page, rows, function(err, result) {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    });
  };

  Mock.getTerminals = function(count) {
    var results;
    results = [];
    return new Promise(function(resolve, reject) {
      return terminalDB.createReadStream().on("data", function(data) {
        var result;
        result = {
          id: data.key
        };
        _.merge(result, data.value);
        return results.push(result);
      }).on("error", function(err) {
        return reject(err);
      }).on("end", function() {
        return resolve(results);
      });
    });
  };

  Mock.getDrivers = function(count) {
    var results;
    results = [];
    return new Promise(function(resolve, reject) {
      return driverDB.createReadStream().on("data", function(data) {
        var result;
        result = {
          gid: data.key
        };
        _.merge(result, data.value);
        return results.push(result);
      }).on("error", function(err) {
        return reject(err);
      }).on("end", function() {
        return resolve(results);
      });
    });
  };

  Mock.createDriver = function(driver) {
    var gid;
    gid = Guid.create().value;
    driver.created_at = moment();
    driver.updated_at = moment();
    return new Promise(function(resolve, reject) {
      return driverDB.put(gid, driver, function(err) {
        if (err) {
          reject(err);
        }
        return driverDB.get(gid, function(err, result) {
          if (err) {
            return reject(err);
          } else {
            result.gid = gid;
            return resolve(result);
          }
        });
      });
    });
  };

  Mock.deleteDriver = function(gid) {
    return new Promise(function(resolve, reject) {
      return driverDB.del(gid, function(err) {
        if (err) {
          return reject(err);
        } else {
          return resolve(true);
        }
      });
    });
  };

  Mock.updateDriver = function(gid, driver) {
    return new Promise(function(resolve, reject) {
      return driverDB.get(gid, function(err, result) {
        if (err) {
          reject(err);
        }
        return driverDB.put(gid, driver, function(err) {
          if (err) {
            reject(err);
          }
          return driverDB.get(gid, function(err, update) {
            if (err) {
              return reject(err);
            } else {
              return resolve(update);
            }
          });
        });
      });
    });
  };

  module.exports = Mock;

}).call(this);
