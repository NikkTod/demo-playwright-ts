Feature: API - Demo API test

    Scenario: Search via API within WeTrack Support platform - @API
        When I send search request with text "Introduction"
        Then I verify returned status code is 200
        Then I verify response contain text "/en/articles/4660771-introduction-to-imports"