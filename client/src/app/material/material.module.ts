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
    MdIconModule,
    MdMenuModule,
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
        MdIconModule,
        MdMenuModule,
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
        MdIconModule,
        MdMenuModule,
    ],
})

export class MaterialModule
{
}
