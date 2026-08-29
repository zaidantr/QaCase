# Hi there, Best of Luck

# WeMine QA Technical Case

This repository contains my test cases and example test automation for the WeMine technical case, covering three flows: Sign In, Equipment Inspection Form, and Safety Hazard Report.

## How I approached this

Before writing any test case, I broke down each flow into which backend service is likely handling each step, based on the service responsibilities described in the case. That mapping is what most of the test cases are actually built around — a lot of the interesting risk in this product isn't in the UI, it's in what happens when one service in a multi-service chain is slow, down, or out of sync with what the client has cached.

Two characteristics show up as explicit requirements for the whole product, so I treated them as the main lens for every flow rather than a one-off checklist item:

- **The app has to work fully offline, or under bad connectivity.** So for every flow, the highest-priority cases are about what happens with no connection at all, a connection that drops mid-action, and how the app catches up (syncs) once connectivity returns.
- **A lot of the UI is dynamically built**, not fixed — the form builder, form field types, and constraints like the 50-field and 4-option-radio limits. So each flow also gets cases around what happens at those boundaries, and what happens if the schema on the client goes stale compared to what's on the backend.

## Repository structure

```ini
## Project Structure

```text
.
├── README.md                          # Project documentation
│
├── testcases/
│   ├── readme.md                      # Index of all test cases
│   ├── flow0-sign-in.md
│   ├── flow1-equipment-inspection-form.md
│   └── flow2-safety-hazard-report.md
│
└── automation/
    ├── web-playwright/
    │   ├── tests/
    │   │   └── *.spec.ts
    │
    ├── api-newman/
    │   ├── collections/
    │   │   └── *.postman_collection.json
    │   ├── environments/
    │   │   └── *.postman_environment.json
    │   └── reports/
    │
    └── mobile-maestro/
        └── flows/
            └── *.yaml
```

## Test cases

All test cases, organized by flow, are in **[testcases/](./manual/readme.md)**. Each flow document includes:

- a short breakdown of which backend service is likely involved at each step, and the specific risk to watch for there
- the test cases themselves, prioritized with the offline/dynamic-form characteristics weighted highest
- the reasoning for which tool fits which part of that specific flow

## Automation examples

Rather than automate every case, I picked one representative example per tool/layer, chosen for being both high-priority and a good demonstration of why that tool fits that layer:

| File | Case | Layer | Why this one |
|---|---|---|---|
| `automation/mobile-maestro/flow0-tc-001.yaml` | Flow 0, TC-001 | Mobile (Maestro) | The single highest-priority case in the whole suite — it's the first screen a user sees, and it directly tests the product's core "works with no connection" promise |
| `automation/web-playwright/flow1-form-builder.spec.ts` | Flow 1, TC-005 | Web (Playwright) | A deterministic, cheap-to-automate boundary case on an explicit documented constraint — a good candidate for a silent bug (limit enforced visually but not actually blocking save) |
| `automation/api-newman/flow2.js` | Flow 2, TC-003 | API (Postman/Newman) | Verifying exactly who got notified and with what content is far more reliable asserted against the raw API response than by trying to catch a push notification on a physical device |

## Why these tools

The same three tools cover all three flows, chosen per layer rather than per flow:

- **Maestro** for mobile UI — handles the offline/poor-connection scenarios that matter most here across both iOS and Android, and is lightweight enough for straightforward linear flows like sign-in and form submission.
- **Playwright** for web UI — has offline mode and network condition control built in (`context.setOffline()`, request interception), which maps directly onto the bad-connectivity scenarios this product is built around, and handles the form builder's dynamic UI reliably.
- **Postman/Newman** for the API layer — most of the backend-focused cases need direct control at the service level (simulating one service failing without touching the others, or asserting exact response payloads like notification content), which is faster and more precise at the API layer than driving the same check through the UI.

For validating offline state specifically (pending submissions, queued reports), I'd also check the local storage/DB on the device directly via adb/device shell rather than relying only on what the UI shows, since a UI showing the right thing doesn't guarantee the underlying data is actually correct or won't be lost.
