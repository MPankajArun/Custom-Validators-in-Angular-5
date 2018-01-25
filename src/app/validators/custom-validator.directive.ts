import { FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { CountryService } from './countries';
import { PassThrough } from 'stream';
import { locateHostElement } from '@angular/core/src/render3/instructions';

export class CustomValidators {
    // pwdPattern = '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$';

    static validEmail(c: FormControl): ValidationErrors {
        const email = c.value;
        // const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        let isValid = true;
        const message = {
            'validEmail': {
                'message': 'Should be valid email.'
            }
        };
        if (emailPattern.test(email)) {
            isValid = true;
        } else {
            isValid = false;
        }
        return isValid ? null : message;
    }
    static validMobile(c: FormControl): ValidationErrors {
        const mobileNo = c.value;
        const mobnumPattern = /^((\\+[0-9]{2}-?)|0)?[0-9]{10}$/;  // need modification in pattern
        let isValid = true;
        const message = {
            'validMobile' : {
                'message' : 'Should be valid mobile number.'
            }
        };
        if (mobnumPattern.test(mobileNo)) {
            isValid = true;
        } else {
            isValid = false;
        }
        return isValid ? null : message;
    }


    static age(c: FormControl): ValidationErrors {
       const num = Number(c.value);
       const isValid = !isNaN(num) && num >= 18 && num <= 85;
       const message = {
         'age': {
           'message': 'The age must be a valid number between 18 and 85' // Will changes the error defined in errors helper.
         }
       };
       return isValid ? null : message;
    }

    static validCountry(c: FormControl): ValidationErrors {
        const country = c.value;
        let isValid = true;
        const message = {
            'validCountry': {
                'message': 'Country should exist in the world.'
            }
        };
        const ct = new CountryService();
        // ct.getCountries();
        if (country !== null) {
            if (ct.getCountries().includes(country.toLowerCase())) {
                isValid = true;
            } else {
                isValid = false;
            }
        }
        return isValid ? null : message;
    }

    static validPlan(c: FormControl): ValidationErrors {
        const plan = c.value;
        let isValid = true;
        const message = {
            'validPlan': {
                'message': 'Plan name already exists.'
            }
        };
        const plans = ['plan1', 'plan2', 'plan3']; // call webservice to get all available plans
        if (plan !== null) {
            if (!plans.includes(plan.toLowerCase())) {
                isValid = true;
            } else {
                isValid = false;
            }
        }
        return isValid ? null : message;
    }

    static validPassword(c: FormControl): ValidationErrors {
        const password = c.value;
        const pwdPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$/;
        let isValid = true;
        const message = {
            'validPassword': {
                'message': 'Password should meet the criteria.'
            }
        };
        if (pwdPattern.test(password)) {
            isValid = true;
            localStorage.setItem('password', password);
        } else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    static confirmPassword(c: FormControl): ValidationErrors {
        const password = c.value;
        let isValid = true;
        const message = {
            'confirmPassword' : {
                'message' : 'Password does not match.'
            }
        };
        if (password === localStorage.getItem('password')) {
            isValid = true;
            localStorage.setItem('password', '');
        } else {
            isValid = false;
        }
        return isValid ? null : message;
    }
}
