module.exports = function (options) {
	options || (options = {})
	options.list || (options.list = "created")
	options.page || (options.page = 1)
	options.pageSize || (options.pageSize = 20)
	
	return options;
}