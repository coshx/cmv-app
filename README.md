#Full Stack JavaScript (FSJ) for the CMV

##Introduction
The [Configurable Map Viewer (CMV)](http://cmv.io/) is a community-supported open source mapping framework. CMV works with the [Esri JavaScript API](http://docs.cmv.io/en/latest/developers.arcgis.com/javascript/jsapi/), [ArcGIS Server](http://www.esri.com/software/arcgis/arcgisserver), and [ArcGIS Online](https://arcgis.com/). Full Stack Javascript (FSJ) for the CMV provides an out-of-the-box Node.js reverse proxy to streamline CMV widget development and deployment.

##Why Do This?
A [reverse proxy](https://developers.arcgis.com/javascript/jshelp/ags_proxy.html) is needed in most development environments to enable [CORS](https://developers.arcgis.com/javascript/jssamples/exp_cors_buffer.html). Currently, ESRI supplies [proxy configurations](https://github.com/Esri/resource-proxy) for .Net, Java, and PHP servers. FSJ for the CMV ships with a reverse proxy, relieving the developer of the need to set up his or her own. Furthermore, it's all JavaScript, so configuring your development environment is easy.

##Getting Started
1. Ensure that you have [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/) installed globally on your machine. Installing Node.js should also install npm, but it isn't a bad idea to make sure you have the most recent version of npm by running `sudo npm install npm -g`.
2. Clone this repository to the directory of your choice using `git clone https://github.com/coshx/cmv-app.git`.
3. Navigate into the `cmv-app` directory and run `npm install`. This will install the node package dependencies needed to run FSJ for the CMV.
4. Run `gulp` from the `cmv-app` directory to launch the map viewer at http://localhost:3000 and the proxy server at http://localhost:3002.
5. Point your browser to http://localhost:3000 and start tinkering!

##Configuring FSJ for the CMV

###Configuring the Backend
* To change the port that the map viewer runs on, simply change the port in the `defualt` task within `gulpfile.js`.
* To change the port that the proxy runs on, change the port in the `proxy` task within `gulpfile.js`. **NOTE**: This will likely cause CORS exceptions unless further configuration is done. See [Configuring Reverse Proxy Rules](https://github.com/coshx/cmv-app#configuring-reverse-proxy-rules).

###Configuring Reverse Proxy Rules
* Within `./viewer/js/config/viewer.js`, a `urlPrefix` can be mapped to the reverse proxy's `proxyUrl` to avoid CORS exceptions. The `proxyUrl` in the proxy rules should match the URL that the proxy runs on in the `gulpfile.js`.

###Loading Different Maps
* Currently, FSJ for the CMV loads [NOAA hurricane tracks]('http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Hurricanes/NOAA_Tracks_1851_2007/MapServer/') and [Bloomfield Hills Michigan Land Parcels](http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/BloomfieldHillsMichigan/Parcels/MapServer/) from one of ESRI's sample servers. To change the operational layers that your map loads to [a different layer](http://sampleserver1.arcgisonline.com/ArcGIS/rest/services), changing the `operationalLayers` within `./viewer/js/config/viewer.js` will load more layers. **NOTE**: You may need to add a proxy rule for the server that is providing your operational layers See [Configuring Reverse Proxy Rules](https://github.com/coshx/cmv-app#configuring-reverse-proxy-rules) for more information.

##Running the Test Suite
* Running the test suite is a simple as `gulp test`.
* The static server will not close automatically at the end of the tests, so use `Ctrl-c` to exit.
* Testing parameters should be set in `wdio.conf.js`. Note that the mocha configuration settings in `mochaOpts` will override other settings in `wdio.conf.js`.
* See [Known Issue #2](https://github.com/coshx/cmv-app#known-issues) for notes on test suite inconsistency.

##Developing Widgets
Adapting an existing widget for new purposes is mostly a matter of configuration. The general workflow requires editing the following files:
* `viewer.js`
  1. Make sure that necessary fields are made available in the `outFields` field of the `operationalLayers` parameter. This will be necessary for any search functionality being implemented. The available fields for a particular layer can be found at the [sample server's page](http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Hurricanes/NOAA_Tracks_1851_2007/MapServer//0).
  2. Register the new widget under the `widgets` parameter.
    * `id`: the widget's identifier
    * `type`: where the widget is located
    * `path`: where the widget configuration folder is located
    * `position`: the order of a widget located in the sidebar
    * `options`: where the widget's configuration options are located
* `./viewer/js/config/[widgetName].js`
  1. Provide any options that the widget will need in order to run.
* `./viewer/js/gis/dijit/[WidgetName]/`
  1. Update the CSS files in `css`
  2. Update the HTML templates in `html`
* `./viewer/js/gis/dijit/[widgetName].js`
  1. Update the functions available to your custom widget.

##Known Issues
1. Code that configures some of the dojo widgets that ESRI provides is raising a CORS exception. We have not noticed any broken functionality as a result.
2. The functional tests will pass inconsistently. Issues with proxy timeouts and CMV assets that don't load can cause the tests to hang and/or fail.

##Further Documentation:
Further information about the Common Map Viewer can be found in the [CMV documentation](http://docs.cmv.io/). Feel free to learn more about the [ESRI proxy configuration](https://github.com/Esri/resource-proxy), which may be needed to replace FSJ for the CMV's Node.js proxy in production.

## License
We are still determining the best license for FSJ for the CMV. Shoot us a message if you have any questions.
