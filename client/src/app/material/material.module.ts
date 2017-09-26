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
} from '@angular/material';

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
    ],
    declarations: [
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
    ],
})

export class MaterialModule
{
}
