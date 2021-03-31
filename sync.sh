git config --global user.email "ashishjaitiwari15112000@gmail.com"
git config --global user.name "Ashish test"
git fetch
git checkout testing
git checkout master -- server
git checkout master -- goglot
git add server 
git add goglot 
git commit -m "synchronized goglot and server from master."
git push 