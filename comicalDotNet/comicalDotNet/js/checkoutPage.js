var subtotalOrderPrice;
function checkoutCartSummary() {
    loadCart();
    var cartSummaryDiv = document.getElementById("cartSummary");
    cartSummaryDiv.innerHTML = "";
    subtotalOrderPrice = 0;
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
        productPriceDiv.setAttribute("class", "col-xs-6 ");
        productPriceAndQuantityDiv.appendChild(productPriceDiv);
        var productPriceH4 = document.createElement("h4");
        productPriceDiv.appendChild(productPriceH4);
        var productPriceStrong = document.createElement("strong");
        productPriceStrong.innerHTML = "R " + getItemPrice(cartItems[i]);
        productPriceH4.appendChild(productPriceStrong);
        var productQuantityDiv = document.createElement("div");
        productQuantityDiv.setAttribute("class", "col-xs-4");
        productPriceAndQuantityDiv.appendChild(productQuantityDiv);
        var productQuantitySpinner = document.createElement("div");
        productQuantitySpinner.setAttribute("class", "input-group number-spinner");
        productQuantityDiv.appendChild(productQuantitySpinner);
        var productQuantitySpinnerSpanDown = document.createElement("span");
        productQuantitySpinnerSpanDown.setAttribute("class", "input-group-btn data-dwn");
        productQuantitySpinner.appendChild(productQuantitySpinnerSpanDown);
        var productQuantitySpinnerSpanDownButton = document.createElement("button");
        productQuantitySpinnerSpanDownButton.setAttribute("class", "btn btn-default btn-info");
        productQuantitySpinnerSpanDownButton.setAttribute("data-dir", "dwn");
        productQuantitySpinnerSpanDown.appendChild(productQuantitySpinnerSpanDownButton);
        var productQuantitySpinnerSpanDownButtonSpan = document.createElement("span");
        productQuantitySpinnerSpanDownButtonSpan.setAttribute("class", "glyphicon glyphicon-minus");
        productQuantitySpinnerSpanDownButton.appendChild(productQuantitySpinnerSpanDownButtonSpan);
        var productQuantitySpinnerInput = document.createElement("input");
        productQuantitySpinnerInput.setAttribute("class", "form-control text-center");
        productQuantitySpinnerInput.setAttribute("id", "price" + i);
        productQuantitySpinnerInput.setAttribute("value", cartItems[i]["Quantity"]);
        productQuantitySpinnerInput.setAttribute("min", "1");
        productQuantitySpinnerInput.setAttribute("max", "40");
        productQuantitySpinner.appendChild(productQuantitySpinnerInput);
        var productQuantitySpinnerSpanUp = document.createElement("span");
        productQuantitySpinnerSpanUp.setAttribute("class", "input-group-btn data-up");
        productQuantitySpinner.appendChild(productQuantitySpinnerSpanUp);
        var productQuantitySpinnerSpanUpButton = document.createElement("button");
        productQuantitySpinnerSpanUpButton.setAttribute("class", "btn btn-default btn-info");
        productQuantitySpinnerSpanUpButton.setAttribute("data-dir", "up");
        productQuantitySpinnerSpanUp.appendChild(productQuantitySpinnerSpanUpButton);
        var productQuantitySpinnerSpanUpButtonSpan = document.createElement("span");
        productQuantitySpinnerSpanUpButtonSpan.setAttribute("class", "glyphicon glyphicon-plus");
        productQuantitySpinnerSpanUpButton.appendChild(productQuantitySpinnerSpanUpButtonSpan);
        removeProductDiv = document.createElement("div");
        removeProductDiv.setAttribute("class", "col-xs-2");
        removeProductDiv.innerHTML = '<button type="button" class="btn btn-link btn-xs" onclick="removeFromCart(' + cartItems[i]["Id"] + "," + cartItems[i]["ConditionID"] + ')"><span class="glyphicon glyphicon-trash"> </span></button>';
        productPriceAndQuantityDiv.appendChild(removeProductDiv);
        subtotalOrderPrice += getItemPrice(cartItems[i]) * cartItems[i]["Quantity"];
    }
    localStorage.setItem("subtotalOrderPrice", subtotalOrderPrice.toFixed(2));
}

function SubtotalOrderPrice() {
    subtotalOrderPrice = localStorage.getItem("subtotalOrderPrice");
    document.getElementById("subtotalOrderPrice").innerHTML = "Subtotal <strong>R " + subtotalOrderPrice + "</strong>";
}

function removeFromCart(issueID, conditionID) {
    for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i]["Id"] == issueID && cartItems[i]["ConditionID"] == conditionID) {
            cartItems.pop(i);
        }
    }
    updateCartItemCount();
    saveCart();
    checkoutCartSummary();
    SubtotalOrderPrice();
    if (document.getElementById("cart") !== null) {
        Cart_Items();
    }
}

function updateCart() {
    for (var i = 0; i < cartItems.length; i++) {
        cartItems[i]["Quantity"] = parseInt(document.getElementById("price" + i).value);
    }
    saveCart();
    checkoutCartSummary();
    SubtotalOrderPrice();
}

