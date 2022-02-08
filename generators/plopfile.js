const config = plop => {
  // controller generator
  plop.setGenerator('Component', {
    description: 'Create a component and insert it in a index export',
    prompts: [
      {
        type: 'list',
        name: 'typeOfCreation',
        message: 'What type of component you want create?',
        choices: ['Atom', 'Molecule', 'Organism']
      },
      {
        type: 'input',
        name: 'name',
        message: 'Choose an name:'
      }
    ],
    actions: data => {
      const actions = [];
      const typeOfComponent = data.typeOfCreation;

      // create component files
      actions.push({
        type: 'add',
        path: `../src/Components/${typeOfComponent}/{{dashCase name}}/index.tsx`,
        templateFile: 'templates/index.tsx.hbs'
      });
      actions.push({
        type: 'add',
        path: `../src/Components/${typeOfComponent}/{{dashCase name}}/{{lowerCase name}}DTO.ts`,
        templateFile: 'templates/interfaces.ts.hbs'
      });
      actions.push({
        type: 'add',
        path: `../src/Components/${typeOfComponent}/{{dashCase name}}/styles.ts`,
        templateFile: 'templates/styles.ts.hbs'
      });

      // insert component export in index.ts
      actions.push({
        path: `../src/Components/${typeOfComponent}/index.ts`,
        pattern: /(\/\/ COMPONENT IMPORTS - PLOP)/g,
        template: "import { {{pascalCase name}} } from './{{dashCase name}}';\n$1",
        type: 'modify'
      });
      actions.push({
        path: `../src/Components/${typeOfComponent}/index.ts`,
        pattern: /(\/\/ COMPONENT EXPORTS - PLOP)/g,
        template: '\t{{pascalCase name}},\n$1',
        type: 'modify'
      });

      return actions;
    }
  });
};

module.exports = config;
