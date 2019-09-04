<p align="center">
<img src="https://i.imgur.com/Z36Ky91.png" alt="logo" width="300px"></img>
</p>

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-badges.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/designed-in-ms-paint.svg)](https://forthebadge.com)![enter image description here](https://img.shields.io/badge/version-0.2-orange?style=for-the-badge) ![enter image description here](https://img.shields.io/badge/PR-sure-blue?style=for-the-badge) ![enter image description here](https://img.shields.io/badge/webapp-up-green?style=for-the-badge)



![enter image description here](https://i.imgur.com/FjV93Qb.png)

# Yet Another Airplane Map
YAAM is an open-source, community-driven project to create the best map for flight simmers.

## Planned Features

 - **An actual map**: See all aircraft and air traffic controllers on a map. Pretty much what you'd expect from an airplane map.
 - **Flight History**: Flight History graphs and paths for flights on the network, eventually a playback feature, to see where you screwed up!
 - **Eye-bleaching Design**: Using the Shards React UI framework and other custom styles, this little app looks a-m-a-z-i-n-g.
 - **Like google, but for flight simmers:** A powerful search engine to help you figure out where to fly next, where all the cool kids are flying or whatever.

## Installation and Building
YAAM was created using Create-React-App, so you can enjoy all the cool features it ships with. Pretty much for 90% of the cases, this is the flow:
```bash
git clone https://github.com/BunZe/yaam-client
cd yaam-client
```

YAAM is useless without some sort of API feeding it data. Because of that, **YAAM comes with a backend** built on NodeJS and Javascript. Get it here: [yavm-api](https://github.com/BunZe/yavm-api). 

When running the development server and when building, YAAM uses an environment variable to direct it to the correct API. Before doing anything, set the `REACT_APP_API_ADDR` environment variable with the correct address.

To run the development server, run `npm start`.
To build the app for production, run `npm build`.
Read more about CRA here:  [https://create-react-app.dev/](https://create-react-app.dev/)
And there you have it!

## Code Structure
Yet Another Airplane map is 100% ES6 (a.k.a Javascript). Built with **React.js**, **Redux and Leaflet**. Create-React-App handles everything related to Babel and Webpack.

Online stations (pilots and controllers) data is held in Redux, while a lot of UI related states are held in react, mainly being Leaflet related data such as map zoom, bounds, etc.

Everything map-related, including the tooltips, aircraft markers, FIR polygons, and flight path polylines are held in the `map_components` folder.
Everything sidebar-related is held in the `sidebar_components` folder.

I tried to make naming conventions as easy to understand as possible, so you shouldn't have any trouble navigating around the code and finding where to place your changes.

## Contributions
Pull Requests are more than welcome. This project is in its early stages and could use all the help it can.
Please note that the project structure may change and things are very flexible at the moment. For major changes, you should probably open up an issue.

## Support and Contact
Reach YAAM:

 - On Facebook: https://www.facebook.com/yetanotherairplanemap
 - On the web: https://yaam.app/

# License
[The MIT License](https://opensource.org/licenses/MIT)
