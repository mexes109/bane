/**
 * Created by timothy.snayers on 2016/01/29.
 */
var productRepo;
var Pagination_ConditionFilter;
Pagination_NumberOfProductsToDisplay = 3;
Pagination_CurrentPage = 1;

function CatalogPage_Categories() {
    var coldiv = document.getElementById("coldiv");
    var p = document.createElement("p");
    p.setAttribute("class", "lead");
    p.innerHTML = "Publishers";
    coldiv.appendChild(p);
    var listdiv = document.createElement("div");
    listdiv.setAttribute("class", "list-group");
    coldiv.appendChild(listdiv);
    for (var i = 1; i < 2; i++) {
        if (i === 1) {
            currentPublisher = "DC";
        }
        var a = document.createElement("a");
        a.setAttribute("href", "#");
        a.setAttribute("class", "list-group-item");
        a.innerHTML = currentPublisher;
        listdiv.appendChild(a);
    };
}

function CatalogPage_Pagination() {
    var pageNumber1 = document.getElementById("pageNumber1");
    var pageNumber2 = document.getElementById("pageNumber2");
    var pages = Math.ceil(productRepo.length / Pagination_NumberOfProductsToDisplay);
    pageNumber1.innerHTML = "Page " + Pagination_CurrentPage + " of " + pages;
    pageNumber2.innerHTML = "Page " + Pagination_CurrentPage + " of " + pages;
}

function CatalogPage_Products() {
    var rowdiv = document.getElementById("row2");
    rowdiv.innerHTML = '';
    for (var i = (Pagination_CurrentPage - 1) * (Pagination_NumberOfProductsToDisplay) + 1; i <= (Pagination_CurrentPage * Pagination_NumberOfProductsToDisplay) ; i++) {
        for (var j = 0; j < Pagination_ConditionFilter.length; j++) {
            currentProduct = getProductDetailsBasedOnCondition(productRepo[i - 1]["Stock"], Pagination_ConditionFilter[j]);
            var divitem = document.createElement("div");
            divitem.setAttribute("class", "col-sm-4 col-lg-4 col-md-4");
            rowdiv.appendChild(divitem);
            var thumbnaildiv = document.createElement("div");
            thumbnaildiv.setAttribute("class", "thumbnail");
            divitem.appendChild(thumbnaildiv);
            var img = document.createElement("img");
            img.setAttribute("src", "http://placehold.it/320x150");
            thumbnaildiv.appendChild(img);
            var captiondiv = document.createElement("div");
            captiondiv.setAttribute("class", "caption-full");
            thumbnaildiv.appendChild(captiondiv);
            var priceh4 = document.createElement("h4");
            priceh4.setAttribute("style", "position: absolute; bottom: 25px; right: 25px;");
            priceh4.innerHTML = "R " + currentProduct["Price"];
            captiondiv.appendChild(priceh4);
            nameh4 = document.createElement("h4");
            captiondiv.appendChild(nameh4);
            namea = document.createElement("a");
            namea.setAttribute("href", "productDetails.html?id=" + productRepo[i - 1]["Id"] + "&condition=" + currentProduct["Condition"]);
            namea.innerHTML = productRepo[i - 1]["Title"] + "<br>[Series: " + productRepo[i - 1]["SeriesNumber"] + "]";
            nameh4.appendChild(namea);
            conditionbold = document.createElement("strong");
            captiondiv.appendChild(conditionbold);
            conditionp = document.createElement("p");
            conditionp.innerHTML = "Condition: " + getConditionName(currentProduct["Condition"]);
            conditionbold.appendChild(conditionp);
            stockbold = document.createElement("strong");
            captiondiv.appendChild(stockbold);
            stockp = document.createElement("p");
            stockp.innerHTML = "Stock available: " + currentProduct["AvailableQuantity"];
            stockbold.appendChild(stockp);
            var addtocartbutton = document.createElement("button");
            addtocartbutton.setAttribute("class", "btn btn-info");
            addtocartbutton.setAttribute("onclick", "addToCart(" + productRepo[i - 1]["Id"] + "," + currentProduct["Condition"] + ")");
            addtocartbutton.innerHTML = "Add to cart";
            captiondiv.appendChild(addtocartbutton);
        }
    }
}

