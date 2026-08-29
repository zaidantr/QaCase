# WEMINE QA AUTOMATION

Automation test suite for the WEMINE application using **Playwright, Newman, and Maestro**.

## Automation Tools

### Playwright

Used for **Web UI / E2E testing**, especially for form builder and browser-based flows.

### Newman

Used for **API testing**, focusing on backend validation, business rules, service failures, synchronization, and notification behavior.

### Maestro

Used for **Mobile UI testing**, especially offline scenarios, dynamic forms, synchronization status, and native/external login flows.

## Folder Structure

```text
automation/
│
├── playwright/
│   ├── tests/
│   │   └── *.spec.ts
│   ├── pages/
│   │   └── *.page.ts
│   └── playwright.config.ts
│
├── newman/
│   ├── collections/
│   │   └── *.postman_collection.json
│   ├── environments/
│   │   └── *.postman_environment.json
│   └── reports/
│
└── maestro/
    └── flows/
        └── *.yaml
```

### Folder Description

| Folder                | Purpose                                     |
| --------------------- | ------------------------------------------- |
| `playwright/tests`    | Playwright test scenarios                   |
| `playwright/pages`    | Page Object classes and reusable UI actions |
| `newman/collections`  | Postman API collections executed by Newman  |
| `newman/environments` | Environment variables for API testing       |
| `newman/reports`      | Generated API test reports                  |
| `maestro/flows`       | Maestro mobile test flows                   |

## Test Coverage

Automation covers selected test cases from:

* **Flow 0 – Sign In**
* **Flow 1 – Equipment Inspection**
* **Flow 2 – Hazard**

Each test case is assigned to the tool that best matches the behavior being validated.
