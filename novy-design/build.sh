#!/usr/bin/env bash
# Sestaví statický náhled nového designu pro Vercel (PHP se tam nespouští).
#   bash novy-design/build.sh
# Výstup: ../novy-design-nahled  (dostupné na /novy-design-nahled)
set -euo pipefail
cd "$(dirname "$0")"
rm -rf dist
php export.php dist /novy-design-nahled
rm -rf ../novy-design-nahled
mv dist ../novy-design-nahled
echo "Náhled: $(find ../novy-design-nahled -name '*.html' | wc -l) stránek, $(du -sh ../novy-design-nahled | cut -f1)"
