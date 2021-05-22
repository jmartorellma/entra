import { AbstractControl, FormGroup } from '@angular/forms';

export class CustomValidator {
    static passwordMatchValidator(passwordControl: AbstractControl, confirmPasswordControl: AbstractControl): any {
        return () => {
            if (!passwordControl || !confirmPasswordControl || passwordControl.value === '') {
                return null;
            }

            if (confirmPasswordControl.errors && !confirmPasswordControl.errors.matchPasswords) {
                return null;
            }

            if (passwordControl.value !== confirmPasswordControl.value) {
                confirmPasswordControl.setErrors({ matchPasswords: true });
                return { matchPasswords: passwordControl.value + ' != ' + confirmPasswordControl.value };
            } 
            else
            {
                confirmPasswordControl.setErrors(null);
                return null;
            }
        };
    }
}
