"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequireWebsiteAccess = exports.RequireWebsiteDomain = exports.RequireWebsiteId = void 0;
const common_1 = require("@nestjs/common");
const RequireWebsiteId = (websiteId) => (0, common_1.SetMetadata)('websiteId', websiteId);
exports.RequireWebsiteId = RequireWebsiteId;
const RequireWebsiteDomain = (domain) => (0, common_1.SetMetadata)('websiteDomain', domain);
exports.RequireWebsiteDomain = RequireWebsiteDomain;
const RequireWebsiteAccess = (websiteIdOrDomain) => {
    if (typeof websiteIdOrDomain === 'number') {
        return (0, common_1.SetMetadata)('websiteId', websiteIdOrDomain);
    }
    return (0, common_1.SetMetadata)('websiteDomain', websiteIdOrDomain);
};
exports.RequireWebsiteAccess = RequireWebsiteAccess;
//# sourceMappingURL=website-permissions.decorator.js.map