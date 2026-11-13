# 3D Tech static website

Preview from this folder with `python -m http.server 8000`, then open
http://localhost:8000. Deploy the contents of this folder only.

Forms already use `https://formspree.io/f/maqrabew`; account ownership,
notification recipient and production-domain settings are checked in Formspree.
The owner reports that prior form tests worked.

The assistant runs locally in the visitor's browser using the public static
knowledge entries in `assets/js/main.js`. There is no active `/api/ask` integration.
Do not add confidential information to publicly deployed JavaScript.

The homepage shows approved equipment images with bilingual captions every
three seconds. Reduced motion stops automatic rotation. Only approved images
are included. Source images and the approval catalog are outside this folder.

Privacy and terms content still requires approval before public release.
See the parent `documentation/delivery-checklist.md` for remaining launch work.
