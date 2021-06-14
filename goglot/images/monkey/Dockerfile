FROM revoly/monkey
WORKDIR /go/src/monkey
COPY ./runmonkey.sh ./runmonkey.sh
RUN chmod +x ./runmonkey.sh
RUN chmod +x ./monkey
ENTRYPOINT [ "/bin/sh" ]