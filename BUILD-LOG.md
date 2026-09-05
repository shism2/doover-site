# Build Log

Dated entries, newest first. Plain updates on what actually happened, including the parts that did not work. This is the "follow the build" feed.

---

## Week of Sep 1, 2026: live, and launched to strangers

- The landing page went live at getdoover.com on Aug 28. Static site, no analytics, no third-party scripts. The waitlist form and the confirmation email are the only moving parts.
- Every signup now gets asked one question in the confirmation email: the exact moment your last planner died for you. Those replies feed the failure ledger.
- First public post, Sep 1, in r/SideProject. Two useful critiques within the hour. One caught me conflating two different guarantees (deterministic scheduling vs. hard constraints on fixed events) in one sentence. Fixed the wording. The other argued the tech talk should be a footnote, not a headline. Pulled it out of the post entirely.
- Also from that thread, and adopted as process: waitlist signups are weak evidence of demand. People join waitlists when they are bored. The signal I actually track now is the number of people who can describe the exact moment they quit their last planner.
- Signups so far: zero. The post reached builders, not the people whose planners keep dying. The real test comes with the next post to the actual audience.
- Published the failure ledger (FAILURE-CASES.md) as the public acceptance suite for the engine. 17 cases.

**Next:** the story post to the audience this is for, then a public go/no-go decision a couple of weeks after it. If it is a go, the first two weeks of the build are the solver spike (constraint solver vs. custom repair heuristic). I will post the decision and the reasoning here.
