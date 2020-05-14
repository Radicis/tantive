const UUID = require('uuid').v4;
const fs = require('fs');
const fork = require('child_process').fork;
const { join } = require('path');
const EventEmitter = require('events');

const scriptRootPath = join(__dirname, 'scripts');

class RunString extends EventEmitter {
  constructor(scriptString) {
    super();
    this.scriptPath = join(scriptRootPath, 'tmp', `${UUID()}.js`);
    fs.writeFileSync(this.scriptPath, scriptString);
    this.runId = UUID();
  }

  terminate() {
    this.fp.kill('SIGINT');
    try {
      fs.unlinkSync(this.scriptPath);
    } catch (e) {
      // ignore
    }
  }

  run() {
    this.fp = fork(this.scriptPath, [], { silent: true });
    if (!this.fp && this.fp.stdout) {
      this.emit('error');
    } else {
      this.fp.stdout.on('data', (data) => {
        this.emit('message', data.toString());
      });
      this.fp.on('error', (data) => {
        this.emit('error', data);
      });
      this.fp.on('exit', (code) => {
        this.emit('message', `Process exited with code ${code || 'SIGINT'}`);
        this.emit('exit', code);
      });
    }
  }
}

module.exports = RunString;
