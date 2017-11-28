const expect = require("chai").expect;
const sinon = require("sinon");
const rp = require("request-promise");

const githubService = require("../github.service")
const solution = require("../solution");

describe("Fetch augmented data & merge local and server data", () => {
  describe("Server response", () => {
    beforeEach(() => {
      sinon.stub(rp, "post").resolves(solution.serverResponse);
    });
    afterEach(() => {
      rp.post.restore();
    });
    it("Resolves with server response", async () => {
      const response = await solution.fetchAugmentedData(solution.localResults, solution.userGitHubToken);
      expect(response).to.deep.equal(solution.serverResponse);
    });
    // Test POST
    // Test URI
    // Test body
    // Test headers.authorization
    // Test Json parse

    // In other file:
    // Test mergeLocalAndServerData equals expectedMergedResults
  });
});
