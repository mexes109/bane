var cartItems;

function loadCart() {
    var savedCart = localStorage.getItem("cartItems");
    if (savedCart === null) {
        cartItems = [];
        return;
    }
    cartItems = JSON.parse(savedCart);
}

function saveCart() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function removeFromCart(issueID, conditionID) {
    for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i]["Id"] == issueID && cartItems[i]["ConditionID"] == conditionID) {
            cartItems.pop(i);
        }
    }
    updateCartItemCount();
    closeCart();
    Cart_Items();
}

function Cart_Items() {
    if (document.getElementById("cart") !== null) {
        closeCart();
    }
    loadCart();
    var greyoutdiv = document.createElement("div");
    greyoutdiv.setAttribute("style", "position: fixed; width: 100%; height: 100%; top: 0; background-color: rgba(0,0,0,0.3); z-index: 1000;");
    greyoutdiv.setAttribute("id", "cart");
    document.body.appendChild(greyoutdiv);
    var containerdiv = document.createElement("div");
    containerdiv.setAttribute("style", "position: fixed; width: 80%; max-height: 80%; margin: 0 10%; top: 60px; border: 1px solid grey; border-radius: 10px; background-color: white;");
    greyoutdiv.appendChild(containerdiv);
    var carth4 = document.createElement("h4");
    carth4.setAttribute("style", "margin: 5px 10px;");
    carth4.innerHTML = "Cart Items";
    containerdiv.appendChild(carth4);
    var listdiv = document.createElement("div");
    listdiv.setAttribute("class", "list-group");
    containerdiv.appendChild(listdiv);
    for (var i = 0; i < cartItems.length; i++) {
        var itemdiv = document.createElement("div");
        itemdiv.setAttribute("class", "list-group-item");
        itemdiv.setAttribute("style", "margin: 0 10px;");
        listdiv.appendChild(itemdiv);
        var itemName = document.createElement("a");
        itemName.innerHTML = cartItems[i]["Title"] + " [Series number: " + cartItems[i]["SeriesNumber"] + "] [Condition: " + getConditionName(cartItems[i]["ConditionID"]) + "]";
        itemdiv.appendChild(itemName);
        itemName.setAttribute("href", "productDetails.html?id=" + cartItems[i]["Id"] + "&condition=" + cartItems[i]["ConditionID"]);
        var removeitembutton = document.createElement("button");
        removeitembutton.setAttribute("class", "btn btn-danger pull-right");
        removeitembutton.setAttribute("style", "padding: 0; line-height: 0; height: 20px; width: 20px; margin-left: 5px;");
        removeitembutton.innerHTML = "x";
        removeitembutton.setAttribute("onclick", "removeFromCart(" + cartItems[i]["Id"] + "," + cartItems[i]["ConditionID"] + ")");
        itemdiv.appendChild(removeitembutton);
        var itemprice = document.createElement("label");
        itemprice.setAttribute("class", "pull-right");
        itemprice.innerHTML = "R " + getItemPrice(cartItems[i]);
        itemdiv.appendChild(itemprice);
    }
    var continueshoppingbutton = document.createElement("button");
    continueshoppingbutton.setAttribute("class", "btn btn-primary");
    continueshoppingbutton.setAttribute("onclick", "closeCart()");
    continueshoppingbutton.setAttribute("style", "margin: 10px;");
    continueshoppingbutton.innerHTML = "Continue shopping";
    containerdiv.appendChild(continueshoppingbutton);
    var proceedtocheckout = document.createElement("a");
    proceedtocheckout.setAttribute("class", "btn btn-success pull-right");
    proceedtocheckout.setAttribute("style", "margin: 10px;");
    proceedtocheckout.innerHTML = "Proceed to checkout";
    proceedtocheckout.setAttribute("href", "checkout.html");
    containerdiv.appendChild(proceedtocheckout);
    if (cartItems.length < 1) {
        noneh4 = document.createElement("h6");
        noneh4.innerHTML = "Shopping cart is empty";
        containerdiv.appendChild(noneh4);
        containerdiv.setAttribute("align", "center");
        proceedtocheckout.setAttribute("style", "display: none;");
    }
    listdiv.setAttribute("style", "overflow-y: auto; min-height: 200px; height: " + (containerdiv.offsetHeight - 120) + "px;");
    window.scrollTo(0, 0);
}

function closeCart() {
    cart = document.getElementById("cart");
    document.body.removeChild(cart);
}

function getItemPrice(item) {
    for (var i = 0; i < item["Stock"].length; i++) {
        if (item["Stock"][i]["Condition"] == item["ConditionID"]) {
            return item["Stock"][i]["Price"];
        }
    }
}

function addToCart(issueID, conditionID) {
    if (typeof cartItems === "undefined") {
        loadCart();
    }
    if (checkIfCartAlradyContainsItem(issueID, conditionID)) {
        return;
    }
    var product = [];
    product = findCartProduct(issueID, conditionID);
    cartItems.push(product);
    updateCartItemCount();
}

function findCartProduct(issueID, conditionID) {
    for (var i = 0; i < productRepo.length; i++) {
        if (productRepo[i]["Id"] == issueID) {
            temp = [];
            temp = (JSON.parse(JSON.stringify(productRepo[i])));
            temp["ConditionID"] = conditionID;
            temp["Quantity"] = 1;
            return temp;
        }
    }
}

function updateCartItemCount() {
    if (typeof cartItems === "undefined") {
        loadCart();
    }
    document.getElementById("cartButton").innerHTML = "Cart(" + cartItems.length + ")";
    saveCart();
}

function checkIfCartAlradyContainsItem(issueID, conditionID) {
    for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i]["Id"] == issueID && cartItems[i]["ConditionID"] == conditionID) {
            alert("Item already in cart.");
            return true;
        }
    }
    return false;
}