exports.config = {
    origin: process.env["Origin"] || "http://localhost:3000",
    dbConnectionString: process.env["DBConnectionString"] || "mongodb://dbUser:qwer1234@ds145379.mlab.com:45379/tasksdb", 
    authClientId: process.env["AuthClientId"] || "8c1d5379-eef4-40c4-9cfa-2dc18f809a16",
    authClientSecret: process.env["AuthClientSecret"] || "Ut07VG/v128P5K2hX75dalo3b4+YaLtOWVbSPNe7los=",
    notificationUrl_LSDocs : process.env["NotificationsUrlLSDocs"] || "https://taskmanagertest.azurewebsites.net/_api/sharepoint/webhook",
    auth_LSDocs_ClientID : process.env["AuthLSDocsClientId"] || '9337f183-cd2b-47b6-890e-0a03d0a35bee',
    auth_LSDocs_ClientSecret : process.env["AuthLSDocsClientSecret"] || 'dfA3Qybk0dGhmU6Gq4Z5glLNN4t99HcRjuM4i6cO494='
}