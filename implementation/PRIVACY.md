# Privacy and data boundary

This prototype is designed for synthetic text only. It is not approved to collect research or real private data.

## Collected locally

- Manual anchor status: `found`, `unsure`, or `skipped`.
- Optional text drafts and committed text notes.
- Local timestamps, note revision number, selected synthetic anchor, and stop state.
- Up to 30 committed observation snapshots for correction and undo.
- A light or dark theme preference under a separate local key.

## Not collected

- Account or identity.
- GPS, coordinates, route trace, distance, or arrival verification.
- Camera, photographs, audio, microphone, or bystander data.
- Analytics, telemetry, crash reports, remote logs, or session replay.
- Server, cloud sync, model, map tile, or third-party API data.

## Storage reality

Session data is stored unencrypted in the current browser profile under `osk.synthetic-session.v1`. Browser extensions, another person using the same profile, device access, browser clearing, or local compromise can expose or remove it. “Local” does not mean anonymous, encrypted, or backed up.

Drafts are separate from committed recap content. Save failure leaves the draft on screen and blocks a false committed result. Every write compares the last observed raw envelope and every external session-key event pauses the stale tab. This is still best effort because Web Storage has no atomic compare-and-swap.

Deleting the storage key notifies other open tabs, but those tabs can retain an in-memory copy until they load the deletion, close, or navigate away. They may still explicitly create a recovery export from that memory. The prototype therefore does not claim cross-tab secure erase.

Malformed, old-release, fingerprint-mismatched, or unknown-anchor storage is never restored as a normal session. A recovery export can return a schema-valid old envelope without current fixture metadata or recap. Corrupt raw storage can be downloaded only inside an explicit unvalidated recovery wrapper; it is not rendered as HTML or interpreted as evidence.

## Export

Export creates a JSON download with synthetic provenance and retained correction snapshots. The app cannot know where the browser saved it, cannot update it, and cannot delete it later.

The save-failure recovery action can copy the current note to the system clipboard. Clipboard contents are outside the app namespace and may be visible to other apps or device-sync services. This app cannot inspect or delete those copies; the UI discloses that boundary beside the action.

## Delete

Delete removes the session namespace and verifies that its key reads back as absent before clearing UI state. It removes current text, drafts, statuses, retained snapshots, and recovery state from this app key. It does not provide secure erase and cannot remove:

- files already downloaded;
- browser or device backups outside the app;
- screenshots or traces created by the user;
- unrelated browser data or the separate theme preference.

No real private data should be entered, even though local delete is implemented and tested.
