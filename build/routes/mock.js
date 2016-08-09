(function() {
  var Mock;

  Mock = require('../models/mock');

  module.exports = function(app) {
    app.post("/", function*(next) {
      var body, user;
      body = this.request.body;
      user = (yield Credentials.createCredentials(body).then(function(res) {
        return res;
      }));
      if (user) {
        this.status = 201;
        return this.body = user;
      } else {
        return this.status = 500;
      }
    });
    app.get("/drivers", function*(next) {
      var count, result;
      count = this.request.query.count || 100;
      result = (yield Mock.getDrivers(count).then(function(res) {
        return res;
      }));
      console.log(result);
      if (result) {
        this.status = 200;
        return this.body = result;
      } else {
        return this.status = 404;
      }
    });
    app.post("/drivers", function*(next) {
      var result;
      result = (yield Mock.createDriver(this.request.body).then(function(res) {
        return res;
      }));
      if (result) {
        this.status = 201;
        return this.body = result;
      } else {
        return this.status = 500;
      }
    });
    app["delete"]("/drivers/:gid", function*(next) {
      var result;
      result = (yield Mock.deleteDriver(this.params.gid).then(function(res) {
        return res;
      }));
      if (result) {
        return this.status = 200;
      } else {
        return this.status = 500;
      }
    });
    app.put("/drivers/:gid", function*(next) {
      var result;
      result = (yield Mock.updateDriver(this.params.gid, this.request.body).then(function(res) {
        return res;
      }));
      if (result) {
        this.status = 200;
        return this.body = result;
      } else {
        return this.status = 500;
      }
    });
    app.get("/reports", function*(next) {
      var page, result, rows_per_page;
      rows_per_page = this.request.query['per_page'] || 10;
      page = this.request.query['page'] || 0;
      result = (yield Mock.getReports(page, rows_per_page).then(function(res) {
        return res;
      }));
      this.set('X-Total-Count', 819);
      if (result) {
        this.status = 200;
        return this.body = result;
      } else {
        return this.status = 404;
      }
    });
    return app.get("/terminals", function*(next) {
      var count, result;
      count = this.request.query.count || 100;
      result = (yield Mock.getTerminals(count).then(function(res) {
        return res;
      }));
      console.log(result);
      if (result) {
        this.status = 200;
        return this.body = result;
      } else {
        return this.status = 404;
      }
    });
  };

}).call(this);
