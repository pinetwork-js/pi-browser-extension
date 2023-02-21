# Pi Browser
Script to recreate the Pi Browser app within a browser on your computer.

## How to use
First, install the [Tampermonkey extension](https://www.tampermonkey.net/) (choose the browser you're using and follow the steps). When it's done, install the script [here](https://github.com/b-derouet/pi-browser/raw/main/pi-browser.user.js) (it will open the Tampermonkey dashboard with the script you want to install, just click on the install button to save it in your browser).

Now you can go to the [Pi App website](https://app-cdn.minepi.com) and wait a little until the Pi Node login page appears, then connect into your account as if you were using the Pi Node app on your computer.

**Note:** You cannot manipulate/monitor your node in the browser, this must be done in the Pi Node app.

When you're logged in, you can go to the [Pi Browser welcome page](https://app-cdn.minepi.com/browser?url=pi://welcome.pi). If you want to go to your application within Pi Browser, go to https://app-cdn.minepi.com/browser?url=URL_OF_YOUR_APPLICATION (url parameter must start with `http://`, `https://` or `pi://`)

## ⚠️ Warning ⚠️
I AM NOT RESPONSIBLE FOR ANY PROBLEM ON YOUR ACCOUNT FOLLOWING THE USE OF MY SCRIPT, THIS ONE ONLY TRIES TO REPRODUCE THE FUNCTIONING OF PI NODE (YOU CAN EASILY SEE IT BY LOOKING AT THE CODE, NO MALICIOUS MANIPULATION OUTSIDE THE APP IS DONE). IF YOU FIND ANOTHER SCRIPT CLAIMING TO DO THE "SAME" THING, BE CAREFUL, YOU CAN EASILY HAVE YOUR WHOLE PI ACCOUNT STOLEN (THIS IS NOT A JOKE)!