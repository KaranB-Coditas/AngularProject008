import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { SelectButton } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { StyleClass } from 'primeng/styleclass';
import { Drawer } from 'primeng/drawer';
import { PanelMenu } from 'primeng/panelmenu';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { PopoverModule } from 'primeng/popover';
import { Popover } from 'primeng/popover';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TagModule } from 'primeng/tag';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-layout',
  imports: [
    FormsModule, 
    SelectButton, 
    RouterOutlet, 
    Menubar, 
    BadgeModule, 
    AvatarModule, 
    InputTextModule, 
    Ripple, 
    CommonModule, 
    MenuModule,
    DrawerModule,
    ButtonModule,
    Ripple,
    StyleClass,
    PanelMenu,
    OverlayBadgeModule,
    PopoverModule,
    ScrollPanelModule,
    TagModule,
    Tooltip
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  items: MenuItem[] | undefined;
  value3 : string = 'home';
  notificationCount: number = 0; 
  showBadge: boolean = true;

  @ViewChild('op') op!: Popover;

    selectedMember = null;

    notificationList = [
        { title: 'New File Added', description: 'List001 added to your account', timestamp:'1 hour ago', read: 'false' },
        { title: 'Role Update', description: 'Your role promoted to manager account',timestamp:'1 day ago', read: 'false'  },
        { title: 'User Added to Team', description: 'John added Rising Team',timestamp:'1 week ago', read: 'false'  },
        { title: 'New File Added', description: 'List001 added to your account', timestamp:'1 hour ago', read: 'true' },
        { title: 'Role Update', description: 'Your role promoted to manager account',timestamp:'1 day ago', read: 'true'  },
        { title: 'Role Update', description: 'Your role promoted to manager account',timestamp:'1 day ago', read: 'true'  },
        { title: 'Role Update', description: 'Your role promoted to manager account',timestamp:'1 day ago', read: 'true'  },
        { title: 'Role Update', description: 'Your role promoted to manager account',timestamp:'1 day ago', read: 'true'  },
        { title: 'Role Update', description: 'Your role promoted to manager account',timestamp:'1 day ago', read: 'true'  },
      
    ];

    showAllNotification(){
      this.op.hide();
    }

    showMenu(){
      debugger;
      this.visible = true;
    }

    toggle(event: any) {
      this.op.toggle(event);
    }

    readAllNotification(){
      this.notificationList.forEach(notification => {
        notification.read = 'true'; 
      });
      this.notificationCountFn();
      this.op.hide();
    }

    readNotification(item: any) {
        item.read = 'true';
        this.notificationCountFn();
        this.op.hide();
    }

  onNotificationClick(): void {
    this.showBadge = false;
  }

    options: any[] = [
        { label: 'Home', value: 'home' },
        { label: 'Dialer', value: 'dialer' },
        { label: 'Reports', value: 'reports' },
    ];

    @ViewChild('drawerRef') drawerRef!: Drawer;

    closeCallback(e: any): void {
        this.drawerRef.close(e);
    }

    visible: boolean = false;
  authService = inject(AuthService);
  router = inject(Router);
  logOff() {
    this.authService.logoff();
    this.router.navigate(['/login']);
  }

  onSelectButtonChange(event: any) {
    debugger;
    if(event.value === "home") {
      this.router.navigate(['/home']);
    }
    if(event.value === "dialer") {
      this.router.navigate(['/home/dialer']);
    }
    if(event.value === "reports") {
      this.router.navigate(['home/reports']);
    }
  }
  notificationCountFn(){
    this.notificationCount = this.notificationList.filter(notification => notification.read === 'false').length;
  }

  ngOnInit() {
    this.notificationCountFn();
    this.items = [
      {
        label: 'My Profile',
        icon: 'pi pi-user',
        shortcut: 'ctrl+P'
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        shortcut: 'ctrl+S'
      },
      {
        label: 'Notifications',
        icon: 'pi pi-bell',
        shortcut: 'ctrl+S'
      },
      {
        label: 'Support',
        icon: 'pi pi-comments',
        shortcut: 'ctrl+S'
      },
      {
        label: 'Help',
        icon: 'pi pi-question-circle',
        shortcut: 'ctrl+S'
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        shortcut: 'ctrl+L',
        command: () => this.logOff() 
      }
    ];
}

}
