import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IEvent } from 'src/app/events/models/event';

@Component({
  selector: 'event-thumbnail',
  templateUrl: './event-thumbnail.component.html',
  styleUrls: ['./event-thumbnail.component.css']
})
export class EventThumbnailComponent {
  @Input()
  event: IEvent;
}
