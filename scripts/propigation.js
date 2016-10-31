var SEMANTIC_SERVICE_URL = "http://ecology-service.cse.tamu.edu/BigSemanticsService/";
global_storage = "";
global_products = 
    ["https://www.amazon.com/HP-Touchscreen-Quad-Core-Processor-Refurbished/dp/B01D74138I",
     "https://www.walmart.com/ip/HP-Flyer-Red-15.6-15-f272wm-Laptop-PC-with-Intel-Pentium-N3540-Processor-4GB-Memory-500GB-Hard-Drive-and-Windows-10-Home/46429958",
     "https://www.walmart.com/ip/Refurbished-Apple-MacBook-Air-11-6-LED-Intel-i5-3317-1-7GHz-4GB-64GB-SSD-Notebook-MD223LL/165231312",
     "https://www.newegg.com/Product/Product.aspx?Item=1TS-001A-002P7",
     "https://www.amazon.com/Performance-Premium-Processor-SuperMulti-10-silver/dp/B01KAP7RJG/ref=pd_lpo_147_bs_t_2?_encoding=UTF8&psc=1&refRID=Y7HR4FD1KGKVYBMH53VP",
     "https://www.newegg.com/Product/Product.aspx?Item=N82E16834319906",
     "https://www.newegg.com/Product/Product.aspx?Item=N82E16834319906",
     "https://www.amazon.com/Chromebook-Rockchip-Pearl-White-Light/dp/B01EGBAQXY/ref=sr_1_21?s=pc&ie=UTF8&qid=1477907108&sr=1-21&keywords=laptop",
    "https://www.walmart.com/ip/Refurbished-HP-Violet-Purple-11-Stream-Laptop-PC-with-Intel-Celeron-N3050-Dual-Core-Processor-2GB-Memory-32GB-Hard-Drive-and-Windows-10-Home/49332608"];
    //"https://www.walmart.com/ip/HP-Laptop-Core-i3-NT-15-ay039wm/51397788"];

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
    for(i = 0;i<9;i++)
        local_metadata_from_array.push(JSON.parse(localStorage.getItem(i.toString()))); 
    
    if(localStorage.getItem("price_order") == "lthp"){
        var current = 100;
        var swap;
        for(i = 0;i<9;i++){
            if(local_metadata_from_array[i].hasOwnProperty('amazon_product'))
            {
                if(current == 100)
                    current = i;
                if(parseInt(local_metadata_from_array[current]['amazon_product']['price'].substring(1)) > parseInt(local_metadata_from_array[i]['amazon_product']['price'].substring(1)))
                    {
                        swap = local_metadata_from_array[current];
                        local_metadata_from_array[current] = local_metadata_from_array[i];
                        local_metadata_from_array[i] = swap;
                        current = i;
                    }
            }
        }
    }
    else if(localStorage.getItem("price_order") == "htlp"){
        var current = 100;
        var swap;
        for(i = 0;i<9;i++){
            if(local_metadata_from_array[i].hasOwnProperty('amazon_product'))
            {
                if(current == 100)
                    current = i;
                if(parseInt(local_metadata_from_array[current]['amazon_product']['price'].substring(1)) < parseInt(local_metadata_from_array[i]['amazon_product']['price'].substring(1)))
                    {
                        swap = local_metadata_from_array[current];
                        local_metadata_from_array[current] = local_metadata_from_array[i];
                        local_metadata_from_array[i] = swap;
                        current = i;
                    }
            }
        }
    }
    else if(localStorage.getItem("price_order") == "lthr"){
        var current = 100;
        var swap;
        for(i = 0;i<9;i++){
            if(local_metadata_from_array[i].hasOwnProperty('amazon_product'))
            {
                if(current == 100)
                    current = i;
                if(parseFloat(local_metadata_from_array[current]['amazon_product']['overall_rating'].substring(0,2)) > parseFloat(local_metadata_from_array[i]['amazon_product']['overall_rating'].substring(0,2)))
                    {
                        swap = local_metadata_from_array[current];
                        local_metadata_from_array[current] = local_metadata_from_array[i];
                        local_metadata_from_array[i] = swap;
                        current = i;
                    }
            }
        }
    }
    else if(localStorage.getItem("price_order") == "htlr"){
        var current = 100;
        var swap;
        for(i = 0;i<9;i++){
            if(local_metadata_from_array[i].hasOwnProperty('amazon_product'))
            {
                if(current == 100)
                    current = i;
                if(parseFloat(local_metadata_from_array[current]['amazon_product']['overall_rating'].substring(0,2)) < parseFloat(local_metadata_from_array[i]['amazon_product']['overall_rating'].substring(0,2)))
                    {
                        swap = local_metadata_from_array[current];
                        local_metadata_from_array[current] = local_metadata_from_array[i];
                        local_metadata_from_array[i] = swap;
                        current = i;
                    }
            }
        }
    }
    
    
    
