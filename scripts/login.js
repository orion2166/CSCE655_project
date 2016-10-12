// JavaScript Document
var loginOpDisplayed = 0;
var logged = 0;

function dropdownLogin(){
	var table = document.getElementById("header-table");
	if (loginOpDisplayed == 0){
		var loginRow = table.insertRow(1);
		var cell1 = loginRow.insertCell(0);
		cell1.innerHTML = "&nbsp;";
		var cell2 = loginRow.insertCell(1);
		cell2.innerHTML = "&nbsp;";
		var cell3 = loginRow.insertCell(2);
		cell3.innerHTML = "User name:";
		var cell4 = loginRow.insertCell(3);
		cell4.innerHTML = "<input type=\"text\" name=\"login_field\" value=\"\" id=\"login_field\"/>";
		
		var passwordRow = table.insertRow(2);
		var cell1 = passwordRow.insertCell(0);
		cell1.innerHTML = "&nbsp;";
		var cell2 = passwordRow.insertCell(1);
		cell2.innerHTML = "&nbsp;";
		var cell3 = passwordRow.insertCell(2);
		cell3.innerHTML = "Password:";
		var cell4 = passwordRow.insertCell(3);
		cell4.innerHTML = "<input type=\"password\" name=\"password_field\" value=\"\" id=\"password_field\"/>";
		
		var submitRow = table.insertRow(3);
		var cell1 = submitRow.insertCell(0);
		cell1.innerHTML = "&nbsp;";
		var cell2 = submitRow.insertCell(1);
		cell2.innerHTML = "&nbsp;";
		var cell3 = submitRow.insertCell(2);
		cell3.innerHTML = "&nbsp;";
		var cell4 = submitRow.insertCell(3);
		cell4.innerHTML = "<input type=\"button\" onClick=\"login()\" value=\"Send\" class=\"form_button\">";
		loginOpDisplayed = 1;
	}else{
		table.deleteRow(3);
		table.deleteRow(2);
		table.deleteRow(1);
		loginOpDisplayed = 0;
	}
}

function login(){
	var login = document.getElementById("login_field").value;
	var password = document.getElementById("password_field").value;
	if(login == "user" && password == "password"){
		dropdownLogin();
		var cell = document.getElementById("login-data-cell");
		cell.innerHTML = "<h4>" + login + "</h4> <input type=\"button\" onClick=\"logout()\" value=\"Logout\" class=\"form_button\">";
		var image = document.getElementById("picture_cell");
		image.innerHTML = "<img src=\"resources/loged_pic.png\" width=\"100rem\" height=\"100rem\">";
	}else{
		alert("Wrong credentials. Please try again");
	}
}
	
function logout(){
	var cell = document.getElementById("login-data-cell");
	cell.innerHTML = "<input type=\"button\" onClick=\"\" value=\"Register\" class=\"form_button\">" +
                     "<input type=\"button\" onClick=\"dropdownLogin()\" value=\"Login\" class=\"form_button\">";
	var image = document.getElementById("picture_cell");
	image.innerHTML = "<img src=\"resources/user_pic.png\" width=\"100rem\" height=\"100rem\">";	
}