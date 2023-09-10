# Commit Details as version number
`Note: (v d.x.x) : 'd' denotes Development , 'p' denotes patch, 'r' denotes release`

## Development Version : Date (dd-mm-yyyy) : Comments 

- `d.0.1` : 26-11-2022 : Initialized project with Ionic Angular and Angular/Fire.    
- `d.0.2` : 27-11-2022 : Google Login Working, Login with Email and Password working. User collection > Document created with all data in Firestore. Files Un-cleaned. Sanitisation Required. 
- `d.0.3` : 28-11-2022 : Side Nav requires user to login to display options.
- `d.0.4` : 26-12-2022 : Profile page added and updated in menu.
- `d.0.5` : 26-12-2022 : Expense page working. Add and Get Expense feature added.    
- `d.0.6` : 27-12-2022 : About Summarize added to Home page.
- `d.0.7` : 27-12-2022 : Added SEO service and Gzip, gulp for compression.
- `d.0.8` : 27-12-2022 : Added Logo on side menu.
- `d.0.9` : 28-12-2022 : Added page title and responsive nav bar to all.
- `d.1.0` : 28-12-2022 : Added logo and auto update for pwa app.
- `d.1.1` : 31-12-2022 : Added About component that will have all information guide and update app option.
- `d.1.2` : 28-12-2022 : Added office functionality and deployed for working condition.
- `d.1.3` : 28-12-2022 : Added Help module with Installation instruction.
- `d.1.4` : 05-01-2023 : Added Studies feature.
- `d.1.5` : 05-01-2023 : Added Status bar Background.
- `d.1.6` : 05-01-2023 : Added Google Tag manager.
- `d.1.7` : 10-01-2023 : Multiple Functionality
  1. CSS : Increased Size of data-table and content vertical align middle 
  2. Ion color success updated to qualify contrast ratio.
  3. Marigin class, text success color class, Mobile font size reduced to 14px.
  4. SEO Service Added for Page Title and Meta tags. 
  5. Profile Module: Completed. Display Name, Email, and  
  6. Achievement Module Added.
  7. Logo Changed back to PNG format as it it required for PWA.
  8. Office Module: 
     1. Success alert modified. 
     2. Delete feature added to service. 
     3. Count added to limit response size. 
     4. Auto fill today's Date. 
     5. Seo update for Title and Meta Tag. 
     6. Removed Clear Input from Start Time and End Time Input. 
     7. Show all Button before table. 
     8. Added Copy to clipboard.
  9.  Studies Page : Auto fill today's Date, Seo update for Title and Meta Tag. Removed Clear Input from Start Time and End Time Input.
  10. Expense Module: Success alert modified. Deleate feature added to service. Count added to limit response size. Auto fill today's Date, Seo update for Title and Meta Tag. Removed Clear Input from Start Time and End Time Input. Show all Button before table
  11. SEO service integrated to Login Help and About Page.
  12. Extra Analytics  function Removed. Analytics URL changed to Url After Redirects. 
  13. Formatted / Rearranged tags for Index, Role listitem added for Lighthouse accessibility score. SEO keywords added from Chat GPT.
- `d.1.8` : 12-01-2023 : Achievement Module Added.
  1. Add Achievements
  2. Timeline view for Achievement
- `d.1.9` : 20-01-2023 : Achievement Module Added.
  1. Features button in home page
  2. Help content updated and Contact component live.
  3. Remved login mandate for home, support, about page for better SEO. 
  4. Instructions added to login page and Dynamic SEO done.
  5. Ahievement page css update and Auto time filling. Bug: not getting auto filled when time < 10.
  6. Work component replaced with time component.
  7. Css cntrast ratio with success, overflow auto, custom-margin and error class added.
  8. Auto time fill in study page.
  9. About page content modified, Dynamic SEO, Auto time filling, Auto update function and update button.
  10. How to component added to About page.
  11. Sitemap and other config update.
- `d.2.0` : 27-01-2023 : Expenses Features.
  1. Filter based on Duration, Spent on and type.
  2. Confirmation for delete.
  3. Removed last week transaction form default to last 5 transaction.
  4. Custom date class to get different dates for filter
  5. Alert Serice for delete confirmation for multi use.
- `d.2.1` : 29-01-2023 : Multiple Features.
  1. Delete toggle added to time management 
  2. Login with google, redirection fixed.  