//    .hasOwnProperty('merchant_id')
        for (i = 0; i < local_metadata_from_array.length; i++) { 
            if(local_metadata_from_array[i].hasOwnProperty('amazon_product'))
            {
                var pricevalue= parseInt(local_metadata_from_array[i]['amazon_product']['price'].substring(1));
                var starvalue = parseInt(local_metadata_from_array[i]['amazon_product']['overall_rating'].substring(0,1));
                if(pricevalue > parseInt(localStorage.getItem("high")) || pricevalue < parseInt(localStorage.getItem("low")))
                    {
                        var link = document.getElementById(locationvalue.toString());
                            link.style.display = 'none';    
                        locationvalue=locationvalue+1;
                        continue;
                    }
                
                if(starvalue < parseInt(localStorage.getItem("star")))
                    {
                        var link = document.getElementById(locationvalue.toString());
                            link.style.display = 'none';    
                        locationvalue=locationvalue+1;
                        continue;
                    }
                
                if(pricevalue > parseInt(localStorage.getItem("high")) || pricevalue < parseInt(localStorage.getItem("low")))
                    {
                        var link = document.getElementById(locationvalue.toString());
                            link.style.display = 'none';    
                        locationvalue=locationvalue+1;
                        continue;
                    }
                if(!local_metadata_from_array[i]['amazon_product']['description'].includes(localStorage.getItem('brand'))) {
                    var link = document.getElementById(locationvalue.toString());
                            link.style.display = 'none';    
                        locationvalue=locationvalue+1;
                        continue;
                }
                if(!local_metadata_from_array[i]['amazon_product']['description'].includes(localStorage.getItem('hard_drive'))) {
                    var link = document.getElementById(locationvalue.toString());
                            link.style.display = 'none';    
                        locationvalue=locationvalue+1;
                        continue;
                }
                if(!local_metadata_from_array[i]['amazon_product']['description'].includes(localStorage.getItem('screen'))) {
                    var link = document.getElementById(locationvalue.toString());
                            link.style.display = 'none';    
                        locationvalue=locationvalue+1;
                        continue;
                }
                document.getElementById(locationvalue.toString()).style.display = "";
                
                replacevalues = 'picture'+locationvalue.toString();
                document.getElementById(replacevalues).src= local_metadata_from_array[i]['amazon_product']['main_images'][0]['location'];
                document.getElementById(replacevalues).style.display = "";
                
                replacevalues = 'title'+locationvalue.toString();
                document.getElementById(replacevalues).innerHTML= local_metadata_from_array[i]['amazon_product']['title'];
                document.getElementById(replacevalues).style.display = "";
                
                replacevalues = 'amount'+locationvalue.toString();
                document.getElementById(replacevalues).innerHTML= local_metadata_from_array[i]['amazon_product']['price'].substring(1);
                display1 = document.getElementById(replacevalues).style.display
                
                replacevalues = 'description'+locationvalue.toString();
                document.getElementById(replacevalues).innerHTML= local_metadata_from_array[i]['amazon_product']['description'];
                document.getElementById(replacevalues).style.display = "";
                
                replacevalues = 'rating'+locationvalue.toString();
                document.getElementById(replacevalues).innerHTML= local_metadata_from_array[i]['amazon_product']['overall_rating'];
                document.getElementById(replacevalues).style.display = "";
                
                lowest = 5;
                lowest_location = 0;
                highest = 0;
                highest_location = 0;
                for(j = 0;j<local_metadata_from_array[i]['amazon_product']['reviews'].length;j++)
                {
                    if(lowest > parseInt(local_metadata_from_array[i]['amazon_product']['reviews'][j]['rating'].charAt(0)))
                        {
                            lowest_location = j;
                            lowest = parseInt(local_metadata_from_array[i]['amazon_product']['reviews'][j]['rating'].charAt(0))
                        }
                    
                    if(highest < parseInt(local_metadata_from_array[i]['amazon_product']['reviews'][j]['rating'].charAt(0)))
                        {
                            highest_location = j;
                            highest = parseInt(local_metadata_from_array[i]['amazon_product']['reviews'][j]['rating'].charAt(0))
                        }
                    
                    
                }
                
                replacevalues = 'best'+locationvalue.toString();
                document.getElementById(replacevalues).innerHTML= local_metadata_from_array[i]['amazon_product']['reviews'][highest_location]['description'];
                document.getElementById(replacevalues).style.display = "";
                
                replacevalues = 'worst'+locationvalue.toString();
                document.getElementById(replacevalues).innerHTML= local_metadata_from_array[i]['amazon_product']['reviews'][lowest_location]['description'];
                document.getElementById(replacevalues).style.display = "";
                
                locationvalue=locationvalue+1;
                
            }
        }    

    
}



