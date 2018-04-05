function reviewCartSummary() {
    loadCart();
    var cartSummaryDiv = document.getElementById("cartSummary");
    cartSummaryDiv.innerHTML = "";
    for (var i = 0; i < cartItems.length; i++) {
        var rowDiv = document.createElement("div");
        rowDiv.setAttribute("class", "row");
        cartSummaryDiv.appendChild(rowDiv);
        var productImgDiv = document.createElement("div");
        productImgDiv.setAttribute("class", "col-md-2");
        rowDiv.appendChild(productImgDiv);
        var productImg = document.createElement("img");
        productImg.setAttribute("class", "img-responsive");
        productImg.setAttribute("src", "http://placehold.it/100x70");
        productImgDiv.appendChild(productImg);
        var productNameDiv = document.createElement("div");
        productNameDiv.setAttribute("class", "col-md-4");
        rowDiv.appendChild(productNameDiv);
        var productNameH4 = document.createElement("h4");
        productNameH4.setAttribute("class", "product-name");
        productNameH4.innerHTML = "<strong>" + cartItems[i]["Title"] + " [Series number: " + cartItems[i]["SeriesNumber"] +
            "] [Condition: " + getConditionName(cartItems[i]["ConditionID"]) + "]</strong>";
        productNameDiv.appendChild(productNameH4);
        var productPriceAndQuantityDiv = document.createElement("div");
        productPriceAndQuantityDiv.setAttribute("class", "col-md-6");
        rowDiv.appendChild(productPriceAndQuantityDiv);
        var productPriceDiv = document.createElement("div");
        productPriceDiv.setAttribute("class", "col-xs-6");
        productPriceAndQuantityDiv.appendChild(productPriceDiv);
        var productPriceH4 = document.createElement("h4");
        productPriceDiv.appendChild(productPriceH4);
        var productPriceStrong = document.createElement("strong");
        productPriceStrong.innerHTML = "R " + getItemPrice(cartItems[i]);
        productPriceH4.appendChild(productPriceStrong);
        var productQuantityDiv = document.createElement("div");
        productQuantityDiv.setAttribute("class", "col-xs-4");
        productPriceAndQuantityDiv.appendChild(productQuantityDiv);
        var productQuantityDiv = document.createElement("div");
        productQuantityDiv.setAttribute("class", "col-xs-6 text-right");
        productPriceAndQuantityDiv.appendChild(productQuantityDiv);
        var productQuantityH4 = document.createElement("h4");
        productQuantityDiv.appendChild(productQuantityH4);
        var productQuantityStrong = document.createElement("strong");
        productQuantityStrong.innerHTML = "x " + cartItems[i]["Quantity"];
        productQuantityH4.appendChild(productQuantityStrong);
        var productQuantityDiv = document.createElement("div");
        productQuantityDiv.setAttribute("class", "col-xs-4");
        productPriceAndQuantityDiv.appendChild(productQuantityDiv);
    }
}
