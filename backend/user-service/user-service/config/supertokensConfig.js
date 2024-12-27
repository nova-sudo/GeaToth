const supertokens = require("supertokens-node");
const Session = require("supertokens-node/recipe/session");
const EmailPassword = require("supertokens-node/recipe/emailpassword");

supertokens.init({
    framework: "express",
    supertokens: {
        connectionURI: "https://try.supertokens.io",
    },
    appInfo: {
        appName: "User Service",
        apiDomain: "http://localhost:3030",
        websiteDomain: "http://localhost:3030",
    },
    recipeList: [EmailPassword.init(), Session.init()],
});

module.exports = supertokens;
