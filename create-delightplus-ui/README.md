##Step 1: Release create-delightplus-ui (Template)
```bash
# 1. Navigate to the template project
cd path/to/create-delightplus-ui

# 2. Commit all changes
git add .
git commit -m "chore: update README and .gitignore for template"

# 3. Bump version (patch/minor/major)
npm version patch    # e.g., 0.1.4

# 4. Build (if build step exists)
npm run build

# 5. Publish to npm
npm publish --access public

# 6. Push changes and tag
git push origin main --tags
```

## ✅ Test it locally:
```bash
npx create-delightplus-ui test-app
```