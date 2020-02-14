({
   /* fetchData: function (cmp, fetchData, numberOfRecords) {
        var dataPromise,
            latitude,
            longitude;
         //   fakerLib = this.mockdataLibrary.getFakerLib();

        fetchData.address = {type : function () {
            return {
            //    latitude : fakerLib.address.latitude(),
              //  longitude : fakerLib.address.longitude()
            };
        }};

        fetchData.confidence =  { type : function () {
            return Math.round(Math.random(100) * 100) + "%";
        }};

      //  dataPromise = this.mockdataLibrary.lightningMockDataFaker(fetchData, numberOfRecords);
      //  dataPromise.then(function(results) {
         //   cmp.set('v.data', results);
        //});
    },*/
    DocumentInfoHelper: function (component, event, helper, EPMSCusNo) {
        
        
        var action = component.get("c.getCustomerDocumentInfo");
      //  var CustomerNo  = component.get("v.CustomerNumber");
        action.setParams({ 
            CustomerNo: EPMSCusNo
        });
        action.setCallback(this, function(response) {
           
            console.log('Response returned');
            var state = response.getState();
            if (state === "SUCCESS") {
                var retrurnValue = response.getReturnValue();
                console.log('result>>> ' + JSON.stringify(retrurnValue));
                component.set("v.epmsWrapper",retrurnValue);
                component.set("v.data", retrurnValue);
                component.set("v.showSpinner",false);
            }
            else if (state === "ERROR") {
                console.log('Error');
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                        alert('Something went wrong. Please contact your system admin with error message :  '+errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
                
            }
            
        });
        
        $A.enqueueAction(action);
    }
});