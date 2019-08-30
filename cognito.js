
AWS.config.region = 'us-east-1'; 
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:1c7b4cdb-92fb-4978-8daa-004ff3ed1551',
});

