public with sharing class MenuCalculations {
    
    @AuraEnabled(Cacheable=true)
    public static Decimal dishPrice(String dishName) {

        switch on dishName {
            when 'Cake', 'Pudin', 'Ice Cream', 'Pepperoni Pizza (1 Slice)'{
                return 8.90;
            }
            when 'Cesar', 'Greek', 'X-Burger with Fries', 'Summer Asian', 'Fried Chicken (Bucket)' {
                return 19.90;
            }
            when 'Arroz Carreteiro', 'Indian Fried Rice', 'Feijão Tropeiro'{ 
                return 24.90;
            }
            when 'Brocoli Quinoa Cake', 'Cannelonni', 'Spaghetti' {
                return 29.90;
            }
            when 'Lasagna', 'Butternut Lasagna'{
                return 32.49;
            }
            when 'Feijoada', 'Yakisoba' {
                return 39.95;
            }        
            when 'Sushi', 'Sashimi' {
                return 52.35;
            }
        }
        return 0;
    }

    @AuraEnabled(Cacheable=true)
    public static String subtotal(Integer quantity, Decimal price){
        try {
            Decimal result = quantity*price;
            String resultString = (result.setScale(2)+0.001).format();
            return resultString.substring(0,resultString.length()-1);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
