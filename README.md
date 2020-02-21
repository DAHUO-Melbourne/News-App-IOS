# Project Name:
AllFin Mobile App

# Project Requirements:
1. show the list received from backend by RESTful API, and show the list in FlatList
2. click the item in the list, and use the ID to request the details and content from backend by RESTful API, the content includes title, date, main body(including images)
3. use a slider bar to control the font size of the details page.

# Development Period:
3pm 18th Feb ~ 11pm 21st Feb

# Author: 
DA Huo (Robert)

# Operation Tools/Environment:
Macbook Air/Visual Studio Code/IOS 13.3

# How to Run
After downloading from Google Drive, then decompress the zip file

cd ALLFIN

first time: the whole process needs about 6mins
run: npm i create-react-native-module&&npm install&&npx react-native run-ios

after first time:
run: npx react-native run-ios

# What's next?
1. change welcome pages
2. optimize network communication

# Note
1. I use title.rendered as the title shown in the details page,
2. I use content.rendered as the content shown in the details page.
3. I use type_img as the picture shown as the tag image shown in the list page, so one item miss the picture because the field there shows null.

