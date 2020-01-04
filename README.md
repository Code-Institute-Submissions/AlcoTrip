# AlcoTrip  <img align="left" width="40" height="40" src="http://karolsliwka.abovewave.co.uk/favicon.png" >
> Second Milestone Project for [Code Institute](https://codeinstitute.net/) | Full Stack Software Development Diploma\
> User Centric Frontend Development Milestone Project.

## Description
> The purpouse of this project is to enable users to find nearby clubs, pubs or bars. Organizing travel for yourself or with friends.
> Users can find their location using the Google interface for geolocation - by clicking "FIND ME"!.\
They can also use the input field, if they want to search for places with different postcode.
> Location selection boxes and distance sliders let you specify the exact search area. 
> Friendly and intuitive interface helps users with moving on the page. You can minimize and maxmize sidebar to see the bigger map view.
> If you decided to share your AlcoTrip with your friends, simply click download button and share!

## Technologies Used
 [HTML5](https://en.wikipedia.org/wiki/HTML5) * [CSS3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets) * [SASS](https://sass-lang.com/) * [JavaScript](https://en.wikipedia.org/wiki/JavaScript) * [jQuery](https://jquery.com/) * [Bootstrap](https://getbootstrap.com/)\
 [Photoshop](https://www.photoshop.com/) * [Google Maps API](https://developers.google.com/maps/documentation/geolocation/intro) * [Google Places API](https://developers.google.com/places/web-service/intro) * [Postcode.io](https://postcodes.io/)
 
## Visiuals
> Main Page - website main view
<img src="http://karolsliwka.abovewave.co.uk/MainPage_View.png" style="widt:100%;">
> Result Page - website view with postcode applied
<img src="http://karolsliwka.abovewave.co.uk/AlcoTrip_Screenshot.png" style="widt:100%;">

## Features
#### Existing Features
  
> Main Page
 - [x] Google Geolocation API
 - [x] Postcode.io API
 - [x] Tickboxes - Choosing type of location

> Result Page
 - [x] Google Maps API
 - [x] Google Places API
 - [x] Sliders - Changing distance range
 
#### Features left to improve user experience and website usability
 - [ ] Easy share - buttons with auto share links based on user information provided
 - [ ] User accounts - Creating, Loign, Removing
 - [ ] Adding/Inviting friends to your "AlcoTrip"
 - [ ] Different map styles/views
 - [ ] Chat for trip members

## UX/Design

This project was developed focusing on Desktop and Tablet screens, cause they're mostly skipped in mobile phone era.
However mobile phone design were carefully considered. Clear and simple design is really effective.
Users can see all important information from the very begining, also it's giving them easy access to all features.

#### Logo and Name
* Logo was created especialy for this project purpouse. It has two words "Alco" - alcohol and "Trip".\
Name stands for trip with alcohol.\
<span style="color:red">( Remember, you can drink alcohol only when you're more than 18 years old! )</span>\
Logo also has a thunder sign which was created in photoshop. It is a simbolical meaning of shock you can get when you are to drunk.

#### Coloristic
* Blue tonned background is good for bright and dark screens.
* I've used two contrasting colors yellow and white. These colors "stands out" from the bakground and they are making design more clear and readable for users.
* Dark red color has been used for buttons highlightining only to notify users about canceling or reseting values

#### Font
* Font I've used is <strong>Roboto</strong>, it's well design, simple and easy to read - [Google Fonts - Roboto](https://fonts.google.com/?query=Roboto)\
The second replacing font is <strong>San-Serif</strong>

#### Buttons and Sliders
* All buttons and sliders have rounded corners style for a better look. They have a flat not strong shadow to make them more 3D



#### Wireframes

* Desktops [view]()
* Tablets  [view]()
* Phones   [view]()


## User Stories


## Testing
Website code was tested by copying link to [Validator](https://validator.w3.org/) - W3C Markup Validation Service.
 - All errors have been checked, reviewed and fixed.

This project was mainly tested in Chrome.\
I've used Chrome Extensions 
[Viewport Resizer – Responsive Testing Tool](https://chrome.google.com/webstore/detail/viewport-resizer-%E2%80%93-respon/kapnjjcfcncngkadhpmijlkblpibdcgm),
to check responsiveness of the site, pages layout change, how all elements are animating on a different screen sizes.
 * Based on all checks I've made changes to make navigation, fields, sliders and page layout more user friendly and easy to use to provide better user experience.

Website responsiveness and elemnt animating also was tested on diferrent browsers such as IE and Safari.


##### Main page:
* Clicking on each element including logotype icon to make sure, all elements works and react correctly.
* After clicking on "Find Me!" - empty input field should show postcode found via using postcode.io API. 



Some display issues were found with browsers: IE and Safari, regarding using SASS.

## Deployment
> This website is hosted and deployed from master branch to GitHub Pages.
> *  How to deployed website on Github Pages.

    1. Choose the repository you want to deploy.
    2. Clone repository by clicking button on the right side of the link.
<img src="http://karolsliwka.abovewave.co.uk/clone_rep.png" style="widt:100%;">

    3. Go to your Repositories.
    4. Click on "Import Repositories" - Paste link in input field.
    5. Select your new repository details, Owner and create Name.
    6. "Begin Import" - Click and wait until repository is fully imported.
    7. Go to "Setting" - tab.
    8. Scroll down to "GitHub Pages" section.
    9. Change source from "none" to "master branch", copy created link.
    10. Go back to "Code" tab - paste link into website field and save.

## Created In
[AWS Cloud9](https://aws.amazon.com/cloud9/) - A cloud IDE for writing, running, and debugging code
    
## Credits / Acknowledgement
This project name and logotype was created and designed by Karol Sliwka, all rights reserved.\
Information/texts and icons in this project were written and designed by the developer.

Very Special Thanks to:
* My mentor <span style="color:red">Simen Daehlin</span> (Code Institute) for his time spend on booked video calls, all supplied materials to learn, help with how to solve issues and support in difficult times.
* My brothers <span style="color:green">Tomasz and Maciej</span> who tested website on their devices sucha as Phones, Laptops, giving advices what could be changed in website layout to improve user experience and usability.

## Contact
Karol Sliwka - feel free to contact me by email: <contact@karolsliwka.com>