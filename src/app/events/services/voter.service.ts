import { Injectable } from '@angular/core';
import { ISession } from '../models/session';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VoterService {

  constructor(private http: HttpClient) { }

  userHasVoted(session: ISession, userName: string): boolean {
    return session.voters.includes(userName);
  }

  deleteVoter(eventId: number, session: ISession, userName: string) {
    session.voters = session.voters.filter(voter => voter !== userName);

    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${userName}`;

    this.http.delete(url)
      .pipe(catchError(this.handleError("deleteVoter")))
      .subscribe();
  }

  addVoter(eventId: number, session: ISession, userName: string) {
    session.voters.push(userName);

    const options = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };
    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${userName}`;

    this.http.post(url, {}, options)
      .pipe(catchError(this.handleError("addVoter")))
      .subscribe();
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }
}
