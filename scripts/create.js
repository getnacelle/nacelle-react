const Enquirer = require('enquirer');
const chalk = require('chalk');
const fs = require('fs-extra');
const util = require('util');
const delay = require('delay');
const emoji = require('node-emoji');
const boxen = require('boxen');
const exec = util.promisify(require('child_process').exec);
const { Listr } = require('listr2');

const enquirer = new Enquirer();

const log = {
  info: (msg) => console.log(chalk.cyanBright(msg)),
  error: (err) => console.error(chalk.redBright(err))
};

async function promptUser() {
  log.info("Let's get your new project setup!\n");

  return enquirer
    .prompt([
      {
        type: 'select',
        name: 'projectType',
        message: 'What type of project are you creating?',
        required: true,
        initial: 0,
        choices: [
          { message: 'An NPM package' },
          { message: 'An example project' }
        ]
      },
      {
        type: 'input',
        name: 'projectDesc',
        message: 'What will your package do (short description)?',
        required: true
      }
    ])
    .then(({ projectType }) => {
      if (projectType === 'An NPM package') {
        return enquirer.prompt([
          {
            type: 'select',
            name: 'useEmotion',
            required: true,
            message: 'Do you need Emotion for CSS?',
            initial: 0,
            choices: [{ message: 'Yes' }, { message: 'No' }]
          },
          {
            type: 'snippet',
            name: 'packageName',
            message: "What's the name of your package?",
            required: true,
            template: '@nacelle/${package-name}'
          }
        ]);
      }

      return enquirer.prompt([
        {
          type: 'select',
          name: 'framework',
          require: true,
          message: 'Which React framework?',
          initial: 0,
          choices: [{ message: 'Next' }, { message: 'Gatsby' }]
        },
        {
          type: 'snippet',
          name: 'projectName',
          message: "What's the name of your project?",
          required: true,
          template: 'nacelle-${project-name}-example'
        }
      ]);
    });
}

function createProject(config) {
  return (ctx, task) =>
    task.newListr([
      {
        title: 'Validating setup',
        task: async () => {
          const folderAlreadyExists = fs.existsSync(config.projectDir);
          const projectAlreadyExists = projectExists(config);

          if (folderAlreadyExists || projectAlreadyExists) {
            throw new Error(
              `Uh oh! Looks like ${config.projectName} already exists`
            );
          }

          await delay(300);
        }
      },
      {
        title: 'Copying project files',
        enabled: () => config.projectType === 'package',
        task: async () => {
          const templatePkgName = config.useEmotion ? 'emotion' : 'default';
          const templatePath = `${config.templateDir}/package/${templatePkgName}`;
          const sharedPath = `${config.templateDir}/package/shared`;

          fs.copySync(templatePath, config.projectDir);
          fs.copySync(sharedPath, config.projectDir);

          await delay(500);
        }
      },
      {
        title: 'Copying project files',
        enabled: () => config.projectType === 'example',
        task: async () => {
          const templatePath = `${config.templateDir}/example/${config.framework}`;
          const sharedPath = `${config.templateDir}/example/shared`;

          fs.copySync(templatePath, config.projectDir);
          fs.copySync(sharedPath, config.projectDir);

          await delay(500);
        }
      },
      {
        title: 'Reconciling dependencies',
        task: async () => {
          const updatedDependencies = updatePackageJson(config);

          fs.writeFileSync(
            `${config.projectDir}/package.json`,
            updatedDependencies,
            {
              encoding: 'utf-8',
              flag: 'w'
            }
          );

          await exec(`npx prettier --write ${config.projectDir}/package.json`);
          await delay(500);
        }
      },
      {
        title: 'Creating docs',
        task: async () => {
          const docsFn =
            config.projetType === 'example'
              ? createExampleDocs
              : createPackagDocs;

          const updatedDocs = docsFn(config);

          fs.writeFileSync(`${config.projectDir}/README.md`, updatedDocs, {
            encoding: 'utf-8',
            flag: 'w'
          });

          await exec(`npx prettier --write ${config.projectDir}/README.md`);
          await delay(500);
        }
      }
    ]);
}

function projectExists(config) {
  const projectSubDir = `${config.projectType}s`;

  const packageFolders = fs
    .readdirSync(`${config.rootDir}/${projectSubDir}`, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .filter((dirent) => {
      const filePath = `${config.rootDir}/packages/${dirent.name}/package.json`;
      const hasPkgJson = fs.existsSync(filePath);

      if (!hasPkgJson) {
        return false;
      }

      const pkg = JSON.parse(fs.readFileSync(filePath));

      return pkg.name === config.projectName;
    });

  return packageFolders.length > 0;
}

function updatePackageJson(config) {
  const projectPkgPath = `${config.projectDir}/package.json`;
  const rootPkgPath = `${config.rootDir}/package.json`;
  const lernaConfigPath = `${config.rootDir}/lerna.json`;

  const projectPkg = JSON.parse(fs.readFileSync(projectPkgPath));
  const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath));
  const lernaConfig = JSON.parse(fs.readFileSync(lernaConfigPath));

  const deps = projectPkg.dependencies || {};
  const devDeps = projectPkg.devDependencies || {};
  const peerDeps = projectPkg.peerDependencies || {};

  const amendedPkg = {
    ...projectPkg,
    name: config.projectName,
    description: config.projectDesc,
    version: lernaConfig.version,
    devDependencies: reconcileDependencies(devDeps, rootPkg.devDependencies),
    peerDependencies: reconcileDependencies(peerDeps, rootPkg.devDependencies),
    dependencies: reconcileDependencies(deps, rootPkg.devDependencies)
  };

  return JSON.stringify(amendedPkg);
}

