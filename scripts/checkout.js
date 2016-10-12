// JavaScript Document
// Get the modal
var modal;

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