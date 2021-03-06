const inquirer = require("inquirer");
const fs = require("fs");
const axios = require('axios');
const util = require("util");
const pdf = require('html-pdf');


const options = { format: 'Letter' };
 

const colors = {
    green: {
        wrapperBackground: "#E6E1C3",
        headerBackground: "#C1C72C",
        headerColor: "black",
        photoBorderColor: "#black"
    },
    blue: {
        wrapperBackground: "#5F64D3",
        headerBackground: "#26175A",
        headerColor: "white",
        photoBorderColor: "#73448C"
    },
    pink: {
        wrapperBackground: "#879CDF",
        headerBackground: "#FF8374",
        headerColor: "white",
        photoBorderColor: "#FEE24C"
    },
    red: {
        wrapperBackground: "#DE9967",
        headerBackground: "#870603",
        headerColor: "white",
        photoBorderColor: "white"
    }
}

const writeFileAsync = util.promisify(fs.writeFile)


inquirer.prompt([
    {
        type: "input",
        message: "What is your GitHub UserName?",
        name: "username"
    },
    {
        type: "list",
        message: "What is your favorite color",
        choices: ["green", "blue", "pink", "red"],
        name: "color"
    }
]).then(data => {
    const username = data.username
    const dataColor = data.color
    const queryUrl = `https://api.github.com/users/${username}`;
    axios
        .get(queryUrl)
        .then(({ data }) => {
            const { avatar_url, name, location, html_url, blog, bio, public_repos, followers, public_gists, following } = data;


            function generateHTML(data) {
                return `<!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
                <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
                <title>${username}</title>
                <style>
                    @page {
                        margin: 0;
                    }
                    *,
                    *::after,
                    *::before {
                    box-sizing: border-box;
                    }
                    html, body {
                    padding: 0;
                    margin: 0;
                    }
                    html, body, .wrapper {
                    height: 100%;
                    }
                    .wrapper {
                    background-color: ${colors[dataColor].wrapperBackground};
                    padding-top: 100px;
                    }
                    body {
                    background-color: white;
                    -webkit-print-color-adjust: exact !important;
                    font-family: 'Cabin', sans-serif;
                    }
                    .main {
                    background-color: #E9EDEE;
                    height: auto;
                    padding-top: 30px;
                    }
                    h1, h2, h3, h4, h5, h6 {
                    font-family: 'BioRhyme', serif;
                    margin: 0;
                    }
                    h1 {
                    font-size: 3em;
                    }
                    h2 {
                    font-size: 2.5em;
                    }
                    h3 {
                    font-size: 2em;
                    }
                    h4 {
                    font-size: 1.5em;
                    }
                    h5 {
                    font-size: 1.3em;
                    }
                    h6 {
                    font-size: 1.2em;
                    }
                    .photo-header {
                    position: relative;
                    margin: 0 auto;
                    margin-bottom: -50px;
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    background-color: ${colors[dataColor].headerBackground};
                    color: ${colors[dataColor].headerColor};
                    padding: 10px;
                    width: 95%;
                    border-radius: 6px;
                    }
                    .photo-header img {
                    width: 250px;
                    height: 250px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-top: -75px;
                    margin-left: 35%;
                    border: 6px solid ${colors[dataColor].photoBorderColor};
                    box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
                    }
                    .photo-header h1, .photo-header h2, .photo-header a  {
                    width: 100%;
                    text-align: center;
                    }
                    .photo-header h1 {
                    margin-top: 10px;
                    }
                    .links-nav {
                    width: 100%;
                    text-align: center;
                    padding: 20px 0;
                    font-size: 1.1em;
                    }
                    .nav-link {
                    display: inline-block;
                    margin: 5px 10px;
                    }
                    .workExp-date {
                    font-style: italic;
                    font-size: .7em;
                    text-align: right;
                    margin-top: 10px;
                    }
                    .container {
                    padding: 50px;
                    padding-left: 100px;
                    padding-right: 100px;
                    }

                    .row {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    margin-top: 20px;
                    margin-bottom: 20px;
                    }

                    .card {
                    padding: 20px;
                    border-radius: 6px;
                    background-color: ${colors[dataColor].headerBackground};
                    color: ${colors[dataColor].headerColor};
                    margin: 20px;
                    }
                    .links {
                        margin-left: 25%;
                    }
                    .col {
                    
                    text-align: center;
                    }

                    a, a:hover {
                    text-decoration: none;
                    color: inherit;
                    font-weight: bold;
                    }

                    @media print { 
                    body { 
                        zoom: .75; 
                    } 
                    }
                </style>                
                </head>
                <body>
                <div class="container">
                    <div class="wrapper">
                        <div class="photo-header">
                            <img src="${avatar_url}" alt="picture of ${name}">
                            <h1>Hi</h1>
                            <h1>My Name is ${name}</h1>
                            <div class="row links">
                                <a class="col" target="_blank" href="http://maps.google.com/maps?q=${location.split(' ').join('+')}"><i class="fas fa-map-marked-alt"> ${location}</i></a>
                                <a class="col" target="_blank" href="${html_url}"><i class="fab fa-github"> GitHub</i></a>
                                <a class="col" target="_blank" href="${blog}"><i class="fas fa-blog"> Blog</i></a>
                            </div>
                        </div>
                    </div> 
                    <div class="container">   
                        <h5>${bio}</h5>
                    </div>    
                            
                        <div class="row">
                            <div class="col card">
                                <h2>Public Repositories</h2>
                                <h5>${public_repos}</h5>
                            </div>
                            <div class="col card">
                                <h2>Followers</h2>
                                <h5>${followers}</h5>
                            </div>
                        </div> 
                        <div class="row">
                            <div class="col card">
                                <h2>GitHub Stars</h2>
                                <h5>${public_gists}</h5>
                            </div>
                            <div class="col card">
                                <h2>Following</h2>
                                <h5>${following}</h5>
                            </div>
                        </div> 
                      
                <footer class="wrapper"></footer>
                </div>        
                </body>
                </html>`
            }

            const html = generateHTML(data);
            pdf.create(html, options).toFile(`./${username}_GitHub.pdf`, function(err, res) {
                if (err) return console.log(err);
                console.log(res); // { filename: '/app/businesscard.pdf' }
              });
        })
});






