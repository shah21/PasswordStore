/* Api endpoints */

enum endpoints {
    login = '/api/auth/login',
    getUser = '/api/auth/user',
    verifyAccessToken = '/api/auth/verifyAccessToken',
    refreshToken = '/api/auth/refresh-token',

    createApp = '/api/apps/create-app',
    getApps = '/api/apps/',
    deleteApp = '/api/apps/delete',
    updateApp = '/api/apps/update',
};

export default endpoints;