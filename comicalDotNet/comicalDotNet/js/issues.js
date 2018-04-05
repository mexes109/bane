var issueData;
function getIssues() {
    return $.getJSON("/issues/get")
        .done(function (data) {
            issueData = data;
        });
}