function CatalogPage_ConditionFilter() {
    var coldiv = document.getElementById("coldiv");
    var p = document.createElement("p");
    p.setAttribute("class", "lead");
    p.innerHTML = "Filter by condition";
    coldiv.appendChild(p);
    var listdiv = document.createElement("div");
    listdiv.setAttribute("class", "list-group");
    coldiv.appendChild(listdiv);
    conditions = getConditions();
    for (var i = 0; i < 4; i++) {
        var conditionlabel = document.createElement("label");
        conditionlabel.innerHTML = getConditionName(conditions[i]);
        conditionlabel.setAttribute("class", "list-group-item");
        listdiv.appendChild(conditionlabel);
        var conditioncheckbox = document.createElement("input");
        conditioncheckbox.setAttribute("type", "checkbox");
        conditioncheckbox.setAttribute("class", "pull-right");
        conditioncheckbox.setAttribute("onclick", "filterProductsByCondition()");
        conditioncheckbox.setAttribute("id", "condition" + i);
        conditionlabel.appendChild(conditioncheckbox);

    };
}

function searchForComic() {
    searchTerm = document.getElementById("searchTerm").value.toUpperCase();
    if (searchTerm === "") {
        productRepo = issueData
        changePaginationCriteria();
    }
    else {
        /*productRepo = [];
        for (var i = 0; i < issueData.length; i++) {
            if (issueData[i]["Title"].toUpperCase().indexOf(searchTerm) > -1) {
                productRepo.push(issueData[i]);
            }
        }*/
        function getByTitle() {
            return $.getJSON("/issues/getByTitle?id=" + document.getElementById("searchTerm").value.toUpperCase())
            .done(function (data) {
            productRepo = data;
            });
        }
        $.when(getByTitle()).done(function (a1) {
            changePaginationCriteria();
        });
    }
    
}



function getProductDetailsBasedOnCondition(product, condition) {
    for (var i = 0; i < product.length; i++) {
        if (product[i]["Condition"] === condition) {
            return product[i];
        }
    }
}

function getConditions() {
    conditions = [];
    for (var i = 0; i < productRepo[0]["Stock"].length; i++) {
        conditions[i] = productRepo[0]["Stock"][i]["Condition"];
    }
    return conditions;
}

function getConditionName(conditionID) {
    if (conditionID === 4) {
        return "Poor";
    }
    if (conditionID === 6) {
        return "Average";
    }
    if (conditionID === 10) {
        return "Fine";
    }
    if (conditionID === 13) {
        return "Very Fine";
    }
}

function getPublisherName(publisherID) {
    if (publisherID === 0) {
        return "DC";
    }
}

function filterProductsByCondition() {
    conditions = getConditions();
    Pagination_ConditionFilter = [];
    for (var i = 0; i < conditions.length; i++) {
        if (document.getElementById("condition" + i).checked === true) {
            Pagination_ConditionFilter.push(conditions[i]);
        }
    }
    if (Pagination_ConditionFilter.length < 1) {
        Pagination_ConditionFilter = conditions;
    }
    CatalogPage_Products();
}

function changePaginationCriteria() {
    var combobox = document.getElementById("productsPerPage");
    tempProductsToDisplay = combobox.options[combobox.selectedIndex].value;
    if (tempProductsToDisplay === "All") {
        tempProductsToDisplay = productRepo.length;
    }
    Pagination_NumberOfProductsToDisplay = tempProductsToDisplay;
    if (Pagination_CurrentPage > Math.ceil(productRepo.length / Pagination_NumberOfProductsToDisplay)) {
        Pagination_CurrentPage = Math.ceil(productRepo.length / Pagination_NumberOfProductsToDisplay);
    }

    if (Pagination_CurrentPage === 1) {
        document.getElementById("prevPage1").style.display = "none";
        document.getElementById("prevPage2").style.display = "none";
    }
    else {
        document.getElementById("prevPage1").style.display = "block";
        document.getElementById("prevPage2").style.display = "block";
    }

    if (Pagination_CurrentPage === Math.ceil(productRepo.length / Pagination_NumberOfProductsToDisplay)) {
        document.getElementById("nextPage1").style.display = "none";
        document.getElementById("nextPage2").style.display = "none";
    }
    else {
        document.getElementById("nextPage1").style.display = "block";
        document.getElementById("nextPage2").style.display = "block";
    }

    CatalogPage_Pagination();
    CatalogPage_Products();
}

function changePage(direction) {
    if (direction === "next") {
        Pagination_CurrentPage++;
        document.getElementById("prevPage1").style.display = "block";
        document.getElementById("prevPage2").style.display = "block";
        if (Pagination_CurrentPage === Math.ceil(productRepo.length / Pagination_NumberOfProductsToDisplay)) {
            document.getElementById("nextPage1").style.display = "none";
            document.getElementById("nextPage2").style.display = "none";
        }
    }
    if (direction === "prev") {
        Pagination_CurrentPage--;
        document.getElementById("nextPage1").style.display = "block";
        document.getElementById("nextPage2").style.display = "block";
        if (Pagination_CurrentPage === 1) {
            document.getElementById("prevPage1").style.display = "none";
            document.getElementById("prevPage2").style.display = "none";
        }
    }
    CatalogPage_Pagination();
    CatalogPage_Products();
}