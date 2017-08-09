import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MdButtonModule,
    MdCheckboxModule,
    MdDialogModule,
    MdProgressSpinnerModule,
    MdCardModule,
    MdInputModule,
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
    ],
})

export class MaterialModule
{
}
