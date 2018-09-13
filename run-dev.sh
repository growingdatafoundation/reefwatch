#!/bin/bash
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CL='\033[0m'

echo -e "${YELLOW}=>${CL} Starting ${BLUE}API Server${CL} in new terminal"
x-terminal-emulator -e npm run start --prefix ./API

echo -e "${YELLOW}=>${CL} Starting ${BLUE}React APP${CL}"
npm run start
