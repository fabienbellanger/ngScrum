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
    ],
})

export class MaterialModule
{
}
