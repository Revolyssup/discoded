FROM postgres:latest
WORKDIR /usr/src/myapp
COPY ./runpg.sh .
RUN chmod +x ./runpg.sh
CMD : ["postgres", "-c", "log_statement=all"]
ENTRYPOINT [ "/bin/sh" ]