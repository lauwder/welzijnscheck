# Welzijnscheck

Installable web app (PWA). Everything runs in the browser; no data leaves the device.

## Files

    index.html               the app
    manifest.webmanifest     name, icon, full-screen mode
    sw.js                    service worker: offline use
    xlsx.full.min.js         SheetJS, loaded only when someone exports to Excel
    icon-*.png, apple-touch-icon.png
    fonts/                   fonts served locally (nothing is loaded from Google)
    .nojekyll                tells GitHub Pages to publish the files as-is

## Publish on GitHub Pages (one time, ~5 minutes)

1. Sign in at github.com, click **+ → New repository**. Name it `welzijnscheck`,
   keep it **Public** (required for free Pages), tick *Add a README file*, create it.
2. Click **Add file → Upload files**, drag the *contents* of this folder in
   (all files plus the `fonts` folder; `.nojekyll` is hidden, show hidden files first),
   then **Commit changes**. Replace the README if asked.
3. **Settings → Pages**: Source *Deploy from a branch*, branch *main*, folder */ (root)*, Save.
4. After a minute the settings page shows your address:
   `https://<username>.github.io/welzijnscheck/` — that is the link for the email.

## Updating later

Replace the changed files and raise `VERSION` in `sw.js` (`v1` → `v2`).
Installed copies refresh on their next open with internet.

## What users see

- Android: a banner with **Installeer als app**; one tap adds the icon.
- iPhone/iPad: a banner explaining *Delen → Zet op beginscherm* (Apple offers no one-tap install).
- Installed, the app opens full screen and works offline.
- **Exporteer naar Excel** (visible once there is a check-in) makes an `.xlsx` with one row per
  check-in plus a *Vragen* sheet; phones open the share sheet, desktops download.

## Privacy

Check-ins live in the browser's local storage on the device only. The site contacts no third
party. Clearing browser data or uninstalling removes the entries.
