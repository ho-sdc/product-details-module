const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

module.exports = (serverCount) => {
  let createInstancesFile = fs.createWriteStream(path.resolve(__dirname, 'createInstances.json'));
  const createProcess = spawn("aws", ["ec2", "run-instances", "--user-data", `file://${path.resolve(__dirname, 'startup.sh')}`, "--launch-template", "LaunchTemplateName=product-details-docker-v3", "--count", serverCount]);
  let createPipe = createProcess.stdout.pipe(createInstancesFile);
  return new Promise((resolve, reject) => {
    createPipe.on('finish', resolve);
    createPipe.on('error', reject);
  }).then(() => {
    let instances = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'createInstances.json'))).Instances;
    return instances.map(instance => instance.InstanceId);
  });
};
