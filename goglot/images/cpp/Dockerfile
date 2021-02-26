FROM gcc:4.9 AS base
WORKDIR /usr/src/myapp
COPY ./runcpp.sh .
RUN chmod +x ./runcpp.sh
RUN /bin/sh -c "touch ./output"
ENTRYPOINT [ "tail", "-f", "/usr/src/myapp/output"]