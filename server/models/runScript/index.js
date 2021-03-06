const UUID = require('uuid').v4;
const fork = require('child_process').fork;
const EventEmitter = require('events');

class RunScript extends EventEmitter {
  constructor(scriptPath, windowId) {
    super();
    this.scriptPath = scriptPath;
    this.windowId = windowId;
    this.runId = UUID();
  }

  terminate() {
    this.fp.kill('SIGINT');
  }

  run(args) {
    this.fp = fork(this.scriptPath, args, { silent: true });
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

module.exports = RunScript;
