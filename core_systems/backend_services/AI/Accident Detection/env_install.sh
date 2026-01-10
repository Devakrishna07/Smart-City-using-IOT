#!/usr/bin/env bash

set -e  # stop on error

echo "Detecting operating system..."

OS_TYPE="$(uname -s)"

if [[ "$OS_TYPE" == "Linux" ]]; then
    echo "Linux detected → using requirements_deb.txt"
    python3 -m pip install -r requirements_deb.txt

elif [[ "$OS_TYPE" == "Darwin" ]]; then
    echo "macOS detected → using requirements_deb.txt"
    python3 -m pip install -r requirements_deb.txt

elif [[ "$OS_TYPE" == MINGW* || "$OS_TYPE" == CYGWIN* || "$OS_TYPE" == MSYS* ]]; then
    echo "Windows detected → using requirements_win.txt"
    python -m pip install -r requirements_win.txt

else
    echo "Unsupported OS: $OS_TYPE"
    exit 1
fi

echo "Dependencies installed successfully ✅"
