Reports = require './data/reports'
Drivers = require './data/drivers'
Terminals = require './data/terminals'
levelup = require 'levelup'
Guid    = require 'guid'
_       = require 'lodash'
moment  = require 'moment'

driverDB = levelup('./driverDB', {
	valueEncoding: 'json'
})

terminalDB = levelup('./terminalDB', {
	valueEncoding: 'json'
})

Mock = ->

Mock.getReports = (page, rows) ->
	new Promise (resolve, reject) ->
		Reports.get page, rows, (err, result) ->
			if err then reject(err)
			else resolve(result)


Mock.getTerminals = (count) ->
	results = []
	new Promise (resolve, reject) ->
		terminalDB.createReadStream()
			.on "data", (data) ->
				result =
					id: data.key
				_.merge(result, data.value)
				results.push result
			.on "error", (err) ->
				reject(err)
			.on "end", () ->
				resolve(results)

Mock.getDrivers = (count) ->
	results = []
	new Promise (resolve, reject) ->
		driverDB.createReadStream()
			.on "data", (data) ->
				result =
					gid: data.key
				_.merge(result, data.value)
				results.push result
			.on "error", (err) ->
				reject(err)
			.on "end", () ->
				resolve(results)

Mock.createDriver = (driver) ->
	gid = Guid.create().value
	driver.created_at = moment()
	driver.updated_at = moment()
	new Promise (resolve, reject) ->
		driverDB.put gid, driver, (err) ->
			if err then reject(err)
			driverDB.get gid, (err, result) ->
				if err then reject(err)
				else
					result.gid = gid
					resolve(result)

Mock.deleteDriver = (gid) ->
	new Promise (resolve, reject) ->
		driverDB.del gid, (err) ->
			if err then reject(err)
			else resolve(true)

Mock.updateDriver = (gid, driver) ->
	new Promise (resolve, reject) ->
		driverDB.get gid, (err, result) ->
			if err then reject(err)
			driverDB.put gid, driver, (err) ->
				if err then reject(err)
				driverDB.get gid, (err, update) ->
					if err then reject(err)
					else resolve(update)

module.exports = Mock
