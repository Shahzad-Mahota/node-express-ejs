// SETUP GLOBALS
global.base_path = __dirname;
global.NOT_FOUND_ERROR = 405;
global.SUCCESS_CODE = 200;

const express = require('express');
const app = express();

// SET TEMPLATE ENGINE - EJS
app.set('view engine', 'ejs');

// SETUP EJS PAGES BASEPATH
const path = require('path');
const { exit } = require('process');
const rootBasePath = path.join(__dirname,'/'); // PROJECT ROOT FILES (app.js, package.json)
const assetsBasePath = path.join(__dirname,'src/public/') // ASSETS (css,js,images)
const viewsBasePath = path.join(__dirname, 'src/views/'); // VIEWS (ejs view files)

// APPLY MIDDLEWARE FOR BINDING ASSETS BASEPATH
app.use(express.static(assetsBasePath));

// STATIC PAGES ROUTES
app.get('/', (request, response) => {
    const homePageContent = require("./src/data/home");
    const data = {
        pageUrl:request.url,
        pageContent:homePageContent
    }
    response.render(viewsBasePath, {data})
})

app.get('/about', (request, response) => {
    const aboutPageContent = require("./src/data/about");
    const data = {
        pageUrl:request.url,
        pageContent:aboutPageContent
    }
    response.render(`${viewsBasePath}/about`, {data})
})

app.get('/services', (request, response) => {
    const services = require("./src/data/services");
    const data = {
        pageUrl:request.url,
        services:services
    }
    response.render(`${viewsBasePath}/services`, {data})
})

app.get('/team', (request, response) => {
    const team = require("./src/data/team");
    const data = {
        pageUrl:request.url,
        team:team
    }
    response.render(`${viewsBasePath}/team`, {data})
})

app.get('/contact', (request, response) => {
    const contactInfo = require("./src/data/contactInfo");
    const data = {
        pageUrl:request.url,
        contactInfo:contactInfo
    }
    response.render(`${viewsBasePath}/contact`, {data})
})


// GET PROJECT-DETAILS -- USING FILESYSTEM
app.get('/project-details', (request, response) => {

    // require file system core module
    const fs = require('fs');
    const jsonPackageFile = rootBasePath+"package.json";

    // read the content of first file in data directory
    fs.readFile(jsonPackageFile,'utf8',(error,fileContent)=>{
        if(error){
            response.render(`${viewsBasePath}/error/500`, {error})
        }else{
            // CONVERT JSON STRING TO OBJECT
            const projectDetail = JSON.parse(fileContent);
            const data = {
                pageUrl:request.url,
                projectDetail:projectDetail
            }
            response.render(`${viewsBasePath}/project-details`, {data})
        }
    })

})

// WILDCARD FOR INVALID-URL
app.get('*', (request, response) => {
    response.render(`${viewsBasePath}/error/404`)
})


// RUN SERVER
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
