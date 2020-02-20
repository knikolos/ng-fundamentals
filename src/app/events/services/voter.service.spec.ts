import { VoterService } from "./voter.service";
import { ISession } from '../models/session';
import { of } from 'rxjs';

describe("VoterService", () => {
    let voterService: VoterService,
        mockHttp,
        session: ISession = {
            id: 1,
            name: "test session",
            presenter: "Stojan",
            duration: 1,
            level: "Advanced",
            abstract: "abstract",
            voters: ["Stavre", "Sekula"]
        };

    beforeEach(() => {
        mockHttp = jasmine.createSpyObj("mockHttp", ["delete", "post"]);
        voterService = new VoterService(mockHttp);
    });

    describe("deleteVoter", () => {
        it("Should remove the voter from the list of voters", () => {
            mockHttp.delete.and.returnValue(of(false));
            voterService.deleteVoter(1, session, "Stavre");

            expect(session.voters.length).toBe(1);
            expect(session.voters.includes("Sekula")).toBe(true);
        });


        it("Should call the correct url", () => {
            mockHttp.delete.and.returnValue(of(false));
            voterService.deleteVoter(1, session, "Stavre");

            expect(mockHttp.delete).toHaveBeenCalledWith(`/api/events/1/sessions/1/voters/Stavre`);
        });
    });

    describe("addVoter", () => {
        it("Should call the correct url", () => {
            mockHttp.post.and.returnValue(of(false));
            voterService.addVoter(1, session, "Stavre");
            let url = "/api/events/1/sessions/1/voters/Stavre";

            expect(mockHttp.post).toHaveBeenCalledWith(url, {}, jasmine.any(Object));
        });
    });
});