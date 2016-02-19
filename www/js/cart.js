/*
 *****************************************************************************
 -----------------------------------------------------------------------------
 *  File            :     cart.js
 *  Application     :     Mofluid Mobile Application
 *  Description     :     Manage Cart Settings
 *  Organization    :     Mofluid
 *  Org URL         :     http://www.mofluid.com
 -----------------------------------------------------------------------------
 Copyright 2014: Mofluid
 -----------------------------------------------------------------------------
 *****************************************************************************
 */
var app_curr_symbol = config.data[0].app_curr_symbol;

$(document).ready(function(){
                  try{
 if(JSON.parse(localStorage[config.data[0].storage_key+'_pNames']) == "" || JSON.parse(localStorage[config.data[0].storage_key+'_pNames']) == null){
                 // alert("ca");
                  $("#cartProducts").html("0");
                  $(".cartamount").css({"display":"none"});
                  }
                  else{
                  var storedQuantities = JSON.parse(localStorage[config.data[0].storage_key+'_pQuantities']);
                  var cart_val = 0;
                  cart_val=storedQuantities.reduce(function (prev, cur) {
                                                         return parseInt(prev) + parseInt(cur);
                                                         });
                  $("#cartProducts").html(cart_val);
                  $(".cartamount").css({"display":"block"});
                  }
                  }
                  catch(ex){}
                  });

function updateCartQty(){
    if(localStorage[config.data[0].storage_key+'_pNames']){
        var storedNames = JSON.parse(localStorage[config.data[0].storage_key+'_pNames']);
        storedQuantities = JSON.parse(localStorage[config.data[0].storage_key+'_pQuantities']);
        var cart_val = storedQuantities.reduce(function (prev, cur) {
                                               return parseInt(prev) + parseInt(cur);
                                               });
        if(cart_val == 0){
            $(".cartamount").css({"display":"block"});

        }
        $("#cartProducts").html(cart_val);
    }
}


    
    



/*
 *Function To add products into the cart
 *@param productid, productName, productPrice, shippCharge, productImage,pName2,selectSize,selectColor
 *@return
 */
    
