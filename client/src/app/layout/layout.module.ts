import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// import { SharedModule } from '../shared';

import { LayoutNavbarComponent } from './components/layout-navbar.component';
import { LayoutSidebarComponent } from './components/layout-sidebar.component';

import { LayoutSidebarToggleDirective } from './directives/layout-sidebar-toggle.directive';

import { LayoutSidebarService } from './services/layout-sidebar.service';

@NgModule({
    imports:      [
        CommonModule,
        HttpModule,
        RouterModule,
        //SharedModule,
    ],
    declarations: [
		LayoutNavbarComponent,
		LayoutSidebarComponent,
		LayoutSidebarToggleDirective,
    ],
    providers:    [
		LayoutSidebarService,
    ],
    exports:      [
		LayoutNavbarComponent,
		LayoutSidebarComponent,
		LayoutSidebarToggleDirective,
    ],
})

export class LayoutModule
{
}
