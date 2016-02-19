/*************************************************
  Push Notification Code Block start
**************************************************/

 /*
  * Function to handle error
  * @param
  * @return
  */
  function errorHandler(error) {
      console.log("Error response" + error);
  }
  
  /*
   * Function call when success
   * @param
   * @return
   */
   function successHandler(res) {
       console.log("Success response" + res);
   }
   
   /*
    * Function call on notification
    * @param event
    *@return
    */
    function onNotificationAPN(event) {
        if (event.alert) {
            showPush(event.alert);
        }
        if (event.sound) {
            var snd = new Media(event.sound);
            snd.play();
        }
        if (event.badge) {
            pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
        }
    }
   /*
    *Function call to notify
    *@param e
    *@return
    */
    function onNotificationGCM(e) {
                   switch (e.event) {
                       case 'registered':
                           if (e.regid.length > 0) {
                               var RegId = e.regid;
                               var deviceid = config.data[0].app_name + "_" + Math.round(+new Date() / 1000) + "_" + RegId.substring(2, 18); //window.device.uuid;
                               var BASE_URL = config.data[0].baseurl;
                               var STORE = config.data[0].storeid;
                               var APP_NAME = config.data[0].app_name;
                               var PLATFORM = config.data[0].platform;
                               var PUSH_SERVICE_URL = "" + BASE_URL + "?callback=?" + "&store=" + STORE + "&service=register_push&pushtoken=" + e.regid + "&platform=" + PLATFORM + "&deviceid=" + deviceid + "&appname=" + APP_NAME + "&description=RegisterforPush";
                               $.getJSON(PUSH_SERVICE_URL,
                                        function (response) {
                                        console.log(response);
                                        });
                           }
                       break;
                       case 'message':
                       // this is the actual push notification. its format depends on the data model from the push server
                           if (config.data[0].platform != 'web') {
                               showPush(e.message);
                           }
                           else {
                               alert(e.message);
                           }
                       break;
                       case 'error':
                           console.log('GCM error = ' + e.msg);
                       break;
                       default:
                           console.log('An unknown GCM event has occurred');
                       break;
                   }
               }
               function showPush(message) { 
                   $("#push-msg").html(message);
                   $("#push-header").trigger("create");
                   $("#push-header").slideDown('slow');
               }
               function hidePush(){ 
                   $("#push-header").slideUp('slow'); 
                }
               /*************************************************
               Push Notification Code Block ends
               **************************************************/
