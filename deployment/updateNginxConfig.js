const fs = require('fs');

module.exports = () => {
  let currentNginx = fs.readFileSync(path.resolve(__dirname, 'nginx.conf'));
  let newNginx = `${currentNginx.slice(0, -1)}
   
  ${ips.map(ip => 'server ' + ip + ':3000;').join('\n')}
}`;
  fs.writeFileSync(path.resolve(__dirname, 'nginx.conf'), newNginx);
};