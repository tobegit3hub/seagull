FROM ubuntu:14.10
MAINTAINER tobe <tobeg3oogle@gmail.com>

RUN apt-get -y update

# Install mkdocs
RUN apt-get install -y python-pip
RUN pip install mkdocs

# Add seagull docs
ADD . /docs
WORKDIR /docs

EXPOSE 8000

CMD ["mkdocs", "serve"]
