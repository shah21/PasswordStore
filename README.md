![][header]


<h1 align="center">Password Store</h1>
<p align="center">
  
   <img src="https://img.shields.io/badge/react%20native-0.64-blue"/>
   <img src="https://img.shields.io/badge/node-javascript-green"/>
   <img src="https://img.shields.io/badge/typescript-4.1.5-%236E97CC"/>
   <img src="https://img.shields.io/badge/mongodb-v4.4-brightgreen"/>
</p>
 
<p>
Now days we want powerfull passwords to secure our digital accounts. It is hard to memorize complex passwords for diffrent accounts. There is Password store comes in. It can provide features like encrypting passwords and store in the cloud. So you can fetch it from anywhere in the world. 
</p>

## Installation

OS X & Linux & Windows (CLI): 
* Download package
```sh
git clone https://github.com/shah21/PasswordStore.git
```
* Install store cli
```sh
cd store
npm link
```

## Usage example

If you link package with global node modules then you can call it from anywhere.


```sh
store -h
```
☝️ above command gives you details about all features and options 

## Development setup

### Structure

<table>
  <tr>
    <th>Platform</th> <th>Folder</th>  
  </tr>
  <tr>
    <td>Mobile App</td><td>mobile</td>
  </tr>
   <tr>
    <td>CLI</td><td>store</td>
  </tr>
   <tr>
    <td>Rest Api</td><td>server</td>
  </tr>
<table>

* You can install all dependencies using 
```sh
npm install
```
* If you are working on server part.You need to configure environment variables. Create a .env file and fill all required varialbes with approprate values
```
MONGO_USER=
MONGO_PASSWORD=
MONGO_DEFAULT_DB=

JWT_SECRET_KEY=
JWT_REFRESH_KEY=
CRYPTO_KEY=
```
* For working with client projects . You have to change base url, if you need to <br>
Go to src/axios/config replace your server address with host 
```
const BASE_URL = <host>;
```
More guides 👇
* Configure mongoDb database 📖 [Connect with mongoDb atlas][mongo-conn]
  
## Issues and suggestions

See the [open issues](https://github.com/shah21/PasswordStore/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Password-Store is open to contributions, but I recommend creating an issue or replying in a comment to let me know what you are working on first that way we don't overwrite each other.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request 

📖 [Learn more about open source contribution][opensource-docs]


<!-- CONTACT -->
## Contact

Muhsin Shah - [@shah21](https://twitter.com/MuhsinS07857838?s=09) - muhsinshah21@gmail.com

Project Link: [https://github.com/shah21/PasswordStore.git](https://github.com/shah21/PasswordStore/i)

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- Markdown link & img dfn's -->
[mongo-conn]: https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb--how-to-get-connected-to-your-database
[header]: screenshots/password_store_header.png

[mongo-conn]: https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb--how-to-get-connected-to-your-database
[opensource-docs]: https://opensource.guide/how-to-contribute/
