'use strict'

exports.getcommitHashes = getcommitHashes;
const serverResponse = require('./solution').serverResponse;

/**
 * Mock server response:
 * - return commits matching hashes
 * - return the context: pull requests, id, name description
 */
async function getcommitHashes() {
  return await new Promise ((resolve, reject)=> {
    setTimeout(() => {
      resolve(serverResponse);
    }, 1000);
  })
}
