FROM ubuntu:16.04

MAINTAINER "Li sheng <Lisheng0706@gmail.com>"

USER root

RUN apt-get -y update
RUN apt-get install -y --no-install-recommends apt-utils
RUN apt-get install -y curl
RUN apt-get install -y build-essential libssl-dev 
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.25.0/install.sh | bash
RUN /bin/bash -c "source ~/.profile"
RUN nvm install v6.9.4
