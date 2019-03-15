const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');


module.exports = (ids) => {
  const describeProcess = spawn("aws", ["ec2", "describe-instances", "--filter", `Name=instance-id,Values=${ids.toString()}`]);
  let describeInstances = fs.createWriteStream(path.resolve(__dirname, 'describeInstances.json'));
  let describePipe = describeProcess.stdout.pipe(describeInstances);
  return new Promise((resolve, reject) => {
    describePipe.on('finish', resolve);
    describePipe.on('error', reject);
  }).then(() => {
    let instances = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'describeInstances.json'))).Reservations[0].Instances;
    return instances.map(instance => instance.NetworkInterfaces[0].PrivateIpAddresses[0].Association.PublicIp);
  });
};