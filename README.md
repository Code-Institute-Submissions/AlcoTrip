# AlcoTrip  <img align="left" width="40" height="40" src="http://karolsliwka.abovewave.co.uk/favicon.png" >
> Second Milestone Project for [Code Institute](https://codeinstitute.net/){:target="_blank"} | Full Stack Software Development Diploma\
> User Centric Frontend Development Milestone Project.

## Description
> The purpouse of this project is to enable users to find nearby clubs, pubs or bars. Organizing travel for yourself or with friends.
> Users can find their location using the Google interface for geolocation - by clicking "FIND ME"!.\
They can also use the input field, if they want to search for places with different postcode.
> Location selection boxes and distance sliders let you specify the exact search area. 
> Friendly and intuitive interface helps users with moving on the page. You can minimize and maxmize sidebar to see the bigger map view.
> If you decided to share your AlcoTrip with your friends, simply click download button and share!

## Technologies Used
 [HTML5](https://en.wikipedia.org/wiki/HTML5){:target="_blank"} * [CSS3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets){:target="_blank"} * [SASS](https://sass-lang.com/){:target="_blank"} * [JavaScript](https://en.wikipedia.org/wiki/JavaScript){:target="_blank"} * [jQuery](https://jquery.com/){:target="_blank"} * [Bootstrap](https://getbootstrap.com/){:target="_blank"}\
 [Photoshop](https://www.photoshop.com/){:target="_blank"} * [Google Maps](https://developers.google.com/maps/documentation/geolocation/intro){:target="_blank"} * [Google Places](https://developers.google.com/places/web-service/intro){:target="_blank"} * [Postcode.io](https://postcodes.io/){:target="_blank"}
 
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
 
#### Upcoming features to improve user experience and website usability
 - [ ] Easy share - buttons with auto share links based on user information provided
 - [ ] User accounts - Creating, Loign, Removing
 - [ ] Adding/Inviting friends to your "AlcoTrip"
 - [ ] Different map styles/views
 - [ ] Chat for trip members

## UX/Design

> This project was developed focusing on Desktop and Tablet screens, cause they're mostly skipped in mobile phone era.
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
* Dark red color has been used for buttons highlightining only to notify users about canceling or reseting values.

#### Font
* I've used is <strong>Roboto</strong>, it's well design, simple and easy to read. [See font](https://fonts.google.com/?query=Roboto){:target="_blank"}\
The second replacing font is <strong>San-Serif</strong>.
* Different font weight was used to manipulate which part of text should be spotted as a first by the user.

#### Buttons and Sliders
* All buttons and sliders have rounded corners style for a better look. They have a flat not strong shadow to make them more 3D.

#### Sidebar
* Is placed on the left side of the page. It has litte arrows to minimize or maximize the view to see more on the map.
* Colored marks with names and sliders will help the users to localize and distinguish between premises more specifcally.

#### Map
* Created with Google Maps API is placed in responsive container. 
* Red marker with user position is always in page center to help localize.

#### Wireframes

* Desktops [view](){:target="_blank"}
* Tablets  [view](){:target="_blank"}
* Phones   [view](){:target="_blank"}

## User Stories

* Tomasz : ""

* Maciej : ""


## Testing
Website code was tested by copying link to [Validator](https://validator.w3.org/){:target="_blank"} - W3C Markup Validation Service.
 - All errors have been checked, reviewed and fixed.

This project was mainly tested in Chrome.\
I've used Chrome Extensions 
[Viewport Resizer – Responsive Testing Tool](https://chrome.google.com/webstore/detail/viewport-resizer-%E2%80%93-respon/kapnjjcfcncngkadhpmijlkblpibdcgm){:target="_blank"},
to check responsiveness of the site, pages layout change, how all elements are animating on a different screen sizes.
 * Based on all checks I've made changes to make navigation, fields, sliders and page layout more user friendly and easy to use to provide better user experience.

Website responsiveness and element animating also was tested on diferrent browsers such as IE and Safari.

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
[AWS Cloud9](https://aws.amazon.com/cloud9/){:target="_blank"} - A cloud IDE for writing, running, and debugging code
    
## Credits / Acknowledgement
This project name and logotype was created and designed by Karol Sliwka, all rights reserved.\
Information/texts and icons in this project were written and designed by the developer.

Very Special Thanks to:
* My mentor <span style="color:red">[Simen Daehlin](https://github.com/Eventyret){:target="_blank"}</span> (Code Institute) for his time spend on booked video calls, all supplied materials to learn, help with how to solve issues and support in difficult times.
* My brothers <span style="color:green">Tomasz and Maciej</span> who tested website on their devices sucha as Phones, Laptops, giving advices what could be changed in website layout to improve user experience and usability.

## Contact
Karol Sliwka - feel free to contact me by email: <contact@karolsliwka.com>