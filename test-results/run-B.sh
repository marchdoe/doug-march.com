#!/bin/bash
# Run B — Rich system prompt comparison
# Run this after rate limit resets (~12:00 PM)
set -e

DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$DIR/.." && pwd)"
cd "$ROOT"

echo "=== Run B: Rich System Prompt ==="
echo ""

# Restore original design files so we start from same baseline as Run A
git checkout -- elements/preset.ts app/components/Layout.tsx app/components/Sidebar.tsx \
  app/routes/__root.tsx app/routes/index.tsx app/components/FeaturedProject.tsx \
  app/components/SectionHead.tsx app/components/ProjectRow.tsx \
  app/components/MobileFooter.tsx app/components/Timeline.tsx \
  app/components/Capabilities.tsx app/components/Personal.tsx \
  app/components/Bio.tsx app/components/SelectedWork.tsx \
  app/components/Experiments.tsx app/routes/about.tsx \
  app/routes/work.\$slug.tsx 2>/dev/null || true

echo "Restored original design files"
echo ""

# Run Stage 3 only (brief already on disk from earlier)
echo "Running Stage 3 (design + build)..."
node scripts/daily-redesign.js 2>&1 | tee "$DIR/run-B-rich-system-prompt.log"

if [ $? -ne 0 ]; then
  echo "Pipeline failed — check if rate limit has reset"
  exit 1
fi

# Capture artifacts
echo ""
echo "Capturing artifacts..."
cp signals/today.yml "$DIR/run-B-signals.yml" 2>/dev/null || true
cp signals/today.brief.md "$DIR/run-B-brief.md" 2>/dev/null || true
cp archive/2026-03-16/brief.md "$DIR/run-B-archive.md" 2>/dev/null || true

mkdir -p "$DIR/run-B-files"
for f in elements/preset.ts app/routes/__root.tsx app/components/Layout.tsx \
         app/components/Sidebar.tsx app/routes/index.tsx \
         app/components/FeaturedProject.tsx app/components/SectionHead.tsx \
         app/components/ProjectRow.tsx; do
  [ -f "$f" ] && cp "$f" "$DIR/run-B-files/$(basename $f)"
done

# Generate the prompt for comparison
node scripts/generate-redesign.js 2>/dev/null
cp .claude-prompt.txt "$DIR/run-B-prompt.txt" 2>/dev/null || true

echo ""
echo "=== Run B complete ==="
echo "Artifacts saved to $DIR/run-B-*"
echo ""
echo "Compare with: diff test-results/run-A-archive.md test-results/run-B-archive.md"
