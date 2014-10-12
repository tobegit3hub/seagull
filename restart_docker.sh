#/bin/bash

# Stop docker deamon
service docker stop

# Start docker 
docker -d -H unix:///var/run/docker.sock -H 0.0.0.0:4243 &
