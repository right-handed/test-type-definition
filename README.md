TypeScript Definitions for testRTC script commands
---
## Installation
Make sure you have Node Package Manager installed. ( https://www.npmjs.com/get-npm )

This package extends `@types/nightwatch` with testRTC custom commands

    npm install -D test-type-definition
or

    yarn add -D test-type-definition

Configure your `tsconfig.json` to add provided types to your project scope if your IDE can't see it

``` 
{
  "compilerOptions": {
    "types": [
      "test-type-definition"
    ],
  },
}
```
## Enjoy assistive scripting in your IDE !
