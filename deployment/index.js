const updateLoadBalancer = require('./updateLoadBalancer');
const updateNginxConfig = require('./updateNginxConfig');
const createInstances = require('./createInstances');

let NEW_SERVERS = 6;

createInstances(NEW_SERVERS)
  .then(findInstanceIPs)
  .then(updateNginxConfig)
  .then(updateLoadBalancer)
  .then(process.exit);
