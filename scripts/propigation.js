var SEMANTIC_SERVICE_URL = "http://ecology-service.cse.tamu.edu/BigSemanticsService/";
global_storage = "";
global_products = 
    ["https://www.amazon.com/HP-14-an013nr-14-Inch-Notebook-Drive/dp/B01F4ZG68A/ref=sr_1_1?s=pc&ie=UTF8&qid=1476280219&sr=1-1&keywords=laptop",
     "https://www.amazon.com/HP-14-an013nr-14-Inch-Notebook-Drive/dp/B01F4ZG68A/ref=sr_1_3?s=pc&ie=UTF8&qid=1476283632&sr=1-3&keywords=Laptop",
     "https://www.amazon.com/Acer-Chromebook-CB3-131-C3SZ-11-6-Inch-Dual-Core/dp/B019G7VPTC/ref=sr_1_5?s=pc&ie=UTF8&qid=1476283632&sr=1-5&keywords=Laptop",
     "https://www.walmart.com/ip/HP-Flyer-Red-15.6-15-f272wm-Laptop-PC-with-Intel-Pentium-N3540-Processor-4GB-Memory-500GB-Hard-Drive-and-Windows-10-Home/46429958",
     "https://www.walmart.com/ip/Refurbished-Apple-MacBook-Air-11-6-LED-Intel-i5-3317-1-7GHz-4GB-64GB-SSD-Notebook-MD223LL/165231312",
     "http://www.newegg.com/Product/Product.aspx?Item=1TS-001A-002P7",
     "http://www.newegg.com/Product/Product.aspx?Item=N82E16834319906"]
global_metadata_from_array = [];

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
    global_metadata_from_array.push(new Object(rawMetadata));
//    global_storage = new Object(rawMetadata);
//    console.log(rawMetadata);
}

function get_metadata_from_array(){
    for (i = 0; i < global_products.length; i++) { 
        getMetadata(global_products[i]);
    }
}

function fill_products(){
    var locationvalue = 1;
    var replacevalues = "";
//    .hasOwnProperty('merchant_id')
    if(global_metadata_from_array.length ==7)
    {
        for (i = 0; i < global_metadata_from_array.length; i++) { 
            if(global_metadata_from_array[i].hasOwnProperty('amazon_product'))
            {
                replacevalues = 'picture'+locationvalue.toString();
                document.getElementById(replacevalues).src= global_metadata_from_array[i]['amazon_product']['main_images'][0]['location'];
                
            }
        }    
    }
    else
    {
        fill_products();    
    }
    
}

function startingfunction(){
    get_metadata_from_array();
//    fill_products();
//    fill_products();
    //document.getElementById('picture1').src= global_metadata_from_array[0].;  
}