function addToCart(productid, productName, productPrice, shippCharge, productImage,pName2,selectSize,selectColor, selected_option_array, custom_options,quan_sel,new_pro_data) {
    var pName = productName, pPrice = productPrice;
    var pTitle=pName2;
    var pids=[];
    var pNames = [];
    var pPrices = [];
    var pImages = [];
    var pSizes = [];
    var pColor =[];
    var pQuantities = [];
    var pTitles=[];
    var pShippCharge=[];
    var pcustom_options = [];
    var pnew_pro_data_come = [];

    var cartValue = names = titles = prices = quantities = sizes = colors =ids=ShippCharge='';
    if(selectSize==''||selectSize==null||selectSize=="undefined")
        selectSize ="N/A";
    if(selectColor==''||selectColor==null||selectColor=="undefined")
        selectColor = "N/A";
    if(localStorage[config.data[0].storage_key+'_pNames'] === null) {
        cartValue = 0;
    }
    else {
        try {
		  cartValue = JSON.parse(localStorage[config.data[0].storage_key+'_pNames']).length;
		  names = JSON.parse(localStorage[config.data[0].storage_key+'_pNames']);
		  prices = JSON.parse(localStorage[config.data[0].storage_key+'_pPrices']);
		  sizes = JSON.parse(localStorage[config.data[0].storage_key+'_pSizes']);
		  quantities = JSON.parse(localStorage[config.data[0].storage_key+'_pQuantities']);
		  images = JSON.parse(localStorage[config.data[0].storage_key+'_pImages']);
		  ids = JSON.parse(localStorage[config.data[0].storage_key+'_pIds']);
		  colors=  JSON.parse(localStorage[config.data[0].storage_key+'_pColor']);
		  titles=JSON.parse(localStorage[config.data[0].storage_key+'_pTitles']);
		  customoptions = JSON.parse(localStorage[config.data[0].storage_key+'_pcustom_options']);
          new_pro_data_come = JSON.parse(localStorage[config.data[0].storage_key+'_pnew_pro_data']);
		  if(($.inArray(pName, names) != -1)) {
			 if (config.data[0].platform=='ios' || config.data[0].platform=='android') {
				navigator.notification.alert(locale.message.alert["when_same_product_added_to_cart"],function (){},config.data[0].app_name, locale.message.button["close"]);
			 }
			 else {
				alert(locale.message.alert["when_same_product_added_to_cart"]);
			 }
			 return false;
		  }
        }
        catch(err) {
             cartValue = 0;
        }
    }
    for(i=0;i<cartValue;i++) {
        pNames[i] = names[i];
        pPrices[i] = prices[i];
        pImages[i] = images[i];
        pSizes[i] = sizes[i];
        pQuantities[i] = quantities[i];
        pTitles[i]=titles[i];
        pColor[i]=colors[i];
        pids[i] = ids[i];
        pcustom_options[i] = customoptions[i];
        pnew_pro_data_come[i] = new_pro_data_come[i];
    }
    pNames[cartValue] = productName;
    pPrices[cartValue] = productPrice.replace(/\,/g, '');
    pImages[cartValue] = productImage;
    pSizes[cartValue] = selectSize;
    pColor[cartValue] = selectColor;
    pTitles[cartValue]=pTitle;
    pcustom_options[cartValue] = custom_options;
    //var pindex=productid.indexOf("stock_status");
    //productid= productid.substring(0,pindex);
    pids[cartValue] = productid;
    pnew_pro_data_come[cartValue] = new_pro_data;
    pQuantities[cartValue] = quan_sel;
    localStorage[config.data[0].storage_key+'_pNames']=JSON.stringify(pNames);
    localStorage[config.data[0].storage_key+'_pPrices']=JSON.stringify(pPrices);
    localStorage[config.data[0].storage_key+'_pImages']=JSON.stringify(pImages);
    localStorage[config.data[0].storage_key+'_pSizes']=JSON.stringify(pSizes);
    localStorage[config.data[0].storage_key+'_pColor']=JSON.stringify(pColor);
    localStorage[config.data[0].storage_key+'_pQuantities']=JSON.stringify(pQuantities);
    localStorage[config.data[0].storage_key+'_pTitles']=JSON.stringify(pTitles);
    localStorage[config.data[0].storage_key+'_pIds'] = JSON.stringify(pids);
    localStorage[config.data[0].storage_key+'_pcustom_options'] = JSON.stringify(pcustom_options);
    localStorage[config.data[0].storage_key+'_pnew_pro_data'] = JSON.stringify(pnew_pro_data_come);
    var dirPath = dirname(location.href);
    var fullPath = dirPath + "/cart.html?product_name='"+queryValue()+"'";
    window.location=fullPath;
}

/*
 *Function To Clear all item of cart
 *@param
 *@return
 */
function clearCart()
{
    localStorage.removeItem(config.data[0].storage_key+'_pNames');
    localStorage.removeItem(config.data[0].storage_key+'_pPrices');
    localStorage.removeItem(config.data[0].storage_key+'_pSizes');
    localStorage.removeItem(config.data[0].storage_key+'_pQuantities');
    localStorage.removeItem(config.data[0].storage_key+'_pImage');
    localStorage.removeItem(config.data[0].storage_key+'_pIds');
    localStorage.removeItem(config.data[0].storage_key+'_pColor');
    localStorage.removeItem(config.data[0].storage_key+'_pTitles');
    localStorage.removeItem(config.data[0].storage_key+'_ShipType');
    localStorage.removeItem(config.data[0].storage_key+'_pcustom_options');
    localStorage.removeItem(config.data[0].storage_key+'_Shipmethod');
    localStorage.removeItem(config.data[0].storage_key+'_pnew_pro_data');
}

/*
 *Function To remove a item of cart
 *@param index
 *@return
 */
