# To sync my local testing copy with remote testing synced with master.
git pull --rebase # Since master branch automatically pushes on this branch in a workflow. We need to get the latest commit from there to test in the test workflow.
git add .
git commit -m "$@"
git push