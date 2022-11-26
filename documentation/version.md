# Commit Details as version number
`Note: (v d.x.x) : 'd' denotes Development`

Version : Date (dd-mm-yyyy) : Comments 

    v d.0.1 : 10-10-2022 : Initialized project with Cloud Adapter and Proactive messaging and notification.
    
    v d.0.2 : 26-10-2022 : Implemented wish command which sends Adaptive card with Search People (People-Picker which searchs people within an organisation) and  Optional inputs, Context/Topic of meeting, Expected Date and duration.

    v d.0.3 : 07-11-2022 : WelcomeBot changed to TeamsBot, It currently performs, 
            1. Welcomes new user
            2. Checks and process input message/ value 
            3. Clears Mention Text
            4. Switch case to react according to command
            5. Welcomes new user when added to group 
            5. Save any state changes (Optional)
            6. Sends feedback card on wish submission.