'use strict'

const path = require('path')
const githubService = require("./github.service")

module.exports =
{
  method: 'POST',
  path: '/augment-search-results',
  // Check request.headers.authorization
  handler: async (request, reply) => {
    reply(await githubService.getcommitHashes())
  }
}
