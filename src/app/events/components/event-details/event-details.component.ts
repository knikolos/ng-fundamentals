import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/events/services/event.service';
import { IEvent } from 'src/app/events/models/event';
import { ISession } from '../../models/session';

@Component({
  selector: 'event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event: IEvent;
  addMode: boolean;
  filterByLevel: string = "all";
  sortBy: string = "voters";

  constructor(private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.event = data["event"];
      this.resetState();
    });
  }

  resetState() {
    this.addMode = false;
    this.filterByLevel = "all";
    this.sortBy = "voters";
  }

  addSession() {
    this.addMode = true;
  }

  saveNewSession(session: ISession) {
    let nextId = Math.max.apply(null, this.event.sessions.map(x => x.id));
    session.id = nextId + 1;
    this.event.sessions.push(session);
    this.eventService.saveEvent(this.event)
      .subscribe(() => this.addMode = false);
  }

  sessionFormClose() {
    this.addMode = false;
  }
}
