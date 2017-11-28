'use strict'

const rp = require('request-promise');

async function augmentLocalResults(localResults, userGitHubToken) {
  const serverResponse = await fetchAugmentedData(localResults, userGitHubToken);
  const results = mergeLocalAndServerData(localResults, serverResponse);
  return results;
}

async function fetchAugmentedData(localResults, userGitHubToken) {
  const options = {
    method: "POST",
    uri: "http://localhost:3000/augment-search-results",
    body: {
      commitHashes: Object.keys(localResults.commits)
    },
    headers: { "authorization": userGitHubToken },
    json: true
  };
  return await rp(options)
    .then(response => response)
    .catch(err => console.log(err));
}
exports.fetchAugmentedData = fetchAugmentedData;

function mergeLocalAndServerData(localResults, serverResponse) {
  const results = {};
  for (let key in serverResponse) {
    if (key !== "commits")
      results[key] = serverResponse[key];
  }
  results.commits = localResults.commits;
  for (let commit in serverResponse.commits) {
    results.commits[commit].author = serverResponse.commits[commit].author;
  }
  return results;
}

const userGitHubToken = "token_347e1187d4285d255027b41bf2";
exports.userGitHubToken = userGitHubToken;

const localResults = {
  commits: {
    "87593811bfcd59b9e017d3deb16c52a832244f67": {
      commitHash: "87593811bfcd59b9e017d3deb16c52a832244f67",
      parentHashes: ["211d69901308c474b296616a2270d18becd0b531"],
      authorName: "Nick Omeyer",
      authorEmail: "nick@stepsize.com",
      committerName: "Nick Omeyer",
      committerEmail: "nick@stepsize.com"
    },
    "211d69901308c474b296616a2270d18becd0b531": {
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
exports.localResults = localResults;

const serverResponse = {
  commits: {
    "87593811bfcd59b9e017d3deb16c52a832244f67": {
      commitHash: "87593811bfcd59b9e017d3deb16c52a832244f67",
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
    "211d69901308c474b296616a2270d18becd0b531": {
      commitHash: "87593811bfcd59b9e017d3deb16c52a832244f67",
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
exports.serverResponse = serverResponse;

const expectedMergedResults = {
  commits: {
    "87593811bfcd59b9e017d3deb16c52a832244f67": {
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
    "211d69901308c474b296616a2270d18becd0b531": {
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

// For testing:
// mergeLocalAndServerData(localResults, serverResponse);

async () => {
  // Wrapped around anonymous async fn, else throws:
  // SyntaxError: await is only valid in async function
  const augmentedResults = await augmentLocalResults(userGitHubToken, localResults);
}
