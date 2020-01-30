import { LightningElement, api, track, wire } from 'lwc';
import {getRecord} from 'lightning/uiRecordApi';
// non viene garantito il referential integrity, quindi in caso di modifica dei campi o dello stesso sObject il codice andrà in errorea tempo di esecuzione
// nessun errore a tempo di compilazione
const fields = [
    'Bear__c.Name',
    'Bear__c.Location__Latitude__s',
    'Bear__c.Location__Longitude__s'
];
 
export default class BearLocation extends LightningElement {
    @api recordId;
    @track name
    @track mapMarkers = []
    @wire(getRecord, {recordId: '$recordId', fields})
    loadBear({error, data}){
        // eslint-disable-next-line no-empty
        if(error){}
        else if(data){
            this.name = data.fields.Name.value
            const Latitude = data.fields.Location__Latitude__s.value
            const Longitude = data.fields.Location__Longitude__s.value
            this.mapMarkers = [{
                location: {Latitude, Longitude},
                title: this.name,
                description: `Coords: ${Latitude}, ${Longitude}`
            }]
        }
    }
    get cardTitle(){
        return (this.name) ? `${this.name}'s location` : 'Bear location'
    }
}