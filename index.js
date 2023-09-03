const inquirer = require('inquirer');
const figlet = require("figlet");
const prompts = require('./lib/prompts.js')


// adds a banner at the start
console.log(
    figlet.textSync("EMPLOYEE \n TRACKER", {
      font: "standard",
      horizontalLayout: "fitted",
      verticalLayout: "fitted",
      whitespaceBreak: true,
    })
  );

prompts();