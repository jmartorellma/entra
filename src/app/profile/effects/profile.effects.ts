import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Actions } from "@ngrx/effects";
import { ProfileService } from "../services/profile.service";


@Injectable()
export class ProfileEffects {
    
    constructor(
        private actions$: Actions,
        private profileService: ProfileService,
        private router: Router,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) {}
}