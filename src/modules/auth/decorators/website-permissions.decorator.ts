import { SetMetadata } from '@nestjs/common';

export const RequireWebsiteId = (websiteId: number) =>
  SetMetadata('websiteId', websiteId);

export const RequireWebsiteDomain = (domain: string) =>
  SetMetadata('websiteDomain', domain);

export const RequireWebsiteAccess = (websiteIdOrDomain: number | string) => {
  if (typeof websiteIdOrDomain === 'number') {
    return SetMetadata('websiteId', websiteIdOrDomain);
  }
  return SetMetadata('websiteDomain', websiteIdOrDomain);
};
