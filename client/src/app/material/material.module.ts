import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MdButtonModule,
    MdCheckboxModule,
    MdDialogModule,
    MdProgressSpinnerModule,
    MdCardModule,
    MdInputModule,
    MdToolbarModule,
    MdProgressBarModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdSelectModule,
} from '@angular/material';

@NgModule({
    imports:      [
        CommonModule,
        MdButtonModule,
        MdCheckboxModule,
        MdDialogModule,
        MdProgressSpinnerModule,
        MdCardModule,
        MdInputModule,
        MdToolbarModule,
        MdProgressBarModule,
        MdDatepickerModule,
        MdNativeDateModule,
        MdSelectModule,
    ],
    declarations: [
    ],
    providers:    [
    ],
    exports:      [
        MdButtonModule,
        MdCheckboxModule,
        MdDialogModule,
        MdProgressSpinnerModule,
        MdCardModule,
        MdInputModule,
        MdToolbarModule,
        MdProgressBarModule,
        MdDatepickerModule,
        MdNativeDateModule,
        MdSelectModule,
    ],
})

export class MaterialModule
{
}
