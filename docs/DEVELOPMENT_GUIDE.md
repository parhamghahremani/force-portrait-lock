# Development Guide — Force Portrait Lock

## Editing the Script

### Direct Edit (Recommended)

Edit `force-portrait-lock.user.js` directly in the project root. No build step required.

```bash
# Open in editor
code D:\Desktop\project\scripts\force-portrait-lock\force-portrait-lock.user.js
```

### Version Bumping

Update `@version` in the metadata block:
```javascript
// @version      2.0.1
```

Update `CHANGELOG.md` with new entry under `## [Unreleased]`.

### Testing Locally

1. Open `force-portrait-lock.user.js` in text editor
2. Copy entire content
3. In Tampermonkey dashboard, create new script
4. Paste content, save
5. Test in Firefox Desktop / Firefox Android

## Backup Procedure

### Before Changes (Pre-Change Snapshot)

```bash
# From project root
powershell -Command "Compress-Archive -Path * -DestinationPath backups/pre-change/force-portrait-lock-pre-$(Get-Date -Format 'yyyyMMdd-HHmmss').zip -Exclude backups/,.git/,node_modules/,dist/ -Force"
```

### After Stable Milestone (Full Snapshot + Release)

```bash
# Full snapshot
powershell -Command "Compress-Archive -Path * -DestinationPath backups/full-snapshots/force-portrait-lock-full-$(Get-Date -Format 'yyyyMMdd-HHmmss').zip -Exclude backups/,.git/,node_modules/,dist/ -Force"

# Release ZIP (source + docs only)
powershell -Command "Compress-Archive -Path force-portrait-lock.user.js,README.md,CHANGELOG.md,CLAUDE.md,PROJECT_STATUS.md,docs/* -DestinationPath backups/releases/force-portrait-lock-v2.0.0.zip -Force"

# Git bundle
git bundle create backups/git-bundles/force-portrait-lock-v2.0.0.bundle --all

# Verify bundle
git bundle verify backups/git-bundles/force-portrait-lock-v2.0.0.bundle

# Checksums
Get-FileHash -Algorithm SHA256 backups/releases/force-portrait-lock-v2.0.0.zip
Get-FileHash -Algorithm SHA256 backups/git-bundles/force-portrait-lock-v2.0.0.bundle
```

Record all paths and checksums in `backups/BACKUP_MANIFEST.md`.

## Release Process

1. Complete implementation and documentation updates
2. Run manual test checklist (see `MANUAL_TEST_PLAN.md`)
3. Create pre-change backup (if not already done)
4. Create full snapshot, release ZIP, Git bundle
4. Verify all backups and checksums
5. Update `PROJECT_STATUS.md` with new version
6. Commit changes with conventional message:
   ```bash
   git add .
   git commit -m "chore: release v2.0.1"
   git tag v2.0.1
   ```
7. Present to user for manual test approval
8. After approval: push to GitHub
   ```bash
   git push origin main --tags
   ```

## Git Workflow

```bash
# Check status
git status

# Stage changes
git add .

# Commit (English, conventional)
git commit -m "feat: add orientation change re-lock"

# Tag version
git tag v2.0.1

# Push (only after user approval)
git push origin main --tags
```

## Project Structure

```
force-portrait-lock/
├── force-portrait-lock.user.js          # Main script (edit this)
├── README.md                            # User-facing documentation
├── CHANGELOG.md                         # Version history
├── CLAUDE.md                            # This guide + project rules
├── PROJECT_STATUS.md                    # Current state tracking
├── .gitignore                           # Git exclusions
├── docs/
│   ├── SPECIFICATION.md                 # Requirements & acceptance
│   ├── ARCHITECTURE.md                  # Code structure & data flow
│   ├── DEVELOPMENT_GUIDE.md             # This file
│   ├── CONFIGURATION_AND_PERMISSIONS.md # Metadata, grants
│   ├── COMPATIBILITY.md                 # Browser support matrix
│   ├── MANUAL_TEST_PLAN.md              # Test steps & results
│   ├── DEVELOPMENT_LOG.md               # Milestones & issues
│   ├── DECISIONS.md                     # Technical decisions
│   ├── KNOWN_ISSUES.md                  # Bugs & workarounds
│   └── REFERENCES.md                    # External docs
├── backups/
│   ├── imported-original/               # Immutable original import
│   ├── pre-change/                      # Before each change batch
│   ├── full-snapshots/                  # Complete project snapshots
│   ├── releases/                        # Release ZIPs
│   ├── git-bundles/                     # Git history bundles
│   ├── checksums/                       # SHA-256 files
│   └── BACKUP_MANIFEST.md               # Backup index
└── .git/                                # Local repository
```

## Common Tasks

### Adding a New Fallback API

1. Add to `tryLegacyLock()` in priority order
2. Add corresponding unlock in `unlockOrientation()`
3. Update `ARCHITECTURE.md` compatibility matrix
4. Update `SPECIFICATION.md` behavior spec
5. Test on target browser

### Adjusting Cooldown

Change `LOCK_COOLDOWN` constant (ms):
```javascript
const LOCK_COOLDOWN = 500; // Increase if too aggressive
```

### Adding New Fullscreen Event

Add to `events` array in initialization:
```javascript
const events = [
    'fullscreenchange',
    'mozfullscreenchange',
    'webkitfullscreenchange',
    'MSFullscreenChange',
    'newvendorchange'  // Add here
];
```

## Debugging

Enable verbose logging by changing `LOG` constant or adding more `console.log` calls.

Check browser console for `[PortraitLock]` prefix messages.

Common issues:
- **Not locking**: Check if `screen.orientation` API exists, check cooldown
- **Double locking**: Cooldown may be too short
- **Not unlocking**: Verify `unlockOrientation()` is called on exit
- **Iframe issues**: Cross-origin iframes block orientation API (browser limitation)