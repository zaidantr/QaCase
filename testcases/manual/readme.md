# Test Cases — WeMine QA Technical Case

This folder holds the test cases for the three flows covered in the technical case. Each file follows the same structure: a short backend flow breakdown (which service is likely involved at each step, and the risk at each point), followed by the test cases themselves, followed by the tools chosen for that flow and why.

The cases lean heavily into the two characteristics called out as core to this product: the app has to work fully under bad or no connectivity, and a lot of the UI (forms, fields) is dynamically built rather than fixed — so those two things get tested first and most thoroughly in every flow.

- [Flow 0 — Sign In](./flow0-sign-in.md)
- [Flow 1 — Equipment Inspection Form](./flow1-equipment-inspection-form.md)
- [Flow 2 — Safety Hazard Report](./flow2-safety-hazard-report.md)

For the reasoning behind the repository structure and the tool choices across all three flows together, see the [root README](../README.md).
