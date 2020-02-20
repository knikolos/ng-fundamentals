import { Component, OnInit } from '@angular/core';
import { AuthService } from './user/services/auth.service';

@Component({
  selector: 'events-app',
  templateUrl: './events-app.component.html'
})
export class EventsAppComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.checkAutheticationStatus();
  }
}
