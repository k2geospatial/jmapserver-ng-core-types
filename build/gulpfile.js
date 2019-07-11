/**
 * @author : Laurent Mignonat
 * @copyright (c) 2004-2019 K2 Geospatial, Inc. All Rights Reserved.
 */
const path = require('path')
const join = path.join // shortcut
const fs = require('fs')
const gulp = require('gulp')
const execSync = require('child_process').execSync
const typedoc = require("gulp-typedoc")

// __dirname is the directory witch contains the gulpfile.js file
const ROOT_DIR = join(__dirname, '..')
const DOC_ROOT_DIR = join(__dirname, '../docs')
const SRC_DIR = join(ROOT_DIR, '/src/public')

const packageJSON = JSON.parse(fs.readFileSync("../package.json"))
let newNpmVersion = packageJSON.version

console.log('Directories :')
console.log(`  Doc dir  => ${DOC_ROOT_DIR}`)
console.log(`  Src dir => ${SRC_DIR}`)

/************************************* PUBLISH ************************************/

gulp.task('publish-npm', cb => {
  // execSync(`npm publish`, { cwd: ROOT_DIR })
  console.log(`NPM version="${newNpmVersion}" published`)
  cb()
})

/*********************************** COMMIT ************************************/

gulp.task('commit', cb => {
  console.log("TODO COMMIT")
  execSync(`git add .`, { cwd: ROOT_DIR })
  execSync(`git commit -m "Publish version '${newNpmVersion}' of documentation"`, { cwd: ROOT_DIR })
  execSync(`git push`, { cwd: ROOT_DIR })
  console.log(`Documentation commited`)
  cb()
})

/******************************** DOCUMENTATION ********************************/

// https://typedoc.org/api/
gulp.task("typedoc", cb => {
  // TODO check if doc folder already exist and throw error if yes
  return gulp
      .src([
        "../public/**/*.ts"
      ])
      .pipe(typedoc({
          readme: "./public-doc-readme.md",
          mode: "file",
          excludeExternals: true,
          excludePrivate: true,
          tsconfig: "./tsconfig.json",
          includeDeclarations: true,
          out: join(DOC_ROOT_DIR, `v${newNpmVersion}`),
          name: "jmap-api",
          hideGenerator: true,
          version: false,
          ignoreCompilerErrors: false,
      }))
})

/********************************** PUBLIC TASKS **********************************/

// Main task, the only task that should be call
gulp.task('publish', gulp.series('typedoc', 'commit', 'publish-npm'))

gulp.task('default', gulp.series('publish'))
