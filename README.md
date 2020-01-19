# AlcoTrip  <img align="left" width="40" height="40" src="http://www.abovewave.kylos.pl/aclotrip_project/favicon.png">
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
  * [HTML5](https://en.wikipedia.org/wiki/HTML5) 
  * [CSS3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets) 
  * [SASS](https://sass-lang.com/) 
  * [JavaScript](https://en.wikipedia.org/wiki/JavaScript) 
  * [jQuery](https://jquery.com/) 
  * [Bootstrap](https://getbootstrap.com/) 
  * [Photoshop CC 2019](https://www.photoshop.com/) 
  * [Google Maps](https://developers.google.com/maps/documentation/geolocation/intro) 
  * [Google Places](https://developers.google.com/places/web-service/intro) 
  * [Google Fonts](https://fonts.google.com/)
  * [Postcode.io](https://postcodes.io/)
  * [Tinypng](https://tinypng.com/)
 
## Visiuals
> Main Page - website main view
<img src="http://www.abovewave.kylos.pl/aclotrip_project/MainPage_View.png" style="widt:100%;">

> Result Page - website view with postcode applied
<img src="http://www.abovewave.kylos.pl/aclotrip_project/AlcoTrip_Screenshot.png" style="widt:100%;">


## User Stories

* Tom : "When I've opened this website I couldn't really get what it's all about.. no information about what you can do on this website, how does it work etc. And that map, standard google map. I love when I have possibilty to change or customize view of application I'm usingm, this making my app special and more personlized."

* Maciej : "Ideas like this website are really good! I was wondering, if it's possible to find only pubs or bars near to me without zooming and moving map in google maps all the time.. that's so simple, click find me, choose the type of what you're looking for and that's it! You can also mainpulate sliders, to get the nearest location to yourself. The only issue is you can't really share your trip in easy way with your friends. Screenshot ?! we're living in 20th century, that shoudl be just one click, easy sharing option."

* Ben : "Great colors! Simple and clear design. It will be good, if there will be chatting option, just simple chat, with friends on app, option to invite them to my trip. I'm wondering when this app will be available to download from app store! Can't wait! Awesome!"

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
 
#### Upcoming features to improve user experience and website usability based on user testing and stories.
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
* I've used is <strong>Roboto</strong>, it's well design, simple and easy to read. [See font](https://fonts.google.com/?query=Roboto)\
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

I created wireframes in Balsamiq mockups 3. When I've started to creating the project wireframes have been really simple and show only scetch of the project. While making real project I've changed style and I've added more colors, text and pictures to visualize content of the page and sidebar.

View my wireframes here.

* Desktops [Main Page](http://www.abovewave.kylos.pl/aclotrip_project/wireframe_desktop_main.png) - [Map](http://www.abovewave.kylos.pl/aclotrip_project/wireframe_desktop_map.png)
* Tablets [Main Page](http://www.abovewave.kylos.pl/aclotrip_project/wireframe_tablet_main.png) - [Map](http://www.abovewave.kylos.pl/aclotrip_project/wireframe_tablet_map.png)
* Phones [Main Page](http://www.abovewave.kylos.pl/aclotrip_project/wireframe_phone_main.png) - [Map](http://www.abovewave.kylos.pl/aclotrip_project/wireframe_phone_map.png)


## Testing
Website code was tested by copying link to [Validator](https://validator.w3.org/) - W3C Markup Validation Service.
 - All errors have been checked, reviewed and fixed.

This project was mainly tested in Chrome.\
I've used Chrome Extensions 
[Viewport Resizer – Responsive Testing Tool](https://chrome.google.com/webstore/detail/viewport-resizer-%E2%80%93-respon/kapnjjcfcncngkadhpmijlkblpibdcgm),
to check responsiveness of the site, pages layout change, how all elements are animating on a different screen sizes.

* While doing the project I've created to many lines of jQuery code to control all icons and sliders on sidebar. I've been advised to reduce code and create separate functions and copy them when needed to avoid duplicating the code.
* After change of user fields on main page I couldn't get postcode value from input field and pass it to the postcode.io. I've started to checking my code, doing all the changes but, I wasn't reading the code carefully, I've missed the line of code which was clearing all my user input fields. After removing this line all code has been check once again and tested using DOM traversing with positive end.
* Testing design and responsivity of application on my phone and different screen sizes, shows that I needed to change sidebar width. Even when I've tested different widths using browser, it still was wrong on mobile.. I have used bootstrap code to simplify and get correect sidebar width on each device.
* Based on all checks I've made changes to make navigation, fields, sliders and page layout more user friendly and easy to use to provide better user experience.

Website responsiveness and element animating also was tested on diferrent browsers such as IE and Safari.

##### Main page:
* Clicking on each element including logotype icon to make sure, all elements works and react correctly.
* After clicking on "Find Me!" - empty input field should show postcode found via using postcode.io API. 

##### Map page:
* Clickng on arrow hide/show to se if the side bar is minimizing to the left side of website and maximizing back to normal dimensions.
* Moving sliders to check if they react and is the miles value chanign properly.
* Clicking on reseting button to resert all the sliders, values and text.
* Clicking apply to se ,if all changed information has been refreshed and map has been call back and refreshed.

Some display issues were found with browsers: IE and Safari, regarding using SASS.

## Deployment
> This website is hosted and deployed from master branch to GitHub Pages.
> *  How to deployed website on Github Pages.

    1. Choose the repository you want to deploy.
    2. Clone repository by clicking button on the right side of the link.
<img src="http://www.abovewave.kylos.pl/aclotrip_project/clone_rep.png" style="widt:100%;">

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
* My mentor <span style="color:red">[Simen Daehlin](https://github.com/Eventyret)</span> (Code Institute) for his time spend on booked video calls, all supplied materials to learn, help with how to solve issues and support in difficult times.
* My brothers <span style="color:green">Tomasz and Maciej</span> who tested website on their devices sucha as Phones, Laptops, giving advices what could be changed in website layout to improve user experience and usability.

## Contact
Karol Sliwka - feel free to contact me by email: <contact@karolsliwka.com>