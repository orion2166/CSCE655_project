// JavaScript Document
// Get the modal
var modal;
var cart;
var button;

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
function goToCheckout(){
    modal = document.getElementById('checkout_popup');
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function closeCheckout() {
    modal.style.display = "none";
}

// When the user clicks on the button, open the modal 
function displayButton(){
    cart = document.getElementById('cart-table');
    cart.style.display = "block";
    button = document.getElementById('buy_button');
    button.style.display = "block";
    document.getElementById('cart_header').onclick = hideButton;
}

// When the user clicks on <span> (x), close the modal
function hideButton() {
    cart.style.display = "none";
    button.style.display = "none";
    document.getElementById('cart_header').onclick = displayButton;
}

function checkout(){
	alert("purchase completed");
	var table = document.getElementById("cart-table");
	table.innerHTML = "<tr class=\"border-cell\">" +
						  "<td><h3>Drag items here:</h3></td>" +
						  "<td>&nbsp;</td>" +
					  "</tr>" +
					  "<tr id=\"products-row\">" +
						"<td>&nbsp;</td>" +
						"<td>&nbsp;</td>" +
					  "</tr>" +
					  "<tr id=\"total-row\" class=\"border-cell\">" +
						  "<td class=\"product-cell\"><strong>Total:</strong></td>" +      
						  "<td class=\"value-cell\">" +
						  	"<strong>$<span id=\"total_amount\">0.00</span></strong>" +
						  "</td>" +
					  "</tr>"
	modal.style.display = "none";
}