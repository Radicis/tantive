const RunScript = require('../runScript');
const EventEmitter = require('events');

class RunningScripts extends EventEmitter {
  constructor() {
    super();
    this.runningScripts = {};
  }

  addRun(path, windowId) {
    const newRun = new RunScript(path, windowId);
    const { runId } = newRun;
    this.runningScripts[runId] = newRun;
    this.emit('init', newRun);
    return newRun;
  }

  terminate(runId) {
    try {
      this.runningScripts[runId].terminate();
    } catch (e) {
      // fail silently
    }
    delete this.runningScripts[runId];
  }

  terminateAll() {
    for (const runId in this.runningScripts) {
      try {
        this.runningScripts[runId].terminate();
      } catch (e) {
        // fail silently
      }
      delete this.runningScripts[runId];
    }
  }

  run(runId, args) {
    const run = this.runningScripts[runId];
    run.run(args);
  }
}

module.exports = new RunningScripts();
