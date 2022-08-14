import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { dateValidator } from './date.directive';
import { identityValidator } from './identity.directive';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    ticketForm: FormGroup;

    constructor() {
      this.ticketForm = new FormGroup({});
    }

    ngOnInit() {
        this.ticketForm = new FormGroup({
            from: new FormControl('', {
                validators: [Validators.required, Validators.minLength(4)],
                updateOn: 'blur'
            }),
            to: new FormControl('', {
                validators: [Validators.required, Validators.minLength(4)],
                updateOn: 'blur'
            }),
            journeyDate: new FormControl('', {
                validators: [Validators.required, dateValidator()]
            }),
            passengerDetails: new FormArray([]),
            idProof: new FormControl('', {
                validators: [Validators.required]
            }),
            idProofValue: new FormControl('', {
                validators: [Validators.required]
            })
        }, {
            validators: identityValidator
        });

        this.addPassenger();
    }

    get from() {
        return this.ticketForm.get('from');
    }

    get to() {
        return this.ticketForm.get('to');
    }

    get journeyDate() {
        return this.ticketForm.get('journeyDate');
    }

    get idProof() {
        return this.ticketForm.get('idProof');
    }

    get idProofValue() {
        return this.ticketForm.get('idProofValue');
    }

    get passengerForms() {
        return this.ticketForm.get('passengerDetails') as FormArray;
    }

    addPassenger() {
        const passenger = new FormGroup({
            name: new FormControl('', {
                validators: [Validators.required]
            }),
            age: new FormControl('', {
                validators: [Validators.required, Validators.pattern('[0-9]*')]
            }),
            gender: new FormControl('', {
                validators: [Validators.required]
            }),
        });

        this.passengerForms.push(passenger);
    }

    deletePassenger(i: number) {
        if (this.passengerForms.length !== 1) {
            this.passengerForms.removeAt(i);
        }
    }

    getValidity(i: number, name: string) {
        const elem = ((this.ticketForm.get('passengerDetails') as FormArray).controls[i] as FormGroup).controls[name];
        if (elem.touched && elem.errors) {
            return elem.errors;
        } else {
            return null;
        }
    }

    getProofValidity(): boolean {
        if (this.ticketForm.errors === null) {
            return false;
        } else if (this.ticketForm.errors['identity'] && this.ticketForm.get('idProofValue')!.touched) {
            return true;
        } else {
            return false;
        }
    }

    onSubmit() {
        const out = `You are initiating a ticket booking request,
					from ${this.ticketForm.value.from} to ${this.ticketForm.value.to}
					on ${this.ticketForm.value.journeyDate}
					for the passenger ${this.ticketForm.value.passengerDetails[0].name}
					Also, Please carry the mentioned ${this.ticketForm.value.idProof} card with you.`;
        alert(out);
    }
}
