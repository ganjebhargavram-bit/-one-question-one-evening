# One Question, One Evening — setup

A small, mobile-friendly date invitation. The recipient deliberately chooses one of three answers. No hidden click tracking, location tracking, or analytics are included.

## 1) Connect response saving with Google Sheets

1. Create a new Google Sheet. Keep it private; only you need access.
2. Copy the Sheet ID from its URL. It is the text between `/d/` and `/edit`.
3. Open **Extensions → Apps Script** in that sheet.
4. Replace the starter code with the contents of `google-apps-script.gs`.
5. Replace `PASTE_YOUR_SHEET_ID` with your Sheet ID. Save.
6. Select **Deploy → New deployment → Web app**.
7. Set **Execute as: Me** and **Who has access: Anyone**, then deploy and authorize it.
8. Copy the Web App URL ending in `/exec`.
9. Open `config.js` and paste that URL as `responseEndpoint`, for example:

   ```js
   window.INVITATION_CONFIG = {
     responseEndpoint: "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
   };
   ```

10. Save and test the three choices yourself. Check that a row appears in your Sheet.

**Privacy note:** The web app endpoint accepts the three response values from anyone who has the link. Keep the Sheet private. Do not put private credentials in the website code. A person with the link could submit more than once, so treat the sheet as a simple response log, not identity verification.

## 2) Publish the invitation

This is a static website. You can publish the files using GitHub Pages:

1. Create a new public GitHub repository (for example, `date-invitation`).
2. Upload `index.html`, `styles.css`, `app.js`, and `config.js` to the repository root.
3. In GitHub, open **Settings → Pages**.
4. Choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
5. Wait for GitHub Pages to provide the website URL.
6. Open the URL on your phone and test it before sharing.

You can also host the four website files on any static hosting service. Do not upload your private response spreadsheet or share its link.

## 3) Send it

Send the published website URL directly to her in a private message. You could write:

> I made a tiny invitation for you. Open it whenever you have a quiet moment — there's no pressure, and I'd appreciate an honest answer. ❤️

## Customize the message

Edit the text in `index.html` to add your own wording. Avoid adding a deadline or making her feel that she owes you an answer. The three choices are intentionally respectful.

## Important limitation

Because the Apps Script request uses a browser-compatible no-cors submission, the page cannot verify Google's save confirmation. Test the setup first by submitting a choice and checking the private Sheet. The thank-you screen means the submission was attempted, not independently confirmed by the page.
