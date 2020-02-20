import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/user/services/auth.service';
import { EventService } from 'src/app/events/services/event.service';
import { IEvent } from 'src/app/events/models/event';

@Component({
  selector: 'events-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  events: IEvent[];
  searchTerm: string;
  foundSessions: any[];

  constructor(protected authService: AuthService, private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getEvents()
      .subscribe(data => this.events = data);
  }

  searchSessions(searchTerm: string) {
    this.eventService.searchSessions(searchTerm)
      .subscribe(sessions => this.foundSessions = sessions);
  }
}
