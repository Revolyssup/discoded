FROM gcc:4.9 AS base
WORKDIR /usr/src/myapp
COPY ./runc.sh .
RUN chmod +x ./runc.sh
ENTRYPOINT [ "/bin/sh"]