const fs = require('fs');
const path = require('path');

const ROOT = '.';
const EXCEPT_DIRS = ['node_modules', 'bower_components'];
const ALLOWED_EXTENSIONS = ['.js', '.es6', '.vue', '.jsx'];
const NOCOMMIT_EXPRESSION = '//husky__nocommit!';

/** @param {string} fileName */
const shouldCheckFile = fileName => {
  return ALLOWED_EXTENSIONS.some(ext => fileName.endsWith(ext));
};

/** * @param {string} line */
const isNocommit = line => {
  const trimmed = line.trim();
  return trimmed === NOCOMMIT_EXPRESSION
    || (!trimmed.startsWith('//') && trimmed.endsWith(NOCOMMIT_EXPRESSION));
};

/** @param {string} fileName */
const checkFile = fileName => {
  fs.readFileSync(fileName, 'utf-8').split('\n').forEach((line, lineIndex) => {
    if (isNocommit(line)) {
      throw new Error(`Encountered "${NOCOMMIT_EXPRESSION}" at "${fileName}:${lineIndex + 1}".\n       ` +
        'You may either delete it, comment it out or use `git commit --force`.');
    }
  });
};

/** @param {string} dirName */
const checkDir = dirName => {
  fs.readdirSync(dirName).forEach((fileName) => {
    const relativeFileName = path.join(dirName, fileName);

    if (fs.statSync(relativeFileName).isDirectory()) {
      if (EXCEPT_DIRS.indexOf(relativeFileName) === -1) {
        checkDir(relativeFileName);
      }
    } else if (shouldCheckFile(relativeFileName)) {
      checkFile(relativeFileName);
    }
  });
};

checkDir(ROOT);

