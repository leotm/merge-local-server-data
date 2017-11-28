/**
  * The purpose of this task is to implement the fetchAugmentedData & mergeLocalAndServerData (and make any
  * changes you deem necessary to the augmentLocalResults function).
  *
  * When the user searches for the context surrounding a chunk of code; 2 things happen sequentially:
  *  - We run an algorithm locally on the user's machine. This algorithm will compute the relevant commits
  *  - Once we have these relevant commits (localResults), we query our servers to augment these results with
  *    data from our servers (data which we have fetched from the GitHub API).
  *
  * This file mocks the 2nd step of the process.
  *
  * I have included example objects for the localResults, as well the body of the response from our
  * servers (serverResponse), as well as the expect output of `augmentLocalResults`.
  *
  * Note: you don't need to implement the server-side of it, you can just assume it's running on the given port. 
  *
  * Good luck!
  */



async function augmentLocalResults(localResults, userGitHubToken) {
  const serverResponse = await fetchAugmentedData(localResults, userGitHubToken);
  const results = mergeLocalAndServerData(localResults, serverResponse);
  return results;
}

async function fetchAugmentedData(localResults, userGitHubToken) {
  /**
    * Send a POST request to the endpoint located at 'http://localhost:3000/augment-search-results'
    * - Request type: POST
    * - Set one header called "authorization" with the userGitHubToken as its value
    * - The body of the post request should be an object of the form
    *   { commitHashes: [commitHash1, commitHash2, etc...] }, with the objects defined in this file, we should have
    *   { commitHashes: ['87593811bfcd59b9e017d3deb16c52a832244f67', '211d69901308c474b296616a2270d18becd0b531'] }
    * - Feel free to use any library you want to perform this request
    */
}

function mergeLocalAndServerData(localResults, serverResponse) {
  /**
    * Merge the localResults & serverResponse objects such that the output object:
    *  - Contains all of the keys of the serverResponse except for the `commits` object
    *  - Contains a `commits` object, which built in the following way:
    *     - The keys in the object should be commit hashes (just like in localResults & serverResponse)
    *     - Each commit should be a copy of the localResults commit, and augmented with the author object from
    *       the server response.
    * - You can assume that every commit hash in the localResults will be present in the serverReponse as well
    */
}


const userGitHubToken = 'token_347e1187d4285d255027b41bf2';

const localResults = {
  commits: {
    '87593811bfcd59b9e017d3deb16c52a832244f67': {
      commitHash: "87593811bfcd59b9e017d3deb16c52a832244f67",
      parentHashes: ["211d69901308c474b296616a2270d18becd0b531"],
      authorName: "Nick Omeyer",
      authorEmail: "nick@stepsize.com",
      committerName: "Nick Omeyer",
      committerEmail: "nick@stepsize.com"
    },
    '211d69901308c474b296616a2270d18becd0b531': {
      commitHash: "211d69901308c474b296616a2270d18becd0b531",
      parentHashes: [
        "255444da37bde0525d03af7baed531d732b5a5f1"
      ],
      authorName: "Nick Omeyer",
      authorEmail: "nick@stepsize.com",
      committerName: "Nick Omeyer",
      committerEmail: "nick@stepsize.com",
    }
  }
};

