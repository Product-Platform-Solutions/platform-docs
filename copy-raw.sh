#!/bin/bash
echo "Cleaning old raw files..."
rm -rf static/raw
mkdir -p static/raw

echo "Copying markdown files..."
find docs -name "*.md" | while read f; do
  dest="static/raw/${f#docs/}"
  mkdir -p "$(dirname "$dest")"
  cp "$f" "$dest"
done

echo "Raw markdown files copied successfully."

