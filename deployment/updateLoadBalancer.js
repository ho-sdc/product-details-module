const path = require('path');
const node_ssh = require('node-ssh');

let LOAD_BALANCER_IP = '18.216.44.16';
let USER = 'ubuntu';
let KEY = '/Users/minasorsok/Documents/HackReactor/AWSec2.pem';


module.exports = () => {
  let ssh = new node_ssh();
  return ssh.connect({
    host: LOAD_BALANCER_IP,
    username: USER,
    privateKey: KEY
  })
    .then(() =>
      ssh.putFile(path.resolve(__dirname, 'nginx.conf'), '/home/ubuntu/nginx.conf')
    )
    .then(() => ssh.execCommand('sudo mv /home/ubuntu/nginx.conf /etc/nginx/conf.d/nginx.conf'))
    .then(() => ssh.execCommand('sudo nginx - s reload'));
};