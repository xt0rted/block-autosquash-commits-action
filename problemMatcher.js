const path = require("path");

exports.addProblemMatcher = function(name) {
    const matchersPath = path.join(__dirname, ".github");
    console.log(`::[add-matcher]${path.join(matchersPath, name)}`);
}