var images = [];
var datases = [];
function fill_images()
{
    var locationvalue = 1;
    var replacevalues = "";
    var tablevalue = document.getElementById("suggestions-table");
//    .hasOwnProperty('merchant_id')
    var local_metadata_from_array = [];
    
    
    for(i = 0;i<9;i++)
        local_metadata_from_array.push(JSON.parse(localStorage.getItem(i.toString()))); 


        for (i = 0; i < local_metadata_from_array.length; i++) { 
            if(!local_metadata_from_array[i].hasOwnProperty('amazon_product'))
            {
                var row = tablevalue.insertRow(0);
                var cell = row.insertCell(0);
                //cell.innerHTML="New cell";
                var img = document.createElement('img');
                var tabl = document.createElement('li');
                
                if(local_metadata_from_array[i].hasOwnProperty('walmart_product'))
                {   
                    img.src = local_metadata_from_array[i]['walmart_product']['main_images'][0]['location'];
                    cell.appendChild(img);
                    //img.appendChild(popup);
                    img.style.width = '80%';
                    img.style.height = '30%';
                    images.push(img);
                }
                if(local_metadata_from_array[i].hasOwnProperty('newegg_product'))
                    {
                        var specificvalue = local_metadata_from_array[i]['newegg_product']['specifications_table'][1]['specifications'][3]['name'];
                        specificvalue = specificvalue + ": " + local_metadata_from_array[i]['newegg_product']['specifications_table'][1]['specifications'][3]['value'];
                        var text1 = document.createTextNode(specificvalue);
                        var para = document.createElement("p");                       // Create a <p> element
                        para.style.color = get_color();
                        para.appendChild(text1);                                          
                        tabl.appendChild(para);
                        
                        
                        var specificvalue = local_metadata_from_array[i]['newegg_product']['specifications_table'][1]['specifications'][7]['name'];
                        specificvalue = specificvalue + ": " + local_metadata_from_array[i]['newegg_product']['specifications_table'][1]['specifications'][7]['value'];
                        var text1 = document.createTextNode(specificvalue);
                        var para = document.createElement("p");                       // Create a <p> element
                        para.style.color = get_color();
                        para.appendChild(text1);                                          
                        tabl.appendChild(para);
                        
                        
                        var specificvalue = local_metadata_from_array[i]['newegg_product']['specifications_table'][1]['specifications'][5]['name'];
                        specificvalue = specificvalue + ": " + local_metadata_from_array[i]['newegg_product']['specifications_table'][1]['specifications'][5]['value'];
                        var text1 = document.createTextNode(specificvalue);
                        var para = document.createElement("p");                       // Create a <p> element
                        para.style.color = get_color();
                        para.appendChild(text1);                                          
                        tabl.appendChild(para);
                        
                        datases.push(tabl);
                        
                        
                    }
                    //img.src= local_metadata_from_array[i]['newegg_product']['favicon']['location'];
                
                
            }
        }
        for(i = 0;i<images.length;i++)
            {
                images[i].addEventListener("mouseenter", function(){onImgHover(datases[i]);});
                images[i].addEventListener("mouseout", imgLeave);
            }
            
}

