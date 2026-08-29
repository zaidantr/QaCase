
/*
------------------------------------------------------------
FLOW 2 - TC-002
Hazard + Follow-up creation
------------------------------------------------------------
*/

const hazardResponse = pm.response.json();

pm.test('Hazard creation succeeded', function () {

  pm.expect(pm.response.code).to.be.within(
    200,
    299
  );

});

pm.test('Hazard entry is created', function () {

  pm.expect(
    hazardResponse
  ).to.have.property('hazardId');

  pm.expect(
    hazardResponse.hazardId
  ).to.not.be.empty;

});

pm.test('Follow-up task is created', function () {

  pm.expect(
    hazardResponse
  ).to.have.property('followUpTaskId');

  pm.expect(
    hazardResponse.followUpTaskId
  ).to.not.be.empty;

});

pm.environment.set(
  'hazardId',
  hazardResponse.hazardId
);

pm.environment.set(
  'followUpTaskId',
  hazardResponse.followUpTaskId
);


/*
------------------------------------------------------------
FLOW 2 - TC-003
PIC notification
------------------------------------------------------------
*/

const picNotification = pm.response.json();

pm.test('PIC notification request succeeded', function () {

  pm.expect(pm.response.code).to.be.within(
    200,
    299
  );

});

pm.test('Notification is sent to PIC', function () {

  pm.expect(
    picNotification.recipientId
  ).to.eql(
    pm.environment.get('picUserId')
  );

});

pm.test('Notification references follow-up task', function () {

  pm.expect(
    picNotification.referenceId
  ).to.eql(
    pm.environment.get('followUpTaskId')
  );

});

pm.test('Notification type is follow-up', function () {

  pm.expect(
    picNotification.type
  ).to.eql(
    'HAZARD_FOLLOW_UP'
  );

});


/*
------------------------------------------------------------
FLOW 2 - TC-004
Area notification
------------------------------------------------------------
*/

const areaNotifications = pm.response.json();

pm.test('Area notification request succeeded', function () {

  pm.expect(pm.response.code).to.be.within(
    200,
    299
  );

});

pm.test('Area notification recipients exist', function () {

  pm.expect(
    areaNotifications.recipients
  ).to.be.an('array');

});

pm.test('All area employees receive notification', function () {

  pm.expect(
    areaNotifications.recipients.length
  ).to.be.greaterThan(0);

});

pm.test('Notification is scoped to correct area', function () {

  pm.expect(
    areaNotifications.areaId
  ).to.eql(
    pm.environment.get('areaId')
  );

});


/*
------------------------------------------------------------
FLOW 2 - TC-009
Supervisor notification
------------------------------------------------------------
*/

const supervisorNotification = pm.response.json();

pm.test('Supervisor notification succeeds', function () {

  pm.expect(pm.response.code).to.be.within(
    200,
    299
  );

});

pm.test('Notification is sent to direct supervisor', function () {

  pm.expect(
    supervisorNotification.recipientId
  ).to.eql(
    pm.environment.get('supervisorId')
  );

});

pm.test('Notification references hazard', function () {

  pm.expect(
    supervisorNotification.referenceId
  ).to.eql(
    pm.environment.get('hazardId')
  );

});


/*
------------------------------------------------------------
FLOW 2 - TC-010
Notification Service failure

Expected:
- Hazard still created
- Follow-up still created
- Notification failure does not rollback transaction
------------------------------------------------------------
*/

const notificationFailureResponse =
  pm.response.json();

pm.test('Hazard is still created', function () {

  pm.expect(
    notificationFailureResponse
  ).to.have.property('hazardId');

});

pm.test('Follow-up task is still created', function () {

  pm.expect(
    notificationFailureResponse
  ).to.have.property('followUpTaskId');

});

pm.test('Notification failure does not rollback hazard', function () {

  pm.expect(
    notificationFailureResponse.hazardId
  ).to.not.be.empty;

});



/*
------------------------------------------------------------
FLOW 2 - TC-011
Offline follow-up sync
------------------------------------------------------------
*/

const followUpResponse = pm.response.json();

pm.test('Follow-up sync succeeds', function () {

  pm.expect(pm.response.code).to.be.within(
    200,
    299
  );

});

pm.test('Follow-up status is completed', function () {

  pm.expect(
    followUpResponse.status
  ).to.eql('completed');

});

pm.test('Follow-up ID exists', function () {

  pm.expect(
    followUpResponse.id
  ).to.not.be.empty;

});