function reconcileDependencies(projectDeps, rootDeps) {
  return Object.entries(projectDeps).reduce(
    (dependencies, [dependency, version]) => {
      if (!rootDeps[dependency]) {
        return { ...dependencies, [dependency]: version };
      }

      return { ...dependencies, [dependency]: rootDeps[dependency] };
    },
    {}
  );
}

function buildConfig(answers) {
  const baseConfig = {
    rootDir: process.cwd(),
    templateDir: `${process.cwd()}/templates`,
    projectDesc: answers.projectDesc
  };

  if (answers.projectType.toLowerCase().includes('project')) {
    const { framework, projectName } = answers;
    const dirName = formatProjectName(projectName.values['project-name']);

    return {
      ...baseConfig,
      projectType: 'example',
      framework: framework === 'Next' ? 'nextjs' : 'gatsby',
      projectDir: `${baseConfig.rootDir}/examples/${dirName}`,
      projectName: projectName.result,
      dirName
    };
  }

  const { useEmotion, packageName } = answers;
  const dirName = packageName.values['package-name'];

  return {
    ...baseConfig,
    useEmotion: useEmotion === 'Yes',
    projectType: 'package',
    projectDir: `${baseConfig.rootDir}/packages/${dirName}`,
    projectName: packageName.result,
    dirName
  };
}

function capitalize(str) {
  return `${str.substring(0, 1).toUpperCase()}${str.substring(1)}`;
}

function formatProjectName(name) {
  const formattedName = name
    .toLowerCase()
    .split('-')
    .filter((str) => str !== 'with')
    .map((str) => capitalize(str))
    .join('');

  return `with${formattedName}`;
}

function createPackagDocs(config) {
  return `# ${config.projectName}

> ${config.projectDesc}

## Install

\`\`\`bash
npm i ${config.projectName}
\`\`\`

## Usage

\`\`\`tsx
import React, { FC } from 'react';
import { Button } from '@nacelle/react-components';

type Props = {};

const MyComponent: FC<Props> = () => (
  <div>
    <Button>Click Here!</Button>
  </div>
);

export default MyComponent;
\`\`\`

## License

ISC © [getnacelle](https://github.com/getnacelle)`;
}

function createExampleDocs(config) {
  return `# ${config.projectName}

> ${config.projectDesc}

## Quick Start

\`\`\`bash
npm install
npm run dev
\`\`\`

## License

ISC © [getnacelle](https://github.com/getnacelle)`;
}

function logSuccess(config) {
  console.log();
  console.log(
    `${emoji.get('tada')} Success! Created ${chalk.cyanBright(
      config.projectName
    )} at ${chalk.greenBright(config.projectDir)}`
  );
  console.log();

  const packageSuccess = `${chalk.yellowBright(
    'NPM commands for the new project:'
  )}

  ${chalk.blueBright('npm run storybook')}
    Runs storybook
  ${chalk.blueBright('npm run build')}
    Bundles the app for production
  ${chalk.blueBright('npm test')}
    Runs the unit tests in watch mode
  ${chalk.blueBright('npm run lint')}
    Lints source files
  `;

  const exampleSuccess = `${chalk.yellowBright(
    'Npm commands for the new project:'
  )}

  ${chalk.blueBright('npm run dev')}
    Runs the app in dev mode
  ${chalk.blueBright('npm run build')}
    Bundles the app for production
  ${chalk.blueBright('npm run lint')}
    Lints source files
  `;

  const successText =
    config.projectType === 'example' ? exampleSuccess : packageSuccess;

  console.log(boxen(successText, { padding: 1, borderColor: '#4464cc' }));
  console.log();
  console.log(`${emoji.get('v')}  Happy coding! ${emoji.get('coffee')}\n`);
}

async function init() {
  try {
    // await prettier.resolveConfigFile();
    await promptUser();

    console.log();

    const config = buildConfig(enquirer.answers);

    const tasks = new Listr([
      {
        title: `Creating project ${config.projectName}`,
        task: createProject(config)
      },
      {
        title: 'Bootstrapping dependencies',
        task: () => exec('npm run bootstrap')
      }
    ]);

    await tasks.run();

    logSuccess(config);
  } catch (err) {
    if (err === '') {
      return;
    }

    log.error('\n======================== Error ========================\n');
    log.error(err.message);
    log.error('\n=======================================================\n');
  }
}

init();
