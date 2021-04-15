## _Pizza Parlor by Jeremy Banka_

**❓ Looking for test documentation?** Just check the test/ folder!

_Live on [Github Pages](https://jeremybanka.github.io/pizza-parlor)_

## Technologies Used

- 📄 HTML5
- 💅 SASS ➡️ CSS3
- ▶️ ES6 🛠 Airbnb ESLint (thanks to VS Code ext. ESLint by Dirk Baeumer)
- 💲 jquery 3.6.0
- ❓ jest 26.6.3
- 📦 Webpack 5 for bundling my js modules.
- 👨🏻‍🎨 Adobe Illustrator (comps/planning)
- 🅰️ Fonts and Icons by me using Georg Seifert's _superb_ 💚[Glyphs.app](https://glyphsapp.com)💚

## Description

Customize your pizza!

Choose from among such toppings as:

- Onion
- Razor Blades
- Pepperoni
- and several others!

Get a fair price specific to your choices.

Get a description and SPECIAL NAME unique to your very own tasty pizza.

## Setup/Installation Requirements

_This project is kinda weird._ Basically, I made a single-page app, which is easy with a framework like React, but somehow possible with jQuery, stubbornness and a lot of elbow grease. You'll notice that src/index.html is basically empty. Purposeful!

That's because all the HTML gets appended by jQuery. Interface is a function of my object-oriented state machine, and simply gets disposed and re-rendered on every click. I don't really recommend doing this, but I don't recommend using jQuery in general, so what the heck!

- Clone this repo: `$ git clone https://github.com/jeremybanka/pizza-parlor`
- Get things installed: `$ npm i`
- Get things built: `$ npm run start`
- This should prompt your browser to open the project on 8080. It's actually pointed at the dist folder, and will update live.

#### ESLint/Prettier Tooling

- Use VS Code.
- Install VS Code extension "ESLint" by Dirk Baeumer.
- Install VS Code extension "Prettier"
- Ensure that your VS Code settings.json has the following properties set:
  ```
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
  ```
- Now, my meticulously selected formatting preferences will be applied to files in this repo any time you hit save!

## Known Bugs

- none

## License

This software is licensed under GPL 3.0.

## Contact Information

hello at jeremybanka dot com
