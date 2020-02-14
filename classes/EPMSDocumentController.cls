public class EPMSDocumentController {
    
    @auraEnabled
    public static String getEPMSCustomerNo(string AccId){

        Account accRecord = [SELECT Id,Name,EPMS_Customer_No__c from Account where Id=:AccId];
        return accRecord.EPMS_Customer_No__c;
    }
    

    @auraEnabled
    public static List<EPMSWrapper> getCustomerDocumentInfo(string CustomerNo){

        string endpiontURL ='http://5.195.13.169:8080/API/CustomerDocument?CustomerNo='+CustomerNo;
        HttpRequest request = new HttpRequest();
        HttpResponse response = new HttpResponse();
        Http http = new Http();
        request.setEndpoint(endpiontURL);
        request.setMethod('GET');
        request.setheader('content-type','application/json');
        response = http.send(request);
        system.debug('Respone code::'+response.getStatusCode());
        system.debug('Respone Body::'+response.getBody());
        //return response.getBody();
        //
        List<EPMSWrapper> epmsWrapper  = (List<EPMSWrapper>)JSON.deserialize(response.getBody(), List<EPMSWrapper>.class);
        system.debug('epmsWrapper = '+epmsWrapper);
        return epmsWrapper;
        
    }
    
    public class EPMSWrapper{
            
        @auraEnabled public String Customer_No{get;set;}	//10013267
        @auraEnabled public String Document_Type{get;set;}	//Booking Form 3
        @auraEnabled public String Document_No{get;set;}	//RV 26 715 AMENDED BOOKING FORM
        @auraEnabled public String Document_Desc{get;set;}	//ABC
        @auraEnabled public String Doc_IssueDate{get;set;}	//1900-01-01
        @auraEnabled public String Doc_ExpiryDate{get;set;}	//1900-01-01
        @auraEnabled public String Document_Path{get;set;}	//\\10.8.9.180\ePMS ERP 11.0\Documents\1000\10013267\khqikxgl.r1g_RIVIERA 26 715 SIGNED BOOKING FORM.pdf
        public EPMSWrapper(String Customer_No,String Document_Type,String Document_No,String Document_Desc,String Doc_IssueDate,String Doc_ExpiryDate,String Document_Path){
            this.Customer_No = '';
            this.Document_Type = '';
            this.Document_No = '';
            this.Document_Desc = '';
            this.Doc_IssueDate = '';
            this.Doc_ExpiryDate = '';
            this.Document_Path = '';
        }
        
    }
    
    
}