- `d.2.2` : 01-02-2023 : Updated details for Update. Added update type and date with version number. 
- `d.2.3` : 11-02-2023 : Multiple changes
  1. Header page removed
  2. How to component location changed
  3. Added Hall of frame component
  4. Added Time format to 12 hours using custom pipe. Requested by Vaishnavi
  5. Added Update details component for details on Updates.
  6. Transform time to 12hr and textarea instead of input.
  7. Formatting of time for auto fill using date pipe.
  8. Delete with alert feature added to Studies module.
  9. Edit Studies component added.
  10. Input changed to text area and css updated.
  11. Version details in About page.
  12. Routing Updated (Unused routes removed).
- `d.2.4` : 13-02-2023 : Multiple Additions
  1. Budget Input Added,
  2. Update and details
  3. Top contributors
  4. Current month without date.
  5. Adjusted grid coulmn size in studies.
  6. Filter by type bug fixed. (Created Index in firestore).
- `d.2.5` : 24-02-2023 : 
  1. Analyze expense component created and routes defined with back button from Analyze component.
  2. Edit Expense component added.
- `d.2.6` : 25-02-2023 : Multiple updates
  1. Ng charts added.
- `d.2.7` : 17-05-2023 : Multiple Updates
  1. Analyze component with budget cards and monthly and category wise graph.
  2. Add budget, update budget. Passing data to analyze component.
  3. Functions in Budget `getCurrentBudget()` & `getTotalBudget()`.
  4. Daily expense and monthly expense.
  5. Getting total expense from `total-expenses.ts`.
- `d.2.8` : 17-05-2023 : Multiple Updates
  1. Edit study module started.
- `d.2.9` : 27-05-2023 : 
  1. Added resize feature to time page.
  2. Get all data for a day.
  3. Copy to clipboard for a day work summary. 
- `d.3.0` : 29-05-2023 : 
  1. Edit Studies feature added.
  2. Study table changed to card.
  3. Update details
  4. Supported Browser details updated.
- `d.3.1` : 18-06-2023 :
  1. Upgraded Ionic to version 7 and NPM to 9.7.1.
  2. Expence spelling correction.
- `d.3.2` : 19-06-2023 :
  1. Upgraded Home page content.
  2. Export Expense data to excel in two sheets, expense-data and Category data.
  3. Update info.
- `d.3.3` : 24-06-2023 :
  1. Ionic Cli update, package upgrades.
  2. Created Goal page, added routing and other configs.
  3. Created Static data source & interface for Goal page and info component.
  4. Goal page form and ts configs for it.
  5. Goal info page with routing.
  6. Goal Service initialization.
- `d.3.4` : 08-07-2023 :
  1. Goal Info page.
  2. Goal page and Module.
- `d.3.5` : 09-07-2023 :
  1. Goal page and goal info UI Completed .
  2. Custom date pipe to get tomorrow's date.
- `d.3.6` : 16-07-2023 :
  1. Dashboard adjustment of feature buttons
  2. Goal page changes
- `d.3.7` : 10-08-2023 :
  1. Free Resource page
  2. Removed goal from dashboard
  3. Added link to help page
- `d.3.8` : 31-08-2023 :
  1. Admin pages
  2. Free resource services
- `d.3.9` : 03-09-2023 : 4 hours
  1. Study Data
  2. Raw data in documentation
  3. Added study interface and static data for Intermediate : 06-09-2023
- `d.x.x` : 01-01-2023

## Release Versions

- `r.0.1` : 27-11-2022 : User login with Firebase implemented. 
  1. Login with Email and Password working.
- `r.0.2` : 27-12-2022 : Added Expense page with add expense and list expense feature. 'Robots.txt' and 'Sitemap.xml' added. 
- `r.1.0` : 07-01-2023 : Multiple Functionality
  1. Expense Module: Add and View 
  2. Time / Work Module: Add and View
  3. Studies Module : Add and View.
  4. Google Analytics Added.
  5. SEO Optimised
  6. Performance Index : To be monitored page wise 
- `r.1.1` : 10-01-2023 : Dev version `d.1.7`
- `r.1.2` : 29-01-2023 : Dev version `d.2.1`
- `r.1.3` : 13-02-2023 : Dev version `d.2.1`
- `r.1.4` : 17-05-2023 : Dev version `d.2.8`
- `r.1.5` : 27-05-2023 : Dev version `d.2.9`
- `r.1.6` : 29-05-2023 : Dev version `d.3.0`, `p.2.7`
- `r.1.7` : 21-06-2023 : Dev version `d.3.2`, `p.2.9`
- `r.x.x` :

