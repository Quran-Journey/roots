# Parsing surah notes using google sheets

An MVP sheet parser, using the google sheets api, to parse a template for Quran Journey Surah Notes.

## Structure of the spreadsheets

- Each surah is represented by a single spreadsheet
- Each spreadsheet contains multiple sheets
- The first sheet contains metadata about the surah (i.e. an introduction)
- The second sheet in the spreadsheet contains the first ayah in the surah. The third sheet contains information about the third ayah and so on and so forth.

## Accessing the template Google sheet and the google sheets API
Notice that in index.js we are importing `credentials.json`. This is a file that contains the service account secret key information. You cannot run the script without this information. Also notice that in this MVP, the sheet ID is hardcoded in. It references [this google sheet](https://docs.google.com/spreadsheets/d/13mENKJN1bRv2vt2-cwLhZZ02cVxdml2Zxm0REaRsJ4c/edit#gid=1547738285) which contains an example template for how the quran journey notes should be added to a google sheet.

### [A Good video reference for using google's api](https://www.youtube.com/watch?v=PFJNJQCU_lo) (specifically sheets)