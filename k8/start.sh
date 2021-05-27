kind create cluster --config ./kind.yml
alias k="kubectl"

k apply -f config.yml

k apply -f nginx.deployment.yml
k apply -f mongo.deployment.yml
k apply -f redis.deployment.yml
k apply -f goglot.deployment.yml
k apply -f app.deployment.yml

k apply -f services.yml

