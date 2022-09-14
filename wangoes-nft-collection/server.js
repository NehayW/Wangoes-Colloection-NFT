const express = require('express')
const app = express();
const path = require('path')
const bodyParser = require("body-parser");
const interact = require("./scripts/interact.js");
let setIsMinting = false;
const { ethers } = require("hardhat");


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

const port = process.env.PORT||4000;
app.set('view engine', 'ejs');

app.use('/static', express.static(path.join(__dirname, 'assets/images')));
app.use('/script', express.static(path.join(__dirname, 'scripts')));

const data = [
	{
	    url: "/static/1.png",
	    param: 'https://gateway.pinata.cloud/ipfs/QmQEjmEMWDjrfXvdavrTDfGDtKAg9JL6w8uKCkZjoxLeu4',
	},
	{
	  url: "/static//2.png",
	    param: 'https://gateway.pinata.cloud/ipfs/QmasSDrWRU4n8ohYpL4hN7FoqEgif4qT4apNcF12hBZGBd',
	},
	{
	  url: "/static//3.png",
	    param: 'https://gateway.pinata.cloud/ipfs/QmNNkC4bNqFHUfkvLNuttW2eUBiafaGoVngKztGUC1hx2K>',
	},
	{
	  url: "/static//4.png",
	    param: 'https://gateway.pinata.cloud/ipfs/QmdysnzNE7h218t4a1LcNkiwgrKzGuoX9Dr7gz5GDi2Uo8',
	},
	{
	  url: "/static//5.png",
	  param: 'https://gateway.pinata.cloud/ipfs/QmVKzYwrypFx78S8oyYQujVqRYczPmWSMMsBshgxGxH55F',
	},
	];

app.get("/", function(req, res) {
  res.render("view", {"data" : data});
});
var tokenURI;

// API for mint an NFT
app.post("/mintNFT", function(req, res) {
  async function main() {
    try {
        const options = {value: ethers.utils.parseEther("0.01")};
        console.log(options)
        for(i=0; i<data.length; i++)
        {
        		if(data[i].url.includes(req.body.tokenURI) == true)
        		{
        			tokenURI = data[i].param
        		}
        }
        console.log(tokenURI)
        const response = await interact.contract.mintNFT(tokenURI, options);
        console.log("Received: ", response);
      } catch (err) {
          console.log(err);
      }
	}
main()
});

// API for withdraw Money send by minter
app.post("/withdrawMoney", function(req, res){
  async function withdrawMoney() {
  	try {
      const response =  interact.contract.withdrawMoney();
      console.log("Received: ", response);
    } catch (err) {
        console.log(err);
    }
	}
	withdrawMoney()
})

app.listen(port, ()=>{console.log("localhost is running on 4000...!")})
