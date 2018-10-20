
/**
 * Git pre-commit hook
 * Checks staged files for eslint errors
 * https://cdn-images-1.medium.com/max/1600/1*wjsbeBicpTWF-UHXn19ZbQ.jpeg
 */
const { exec } = require('child_process');
const fs = require('fs');

const CLIENT_DIR_NAME = 'client'; // this may be different based on your project's client folder name

/**
 * Husky pre-commit hooks are run by default from the client folder (or where package.json is).
 * If the client folder is not the root folder of the git repo,
 * the __dirname will end with '/client' or whatever your CLIENT_DIR_NAME constant is.
 * We want GIT_ROOT without the '/client' sufix, if that exists. Below regex does that.
 */
const GIT_ROOT = __dirname.replace(new RegExp(`/${CLIENT_DIR_NAME}$`), '');

// Navigate to the git repo root path, and run git diff command only on .js/jsx files
const LIST_STAGED_COMMAND = `cd ${GIT_ROOT} && git diff --cached --name-only | grep -E '.(js|jsx)$'`;

/**
 * @param {string} stdoutOutput
 * By default git diff returns a string containing staged files.
 * Each file name is relative to the GIT_ROOT path.
 * Each file is separated by '\n'.
 * */
const createFilesArray = stdoutOutput => {
  const arrayOfFiles = stdoutOutput.split('\n');

  // the last element is always an empty string
  arrayOfFiles.pop();
  return arrayOfFiles;
};

exec(LIST_STAGED_COMMAND, (error, stdout) => {
  if (error !== null) {
    /**
     * Case in which GIT_ROOT doesn't point to a git repo.
     * This will allow the commit to be done anyway.
     */
    return;
  }

  const files = createFilesArray(stdout);

  files.forEach(file => {
    /**
     * All files are prefixed with the CLIENT_DIR_NAME/,
     * if client is not the root of the git repository.
     */
    file = `${GIT_ROOT}/${file}`;

    // Case for deleted files
    if (!fs.existsSync(file)) {
      return;
    }

    /**
     * Run linter on each file,
     * if linter returns errors on one file, throw error to stop the commit.
     * --quiet ignores eslint warnings.
     */
    exec(`node_modules/.bin/eslint ${file} --quiet`, (error, stdout) => {
      if (stdout !== '') {
        // Show eslint error
        throw new Error(stdout);
      } else if (error) {
        // Case in which path to a specific file can't be found
        throw new Error(`Something went wrong with checking linter on file ${file}: \n${error}`);
      }
    });
  });
});
