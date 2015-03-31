# Digitalhome

This is the repo for our little website design project. It is build with an experimental workflow using jade, sass and gulp as the taskrunner.

## How to install necessery node modules
Within this project a package.json is located which eases up the installation process alot. Following Steps should do the trick.

#####1. Install Node.js [from their homepage](https://nodejs.org/) and restart if you are on a windows system.

#####2. Open Command prompt and test your installation

```
> npm -v
```

#####3. Install Gulp globally

```
> npm install -g gulp
```

#####4. Navigate to your project folder and type in the install command

```
project> npm install
```

The last command will simply lookup necessery packages in package.json and will install them localy.

## Gulp Task Commands

#####To build all project files in src folder under development type the following in.

```
project> gulp build
```

#####To build the project in productive mode type, which includes minifing css and html files

```
project> gulp productive
```

#####For only building css and optionally minify it

```
project> gulp sass
project> gulp minify-css
```

#####For only building html and optionally minify it

```
project> gulp jade
project> gulp minify-html
```

#####For building scripts and images

```
project> gulp scripts
project> gulp imagemin
```

#####To check the js files with jshint

```
project> gulp jshint
```

