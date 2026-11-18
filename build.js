/**
 * Build script for Force Portrait Lock
 * Creates versioned releases in versions/ folder
 */

import fs from "fs";
import path from "path";

const SRC_FILE = "force-portrait-lock.user.js";
const VERSIONS_DIR = "versions";
const DIST_DIR = "dist";

function readVersion() {
    const content = fs.readFileSync(SRC_FILE, "utf-8");
    const match = content.match(/@version\s+([\d.]+)/);
    return match ? match[1] : "0.0.0";
}

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function build() {
    const version = readVersion();

    ensureDir(VERSIONS_DIR);
    ensureDir(DIST_DIR);

    const content = fs.readFileSync(SRC_FILE, "utf-8");

    // Create versioned release (flat naming like other projects)
    const versionedFile = path.join(VERSIONS_DIR, `v${version}.user.js`);
    fs.writeFileSync(versionedFile, content);
    console.log(`Created versioned release: ${versionedFile}`);

    // Create dist file (latest)
    const distFile = path.join(DIST_DIR, "force-portrait-lock.user.js");
    fs.writeFileSync(distFile, content);
    console.log(`Created dist file: ${distFile}`);

    // Update download/update URLs in dist file to point to versioned release
    let distContent = content
        .replace(
            /@downloadURL\s+.*/,
            `@downloadURL  https://github.com/parhamghahremani/userscripts/raw/main/force-portrait-lock/versions/v${version}.user.js`
        )
        .replace(
            /@updateURL\s+.*/,
            `@updateURL    https://github.com/parhamghahremani/userscripts/raw/main/force-portrait-lock/versions/v${version}.user.js`
        );

    fs.writeFileSync(distFile, distContent);
    console.log(`Updated dist file with versioned URLs`);

    console.log(`\nBuild complete! Version: ${version}`);
    console.log(`Files:`);
    console.log(`  - ${versionedFile}`);
    console.log(`  - ${distFile}`);
}

build();