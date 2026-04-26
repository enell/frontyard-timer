// Initial CSS build before starting watchers
const cssBuild = Bun.spawn(
	[
		"bunx",
		"@tailwindcss/cli",
		"-i",
		"./src/index.css",
		"-o",
		"./src/styles.css",
	],
	{ stdout: "inherit", stderr: "inherit" },
);
const cssExitCode = await cssBuild.exited;
if (cssExitCode !== 0) process.exit(cssExitCode);

// Start both watchers
const cssWatcher = Bun.spawn(
	[
		"bunx",
		"@tailwindcss/cli",
		"-i",
		"./src/index.css",
		"-o",
		"./src/styles.css",
		"--watch",
	],
	{ stdout: "inherit", stderr: "inherit" },
);
const jsWatcher = Bun.spawn(
	[
		"bun",
		"build",
		"--target=browser",
		"./index.html",
		"--outdir=dist",
		"--watch",
	],
	{ stdout: "inherit", stderr: "inherit" },
);

// When either watcher exits (crash or signal), kill the sibling and propagate the exit code
const exitCode = await Promise.race([
	cssWatcher.exited.then((code) => {
		jsWatcher.kill();
		return code;
	}),
	jsWatcher.exited.then((code) => {
		cssWatcher.kill();
		return code;
	}),
]);

process.exit(exitCode);
