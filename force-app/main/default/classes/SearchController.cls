public with sharing class SearchController {
    
    @AuraEnabled(Cacheable=true)
    public static List<Opportunity> searchOpportunities(String oppName){
        try {
            if (oppName == '') {
                return null;
            }
            oppName = '%'+oppName+'%';
            List<Opportunity> oppList = [SELECT Id, Name, Amount, StageName, CloseDate FROM Opportunity WHERE Name LIKE: oppName];
            return oppList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}