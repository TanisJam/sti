# Alkemy Challenge Frontend

This is my personal approach for the challenge.

> Superhero Team Inspector is an app that lets you create a fake superheroes team to easely see their combined powerstats.

### Technologies that I should use:

- React
- Axios
- Bootstrap
- Formik

### What will be evaluated:

- Resposive, modern and intuitive design.
- Bootstrap must be used for responsive.
- Basic knowlage of React.
- Form validation using Formik.
- Good coding practices.
- Good route naming practices.
- Modularized code in reusable and independant \* components.

#### Things to do:

- [x] Consume Superheroes data fron [SuperheroApi](https://superheroapi.com/)
- [ ] Protect different sections validating that the user is authenticated
- [x] Handle HTTP GET requests with Axios
- [x] Make app be responsive with Bootstrap

#### Specific functional requirements
* ##### Home
  * [x] Team Members.
  * [x] Team powerstats.
  * [x] Average weight and height.
  * [x] Team must have 6 members.
  * [x] Members alignment must be 3 good and 3 bad.
  * [x] Should be possible to remove a member.
* #### Login Form
  * [ ] Form must be render if user is not authenticated.
    * [ ] Email
    * [ ] Password
    * [ ] Send button
  * [ ] Form must be validated.
* #### Team
  * [x] App should render team members in a grid list
    * [x] Hero name
    * [x] Hero image
    * [x] Powerstats
    * [x] Actions to see details or remove from the team
* #### Hero Search
  * [x] A form should make GET request to the endpoint and display results.
    * [x] Hero name
    * [x] Hero image
    * [x] Actions to see details or add to the team
* #### Hero Details
  * [x] By clicking the hero card the details should be displayed.
    * [x] Weight
    * [x] Height
    * [x] Name
    * [x] Alias
    * [x] Eye color
    * [x] Hair color
    * [x] Workplace
* #### Tests
  * [ ] Authenticated user verification when entering a route.
  * [ ] Field validation in login or search form submit.
  * [ ] Handling exceptions when getting API errors.

 