## Patches
- `p.0.1` : 26-12-2022 :Removed label in sidemenu and border in bottom.
- `p.0.2` : 27-12-2022 :Create account button disabled.
- `p.0.3` : 27-12-2022 :Different Custom SCSS added .
- `p.0.4` : 27-12-2022 :Portal Title updated and View port maximum-scale set to 5. Added Readme File.
- `p.0.5` : 27-12-2022 :Cumulative layout shift fixed in expenses page. Added Meta Description. User Scalable set to true
- `p.0.6` : 27-12-2022 :Word wrap added to coulmns of table.Firebase Config changes.
- `p.0.7` : 28-12-2022 :Corrected the spelling of Expense and added appropriate alert controller. Made Self as default value.
- `p.0.8` : 31-12-2022 :Updated all icons for pwa. Changes office to time
- `p.0.9` : 31-12-2022 :Disabled Login button with google in case of Email login.
- `p.1.0` : 31-12-2022 :Content of Homepage coming from TS file.
- `p.1.1` : 01-01-2023 :Multiple patched
  1. Added Work replacing office from routes.
  2. Removed non active components.
  3. Added limit to auto update.
  4. Amount and Description to be auto clear
  5. Validator of Time modified
- `p.1.2` : 02-01-2023 :Disabled Login button with google in case of Email login.
- `p.1.3` : 05-01-2023 :Multiple Patches
  1. Theme color updated
  2. Refreshment and miscellaneous added to options.
  3. Expense type comes from ts.
  4. Keywords added to index page.
- `p.1.4` : 05-01-2023 :**(Major Patch)**: Fixed Email based User register issue. 
- `p.1.5` : 05-01-2023 : Summarise spelling changed globally to Summarize.
- `p.1.6` : 05-01-2023 : Multiple Patches:
  1. Edit / Delete availablity note updated in all pages.
  2. Checking for Update added in About page.
  3. Login page UI updated and added recommendation for google login.
  4. Added Shopping, Bill, Rent options in Expense Types.
- `p.1.7` : 06-01-2023 : Multiple Patches: 
  1. Updated Site Map
  2. Updated Index for SEO
  3. Renamed Expense to Expense from all locations.
  4. Optimised logo, replaced png with webp.
  5. Added Cache control in firebase.json to do caching of svg.
  6. Removed Unused css and made data grid global.
  7. Fixed Expense Collection name.
  8. Auto all data load in 10 seconds.
  9. Caching of assets, ngsw install mode to prefetch.
  10. Updated robot.txt and added delay for crawling.
  11. Installation Instruction updated for pc, md and ios.
  12. Study Mode label.
- `p.1.8` : 12-01-2023 : Multiple Patches
  1. Submit Disabled for invalid Form.
  2. Date Auto-fill in Expenses.
  3. Removed Dependencies from Local Storage. Taking user data from auth State. 
  4. Placeholder for Description in Office Page
  5. Limitted Corrected to Limited in Dashboard.
  6. Excieting corrected to exciting in Profile Page. 
- `p.1.9` : 20-01-2023 : Multiple Patches
  1. Updated keywords and Description in Index.
  2. Added class for Seo data to get data dynamically from one place.
  3. Changed method `add tags` to `updateTags` in seo service.
  4. SEO trigger update in components.
- `p.2.0` : 22-01-2023 : Multiple Patches
  1. Sitemap updated.
  2. custom date class to get customized date and time.
- `p.2.1` : 23-01-2023 : Multiple Patches
  1. Page title updated based on criteria.
  2. Login page updated based on feedback from Iphone devices.
  3. Time Auto-fill in Work management page.
  4. SEO update for bing
- `p.2.2` : 27-01-2023 : Removed Screen tracking code to prevent error and double tracking of screen.
- `p.2.3` : 05-02-2023 : Multiple patches
  1. Date bug Reported By Vinayak. (Date format for initaial days were d-m-yyyy.) Fixed by using date pipe after values from custom date class.
  2. Redirect after login using google. 
- `p.2.4` : 11-02-2023 : Multiple patches
  1. Time error due to missing '0' before date. Reported by Vinayak.
  2. Allow colon and other required special characters. Reported by Charan
- `p.2.5` : 20-05-2023 : Multiple patches
  1. Validaion issue in personal care is fixed.
  2. Next line ability added for time and studies.
  3. Time format made compatible with all system perference.
  4. Pre formatting added in expense, studies and time UI. It now supports next line and pre formatting.
  5. Update details.
- `p.2.6` : 26-05-2023 : Multiple patches
  1. Time format in studies page
  2. Table headers in study data table
  3. Update Details
- `p.2.7` : 29-05-2023 : Modified options in expense type. Added Donate
- `p.2.8` : 06-06-2023 : Fixed dropdown feature of ion-select due to Chrome changes. 
- `p.2.9` : 21-06-2023 : Disabled update budget button if ammount or date is invalid.
- `p.3.0` : 08-07-2023 : '==' converted to '==='. 
- `p.x.x`
