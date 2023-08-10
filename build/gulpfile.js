/**
 * @author : Laurent Mignonat
 * @copyright (c) 2004-2019 K2 Geospatial, Inc. All Rights Reserved.
 */
const path = require("path")
const join = path.join // shortcut
const fs = require("fs")
const gulp = require("gulp")
const execSync = require("child_process").execSync

const existEnvConfigFile = fs.existsSync("env-config.js")
if (existEnvConfigFile) {
  // we'll use variables defined in this file instead of the ones defined by sys. env.
  const toCheckVariables = ["NODE_ENV", "BUILD_DIR", "COPY_DIR", "SOURCE_DIRS"]
  const envConfig = require("./env-config.js")

  toCheckVariables.forEach(variable => {
    if (envConfig.hasOwnProperty(variable)) {
      process.env[variable] = envConfig[variable]
      console.log(`"env-config.js" defined "${variable}" as "${process.env[variable]}"`)
    }
  })
  console.log("")
}

// __dirname is the directory witch contains the gulpfile.js file
const ROOT_DIR = join(__dirname, "..")
const DOC_ROOT_DIR = join(__dirname, "../docs")
const SRC_DIR = join(ROOT_DIR, "/public")
const packageJSON = JSON.parse(fs.readFileSync("../package.json"))
const newNpmVersion = packageJSON.version
const DOC_LATEST_DIR = join(ROOT_DIR, "./docs/latest")
const DOC_DIR = process.env.DOC_DIR ? join(ROOT_DIR, process.env.DOC_DIR) : join(DOC_ROOT_DIR, `v${newNpmVersion}`)
const SOURCE_DIRS = process.env.SOURCE_DIRS ? process.env.SOURCE_DIRS : "jmapcloud-ng-core, jmapcloud-ng"

console.log("Directories :")
console.log(`  Doc dir  => ${DOC_ROOT_DIR}`)
console.log(`  Src dir => ${SRC_DIR}`)

/************************************** COPY **************************************/

gulp.task("copy", cb => {
  if (!process.env.COPY_DIR) {
    throw Error("Missing COPY_DIR env variable. Ex : set COPY_DIR='/Users/jdoe/Desktop/'")
  }
  const sourceDirs = SOURCE_DIRS.split(",").map(s => s.trim())
  for (const sourceDir of sourceDirs) {
    console.info(`Copy core files in "${join(process.env.COPY_DIR, `${sourceDir}`)}"`)
    gulp
      .src([join(ROOT_DIR, "public/**/*")])
      .pipe(gulp.dest(join(process.env.COPY_DIR, `${sourceDir}/node_modules/jmapcloud-ng-core-types/public`)))
    gulp
      .src([join(ROOT_DIR, "index.ts")])
      .pipe(gulp.dest(join(process.env.COPY_DIR, `${sourceDir}/node_modules/jmapcloud-ng-core-types`)))
    gulp
      .src([join(ROOT_DIR, "all-enums.ts")])
      .pipe(gulp.dest(join(process.env.COPY_DIR, `${sourceDir}/node_modules/jmapcloud-ng-core-types`)))
  }
  cb()
})

gulp.task("copy-latest", () => {
  return gulp.src([join(DOC_DIR, "/**/*")]).pipe(gulp.dest(DOC_LATEST_DIR))
})

/************************************* PUBLISH ************************************/

gulp.task("publish-npm", cb => {
  execSync(`npm publish`, { cwd: ROOT_DIR })
  console.log(`NPM : version="${newNpmVersion}" has been published`)
  cb()
})

/*********************************** COMMIT ************************************/

gulp.task("commit", cb => {
  execSync(`git add .`, { cwd: ROOT_DIR })
  console.log(`GIT : all documentation files staged for commit`)
  const commitMessage = `Publish version '${newNpmVersion}' of documentation`
  execSync(`git commit -m "${commitMessage}"`, { cwd: ROOT_DIR })
  console.log(`GIT : commit done (message="${commitMessage}")`)
  execSync(`git push`, { cwd: ROOT_DIR })
  console.log(`Git : all documentation files has been committed and pushed on origin`)
  cb()
})

/******************************** DOCUMENTATION ********************************/

// https://typedoc.org/api/
// see the following for typescript language level compatibility: https://typedoc.org/guides/installation/#requirements
gulp.task("typedoc", cb => {
  console.log(`DOC : generating doc in directory "${DOC_DIR}"`)
  console.log(`DOC : file://${DOC_DIR}/index.html`)

  execSync(`cat ../public/core.d.ts ../public/jmap/*ts > ./JMap.d.ts`, { cwd: "." })
  execSync(
    `npx typedoc \\
    --readme ./public-doc-readme.md \\
    --basePath ../public \\
    --excludeExternals true \\
    --excludePrivate true \\
    --tsconfig ./tsconfig.json \\
    --out ${DOC_DIR} \\
    --name "JMap Cloud NG Core types" \\
    --hideGenerator true \\
    --version false \\
    --disableSources true \\
    --entryPoints ./JMap.d.ts \\
    --entryPointStrategy expand \\
    --navigation.fullTree true \\
    --treatWarningsAsErrors true \\
    --treatValidationWarningsAsErrors true
    `,
    { cwd: "." }
  )
  execSync(`rm ./JMap.d.ts`, { cwd: "." })
  cb()
})

/********************************** PUBLIC TASKS **********************************/

// Use it when you only want to modify the doc (but not publish)
gulp.task("commit-doc", gulp.series("typedoc", "copy-latest", "commit"))

// Main task
gulp.task("publish", gulp.series("commit-doc", "publish-npm"))

gulp.task("default", gulp.series("publish"))
