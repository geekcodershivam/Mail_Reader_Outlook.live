# Mail_Reader_Outlook.live

[![Build status](https://img.shields.io/travis/com/puppeteer/puppeteer/master.svg)](https://travis-ci.com/puppeteer/puppeteer) [![npm puppeteer package](https://img.shields.io/npm/v/puppeteer.svg)](https://npmjs.org/package/puppeteer) [![Issue resolution status](https://isitmaintained.com/badge/resolution/puppeteer/puppeteer.svg)](https://github.com/puppeteer/puppeteer/issues)


<img src="https://user-images.githubusercontent.com/10379601/29446482-04f7036a-841f-11e7-9872-91d1fc2ea683.png" height="200" align="right">

Its primary purpose is to facilitate seamless e-mailing via Outlook Mail. In this Script, the user only needs to enter the recipient of the mail, the subject of the mail, and the Content of the Mail itself. The rest is handled by the script. It uses NodeJS with the puppeteer module to facilitate automated browser usage which first accesses www.outlook.live.com, then proceeds to log in to outlook mail using the credentials provided to it beforehand in a separate file. Once logged in, the script tells the browser to create a new mail, and then enters the details of the mail that it took as input earlier. Once all the data has been inputted, the browser sends the mail and shows a pop up at the bottom left, letting us know that the mail has been sent.

``` bash
# install dependencies
npm install or npm i puppeteer

# Credentials Setup
--Email
--Password
--Sentemail
--filepath
--message
--subject
--Number of mails to read

# run
command run in bash:
sh cmd.sh
command run in cmd:
cmd.bat

```

![2020-05-11-10-00-19-online-video](https://user-images.githubusercontent.com/31733809/81665577-7e98c800-945e-11ea-9570-a2be34f90e9d.gif)
