Feature: UI - Demo UI test

    Scenario: Request Demo, stopped by CAPTCHA - @UI
        When I open Momentus homepage
        Then I verify "Request Demo" is visible
        When I click on "Request Demo"
        And I populate the following labels
            | First name*        | Last name*        | Email*                  | Phone number* |
            | Example First Name | Example Last Name | abv@smartrecruiters.com | +35943555     |
        And I select the following values from dropdown
            | Industry*         |
            | Convention Center |
        And I check on "I consent to receive emails"  
        And I check on "I acknowledge that I have"  
        And I click on "Submit" button
        Then I verify the text "Failed to validate Captcha." is displayed