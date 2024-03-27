module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["airbnb", "airbnb/hooks", "prettier"],
  plugins: ["react", "react-hooks"],
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      babelrc: false,
      configFile: false,
      // your babel options
      presets: ["@babel/preset-react"]
    }
  },
  rules: {
    "no-console": 0,
    "react/react-in-jsx-scope": 0,
    "react/jsx-props-no-spreading": 0,
    "no-await-in-loop": 0,
    "arrow-body-style": 0,
    "no-plusplus": 0,
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "no-use-before-define": [
      "error",
      {
        functions: false,
        classes: true,
        variables: true,
        allowNamedExports: false
      }
    ],
    "import/extensions": ["error", "ignorePackages"]
  }
}
