TypeScript Definitions for testRTC script commands
---
## Installation
Make sure you have Node Package Manager installed. ( https://www.npmjs.com/get-npm )
This package has peer dependency @types/nightwatch

    npm install -D test-type-definition
or

    yarn add -D test-type-definition

Configure your `tsconfig.json` to add provided types to your project scope if your IDE can't see it:
With VSCode should have no issues.

``` 
{
  "compilerOptions": {
    "typeRoots": [
      "./node_modules/test-type-definition"
    ]
  },
  "include": [
     "node_modules/test-type-definition/*.d.ts"
   ]
}
```
## Enjoy assistive scripting in your IDE !