function fill_hover(){
    var locationvalue = 1;
    var replacevalues = "";
    var tablevalue = document.getElementById("suggestions-table");
//    .hasOwnProperty('merchant_id')
    var local_metadata_from_array = [];
    
    
    for(i = 0;i<9;i++)
        local_metadata_from_array.push(JSON.parse(localStorage.getItem(i.toString()))); 


        for (i = 0; i < local_metadata_from_array.length; i++) { 
            if(!local_metadata_from_array[i].hasOwnProperty('amazon_product'))
            {
                var row = tablevalue.insertRow(0);
                var cell = row.insertCell(0);
                //cell.innerHTML="New cell";
                var img = document.createElement('img');
                var tabl = document.createElement('li');
                if(local_metadata_from_array[i].hasOwnProperty('newegg_product'))
                    {
                        var specificvalue = local_metadata_from_array[i]['newegg_product']['specifications_table'][1]['specifications'][3]['name'];
                        specificvalue = specificvalue + ": " + local_metadata_from_array[i]['newegg_product']['specifications_table'][1]['specifications'][3]['value'];
                        var text1 = document.createTextNode(specificvalue);
                        var para = document.createElement("p");                       // Create a <p> element
                        para.style.color = get_color();
                        para.appendChild(text1);                                          
                        tabl.appendChild(para);
                        
                        
                        var specificvalue = local_metadata_from_array[i]['newegg_product']['specifications_table'][1]['specifications'][7]['name'];
                        specificvalue = specificvalue + ": " + local_metadata_from_array[i]['newegg_product']['specifications_table'][1]['specifications'][7]['value'];
                        var text1 = document.createTextNode(specificvalue);
                        var para = document.createElement("p");                       // Create a <p> element
                        para.style.color = get_color();
                        para.appendChild(text1);                                          
                        tabl.appendChild(para);
                        
                        
                        var specificvalue = local_metadata_from_array[i]['newegg_product']['specifications_table'][1]['specifications'][5]['name'];
                        specificvalue = specificvalue + ": " + local_metadata_from_array[i]['newegg_product']['specifications_table'][1]['specifications'][5]['value'];
                        var text1 = document.createTextNode(specificvalue);
                        var para = document.createElement("p");                       // Create a <p> element
                        para.style.color = get_color();
                        para.appendChild(text1);                                          
                        tabl.appendChild(para);
                        
                        datases.push(tabl);
                        
                        
                    }
                    //img.src= local_metadata_from_array[i]['newegg_product']['favicon']['location'];
                
                
            }
        }
    return datases[Math.floor((Math.random() * 3))]
}


function get_color()
{
    if(Math.floor((Math.random() * 2)) ==1)
       return 'red';
    else
       return 'green';
}

function onImgHover(text_array){
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
//		var text1 = document.createElement('p');
//		text1.innerHTML = "hello good by"; //text_array;		   
		popup.appendChild(fill_hover());
					
		pDiv.style.margin = "20% 50%";
	 
		popup.style.margin = "0 auto";
		pDiv.appendChild(popup);
		pDiv.style.display = "inherit";
}

function imgLeave(){
		var pDiv = document.getElementById("compare_popup");
		pDiv.style.display = "none";
}

function star_change(star){
    localStorage.setItem('star',star)
    fill_products();
}

function low_price_change(){
    var low = document.getElementById("lowest");
    if(parseInt(low.value) != localStorage.getItem('low'))
       localStorage.setItem('low',low.value);
    fill_products();
}

function high_price_change(){
    var high = document.getElementById("highest");
    if(parseInt(high.value) != localStorage.getItem('high'))
       localStorage.setItem('high',high.value);
    fill_products();
}

function order_by_change(order){
    localStorage.setItem("price_order",order);
    fill_products();
}
function specification_change(specification)
{
    localStorage.setItem(specification, document.getElementById(specification).value);
    fill_products();
}

function startingfunction(){
    get_metadata_from_array();
    low_price_change()
    high_price_change();
    fill_products();
    fill_images();
    fill_products();
    //document.getElementById('picture1').src= global_metadata_from_array[0].;  
}


