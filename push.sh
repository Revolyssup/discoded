# To sync my local testing copy with remote testing synced with master.
git fetch
git pull --rebase
git add .
git commit -m "$1"
git push