function removeItem(index) {
    var nameArray = JSON.parse(localStorage[config.data[0].storage_key+'_pNames']);
    var priceArray = JSON.parse(localStorage[config.data[0].storage_key+'_pPrices']);
    var imageArray = JSON.parse(localStorage[config.data[0].storage_key+'_pImages']);
    var title = JSON.parse(localStorage[config.data[0].storage_key+'_pTitles']);
    try {
        var sizes=JSON.parse(localStorage[config.data[0].storage_key+'_pSizes']);
        var colors=JSON.parse(localStorage[config.data[0].storage_key+'_pColor']);
    }
    catch(ee) {
        var sizes='';
        var colors='';
    }
    var pIds=JSON.parse(localStorage[config.data[0].storage_key+'_pIds']);
    if(localStorage.getItem(config.data[0].storage_key+"_pQuantities") === null) {
        var quantityArray = [];
    }
    else
        var quantityArray = JSON.parse(localStorage[config.data[0].storage_key+'_pQuantities']);
    var pnew_pro_dataArray = JSON.parse(localStorage[config.data[0].storage_key+'_pnew_pro_data']);
    var pcustomoptionsArray = JSON.parse(localStorage[config.data[0].storage_key+'_pcustom_options']);
    
    
    var pname1=title[index];
    nameArray.splice(index, 1);
    priceArray.splice(index, 1);
    imageArray.splice(index, 1);
    quantityArray.splice(index, 1);
    title.splice(index, 1);
    try {
        sizes.splice(index,1);
        colors.splice(index,1);
    }
    catch(ee) {
        var sizes='';
        var colors='';
    }
    pIds.splice(index,1);
    pnew_pro_dataArray.splice(index, 1);
    pcustomoptionsArray.splice(index, 1);
    localStorage[config.data[0].storage_key+'_pNames'] = JSON.stringify(nameArray);
    localStorage[config.data[0].storage_key+'_pPrices'] = JSON.stringify(priceArray);
    localStorage[config.data[0].storage_key+'_pImages'] = JSON.stringify(imageArray);
    localStorage[config.data[0].storage_key+'_pQuantities'] = JSON.stringify(quantityArray);
    localStorage[config.data[0].storage_key+'_pTitles'] = JSON.stringify(title);
    try {
        localStorage[config.data[0].storage_key+'_pSizes'] = JSON.stringify(sizes);
        localStorage[config.data[0].storage_key+'_pColor'] = JSON.stringify(colors);
    }
    catch(err) {
        localStorage[config.data[0].storage_key+'_pSizes'] = '';
        localStorage[config.data[0].storage_key+'_pColor'] = '';
    }
    localStorage[config.data[0].storage_key+'_pIds'] = JSON.stringify(pIds);
    localStorage[config.data[0].storage_key+'_pnew_pro_data'] = JSON.stringify(pnew_pro_dataArray);
    localStorage[config.data[0].storage_key+'_pcustom_options'] = JSON.stringify(pcustomoptionsArray);
    
    if (config.data[0].platform=='ios' || config.data[0].platform=='android') {
        navigator.notification.alert(locale.message.alert["when_a_product_removed_from_cart"].replace("{{product}}", pname1),function (){},config.data[0].app_name, locale.message.button["close"]);
    }
    else{
        alert(locale.message.alert["when_a_product_removed_from_cart"].replace("{{product}}", pname1));
    }
    var totalShip = total=0,total_with_shipping;
    for(i=0;i<priceArray.length;i++) {
        total = total + (Number(priceArray[i])*Number(quantityArray[i]));
    }
    for(i=0;i<priceArray.length;i++) {
        //  totalShip = totalShip + (Number(shippingArray[i])*Number(quantityArray[i]));
    }
    total_with_shipping = total + totalShip ;
    localStorage[config.data[0].storage_key+'_totalAmount'] = total_with_shipping;
    localStorage[config.data[0].storage_key+'_TotalShipp'] = totalShip;
    total = parseFloat(total).toFixed(2);
    totalShip = parseFloat(totalShip).toFixed(2);
    total_with_shipping = parseFloat(total_with_shipping).toFixed(2);
    $("#totalAmount").html(app_curr_symbol+total+'');
    $("#shipping_detail").html(app_curr_symbol+totalShip+'');
    $("#total_with_shipping").html(app_curr_symbol+total_with_shipping+'');
    location.reload();
}
/*
 *Function To Sum of the array
 *@param array
 *@return
 */
function arraySum(array) {
    var sum = 0;
    for(i=0;i<array.length;i++) {
        sum = sum + Number(array[i]);
    }
    return sum;
}

/*
 *Function To Update Cart
 *@param ths, price, index, name, size, color,shipch
 *@return
 */
