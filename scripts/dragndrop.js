// JavaScript Document
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData('text');
	var price = document.getElementById('amount' + data).innerHTML;
	var table = document.getElementById("cart-table");
	var row = table.insertRow(1);
	row.innerHTML = "<td>" + document.getElementById('title' + data).innerHTML + "</td>" +
            		"<td>$" + price + "</td>";
	var priceField = document.getElementById("total_amount");
	priceField.innerHTML = parseFloat(priceField.innerHTML) + parseFloat(price);	
}

function Product(name, id, price){
	this.name = name;
	this.id = id;
	this.price = price;
}