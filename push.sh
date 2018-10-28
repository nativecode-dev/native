#!/bin/bash

export RELEASE=${RELEASE:="prerelease"}
TRAVIS_BRANCH=${TRAVIS_BRANCH:="invalid"}

if [ $TRAVIS_BRANCH = "master" ] && [ $TRAVIS_EVENT_TYPE = "push" ]; then
  RELEASE=patch
  lerna publish --allow-branch "master" --cd-version $RELEASE --message "$TRAVIS_BRANCH:$RELEASE:%s"
  lerna run docker-push
fi

if [ $TRAVIS_BRANCH  = "master-lts" ] && [ $TRAVIS_EVENT_TYPE = "push" ]; then
  RELEASE=minor
  lerna publish --allow-branch "master-lts" --cd-version $RELEASE --message "$TRAVIS_BRANCH:$RELEASE:%s"
  lerna run docker-push
fi
