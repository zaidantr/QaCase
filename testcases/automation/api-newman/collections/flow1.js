
/*
------------------------------------------------------------
FLOW 1 - TC-002
Offline submission sync

Expected:
- Pending submission reaches backend
- Submission becomes synced
- No duplicate
------------------------------------------------------------
*/

const inspectionResponse = pm.response.json();

pm.test('Inspection sync request succeeded', function () {

  pm.expect(pm.response.code).to.be.within(
    200,
    299
  );

});

pm.test('Inspection submission ID exists', function () {

  pm.expect(
    inspectionResponse
  ).to.have.property('id');

  pm.expect(
    inspectionResponse.id
  ).to.not.be.empty;

});

pm.test('Submission status is synced', function () {

  pm.expect(
    inspectionResponse.status
  ).to.eql('synced');

});

pm.environment.set(
  'inspectionId',
  inspectionResponse.id
);


/*
------------------------------------------------------------
FLOW 1 - TC-007
Old schema

Expected:
Application should not silently submit using outdated
schema.

API should provide version/schema information.
------------------------------------------------------------
*/

const schemaResponse = pm.response.json();

pm.test('Schema response is successful', function () {

  pm.expect(pm.response.code).to.be.within(
    200,
    299
  );

});

pm.test('Schema contains version information', function () {

  pm.expect(
    schemaResponse
  ).to.have.property('version');

});

pm.test('Schema is not empty', function () {

  pm.expect(
    schemaResponse
  ).to.not.be.null;

});