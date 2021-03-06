import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ActivatedRoute, Router, ROUTER_DIRECTIVES } from '@angular/router';

import { FriendService } from './friends';
import {
  AuthService,
  AuthStatus,
  SearchComponent,
  SearchService
} from './shared';
import { VideoService } from './videos';

@Component({
    selector: 'my-app',
    template: require('./app.component.html'),
    styles: [ require('./app.component.scss') ],
    directives: [ ROUTER_DIRECTIVES, SearchComponent ],
    providers: [ AuthService, FriendService, HTTP_PROVIDERS, VideoService, SearchService ]
})

export class AppComponent {
  choices = [];
  isLoggedIn: boolean;

  constructor(
    private authService: AuthService,
    private friendService: FriendService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isLoggedIn = this.authService.isLoggedIn();

    this.authService.loginChangedSource.subscribe(
      status => {
        if (status === AuthStatus.LoggedIn) {
          this.isLoggedIn = true;
        }
      }
    );
  }

  // FIXME
  logout() {
    // this._authService.logout();
  }

  makeFriends() {
    this.friendService.makeFriends().subscribe(
      status => {
        if (status === 409) {
          alert('Already made friends!');
        } else {
          alert('Made friends!');
        }
      },
      error => alert(error)
    );
  }

  quitFriends() {
    this.friendService.quitFriends().subscribe(
      status => {
        alert('Quit friends!');
      },
      error => alert(error)
    );
  }
}
