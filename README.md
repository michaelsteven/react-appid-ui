# react-appid-ui
React UI to demonstrate localized AppID signup, change password, login, and profile screens.  In the future this example should support different providers other than just the AppId Cloud Directory, and have an Admin/User Management page for assigning roles to users.

## Design Decisions

**BFF Pattern**: Leveraging NGinx reverse proxy helps us implement the Backend for Frontend (BFF) pattern. Using a BFF pattern helps us avoid CORS issues.

**Auth Flow**: This example does not use the "out of the box" experience, and manages the storage of the authorization tokens for use in the Authorization header before making API calls to protected endpoints. 

The Kubernetes AppID OAuth Proxy "out of the box" experience is great at protecting applications stored in kubernetes because it manages everything for you. However, it's screens aren't localized. Also users may bookmark the login page which isn't under your domain name and may cause some confusion.  To "bring your own" AppID pages, you can't use the Oauth Proxy to protect your login pages, and if a user were to try and access a protected page then they would be directed to login to the non-localizable pages. 

Managing the Auth Flow is a larger responsibility than you may want to undertake. Having auth managed for you in the "out of box" experience one of the things that makes the OAuthProxy so nice. Another nice part is it authenticates the cookie and injects the Auth Token into the header, making for a more secure and elegent solution.  Unfortuantely for now it looks like we have to manage the auth tokens ourselves when we want to use localized pages.

In this single-page application example we do not leverage the appid-clientsdk. It doesent appear that localized screens could be injected in place of the default ones if we used it.  If this is incorrect and it does support injecting your own localized pages please let the author know.   Additionally, for this example we are using NGinx instead of Node for presenting the UI and existing examples leverage Node.'

**Runtime: NGinx instead of Node**: The compiled output from the typescript is hosted on a Nginx backend instead of a nodejs backend.  This makes a very light container (around 30mb uncompressed).  This also helps us make sure the server-side processing is only occuring at the API layer. That being said, for local develpment NPM/Yarn is used.

**Location of NGinx's default.conf**: It is not included in the Dockerfile, and instead intended to be mounted in at "/etc/nginx/conf.d/" by your Kubernetes deployment or Docker run command.  This allows us to store the config in the environment, and not package it in the container. NGinx is not leveraged when you are developing locally. When developing locally, the "proxy" declaration in the application.json is used which will direct API calls to port 3001.

**Code Organization**: AppID related files are kept under "/src/components/AppID" to allow a developer to copy/paste this folder into their own react application.  When copying to your own application, there are a few other common and localization files will need to go as well or be factored out for your own implementation.

**Session Storage**: After a user has successfuly logged in, the authorization tokens are stored/retrieved from sessionStorage. This is a more modern way storage than using cookies.  You may wish to change the tokenUtils.ts file to use localStorage or cookies.

## Interesting Things to See
- the use of ProtectedRoutes in app.ts
- the conditional display of the "User Management" menu item in HamburgerMenu.tsx
- the useAuth hook in header.tsx to display the hamburger and profile menus only if the user is authenticated
- using the refresh_token to get new tokens when the access_token is expired in tokenUtils.ts

## Docker Image
Building:
```
docker build -t michaelsteven/react-appid-api:latest .
```

Running:
```
docker run -v $(pwd)/nginx/conf.d/default.conf:/etc/nginx/conf.d/default.conf -p 8080:8080 michaelsteven/react-appid-api:latest
```

## Roadmap
- Add pages for user management
- Add other AppID supported auth providers (facebook, etc.)

## Copyright
© Copyright IBM Corporation \[2021\], \[2022\].

## Licensing
Licensed under the Apache License, Version 2.0 (the "License"); you may not use these files except in compliance with the License. You may obtain a copy of the License at http://ww.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permission and limitations under the License.







