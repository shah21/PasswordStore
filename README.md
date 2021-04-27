![][header]


<h1 align="center">Password Store</h1>
<p align="center">
  
   <img src="https://img.shields.io/badge/react%20native-0.64-blue"/>
   <img src="https://img.shields.io/badge/node-javascript-green"/>
   <img src="https://img.shields.io/badge/typescript-4.1.5-%236E97CC"/>
   <img src="https://img.shields.io/badge/mongodb-v4.4-brightgreen"/>
</p>
 
<p>
Now days we want powerfull passwords to secure our digital accounts. It is hard to memorize complex passwords for diffrent accounts.There is Password store comes in. Is is a platform that can help users to store passwords in encrypted way in their mobile phones and personal computers.Password store provide mobile application and CLI for PCs.
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

If you link package with global node modules then you call call it from anywhere.


```sh
store -h
```
above command gives you details about all features and options 

## Development setup

* You can install all dependency using 
```sh
npm install
```
* If you are working on server part.You need to configure environment variables.Create a .env file all fill all required varialbes with approprate values
```
MONGO_USER=
MONGO_PASSWORD=
MONGO_DEFAULT_DB=

JWT_SECRET_KEY=
JWT_REFRESH_KEY=
CRYPTO_KEY=
```
* For working with client parts . You have to change base url if you need to 
Go to src/axios/config replace your server address with host
```
const BASE_URL = <host>;
```
More guides 👇
*. Configure aws and Get API keys 📖 [Working with s3 bucket][s3bucket-docs] , [Get aws credentials][awsCred-url]
*. Configure mongoDb database 📖 [Connect with mongoDb atlas][mongo-conn]

## Release History

* 0.2.1
    * CHANGE: Update docs (module code remains unchanged)
* 0.2.0
    * CHANGE: Remove `setDefaultXYZ()`
    * ADD: Add `init()`
* 0.1.1
    * FIX: Crash when calling `baz()` (Thanks @GenerousContributorName!)
* 0.1.0
    * The first proper release
    * CHANGE: Rename `foo()` to `bar()`
* 0.0.1
    * Work in progress

## Meta

Your Name – [@YourTwitter](https://twitter.com/dbader_org) – YourEmail@example.com

Distributed under the XYZ license. See ``LICENSE`` for more information.

[https://github.com/yourname/github-link](https://github.com/dbader/)

## Contributing

1. Fork it (<https://github.com/yourname/yourproject/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

<!-- Markdown link & img dfn's -->
[mongo-conn]: https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb--how-to-get-connected-to-your-database
[header]: screenshots/password_store_header.png

[s3bucket-docs]: https://docs.aws.amazon.com/AmazonS3/latest/dev-retired/UsingBucket.html
[awsCred-url]: https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html
[mongo-conn]: https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb--how-to-get-connected-to-your-database
[opensource-docs]: https://opensource.guide/how-to-contribute/
