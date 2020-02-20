import { Component, Input, OnChanges } from '@angular/core';
import { ISession } from '../../models/session';
import { AuthService } from 'src/app/user/services/auth.service';
import { VoterService } from '../../services/voter.service';

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnChanges {
  @Input()
  eventId: number;
  @Input()
  sessions: ISession[];
  @Input()
  filterByLevel: string;
  filteredSessions: ISession[];
  @Input()
  sortBy: string;

  constructor(protected auth: AuthService, private voterService: VoterService) { }

  ngOnChanges(): void {
    if (this.sessions) {
      this.filterSessionsByLevel(this.filterByLevel);
      this.sortSessionsBy(this.sortBy);
    }
  }

  filterSessionsByLevel(level: string) {
    if (level === 'all') {
      this.filteredSessions = this.sessions.slice(0);
    } else {
      this.filteredSessions = this.sessions.filter(x => x.level.toLocaleLowerCase() === level);
    }
  }

  sortSessionsBy(property: string) {
    this.filteredSessions = this.filteredSessions.sort((a, b) => {
      if (Array.isArray(a[property])) {
        return b[property].length - a[property].length;
      } else {
        return a[property] > b[property] ? 1 : -1;
      }
    });
  }

  toggleVote(session: ISession) {
    if (this.userHasVoted(session)) {
      this.voterService.deleteVoter(this.eventId, session, this.auth.currentUser.userName);
    } else {
      this.voterService.addVoter(this.eventId, session, this.auth.currentUser.userName);
    }

    this.sortSessionsBy(this.sortBy);
  }

  userHasVoted(session: ISession): boolean {
    return this.voterService.userHasVoted(session, this.auth.currentUser.userName);
  }
}
