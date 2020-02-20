import { SessionListComponent } from './session-list.component';
import { ISession } from '../../models/session';

describe('SessionListComponent', () => {
    let component: SessionListComponent;
    let mockAuthService;
    let mockVoterService;
    const sessions = [
        { id: 1, name: 'prva', level: 'Begginer' },
        { id: 2, name: 'vtora', level: 'Intermediate' },
        { id: 3, name: 'treta', level: 'Advanced' }
    ] as ISession[];

    beforeEach(() => {
        mockAuthService = jasmine.createSpyObj('mockAuthService', ['currentUser']);
        mockVoterService = jasmine.createSpyObj('mockVoterService', [
            'deleteVoter',
            'addVoter',
            'userHasVoted'
        ]);
        component = new SessionListComponent(mockAuthService, mockVoterService);
    });

    describe('ngOnChanges', () => {
        it('should filter the sessions correctly', () => {
            component.sessions = sessions;
            component.filterByLevel = 'Advanced';
            component.ngOnChanges();

            expect(component.filteredSessions.every(session => session.level === 'Advanced'))
                .toBe(true);
        });

        it('should sort the sessions correctly', () => {
            component.sessions = sessions;
            component.filterByLevel = 'all';
            component.sortBy = 'name';
            component.ngOnChanges();

            expect(component.filteredSessions[2].name).toBe('vtora');
        });
    });
});
