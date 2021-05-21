import { AbstractControl, FormGroup } from '@angular/forms';

export class CustomValidator {
    // static passwordMatchValidator(password: string, confirmPassword: string): any {
    static passwordMatchValidator(passwordControl: AbstractControl, confirmPasswordControl: AbstractControl): any {
        return (formGroup: FormGroup) => {
            if (!passwordControl || !confirmPasswordControl) {
                return null;
            }

            if (confirmPasswordControl.errors && !confirmPasswordControl.errors.matchPasswords) {
                return null;
            }

            if (passwordControl.value !== confirmPasswordControl.value) {
                confirmPasswordControl.setErrors({ matchPasswords: true });
                return true;
            } 

            confirmPasswordControl.setErrors(null);
            return null;
        };
    }
}
