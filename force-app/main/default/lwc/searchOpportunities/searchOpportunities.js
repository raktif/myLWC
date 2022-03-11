import { LightningElement, track, api } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import searchOpportunities from '@salesforce/apex/SearchController.searchOpportunities';

const columns = [{
    label: 'Opportunity Name',
    fieldName: 'Name',
    type: "button",
    typeAttributes: {
        label: {
            fieldName: 'Name'
        },
        variant: "base"}
}, {
    label: 'Amount ($)',
    fieldName: 'Amount',
    type: 'text'
},{
    label: 'Stage',
    fieldName: 'StageName',
    type: 'text'
},{
    label: 'Close Date',
    fieldName: 'CloseDate',
    type: 'date'
}];

export default class SearchOpportunities extends NavigationMixin(LightningElement) {
    
    @track searchData;
    @track columns = columns;
    @track strSearchOppName;
    
    handleOpportunityName(event) {
        this.strSearchOppName = event.detail.value;

        searchOpportunities({oppName: this.strSearchOppName})
            .then(result => {
                this.searchData = result;
                })
    }

    navigateToRecord(event) {
        console.log('entrou');
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.row.Id,
                actionName: 'view'
            },
        })
    }
}