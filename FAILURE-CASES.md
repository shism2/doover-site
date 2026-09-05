# The Failure Ledger

Every entry here is a real way a planner has failed, either me personally or someone in a thread I was in. Each one is converted into a rule the Do Over engine has to obey, and a test it has to pass before anything ships.

The point of publishing it: planners die in predictable ways, and most of them are never designed against. If you have one that is not on this list, tell me. The format is the failure, the invariant, and how it gets tested.

How to add yours: reply wherever you found this (Reddit thread, email), or open an issue on this repo. One sentence about the exact moment you quit is enough. I will turn it into a case.

---

## 1. The task-by-task cascade
**Failure:** Something slips, and the engine shifts every following task later one at a time, cramming the evening until it is physically impossible.
**Invariant:** Repair re-triages the whole remaining day: drop, shrink, defer, re-sequence. Total proposed load never exceeds the remaining realistic capacity.
**Test:** Day with 5 remaining blocks, 2 hours lost. The proposal must drop or defer at least the lowest-priority items, never compress all 5 into the remaining window.

## 2. Acting without consent
**Failure:** The app moves things without asking. Jarring, and it destroys trust in one shot.
**Invariant:** No change applies without explicit confirmation. Every repair is a proposal shown as a diff, applied only on accept.
**Test:** Trigger a repair, take no action. Schedule state is unchanged 24 hours later.

## 3. Moving the sacred
**Failure:** LLM-based planners move fixed appointments, the airport pickup, the dentist, in the name of optimizing.
**Invariant:** Calendar events and user-marked anchors are immovable unless the user explicitly releases them, per event, per repair.
**Test:** 100 randomized repair scenarios with sacred events produce zero proposals that move, shrink, or overlap a sacred block. This is a hard constraint enforced by the solver, not a prompt instruction.

## 4. Impossible-time hallucination
**Failure:** A plan that says to go somewhere at 5:00 when it closes at 2:00. Times that do not exist.
**Invariant:** All proposed times are validated deterministically. Nothing is emitted raw from a language model.
**Test:** Fuzz the parsing output. Any block that fails validation is rejected and re-planned, never shown.

## 5. Teleportation
**Failure:** Back-to-back items at different locations with zero travel time. The signature blunder of AI planners, and it is worse for anyone with time blindness because an impossible plan triggers exactly the shame spiral the planner was supposed to prevent.
**Invariant:** Consecutive items at different places always get a travel block, with a user-confirmed estimate remembered per location pair. Applies to plans and to repairs.
**Test:** A home task followed by an across-town errand yields a travel block, or the proposal is invalid.

## 6. Work scheduled before recovery
**Failure:** You say you are wiped, and the engine optimizes you straight into the next task at the earliest available minute.
**Invariant:** Reported depletion (wiped, exhausted, no spoons) schedules a recovery block before the next demanding item. Rest is a first-class block, not leftover space.
**Test:** "I'm wiped" at 2:41pm with a free afternoon. The first proposed block is rest, not work.

## 7. Unexplained decisions
**Failure:** A shrink or a drop with no visible reason reads as a bug and destroys trust, especially energy-based decisions that contradict simple time math.
**Invariant:** Every non-obvious repair decision carries a one-line rationale in the proposal.
**Test:** Any drop, shrink, or move of a task the user touched in the last 48 hours without a rationale string fails review.

## 8. Chat that cannot operate the schedule
**Failure:** A chat layer that can talk about the schedule but cannot finely change it. Blunt where it needs to be precise.
**Invariant:** Conversation compiles to precise engine operations (identify movable vs. sacred, shrink, defer, re-sequence) and returns a reviewable diff.
**Test:** "Punt whatever can wait, keep the report" defers groceries and inbox, keeps the report. Intent parsing accuracy is tracked; below 90% on the core intent set blocks release.

## 9. No roll-over
**Failure:** Incomplete tasks vanish or need manual rescheduling. People quit within a week.
**Invariant:** Unfinished tasks flow to the defer pile automatically and appear in the next plan proposal. Nothing is ever silently lost.
**Test:** Leave 3 tasks unfinished, close the app, return tomorrow. All 3 are in tomorrow's proposal.

## 10. The red overdue wall
**Failure:** Missed tasks stack up in red. People describe seeing the red and simply not opening the app again. I have done exactly this.
**Invariant:** No overdue state exists in the UI. Missed is not flagged; missed is quietly absorbed into the next repair.
**Test:** UI audit. No red or warning styling on any past-due item, anywhere, ever.

## 11. Streak death
**Failure:** Losing a streak after hundreds of days and quitting on the spot. Punishment mechanics are the single most common quit trigger in the threads.
**Invariant:** No streaks, no HP, no decay, nothing that can be lost.
**Test:** Feature review gate. Any mechanic that can move backward is rejected.

## 12. The walk of shame on return
**Failure:** Coming back after two weeks away to a backlog of 40 missed tasks and a dead virtual pet.
**Invariant:** Any absence of 72 hours or more means reopening shows exactly one thing: "Rebuild from today?" No recap, no counts, no guilt.
**Test:** 14-day absence simulation. A fresh plan is reachable in 3 taps or fewer, and zero missed-task counts are rendered.

## 13. Setup burden
**Failure:** The setup phase exhausts you before the app has done anything. By the time everything is organized there is no energy left for the actual task.
**Invariant:** Zero mandatory configuration. Brain-dump, confirm, plan, in under 5 minutes. No settings prerequisite for any core flow.
**Test:** New-user stopwatch test, repeated each release. A median over 5 minutes is a regression.

## 14. Upsell before value
**Failure:** A subscription push on first launch, before the product has done a single useful thing.
**Invariant:** No paywall interaction until the user has completed at least one successful repair. Trial requires no card.
**Test:** Fresh-install flow audit per release.

## 15. Billing that exploits forgetting
**Failure:** Surprise auto-renewal charges aimed at the exact population with memory deficits, plus cancellation mazes.
**Invariant:** Renewal warning email 7 days prior. Cancel in 2 taps or fewer, in-app. Refund-first support posture.
**Test:** Billing flow audit and zero-dark-pattern review before every pricing change.

## 16. Sycophancy
**Failure:** AI tools that agree with everything. Plans that flatter instead of fit.
**Invariant:** The engine holds constraints against the user's optimism. If requested load exceeds capacity, the proposal says so and shows the trade-off. It never silently agrees.
**Test:** Request 10 hours of tasks into a 4-hour window. The proposal must surface the overflow and propose cuts, not fit everything.

## 17. Passive by design
**Failure:** Every planner is a ledger, not a coach. It records the plan and then waits. Nothing ever initiates, checks in, or pushes toward actually finishing anything, which leaves the entire burden of momentum on the one function ADHD taxes most.
**Invariant:** The product initiates at the moments that matter: scheduled check-ins, proactive repair offers, win-back prompts. Ignoring any of them costs nothing, ever. Presence without punishment.
**Test:** An ignored check-in produces no guilt copy, no state change, no escalation. A plan mid-drift gets a repair offered, not applied, without being asked. Any nudge whose ignore-path carries a cost is rejected in review.

---

The suite only grows. When a beta user reports a failure that matches an entry, it is a regression. When it does not match, it is a new entry.
