import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatIconModule,
    MatMenuModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatListModule,
} from '@angular/material';

import { CustomSnackBarComponent } from './components/custom-snack-bar.component';

@NgModule({
    imports:      [
        CommonModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatInputModule,
        MatToolbarModule,
        MatProgressBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatIconModule,
        MatMenuModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatListModule,
    ],
    declarations: [
        CustomSnackBarComponent,
    ],
    providers:    [
    ],
    exports:      [
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatInputModule,
        MatToolbarModule,
        MatProgressBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatIconModule,
        MatMenuModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatListModule,
        CustomSnackBarComponent,
    ],
})

export class MaterialModule
{
}
