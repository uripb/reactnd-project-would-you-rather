module.exports = {
  root: true,
  parser: "babel-eslint",
  env: {
    browser: true
  },
  plugins: ["react", "jsx-a11y", "import"],
  extends: ["airbnb"],
  settings: {
    "import/resolve": {
      moduleDirectory: ["node_modules", "src", "src/js", "src/js/components"]
    }
  },
  rules: {
    "import/no-unresolved": 0,
    "import/no-extraneous-dependencies": 0,
    "import/prefer-default-export": 0,
    "no-debugger": 0,
    "jsx-a11y/label-has-for": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "no-param-reassign": ["error", { props: false }],
    "react/jsx-no-bind": [
      2,
      {
        allowArrowFunctions: true
      }
    ],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }]
  }
};
