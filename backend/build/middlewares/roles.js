"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
exports.rolePermit = rolePermit;
var Roles;
(function (Roles) {
    Roles["Admin"] = "Admin";
    Roles["User"] = "User";
})(Roles || (exports.Roles = Roles = {}));
function rolePermit(roles) {
    return async (request, response, next) => {
        const userRole = request.user.role;
        const userId = request.user.id;
        if (!userRole || !userId) {
            return response.status(400).json({
                status: 'error',
                message: 'User Not Authorized. Please login again',
            });
        }
        const isAuthorized = roles.includes(userRole);
        if (!isAuthorized) {
            return response.status(400).json({
                status: 'error',
                message: 'User Not Permitted to execute this action',
            });
        }
        next();
    };
}
