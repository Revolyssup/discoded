FROM golang:alpine
WORKDIR /app
COPY . /app
RUN go build -o /app/output main.go
ENTRYPOINT ["/app/output"]