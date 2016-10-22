var SEMANTIC_SERVICE_URL = "http://ecology-service.cse.tamu.edu/BigSemanticsService/";
global_storage = "";
global_products = 
    ["https://www.amazon.com/HP-14-an013nr-14-Inch-Notebook-Drive/dp/B01F4ZG68A/ref=sr_1_1?s=pc&ie=UTF8&qid=1476280219&sr=1-1&keywords=laptop",
     "https://www.amazon.com/HP-14-an013nr-14-Inch-Notebook-Drive/dp/B01F4ZG68A/ref=sr_1_3?s=pc&ie=UTF8&qid=1476283632&sr=1-3&keywords=Laptop",
     "https://www.amazon.com/Acer-Chromebook-CB3-131-C3SZ-11-6-Inch-Dual-Core/dp/B019G7VPTC/ref=sr_1_5?s=pc&ie=UTF8&qid=1476283632&sr=1-5&keywords=Laptop",
     "https://www.walmart.com/ip/HP-Flyer-Red-15.6-15-f272wm-Laptop-PC-with-Intel-Pentium-N3540-Processor-4GB-Memory-500GB-Hard-Drive-and-Windows-10-Home/46429958",
     "https://www.walmart.com/ip/Refurbished-Apple-MacBook-Air-11-6-LED-Intel-i5-3317-1-7GHz-4GB-64GB-SSD-Notebook-MD223LL/165231312",
     "https://www.newegg.com/Product/Product.aspx?Item=1TS-001A-002P7",
     "https://www.newegg.com/Product/Product.aspx?Item=N82E16834319906"]

global_metadata_from_array = [];
var metadata_index = 0;
var comp_visible = 0;

function makeUL(array) {
    // Create the list element:
    var list = document.createElement('ul');

    for(var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(array[i]));

        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}

function getMetadata(url)
{
    var requestURL= SEMANTIC_SERVICE_URL + "metadata.jsonp?callback=" + "metadataCallback" + "&url=" + encodeURIComponent(url);
    var script = document.createElement('script');
    script.src = requestURL;
    document.head.appendChild(script);
}

function metadataCallback(rawMetadata)
{
    //global_metadata_from_array.push(new Object(rawMetadata));
    localStorage.setItem(metadata_index.toString(),new String(JSON.stringify(rawMetadata)));
    metadata_index++;
//    global_storage = new Object(rawMetadata);
//    console.log(rawMetadata);
}


function get_metadata_from_array(){
        for (i = 0; i < global_products.length; i++) { 
            getMetadata(global_products[i]);
        }
    //localStorage.setItem("globalobjects", new Object(global_metadata_from_array));
   // get_local_storage();
}

function fill_products(){
    var locationvalue = 1;
    var replacevalues = " ";
    var local_metadata_from_array = [];
    for(i = 0;i<7;i++)
        local_metadata_from_array.push(JSON.parse(localStorage.getItem(i.toString()))); 
//    .hasOwnProperty('merchant_id')
        for (i = 0; i < local_metadata_from_array.length; i++) { 
            if(local_metadata_from_array[i].hasOwnProperty('amazon_product'))
            {
                replacevalues = 'picture'+locationvalue.toString();
                document.getElementById(replacevalues).src= local_metadata_from_array[i]['amazon_product']['main_images'][0]['location'];
                replacevalues = 'title'+locationvalue.toString();
                document.getElementById(replacevalues).innerHTML= local_metadata_from_array[i]['amazon_product']['title'];
                
                replacevalues = 'amount'+locationvalue.toString();
                document.getElementById(replacevalues).innerHTML= local_metadata_from_array[i]['amazon_product']['price'].substring(1);
                
                replacevalues = 'description'+locationvalue.toString();
                document.getElementById(replacevalues).innerHTML= local_metadata_from_array[i]['amazon_product']['description'];
                
                locationvalue=locationvalue+1;
                
            }
        }    

    
}




function fill_images()
{
    var locationvalue = 1;
    var replacevalues = "";
    var tablevalue = document.getElementById("suggestions-table");
//    .hasOwnProperty('merchant_id')
    var local_metadata_from_array = [];
    for(i = 0;i<7;i++)
        local_metadata_from_array.push(JSON.parse(localStorage.getItem(i.toString()))); 


        for (i = 0; i < local_metadata_from_array.length; i++) { 
            if(!local_metadata_from_array[i].hasOwnProperty('amazon_product'))
            {
                var row = tablevalue.insertRow(0);
                var cell = row.insertCell(0);
                //cell.innerHTML="New cell";
                var img = document.createElement('img');

                if(local_metadata_from_array[i].hasOwnProperty('walmart_product'))
                    img.src = local_metadata_from_array[i]['walmart_product']['main_images'][0]['location'];
                if(local_metadata_from_array[i].hasOwnProperty('newegg_product'))
                    img.src= local_metadata_from_array[i]['newegg_product']['favicon']['location'];
                
                cell.appendChild(img);
                //img.appendChild(popup);
                img.style.width = '80%';
	            img.style.height = '35%';
                img.addEventListener("mouseenter", onImgHover);
				img.addEventListener("mouseout", imgLeave);

            }
        }        
}

function onImgHover(){
	var popup = document.createElement('div');
	var pDiv = document.getElementById("compare_popup");
		popup.style.zIndex = 1;
		pDiv.style.width = '25%';
		pDiv.style.height = '25%';
		popup.style.width = '25%';
		popup.style.height = '25%';
		popup.style.position = 'fixed';
		popup.style.backgroundColor = 'rgba(255, 255, 255, 1)';
		popup.style.margin = '15% auto'; /* 15% from the top and centered */
		popup.style.padding = '20px';
		popup.style.border = '1px solid #888';
		popup.style.display = 'block';
		var text1 = document.createElement('p');
		text1.innerHTML = "hello please get help";
				   
		popup.appendChild(text1);
					
		pDiv.style.margin = "20% 50%";
	 
		popup.style.margin = "0 auto";
		pDiv.appendChild(popup);
		pDiv.style.display = "inherit";
}

function imgLeave(){
		var pDiv = document.getElementById("compare_popup");
		pDiv.style.display = "none";
}

function startingfunction(){
    get_metadata_from_array();
    fill_products();
    fill_images();
    fill_products();
    //document.getElementById('picture1').src= global_metadata_from_array[0].;  
}