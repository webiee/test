/*
 *****************************************************************************
 -----------------------------------------------------------------------------
 *  File            :     search.js
 *  Application     :     Mofluid Mobile Application
 *  Description     :     Manage search antocomplete settings
 *  Organization    :     Mofluid
 *  Org URL         :     http://www.mofluid.com
 -----------------------------------------------------------------------------
 Copyright 2013: Ebizon Netinfo Pvt. Ltd. All rights reserved
 -----------------------------------------------------------------------------
 *****************************************************************************
*/

/*
 *Function to check products using autocomplete.
 *@param
 *@return
 */
$(document).on("pageinit", "#mainpage", function (e) {
    if(localStorage['{{MOFLUID_APP_ID}}_Search_Help_Name'] != null) {
        var data = JSON.parse(localStorage["{{MOFLUID_APP_ID}}_Search_Help_Name"]);
        var sugList = $("#suggestions");
               $("#searchFilter").on("input", function(e) {
                                    var text = $(this).val();
                                     console.log("My value="+text);
                                    if(text.length < 1) {
                                    sugList.html("");
                                    sugList.listview("refresh");
                                    sugList.trigger( "updatelayout");
                                    }
                                    else {
                                     var str = "";
					var dirPath = dirname(location.href);
                                     var fullPath = "";
                                    for (var i=0;i<data.length;i++){
                                     if(data[i].name.toLowerCase().indexOf(text.toLowerCase()) >= 0){
                                     fullPath="'" + dirPath + "/product_details.html?id=" + data[i].id + "stock_status" + data[i].stock_status + "'";
                                     str += '<li data-icon="arrow-r"><a href="javascript:void(0);" onclick="parent.location=' + fullPath +'">'+data[i].name+'</a></li>';                                     
                                     }
                                     }
                                     sugList.html(str);
                                     sugList.listview("refresh");
                                     sugList.trigger( "updatelayout");
                                    }
                                    });
   
               
            }
               else{
               $.getJSON(""+BASE_URL+"?callback=?"+"&store="+STORE+"&service=productsearchhelp",
                         function (response) {
                         var data=JSON.stringify(response);
                         data = JSON.parse(data);
                         var sugList = $("#suggestions");
               $("#searchFilter").on("input", function(e) {
                                     var text = $(this).val();
                                     console.log("My value1="+text);
                                     if(text.length < 1) {
                                     sugList.html("");
                                     sugList.listview("refresh");
                                     sugList.trigger( "updatelayout");
                                     }
                                     else {
                                     var str = "";
					var dirPath = dirname(location.href);
                                     var fullPath = "";
                                     for (var i=0;i<data.length;i++){
                                     if(data[i].name.toLowerCase().indexOf(text.toLowerCase()) >= 0){
                                     fullPath="'" + dirPath + "/product_details.html?id=" + data[i].id + "stock_status" + data[i].stock_status + "'";
                                     str += '<li data-icon="arrow-r"><a href="javascript:void(0);" onclick="parent.location=' + fullPath +'">'+data[i].name+'</a></li>';                                     
                                     }
                                     }
                                     sugList.html(str);
                                     sugList.listview("refresh");
                                     sugList.trigger( "updatelayout");
                                     }
                                     });
                         });
               }
});