# Test task for WebbyLab

## Run locally using nodejs
You can configure app using .env file (.env.example contains all available environment variables)

To run the project use this command:
```bash
npm i

npm run start:dev
```

## Run locally using docker

Build docker container:
```bash
docker built -t <YOUR_TAG> -f Dockerfile .

docker run --name movies -p 8000:8050 -e APP_PORT=8050 <YOUR_TAG>
```

Or pull built container from Docker Hub:
```bash
docker run --name movies -p 8000:8050 -e APP_PORT=8050 andriiproniuk/movies:latest
```
