const shell = require('shelljs');
import * as log from 'great-logs';

import { readdirSync, readFileSync, writeFileSync } from 'fs';

const UTF8_ENCODING = 'utf8';

export const WSPECS_CONFIG_GIT_PROJECT =
  'https://github.com/wspecs/wspecs-configs.git';

export const CONFIG_PATH = `${getHomeFolder()}/wspecs-configs/configs`;

export const DOMAIN_FOLDER = '/srv/www';

const MAKE_DOCKER_COMPOSE = (specs: any) => `version: "3.1"

services:
  ${specs.name}:
    image: ${specs.docker}
    container_name: ${specs.name}
    restart: always
    expose:
      - 80
      - 443
    ports:
      - "${specs.port}:${specs.port}"
    environment:
      - VIRTUAL_HOST=${specs.domain}
      - VIRTUAL_PORT=${specs.port}
      - LETSENCRYPT_HOST=${specs.domain}
      - LETSENCRYPT_EMAIL=${specs.email || 'swendlex2014@gmail.com'}

networks:
  default:
    external:
      name: nginx-proxy
`;

function getHomeFolder() {
  log.info('Going to home folder');
  return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
}

export function cloneGit(gitUrl: string) {
  log.info('Cloning project for: %s', gitUrl);
  shell.rm('-rf', getCloneFolder(gitUrl));
  shell.cd('~');
  shell.exec(`git clone ${gitUrl}`);
}

export function getCloneFolder(gitUrl: string) {
  const gitName = gitUrl
    .substring(gitUrl.lastIndexOf('/') + 1)
    .replace('.git', '');
  return `${getHomeFolder()}/${gitName}`;
}

export function goToGitFolder(gitUrl: string) {
  shell.cd(getCloneFolder(gitUrl));
}

export function installNodeDependencies() {
  shell.exec('npm install');
}

export function buildNodeProject() {
  shell.exec('npm run build');
}

export function buildDocker(imageName: string) {
  shell.exec(`sudo docker build -t ${imageName} .`);
  shell.exec(
    `docker images | grep none | awk '{ print $3; }' | xargs docker rmi`
  );
}

export function createDomainFolder(domain: string) {
  shell.mkdir('-p', `${DOMAIN_FOLDER}/${domain}`);
}

export function goToDomainFolder(domain: string) {
  shell.cd(`${DOMAIN_FOLDER}/${domain}`);
}

export function composeDocker(specs: any) {
  return MAKE_DOCKER_COMPOSE(specs);
}

export function startDockerProject() {
  shell.exec('sudo docker-compose up -d');
  shell.exec('sudo docker-compose restart');
}

export function fetchAndInstallApps(bucketName: string) {
  cloneGit(WSPECS_CONFIG_GIT_PROJECT);
  const bucketFolder = `${CONFIG_PATH}/${bucketName}`;
  const files = readdirSync(bucketFolder);
  for (const file of files.filter(x => x.endsWith('.json'))) {
    const content = readFileSync(`${bucketFolder}/${file}`, UTF8_ENCODING);
    const specs = JSON.parse(content);
    if (specs.git) {
      cloneGit(specs.git);
      goToGitFolder(specs.git);
      installNodeDependencies();
      buildNodeProject();
      if (specs.docker && specs.port && specs.domain) {
        buildDocker(specs.docker);
        createDomainFolder(specs.domain);
        goToDomainFolder(specs.domain);
        writeFileSync(
          `${DOMAIN_FOLDER}/${specs.domain}/docker-compose.yml`,
          composeDocker(specs),
          UTF8_ENCODING
        );
        startDockerProject();
      }
    }
  }
}
