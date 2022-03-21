import { LightningElement, track, api } from 'lwc';
import getLookupAccount from '@salesforce/apex/SearchController.searchAccounts';

export default class MenuOrder extends LightningElement {
    @track searchData;
    @track accountId;
    @track accountName;
    @track showValues = false;
    @api totalAmount;
    @track dishList=[];
    @track componentIds = []; //??
    @track componentId; //??
    @track currentDish;

    handleAccountName(event) {
        getLookupAccount({accName: event.detail.value})
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
    }

    addMenuOrderDetail() {
        this.addComponentId();
        this.dishList.push(this.componentId);
        console.log('dishList: '+this.dishList.length);
    }

    removeRow(event) {
        const dishIndex = event.detail;
        console.log('dishListJSON: '+JSON.stringify(this.dishList));
        console.log('dishIndex: '+dishIndex);
        console.log('componentIds[dishIndex]: '+this.componentIds[dishIndex]);
        this.dishList.splice(this.componentIds[dishIndex], 1);
        console.log('new dishListJSON: '+JSON.stringify(this.dishList));
    }

       addComponentId() {
        if (this.componentIds.length == 0) {
            this.componentId = 0;
        } else {
            this.componentId++;
        }

        this.componentIds.push(this.componentId);
    }
}