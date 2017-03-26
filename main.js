var axios = require("axios"),
    libURL = require("url");


axios.defaults.baseURL = "https://api.vexdb.io/v1/";

var options = {
  "defaultParams": {

  },
  "headers": {

  }
}

/**
 * Configure requests, to add things like default parameters, User Agent, etc
 * @method configure
 * @param  {Object}  changes Any changes to the default options, outlined below
 * @param  {Object}  changes.defaultParams Specify default parameters, like always limiting to a region, or season. This are mixed with specified parameters (and specified parameters take precendence)
 * @param  {Object}  changes.headers Include any headers to include with all requests, like User-Agent
 * @return {Object}          The updated options object
 */
function configure(changes) {

  // Iterate over headers, add them if they don't exist, modify them if they do
  for (var newHeader in changes.headers) {
    if (changes.headers.hasOwnProperty(newHeader)) {
      options.headers[newHeader] = changes.headers[newHeader]
    }
  }

  // Iterate over defaultParams, add them if they don't exist, modify them if they do
  for (var newParam in changes.defaultParams) {
    if (changes.defaultParams.hasOwnProperty(newParam)) {
      options.defaultParams[newParam] = changes.defaultParams[newParam]
    }
  }

  return options;
}


/**
 * Makes a reqest to the vexDB API
 * @method vexdb
 * @param  {String} endpoint The endpoint to request, must be events, teams, matches, rankings, season_rankings, awards, or skills
 * @param  {Object} params   Any URL parameters to specify, in Object form. See the relevant API docs page for more info
 * @return {Promise}
 */
function request (endpoint, params) {

  // Validate endpoint against known, to avoid unneeded requests
  let known = [
    "events",
    "teams",
    "matches",
    "rankings",
    "season_rankings",
    "awards",
    "skills"
  ];

  if (!known.includes(endpoint))
    return Promise.reject(
      new RangeError("Endpoint '" + endpoint + "' not known. Valid endpoints are " + known.join(", "))
    )

  let url = `/get_${endpoint}`,
      output = "";

  return axios.get(url, {
    headers: options.headers,
    params: Object.assign(options.defaultParams, params)
  }).then(res => res.data.status ? res.data : Promise.reject(new Error(res.data.error_text)))
}

/**
 * GETs an endpoint based on parameters and resolves the result
 * @method get
 * @param  {String} endpoint The endpoint to GET
 * @param  {Object} params   An object of parameters
 * @return {Promise}
 */
function get (endpoint, params) {
  return request(endpoint, params).then(res => res.result).catch(e => { throw e })
}

/**
 * Gets the size of an endpoint with parameters. It performs a nodata request and resolves the number of results
 * @method size
 * @param  {String} endpoint The endpoint to get the size of
 * @param  {Object} params   Any criteria to specify on the endpoint, see relevant vexDB documentation page
 * @return {Promise}
 */
function size (endpoint, params) {
  return request(endpoint, Object.assign(params || {}, { nodata: true })).then(res => res.size)
}

module.exports = {
  request,
  get,
  size,
  configure
}
