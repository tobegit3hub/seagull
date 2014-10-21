#!/bin/bash

# For normal users, just start the container
docker run -d -p 10086:10086 --name seagull -v /var/run/docker.sock:/var/run/docker.sock tobegit3hub/seagull

# Set true if you wanna make sure seagull is running
if false
then
  while true
  do
    echo "Sleep 60 seconds"
    sleep 60

    echo "Docker start seagull"
    docker start seagull
  done
fi

