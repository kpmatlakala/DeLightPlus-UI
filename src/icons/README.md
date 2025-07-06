# Icon Usage Guide

This directory contains all SVG icon components for your UI library. Each icon is a React component and can be imported and used anywhere in your project.

## Usage

### Importing an Icon
```tsx
import { TasksIcon, CartIcon, GitHubIcon, ReactIcon, StarIcon, HeartIcon } from './icons';

<TasksIcon size={32} color="#2563eb" />
<GitHubIcon className="text-gray-900" />
```

### Props
All icons accept the following props:
- `size` (number, default: 24): The width and height of the icon in pixels.
- `color` (string, default: 'currentColor'): The stroke/fill color of the icon.
- `className` (string, optional): Additional CSS classes for styling (e.g., Tailwind classes).
- `variant` (string, optional): For icons that support multiple styles (e.g., `'line'` or `'solid'`).

### Example: Icon Variants
Some icons (like StarIcon, HeartIcon, BookmarkIcon) support a `variant` prop:

```tsx
<StarIcon variant="solid" color="#fbbf24" />
<StarIcon variant="line" color="#fbbf24" />
<HeartIcon variant="solid" color="red" />
<BookmarkIcon variant="line" />
```

### Example: Basic Usage
```tsx
import { StarIcon } from './icons';

<StarIcon size={40} color="#fbbf24" className="mx-2" />
```

## Adding New Icons
1. Create a new file in this directory (e.g., `NewIcon.tsx`).
2. Use the following template:

```tsx
import React from 'react';

type IconVariant = 'line' | 'solid';

export const NewIcon = ({ size = 24, color = 'currentColor', className = '', variant = 'line' }) => (
  <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24" className={className} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    {/* SVG paths here */}
  </svg>
);
```
3. Export the icon in `index.ts`.

## Icon List
- TasksIcon
- CartIcon
- BookmarkIcon (supports `variant`)
- FoodIcon
- ProfileIcon
- LogoutIcon
- LoginIcon
- SettingsIcon
- AnalyticsIcon
- HelpIcon
- MenuIcon
- CheckIcon
- XIcon
- ChevronDownIcon
- ChevronLeftIcon
- ChevronRightIcon
- EyeIcon
- EyeOffIcon
- EditIcon
- TrashIcon
- StarIcon (supports `variant`)
- HeartIcon (supports `variant`)
- BellIcon
- LockIcon
- CalendarIcon
- UploadIcon
- DownloadIcon
- ...and more!

## License
All icons are custom SVGs and can be used freely within this project. 