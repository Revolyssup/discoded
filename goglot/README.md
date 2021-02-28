# GoGlot

## GoGlot is a multi-language code runner, written in GO. It was my alternative to using GLOT API. It uses docker engine API to manage the code running in a seperate container. According to the language passed, it chooses the pre-build image and runs the container.


### You can use GOGLOT seperately for any of your projects 
### You can build individual images in the images directory, tweek the names of your images in run.go and you're good to go.(pun intended)

#### Sidenote:- Currently I have set the timeout as 3 seconds, in case the client's code goes in a while loop/takes too much time or something like that. You can tweek that time too, in stopContainer function in container.go.