/** Drafts (unapproved or placeholder content) show in dev and deploy previews only.
 *  __SHOW_DRAFTS__ is a build-time constant (vite.config.ts), so drafts are
 *  removed from the production bundle rather than merely hidden. */
export const SHOW_DRAFTS: boolean = __SHOW_DRAFTS__;
