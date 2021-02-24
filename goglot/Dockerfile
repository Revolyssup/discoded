FROM golang:alpine
WORKDIR /app
COPY go.* ./
RUN go mod download
COPY . /app
RUN go build -o /app/output main.go run.go types.go container.go
ENTRYPOINT ["/app/output"]