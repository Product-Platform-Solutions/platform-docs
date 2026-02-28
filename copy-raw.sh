#!/bin/bash
echo "Cleaning old raw files..."
rm -rf static/raw
mkdir -p static/raw

echo "Copying markdown files as .txt..."
find docs -name "*.md" | while read f; do
  dest="static/raw/${f#docs/}"
  dest="${dest%.md}.txt"
  mkdir -p "$(dirname "$dest")"
  cp "$f" "$dest"
done

echo "Raw files copied successfully."
