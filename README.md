# Check Digit Spectral Config

Check Digit Spectral Config is the standard package to install and configure [Spectral](https://stoplight.io/open-source/spectral/) for use in Check Digit projects.

### Installing

Spectral Config should be installed as a dev dependency:
`npm install @checkdigit/spectral-config --save-dev`

### Additional Setup

Once installed, add a file named `.spectral.json` to the root of your project. This file should extend Spectral Config:

```json
{
  "extends": ["@checkdigit/spectral-config"]
}
```

Also add the following to your `package.json` to run Spectral:

```json
{
  "scripts": {
    "lint:openapi": "spectral lint src/**/swagger.yml"
  }
}
```

To include Spectral in your project's CI/CD pipeline, add the following to your `package.json`:

```json
{
  "scripts": {
    "ci:lint": "... && npm run lint:openapi"
  }
}
```

### Plugins

#### Webstorm

Install Spectral, by Schwartz IT https://plugins.jetbrains.com/plugin/18520-spectral

Configure at `WebStorm > Settings > Tools > Spectral`.

Set Ruleset to the absolute path to project's `.spectral.json` (`/Users/.../payment-card/.spectral.json`). This plugin doesn't seem to respect path variables, so this will be global. Hopefully this will be fixed in a future plugin update.

Set Included files to the following glob pattern `**/*swagger.yml`.

#### VS Code

Install Spectral, by Spotlight https://marketplace.visualstudio.com/items?itemName=stoplight.spectral

### Rules for Certain Warnings and Errors

#### `no-operationId-allowed`

The `no-operationId-allowed` rule enforces that `operationId` field **must not** be in the operations.

**Rationale:**  
The use of `operationId` require manual effort and can lead to inconsistencies and maintenance challenges. By disallowing `operationId`, we automatically maintain a consistent naming convention as part of our code generation tool chain rely on paths and HTTP methods for operation identification.

**Migration Guidance:**

- Remove any `operationId` fields.
- References to the previously generated Koa router Context typings:
  - Update the openapi related code generation dependencies, and update npm script `prepare` according to the coding standards to activate the koa router typing support.
  - with koa router typing supported enabled, the typing references should now be able to removed from the router implementation.
  - just in case the types need to be used in somewhere else, they'll follow `${Path}${Method}` pattern in PascalCase. For example, `PUT /account/{accountId}:` will translate to AccountPutContext.
