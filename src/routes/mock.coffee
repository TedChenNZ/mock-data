Mock = require '../models/mock'

module.exports = (app) ->

	app.post "/", (next) ->

		body = @request.body
		user = yield Credentials.createCredentials(body)
			.then (res) ->
				return res

		if user
			@status = 201
			@body = user
		else
			@status = 500

	app.get "/drivers", (next) ->

		count = @request.query.count or 100

		result = yield Mock.getDrivers(count)
			.then (res) ->
				return res

		# @set 'X-Total-Count', result.length

		console.log result

		if result
			@status = 200
			@body = result
		else
			@status = 404


	app.post "/drivers", (next) ->

		result = yield Mock.createDriver(@request.body)
			.then (res) ->
				return res

		if result
			@status = 201
			@body = result
		else
			@status = 500

	app.delete "/drivers/:gid", (next) ->

		result = yield Mock.deleteDriver(@params.gid)
			.then (res) ->
				return res

		if result
			@status = 200
		else
			@status = 500

	app.put "/drivers/:gid", (next) ->

		result = yield Mock.updateDriver(@params.gid, @request.body)
			.then (res) ->
				return res

		if result
			@status = 200
			@body = result
		else
			@status = 500

	app.get "/reports", (next) ->

		rows_per_page = @request.query['per_page'] or 10
		page = @request.query['page'] or 0

		result = yield Mock.getReports(page, rows_per_page)
			.then (res) ->
				return res

		@set 'X-Total-Count', 819

		if result
			@status = 200
			@body = result
		else
			@status = 404

	app.get "/terminals", (next) ->

		count = @request.query.count or 100

		result = yield Mock.getTerminals(count)
			.then (res) ->
				return res

		# @set 'X-Total-Count', result.length

		console.log result

		if result
			@status = 200
			@body = result
		else
			@status = 404