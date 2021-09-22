# Spacestagram

Spacestagram pulls images from NASA's Astronomy Picture of the Day API and displays them in a social-media style feed. By default, 10 images are selected at random (videos are excluded). 

[See it in action](http://shyzer.ca/spacestagram/)

![](https://github.com/markshyzer/spacestagram/blob/main/spacestagram-screenshot.png)

## Features

Each image is displayed with its accompanying date, title, and caption, and can be liked by tapping the bookmark icon, and unliked by tapping it again. Likes are stored in localStorage so they will persist when the user leaves the page or closes the browser. 

From the top menu the user may select 'Favourites' to view all of their liked posts, or 'Random' to return to the 10-image feed. On reaching the bottom of the scroll, the user can click + to load ten more images, ad infinitum.

## Technical

Spacestagram uses vanilla Javascript, CSS, and HTML, with Bootstrap icons.
