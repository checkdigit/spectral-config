'use strict';

const fs = require('node:fs');

const { schemaResolver } = require('@checkdigit/openapi');

const { Resolver } = require('@stoplight/json-ref-resolver');
const { resolveFile } = require('@stoplight/json-ref-readers');

const resolver = new Resolver({
  resolvers: {
    file: { resolve: resolveFile },
    https: {
      resolve: (uri) => {
        const url = uri.href();
        if (schemaResolver.isHttpsSchemaReferenceUrl(url)) {
          const localSchemaPath = schemaResolver.mapHttpsToLocalResourcePath(url);
          return fs.readFileSync(localSchemaPath, 'utf8');
        }
        throw new Error(`Unable to resolve https:// schema URL: ${uri}`);
      },
    },
    service: {
      resolve: (uri) => {
        const url = uri.href();
        if (schemaResolver.isServiceSchemaReferenceUrl(url)) {
          const localSchemaPath = schemaResolver.mapServiceToLocalResourcePath(url);
          return fs.readFileSync(localSchemaPath, 'utf8');
        }
        throw new Error(`Unable to resolve service:// schema URL: ${uri}`);
      },
    },
  },
});
module.exports = resolver;
