import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { SessionListComponent } from './session-list.component';
import { AuthService } from 'src/app/user/services/auth.service';
import { VoterService } from '../../services/voter.service';
import { DurationPipe, CollapsibleWellComponent } from 'src/app/common';
import { By } from '@angular/platform-browser';

describe('SessionListComponent', () => {
    let fixture: ComponentFixture<SessionListComponent>;
    let component: SessionListComponent;
    let element: HTMLElement;
    let debugElement: DebugElement;

    beforeEach(async(() => {
        const mockAuthService = {
            isAuthenticated: () => true,
            currentUser: { userName: 'stojan' }
        };
        const mockVoterService = {
            userHasVoted: () => true
        };

        TestBed.configureTestingModule({
            imports: [],
            declarations: [
                SessionListComponent,
                DurationPipe,
            ],
            providers: [
                { provide: AuthService, useValue: mockAuthService },
                { provide: VoterService, useValue: mockVoterService },
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SessionListComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        debugElement = fixture.debugElement;
    });

    describe('intial display', () => {
        it('should have the correct session title', () => {
            component.sessions = [
                {
                    id: 1,
                    name: 'test session',
                    presenter: 'Stojan',
                    duration: 1,
                    level: 'Advanced',
                    abstract: 'abstract',
                    voters: ['Stavre', 'Sekula']
                }];
            component.eventId = 1;
            component.filterByLevel = 'all';
            component.sortBy = 'name';

            component.ngOnChanges();
            fixture.detectChanges();

            expect(element.querySelector('[well-title]').textContent)
                .toContain('test session');
            expect(debugElement.query(By.css('[well-title]')).nativeElement.textContent)
                .toContain('test session');
        });
    });
});
