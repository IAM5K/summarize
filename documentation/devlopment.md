# Commands
`ionic build --prod --vendor-chunk --aot && firebase deploy --only hosting`
## Clipboard Module
`npm install @capacitor/clipboard && npx cap sync`


[Eslint prettier](https://github.com/prettier/eslint-plugin-prettier?tab=readme-ov-file#options)

[Eslint config](https://github.com/ionic-team/eslint-config)
# Linting
// https://eslint.org/docs/rules/
// https://github.com/ionic-team/eslint-config/issues/7
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules

# Supported links

## Notifications
1. [Using Push Notifications with Firebase in an Ionic + Angular App](https://capacitorjs.com/docs/guides/push-notifications-firebase)
2. [@capacitor/background-runner](https://capacitorjs.com/docs/apis/background-runner#limitations-of-background-tasks)
3. [Set up a JavaScript Firebase Cloud Messaging client app](https://firebase.google.com/docs/cloud-messaging/js/client#web_1)
4. 

There are already code and logic for graph in analyze component,
- when we navigate from `expense.page.ts` to `analyze.component.ts`, the `Expense` data should be passed on to the analyze component.
- Initially it will show analysis based on the data received from analyze component, 
- On top we have 4 cards:
    1. Total expense in the selected data (whatever expense is received by applying filters or came from expense page)
    2. Budget of the given month
    3. Savings
    4. Remaining balance or Exceeding amount (Total expense - total budget)
- In header we have to add the filter button similar to as we have in `expense.page.html` and `expense.page.ts`. If user make changes in filter, analyze component can make api calls to get api data.
-  We need few graphs to represent data in better way
    1. Multi Line graph (Already implemented) to compare daily expense, daily budget (monthly income or budget divided by number of days in month) comparison to growing expense everyday. So total of 4 lines ['expense per day', 'increasing total of expense' 'budget', 'budget per day'].
    2. Pie chart showing expense by "type"
    3. Doughnut chart showing expense by 'spentOn'
    4. Bar graph showing 0 expense day, (Days on which Amount 0 was logged with type as saving)
    5. If you feel that we should add more graph then feel free to add 
- Note: Do not change the core functionality, we have helper functions in `expense/modules` which we use to do calculations and return data back to analyze component. Prefer Using data type instead of any, in case you are not sure about data type you can use any.   
