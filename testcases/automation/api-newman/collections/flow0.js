
/*
------------------------------------------------------------


/*
------------------------------------------------------------
FLOW 0 - TC-003
Tenant not found
------------------------------------------------------------

POST {{baseUrl}}/user/who
------------------------------------------------------------
*/

const tenantNotFoundResponse = pm.response.json();

pm.test('Tenant not found request is rejected', function () {

  pm.expect(pm.response.code).to.be.oneOf([
    400,
    404
  ]);

});

pm.test('Response contains tenant error', function () {

  const responseText =
    JSON.stringify(tenantNotFoundResponse).toLowerCase();

  pm.expect(responseText).to.include('tenant');

});


/*
------------------------------------------------------------
FLOW 0 - TC-004
Tenant inactive
------------------------------------------------------------
*/

const inactiveTenantResponse = pm.response.json();

pm.test('Inactive tenant request is rejected', function () {

  pm.expect(pm.response.code).to.be.oneOf([
    400,
    403
  ]);

});

pm.test('Response identifies inactive tenant', function () {

  const responseText =
    JSON.stringify(inactiveTenantResponse).toLowerCase();

  pm.expect(responseText).to.include('inactive');

});


/*
------------------------------------------------------------
FLOW 0 - TC-005
Token exchange failed
------------------------------------------------------------
*/

const tokenResponse = pm.response.json();

pm.test('Invalid token is rejected', function () {

  pm.expect(pm.response.code).to.be.oneOf([
    401,
    403
  ]);

});

pm.test('Response contains token authentication error', function () {

  const responseText =
    JSON.stringify(tokenResponse).toLowerCase();

  pm.expect(responseText).to.match(
    /invalid|expired|token|unauthorized/
  );

});

