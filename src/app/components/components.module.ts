import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingComponent } from './setting/setting.component';
import { DialerComponent } from './dialer/dialer.component';
import { ContactsectionComponent } from './ui/contactsection/contactsection.component';
import { ListsectionComponent } from './ui/listsection/listsection.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent 
  },
  { 
    path: 'reports', 
    component: ReportsComponent 
  },
  { 
    path: 'setting', 
    component: SettingComponent 
  },
  { 
    path: 'dialer', 
    component: DialerComponent,
    children: [
      { 
        path: '', 
        redirectTo: 'lists',
        pathMatch: 'full'
      },
      {
        path: 'lists',
        component: ListsectionComponent
      },
      { 
        path: 'contacts', 
        component: ContactsectionComponent 
      }
    ]
  }
];

@NgModule({
  declarations: [
  ],
  imports: [
    HomeComponent,
    ReportsComponent,
    SettingComponent,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ComponentsModule { }
