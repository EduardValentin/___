# React starter kit.

Packed full of goodies such as:
 - React (duh!)
 - Redux with react-redux, redux-actions, redux-thunk.
 - Boostrap and font-awesome with sass
 - React-redux-router
 - Fetch polyfill
 - Ramda as a functional utility library (don't let me catch any of you using lodash or underscore)

USAGE:
  1 clone this repo
  2 run yarn install
  3 run yarn start
  4 navigate to http://localhost:8080
  5 experience extreme joy

Other commands:
  - npm prod-build : generate production build
  - npm deploy : custom deploy task; uses rsync to push files on server; make sure to config ssh and change the task from package.json to suit your needs.

## Extra Documentation 

  * [What component should I use?](https://wiki.sparktech.ro/doku.php?id=devteams:frontend_adi:react_components)
  * [IE 11 issues](https://wiki.sparktech.ro/doku.php?id=development:ie11issues)
  * [Useful links](https://wiki.sparktech.ro/doku.php?id=devteams:frontend_adi:useful_links)

  ## Notes, guidelines, tips and tricks:
  - Use functional programming concepts as much as possible(https://drboolean.gitbooks.io/mostly-adequate-guide/content/)
    - prefer use of stateless functions as React components: https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components
    - use pure functions: https://en.wikipedia.org/wiki/Pure_function
    - favor composition over inheritance: http://ramdajs.com/docs/#compose
    - prefer free point programming style: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html#pointfree
  - Use `//husky__nocommit!` at the end of the lines you want to remove before the code is commited (local configs, temporal state changes etc.). An exception will be thrown indicating the filepath and the line number where the comment is found.
  - Style folder structure is explained into these guidelines -> https://gitlab.sparktech.ro/react-kit/react-kit/wikis/Style-guidelines

  ## Troubleshooting
  * If webpack isn't reloading on change on Ubuntu make sure to run this: `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
`