const clean = require('./clean')

const SEED_TYPE = process.argv[2]

function init() {
  switch (SEED_TYPE) {
    case 'clean':
      clean()
      break;
  }
}

init()