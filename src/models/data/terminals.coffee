_ = require 'lodash'
moment = require 'moment'
Guid = require 'guid'

status = ['active']
names = ['Home Terminal', 'Auckland Branch']
location = ['NZ', 'AU', 'US', 'CN']

API = ->

API.get = (count, callback) ->
    data = []
    x = 0

    while x < count
        name = _.sample(names)
        data.push(
            id: Guid.create()
            name: name
            timezone: "Pacific Auckland"
            startTime: "00:00:00",
            active: "true",
            default: "true"
        )

        x++

    _.delay () ->
        callback(null, data)
    , 300

module.exports = API
