# Check Digit Spectral Config

Check Digit Spectral Config is the standard package to install and configure [Spectral](https://stoplight.io/open-source/spectral/) for use in Check Digit projects.

### Installing

Spectral Config should be installed as a dev dependency:
`npm install @checkdigit/spectral-config --save-dev`

### Additional Setup

Once installed, add a file named `.spectral.json` to the root of your project. This file should extend Spectral Config:

```jsonc
{
  "extends": ["@checkdigit/spectral-config"],
}
```

Also add the following to your `package.json` to run Spectral:

```jsonc
"scripts": {
  // ...
  "lint:openapi": "spectral lint src/**/swagger.yml",
}
```

To include Spectral in your project's CI/CD pipeline, add the following to your `package.json`:

```jsonc
"scripts": {
  // ...
    "ci:lint": "... && npm run lint:openapi",
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

`operation-operationId  Operation must have "operationId"`

Add an operationId to the operation. Check Digit uses a `noun-noun-verb` naming convention. For example, the correct operationId for a `PUT` to path `/resource/{id}/item/{itemId}/key` is `resource-item-key-put`