function upadteQuanitiy(ths, price, index, name, size, color,shipch) {
    $(ths).parent().css("display","none");
    var quantity_loader = "#quantity_loader"+index;
    $(quantity_loader).css("display","block");
    var total_quantity;
    var coupon_status="";
    var coupon_code="",action_type="";
    var pids =  JSON.parse(localStorage[config.data[0].storage_key+'_pIds']);
    var PRODUCT_ID = parseInt(pids[index]);
    var BASE_URL  = config.data[0].baseurl;
    var STORE = config.data[0].storeid;
    var cNames = [];
    var cQuantities = [];
    var cshippingArray =[];
    var totalShip=0;
    var exceedAmount=0;
    /* To manage the availability */
    if(localStorage.getItem(config.data[0].storage_key+"_pNames") === null) {
        index = 0;
    }
    else {
        cartValue = JSON.parse(localStorage[config.data[0].storage_key+'_pNames']).length;
        names = JSON.parse(localStorage[config.data[0].storage_key+'_pNames']);
        quantities = JSON.parse(localStorage[config.data[0].storage_key+'_pQuantities']);
        for(i=0;i<cartValue;i++) {
            cNames[i] = names[i];
            cQuantities[i] = quantities[i];
        }
    }
    cNames[index] = name;
    cQuantities[index] = ths.value;
    localStorage[config.data[0].storage_key+'_pNames']=JSON.stringify(cNames);
    localStorage[config.data[0].storage_key+'_pQuantities']=JSON.stringify(cQuantities);
              /*  To manage the availability */
              if(color=="None")
              color="";
              if(size=="None")
              size="";
              var titles=JSON.parse(localStorage[config.data[0].storage_key+'_pTitles']);
              var curr_quantity=ths.value;
              pname1=titles[index];
    
              var total_with_shipping=0;
              var priceArray = JSON.parse(localStorage[config.data[0].storage_key+'_pPrices']);
              var additional = totalAmount = total = totalShip = 0;
              if(localStorage.getItem(config.data[0].storage_key+"_pQuantities") === null)
              var quantityArray = [];
              else
              var quantityArray = JSON.parse(localStorage[config.data[0].storage_key+'_pQuantities']);
              priceArray.splice(index, 1);
              quantityArray.splice(index, 1);
              for(i=0;i<priceArray.length;i++) {
              total = total + (Number(priceArray[i])*Number(quantityArray[i]));
              totalShip =0;
              }
              additional  = ths.value * price;
              totalShip=totalShip+(ths.value * shipch);
              totalAmount = additional + total;
              priceArray.splice(index, 0, price);
              quantityArray.splice(index, 0, ths.value);
              var cartItems= quantityArray.reduce(function(prev, cur) {
                                                  return parseInt(prev) + parseInt(cur);
                                                  });
              localStorage[config.data[0].storage_key+'_pPrices'] = JSON.stringify(priceArray);
              localStorage[config.data[0].storage_key+'_pQuantities'] = JSON.stringify(quantityArray);
              updateCartQty();
              // localStorage[config.data[0].storage_key+'_pShippCharge'] = JSON.stringify(shippingArray);
              //total_with_shipping = totalAmount + totalShip;
              totalAmount = parseFloat(totalAmount).toFixed(2);
              localStorage[config.data[0].storage_key+'_subtotal'] = totalAmount;
              localStorage[config.data[0].storage_key+'_totalAmount'] = total_with_shipping;
              $("#totalAmount").html('&nbsp;'+app_curr_symbol+totalAmount+'');
              localStorage[config.data[0].storage_key+'_TotalShipp'] = totalShip;
              var dirPath = dirname(location.href);
              var fullPath = "'"+dirPath + "/buy_now.html?amount=" + localStorage[config.data[0].storage_key+'_subtotal'] + "'";
              var dirPath1 = dirname(location.href);
              var fullPath1 = dirPath1 + "/cart.html";
              $(ths).parent().css("display","inline-block");
              $(ths).parent().css("margin","0 auto");
              $(quantity_loader).css("display","none");
              
              
    
}

function validatespinbox(ths, price, index, name, size, color,shipch){
    var ths_val = $(ths).val();
    var ths_min = $(ths).attr("min");
    var ths_max = $(ths).attr("max");
    if(/^\+?(0|[1-9]\d*)$/.test(ths_val)) {
        if(parseInt(ths_val) >= parseInt(ths_max)){
            $(ths).val(ths_max);
        }
    }
    else {
        $(ths).val(ths_min);
    }
    upadteQuanitiy(ths, price, index, name, size, color,shipch);
}
/*------------------------------------------- Cart.js Code Ends Here ----------------------------------*/
