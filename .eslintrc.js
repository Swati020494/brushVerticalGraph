module.exports = {
    "env": {
      "es6": true
    },
    "extends": "airbnb",
    "parser": "babel-eslint",
    "rules": {
      "func-names": ["error", "never"],
      "import/extensions": "off",
      "indent": ["error", 4, { "MemberExpression": 4 }],
      "space-before-function-paren": "off",
      "no-multi-assign": "off",
      "max-len": ["error", 120],
      "one-var": ["error", "never"],
      "no-plusplus": "off",
      "no-continue": "off",
      "no-unused-expressions": "off",
      "class-methods-use-this": "off",
      "import/prefer-default-export": "off",
      "comma-dangle": "off",
      "no-underscore-dangle": 0,
      "no-mixed-operators" : 0,
      "brace-style": "off",
      "no-loop-func": "warn",
      "no-param-reassign": "off",
      "no-iterator" : "off",
      "guard-for-in":"warn",
      "no-nested-ternary": "off",
      "no-restricted-syntax": [
         "error",
         "LabeledStatement",
         "WithStatement"
      ],
      "prefer-const": 0,
      "require-jsdoc": [
        "warn",
        {
          "require": {
            "FunctionDeclaration": true,
            "MethodDefinition": true,
            "ClassDeclaration": true,
            "ArrowFunctionExpression": true
          }
        }
      ],
      "valid-jsdoc": [
        "warn",
        {
          "prefer": {
            "arg": "param",
            "argument": "param",
            "returns": "return",
            "constructor": "class",
            "augments": "extends",
            "const": "constant",
            "defaultvalue": "default",
            "desc": "description",
            "host": "external",
            "fileoverview": "file",
            "overview": "file",
            "emits": "fires",
            "var": "member",
            "prop": "property",
            "exception": "throws"
          },
          "preferType": {
            "Boolean": "boolean",
            "Null": "null",
            "Undefined": "undefined",
            "Number": "number",
            "String": "string",
            "Symbol": "symbol",
            "object": "Object",
            "array": "Array",
            "function": "Function"
          },
          "requireReturn": false,
          "matchDescription": ".+"
        }
      ]
    }
  }
  