const serverResponse = {
  commits: {
    "87593811bfcd59b9e017d3deb16c52a832244f67": {
      "commitHash": "87593811bfcd59b9e017d3deb16c52a832244f67",
      "author": {
        "avatarUrl": "https://avatars5.githubusercontent.com/u/4775299?v=4",
        "date": "2016-11-14T16:38:52Z",
        "email": "nick@stepsize.com",
        "name": "Nick Omeyer",
        "user": {
          "avatarUrl": "https://avatars5.githubusercontent.com/u/4775299?v=4",
          "login": "nomeyer",
          "name": "Nick Omeyer",
          "url": "https://github.com/nomeyer"
        }
      },
    },
    "211d69901308c474b296616a2270d18becd0b531": {
      "commitHash": "87593811bfcd59b9e017d3deb16c52a832244f67",
      "author": {
        "avatarUrl": "https://avatars5.githubusercontent.com/u/4775299?v=4",
        "date": "2016-11-14T16:38:52Z",
        "email": "nick@stepsize.com",
        "name": "Nick Omeyer",
        "user": {
          "avatarUrl": "https://avatars5.githubusercontent.com/u/4775299?v=4",
          "login": "nomeyer",
          "name": "Nick Omeyer",
          "url": "https://github.com/nomeyer"
        }
      },
    },
  },
  pullRequests: {
    "2": {
      "number": 2,
      "state": "MERGED",
      "reviews": [],
      "relatedJiraIssues": [
        "STEP-449"
      ],
      "status": {
        "contexts": [
          {
            "context": "ci/circleci",
            "createdAt": "2016-12-07T19:26:31Z",
            "creator": {
              "avatarUrl": "https://avatars4.githubusercontent.com/u/4791181?v=4",
              "login": "matthieualouis",
              "url": "https://github.com/matthieualouis"
            },
            "description": "Your tests passed on CircleCI!",
            "state": "SUCCESS",
            "targetUrl": "https://circleci.com/gh/Stepsize/layer_desktop/85?utm_campaign=vcs-integration-link&utm_medium=referral&utm_source=github-build-link"
          }
        ],
        "state": "SUCCESS"
      },
      "url": "https://github.com/Stepsize/layer_desktop/commit/1d5401164bb4f8376ee0fa3b1d1f1030aeaa95ab"
     },
  },
  id: 4,
  name: "layer_desktop",
  description: "The Layer Electron app v2",
};

const expectedMergedResults = {
  commits: {
    '87593811bfcd59b9e017d3deb16c52a832244f67': {
      commitHash: "87593811bfcd59b9e017d3deb16c52a832244f67",
      parentHashes: ["211d69901308c474b296616a2270d18becd0b531"],
      authorName: "Nick Omeyer",
      authorEmail: "nick@stepsize.com",
      committerName: "Nick Omeyer",
      committerEmail: "nick@stepsize.com",
      author: {
        "avatarUrl": "https://avatars5.githubusercontent.com/u/4775299?v=4",
        "date": "2016-11-14T16:38:52Z",
        "email": "nick@stepsize.com",
        "name": "Nick Omeyer",
        "user": {
          "avatarUrl": "https://avatars5.githubusercontent.com/u/4775299?v=4",
          "login": "nomeyer",
          "name": "Nick Omeyer",
          "url": "https://github.com/nomeyer"
        }
      },
    },
    '211d69901308c474b296616a2270d18becd0b531': {
      commitHash: "211d69901308c474b296616a2270d18becd0b531",
      parentHashes: [
        "255444da37bde0525d03af7baed531d732b5a5f1"
      ],
      authorName: "Nick Omeyer",
      authorEmail: "nick@stepsize.com",
      committerName: "Nick Omeyer",
      committerEmail: "nick@stepsize.com",
      author: {
        "avatarUrl": "https://avatars5.githubusercontent.com/u/4775299?v=4",
        "date": "2016-11-14T16:38:52Z",
        "email": "nick@stepsize.com",
        "name": "Nick Omeyer",
        "user": {
          "avatarUrl": "https://avatars5.githubusercontent.com/u/4775299?v=4",
          "login": "nomeyer",
          "name": "Nick Omeyer",
          "url": "https://github.com/nomeyer"
        }
      },
    }
  },
  pullRequests: {
    "2": {
      "number": 2,
      "state": "MERGED",
      "reviews": [],
      "relatedJiraIssues": [
        "STEP-449"
      ],
      "status": {
        "contexts": [
          {
            "context": "ci/circleci",
            "createdAt": "2016-12-07T19:26:31Z",
            "creator": {
              "avatarUrl": "https://avatars4.githubusercontent.com/u/4791181?v=4",
              "login": "matthieualouis",
              "url": "https://github.com/matthieualouis"
            },
            "description": "Your tests passed on CircleCI!",
            "state": "SUCCESS",
            "targetUrl": "https://circleci.com/gh/Stepsize/layer_desktop/85?utm_campaign=vcs-integration-link&utm_medium=referral&utm_source=github-build-link"
          }
        ],
        "state": "SUCCESS"
      },
      "url": "https://github.com/Stepsize/layer_desktop/commit/1d5401164bb4f8376ee0fa3b1d1f1030aeaa95ab"
     },
  },
  id: 4,
  name: "layer_desktop",
  description: "The Layer Electron app v2",
}

const augmentedResults = await augmentLocalResults(userGitHubToken, localResults);
