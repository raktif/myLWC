import { LightningElement, track, api } from 'lwc';
import getLookupAccount from '@salesforce/apex/SearchController.searchAccounts';

export default class MenuOrder extends LightningElement {
    @track searchData;
    @track accountId;
    @track accountName;
    @track showValues = false;
    @api totalAmount;
    @track dishList=[];
    // @track componentIds = [];
    // @track componentId;
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

    addMenuOrderDetail(event) {
        
        // this.addComponentId();
        // this.dishList.push(event.target);
        // this.dishList.push(event.currentTarget);
        this.dishList.push({count: this.dishList.length});
        console.log('dishList: '+this.dishList.length);
    }

    removeRow(event) {
        
        const dishIndex = event.detail;
        console.log('dishListJSON: '+JSON.stringify(this.dishList));
        console.log('dishIndex: '+dishIndex);
        this.dishList.splice(dishIndex, 1);
        console.log('dishListJSON: '+JSON.stringify(this.dishList));
        // this.dishList[componentIndex].splice(1);
        // this.componentIndex = this.componentIds.indexOf(event.target);
        // this.dishList.splice(this.componentIds.indexOf(this.componentId), 1);    
        // this.componentIds.splice(this.componentIds.indexOf(this.componentId), 1);
    }

       // addComponentId() {
    //     if (this.componentIds.length == 0) {
    //         this.componentId = 0;
    //     } else {
    //         this.componentId++;
    //     }

    //     this.componentIds.push(this.componentId);
    // }
}