Feature: Ecommerce Validation

@Regression
Scenario: Placing the Order
    Given a login to Ecommerce application with "<userName>" and "<password>"
    When add "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 3" is displayed in the cart
    When Enter valid details and place the order
    Then Verify order in present in the order history

    Examples:
    |       userName        |    password       |
    |   anshika@gmail.com   |   Iamking@000     |
    |   hello@123.com       |   Iamhello@12     |