function ProductDetailsPage_Product() {
    var issueID = getUrlVars()["id"];
    var conditionID = getUrlVars()["condition"];
    var product = findProduct(issueID);
    var stockDetails = getStockDetails(product, conditionID);
    document.getElementById("productDetailsStockCondition").innerHTML = "Condition: " + getConditionName(stockDetails["Condition"]);
    document.getElementById("productDetailsStockAvailable").innerHTML = "Stock available: " + stockDetails["AvailableQuantity"];
    document.getElementById("productDetailsPrice").innerHTML = "R " + stockDetails["Price"];
    document.getElementById("productDetailsName").innerHTML = product["Title"];
    document.getElementById("productDetailsDescription").innerHTML = product["Description"];
    document.getElementById("productDetailsPublisher").innerHTML = "Publisher: " + getPublisherName(product["Publisher"]);
    document.getElementById("productDetailsSeriesNum").innerHTML = "Series number: " + product["SeriesNumber"];
    document.getElementById("productDetailsCreator").innerHTML = "Creators: " + product["Creators"];
    document.getElementById("productDetailsPubDate").innerHTML = "Publication Date: " + product["PublicationDate"];
    document.getElementById("productDetailsAddToCart").setAttribute("onclick", "addToCart(" + issueID + "," + stockDetails["Condition"] + ")");
};

function findProduct(issueID) {
    for (var i = 0; i < IssueData.length; i++) {
        if (IssueData[i]["Id"] == issueID) {
            return IssueData[i];
        }
    }
}

function getStockDetails(product, conditionID) {
    for (var i = 0; i < product["Stock"].length; i++) {
        if (product["Stock"][i]["Condition"] == conditionID) {
            return product["Stock"][i];
        }
    }
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
    function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

