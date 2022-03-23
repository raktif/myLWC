import { LightningElement, track, api } from 'lwc';
import searchAccounts from '@salesforce/apex/SearchController.searchAccounts';
export default class MenuOrder extends LightningElement {
    @track searchData;
    @track accountId;
    @track accountName;
    @track showValues = false;
    @track dishList=[];
    @track componentIds = [];
    @track componentId;
    @track currentDish;
    @track totalAmount = 0;
    subTotalArray = [];

    handleAccountName(event) {
        searchAccounts({accName: event.detail.value})
            .then(result => {
                this.searchData = result;
                if (this.searchData != null) {
                    this.showValues = true;
                }
            })
    }
    
    selectAccount(event) {
        this.accountId = event.target.dataset.value;
        this.accountName = event.target.dataset.label;
        this.showValues = false;

        console.log('Account Id: '+this.accountId);
        console.log('Account Name: '+this.accountName);
    }

    addMenuOrderDetail() {
        this.addComponentId();
        this.dishList.push(this.componentId);
    }

    removeRow(event) {
        const dishIndex = event.detail;
        this.dishList.splice(this.componentIds[dishIndex], 1);
        this.subTotalArray.splice(dishIndex, 1);
        this.changeTotalAmount(dishIndex, 0);
        
        if (this.dishList.length == 0) { //If removes all rows
            this.totalAmount = 0;
        }
    }

    addComponentId() {
        if (this.componentIds.length == 0) {
            this.componentId = 0;
        } else {
            this.componentId++;
        }
        this.componentIds.push(this.componentId);
    }

    changeTotalAmount(event) {
        this.totalAmount = 0;
        let index;
        let value;

        if (arguments.length == 2) { //triggered by removeRow()
            index = arguments[0];
            value = arguments[1];
            if (index == 0 && value == 0) {
                this.subTotalArray.shift;
            }
        } else { //triggered by addMenuOrderDetails() and customEvent onupdatetotal
            index = event.detail.id;
            value = event.detail.amount;
            0 == this.subTotalArray.length ? this.subTotalArray.push(value) : this.subTotalArray.splice(index, 1, value);    
        }
        for (let i of this.subTotalArray) {
            this.totalAmount = this.totalAmount + i;
        }
        this.totalAmount = this.totalAmount.toFixed(2);
    }
}