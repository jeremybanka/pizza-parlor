## _Pizza Parlor by Jeremy Banka_

**❓ Looking for test documentation?** Just check the test/ folder!

_Live on [Github Pages](https://jeremybanka.github.io/pizza-parlor)_


## Technologies Used

* 📄 HTML5
* 💅 SASS ➡️ CSS3
* ▶️ ES6 🛠 Airbnb ESLint (thanks to VS Code ext. ESLint by Dirk Baeumer)
* 💲 jquery 3.6.0
* ❓ jest 26.6.3
* 📦 Webpack 5 for bundling my js modules.
* 👨🏻‍🎨 Adobe Illustrator (comps/planning)
* 🅰️ Fonts and Icons by me using Georg Seifert's _superb_ 💚[Glyphs.app](https://glyphsapp.com)💚

## Description

Customize your pizza!

Choose from among such toppings as:
* Onion
* Razor Blades
* Pepperoni
* and several others!

Get a fair price specific to your choices.

Get a description and SPECIAL NAME unique to your very own tasty pizza.

## Setup/Installation Requirements

#### First Things First
* Clone this repo: `git clone https://github.com/jeremybanka/pizza-parlor`
* `$ npm i`
* `$ npm run build`
* Open `index.html` in your favorite web browser

#### ESLint Tooling
* Use VS Code.
* Install VS Code extension "ESLint" by Dirk Baeumer.
* In the project's root folder, run `npm i` to install required dev dependencies.
* Ensure that your VS Code settings.json has the following properties set:
  + `"editor.codeActionsOnSave": { "source.fixAll.eslint": true } `
  + ` "[javascript]": { "editor.formatOnSave": false },`
* Now, my meticulously selected formatting preferences will be applied to files in this repo any time you hit save!

#### Webpack Tooling
* In the project's root folder, run `npm i` to install required dev dependencies.
* Then run `npm start` to apply your changes live as you edit.

## Known Bugs

* adding multiple pizzas, then deleting one, then editing the other currently causes a crash.

## License

This software is licensed under GPL 3.0.

## Contact Information

hello at jeremybanka dot com