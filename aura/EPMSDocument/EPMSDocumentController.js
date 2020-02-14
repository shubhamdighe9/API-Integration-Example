({
    init: function (component, event, helper) {
        // alert('record Id '+component.get('v.recordId'));
        component.set("v.showSpinner",true); 
        var accRecordId = component.get('v.recordId');
        var action = component.get("c.getEPMSCustomerNo");
        action.setParams({ 
            AccId: accRecordId
        });
        action.setCallback(this, function(response) {
            
            console.log('Response returned');
            var state = response.getState();
            if (state === "SUCCESS") {
                var EPMSCusNo = response.getReturnValue();
                //alert('EPMS Customer number '+EPMSCusNo);
                helper.DocumentInfoHelper(component, event, helper, EPMSCusNo); 
            }
            else if (state === "ERROR") {
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
        
        component.set('v.columns', [
            {label: 'Customer No', fieldName: 'Customer_No', type: 'text'},
            {label: 'Document Type', fieldName: 'Document_Type', type: 'text'},
            {label: 'Document Name', fieldName: 'Document_Path', type: 'url', typeAttributes: { label: { fieldName: 'Document_No',target: '_blank'}}},
            {label: 'Document Desc', fieldName: 'Document_Desc', type: 'text'},
            {label: 'Doc IssueDate', fieldName: 'Doc_IssueDate', type: 'Date'},
            {label: 'Doc ExpiryDate', fieldName: 'Doc_ExpiryDate', type: 'Date'},
            {label: 'Document Path',  fieldName: 'Document_Path', type: 'url', typeAttributes: { target: '_blank'}}
        ]);
        
    }
});