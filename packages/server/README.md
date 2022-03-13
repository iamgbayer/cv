### How to deploy

First, build the Docker image

```sh
docker build -t server --no-cache .
```

If you are building from a mac M1, you need to use the below parameter in the build command

```
--platform linux/amd64
```

docker tag server gcr.io/audio-3c8c5/server

docker push gcr.io/audio-3c8c5/server
