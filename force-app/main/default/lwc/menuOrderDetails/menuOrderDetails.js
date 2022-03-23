import { LightningElement, track, api } from 'lwc';
import getDishPrice from '@salesforce/apex/MenuCalculations.dishPrice';
import subtotalCalc from '@salesforce/apex/MenuCalculations.subtotal';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class MenuOrderDetails extends LightningElement {

    @track selectedDish;
    @track selectedCuisine;
    @track price;
    @track quantity;
    @track subtotal;
    subtotalArray = [];
    @track totalAmount;
    @api index;

    getPrice(event) {
        if (this.selectedDish != event.detail.value) {
            this.quantity = 1;
            this.totalAmount = 0;
        }
        this.selectedDish = event.detail.value;
        getDishPrice({dishName: this.selectedDish})
            .then (result => {
                this.price = result;
                this.calculateSubTotal(this.quantity, this.price);
            })
    }
    
    changeSubTotal(event) {
        this.quantity = event.detail.value;

        if (this.quantity < 1 || this.quantity == null) {
            this.dispatchEvent(new ShowToastEvent({
                title: 'Incorrect value.',
                message: 'Quantity cannot be lower than 1.',
                variant: 'error'
            }));
        } else {
            this.calculateSubTotal();
        }
    }

    calculateSubTotal() {
        subtotalCalc({quantity: this.quantity, price: this.price})
            .then (result => {
                this.subtotal = 'US$ '+result;
            }).then (()=>{
                this.sendSubtotalToMenuOrder()
                });
    }

    sendSubtotalToMenuOrder() {
            let parsedSubTotal = parseFloat(this.subtotal.slice(4).replace(/,/g, '.'));
            
            const custEvent = new CustomEvent (
                'updatetotal', {
                    detail: {
                        amount : parsedSubTotal,
                        id: this.index
                    }
                }
            );
            this.dispatchEvent(custEvent);
    }

    removeDish() {
        const custEvent = new CustomEvent (
            'removedish', {
                detail: this.index
            }
        );
        this.dispatchEvent(custEvent);
    }
}