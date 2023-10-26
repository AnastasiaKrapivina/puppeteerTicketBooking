Feature: Positive and negative tests of ticket booking service "ИДЕМВКИНО"
    Scenario: Booking class tickets Standart
        Given user is on "/index.php" page
        When user selects a session "Терминатор-заржавел" and a seat with the status Standart 
        Then user sees an active button

    Scenario: Booking class tickets VIP
        Given user is on "/index.php" page
        When user selects a session "Зверополис" and a seat with the status VIP 
        Then user sees an active button

    Scenario: Booking tickets without selecting seats
        Given user is on "/index.php" page
        When user selects a session "Унесенные ветром" and didn't choose a place 
        Then user sees an inactive button