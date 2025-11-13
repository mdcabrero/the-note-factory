# Development Knowledge Base

## CSS

### Mobile Viewport Overflow Solutions
You will often encounter issues with overflowing Fixed/Floating content on devices with very limited width, such as a mobile viewport on landscape mode. The trick is to enable scrolling so the user can see the whole content freely and you will not need media queries to work around a viewport with very limited vertical real state, which can be pretty problematic.

When fixed or floating elements (like nav menus) overflow on mobile landscape viewports, add these properties to the container holding the overflowing content to make it scrollable and fix the issue:

```css
@media (max-height: 451px) and (orientation: landscape) {
  height: 300px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch; /* iOS smooth scrolling */
}
```

A defined height is essential—without it, browsers won't enable scrolling and content will simply overflow the viewport.

### Animation Best Practices
It is better not to risk it with animations: if you do not know what to add or how to add it, just leave it as it is until you find another solution.

### HTML/Body Background Propagation
The html element automatically inherits the body's background properties, which explains some of the background clipping issues you experienced on SPAs when the content you paste on a page is not enough to cover the entire viewport.

Here's what happens in more detail:

- HTML element starts transparent: By default, the html element has background-color: transparent and background-image: none
- Automatic propagation occurs: When the HTML element has no background, browsers automatically copy (propagate) the background from the body element to the html element

When your body doesn't fill the viewport (no min-height: 100vh):

- Your background (gradient in this case, since we're talking about my portfolio website) gets propagated to the html element (which covers the full viewport)
- The body keeps a "copy" of the gradient but only covers its content area
- You see the gradient twice: once on the content-sized body, once on the full-viewport html

Keep in mind that by default, the body element has height: auto, which means it's only as tall as the content inside it and it does not automatically fill the viewport height.

So, when it comes to SPAs and background clipping due to insufficient content, the only true solutions are either setting a min-height: 100vh to the body element or making sure that the contents of a page at the very least cover the entire viewport height.

### Flash of Unstyled Content (FOUC)
FOUC (Flash of Unstyled Content) is this issue where a web page appears briefly with the browser's default styles prior to loading an external CSS stylesheet or an animation library (e.g GSAP), due to the web browser engine rendering the page before all information is retrieved.

### SVG/Icon Alignment in Flex Containers
Whenever you have a problem aligning an icon with a title (within a flex container), like the two elements do not seem aligned at all or the icon is slightly higher, try setting the display: block property to the SVG/IMG element. SVGs often need additional styling to align properly with text in a flex container, so this ensures the SVG renders as a block element. Any slight unalignments you might have after that, they can be fixed with some small negative margin values.

### Transform Property and Stacking Context
The transform property creates a new stacking context when an animation is activated, so the element being animated it's promoted to its own layer and paints above siblings that don't set an explicit stacking order. This might affect other pseudo-elements in the main element that have no z-index, as the scaled content covers it during the animation, hiding the pseudo-element. This happens very often when scaling graphic content and having a pseudo-element in the parent container that acts as a border.

### Z-Index Management
Remember about z-index management when creating components. Here's how z-index should typically be organized:

- z-0 = Default layer (overlays, backgrounds)
- z-10 = Content layer (hero content)
- z-40 = Dropdowns, popovers
- z-50 = Navigation bars, headers
- z-[100] = Modals, dialogs

So any dynamic content that 'opens up' after a user action (e.g a dropdown menu, a modal, mobile navigation that takes up most of the screen), should have the highest possible z-index, since this content has to be seen above everything else.

### Container Classes and Layout Constraints
If you want to use the container class for consistency, but fix the problem where layouts in md viewports seem constrained and squeezed, use the following pattern:

```html
<div class="container md:max-w-full lg:px-24">
```

The max-w-full utility makes the element take up as much space as it needs (which is particularly useful for two column layouts, where in md viewports the content would be too loose to place one column, but too large to fit in with the container max-width constraints)

Note: The lg:px-24 viewport utility is optional, it depends on how wide the content of the section is or your space needs.

### CSS Selectors: :first-child vs :first-of-type
The :first-child selector is very strict - it only matches if the element is the literal first child of its parent container. When you want to universally target elements that are used a lot (e.g sections), use :first-of-type better. 

:first-of-type matches the first element of that specific type among siblings.

### Tailwind v4 Animations with CSS Variables
In Tailwind v4, animations are defined using CSS variables with the pattern --animate-*
You can also link them to user actions, such as hover:

```html
<button class="px-8 transition-transform hover:animate-(--animate-fade-in)">
```

You can also control parameters of the animation directly from Tailwind, such as duration and delay:

```html
<div class="animate-(--animate-fade-in) delay-300 duration-1000">
  Delayed fade in
</div>
```

### Tailwind Native Animations
Tailwind has some native animations that you do not even need to declare in order to use:

- animate-spin
- animate-pulse
- animate-ping
- animate-bounce

### Font Imports in Global CSS
Font imports on CSS files always get loaded to the final build even if they're not being used. So for example, on a project where you're importing multiple fonts but only using Inter:

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:...");
@import url("https://fonts.googleapis.com/css2?family=Roboto:...");
@import url("https://fonts.googleapis.com/css2?family=Poppins:...");
```

Each @import makes a network request to Google Fonts and loads that font family, regardless of whether you use it or not inside any component within your project. It does not matter if the font being imported is NOT being used at all in the entire project, it will get loaded regardless.

### Tailwind Width Utilities for Text Breaking
In Tailwind, if you want the text inside a card-like container to break lines at a certain point (before the end of the card/container), use the property w-value/value

This is a way to tell Tailwind "I want this element to have a width of X% of the parent element". 

And you'll likely want to use this for the longer breakpoints where text looks odd when it goes on for you long, so you'll use a property like this:

```
lg:w-3/4
```

---

## JavaScript

### API Calls with Fallback Error Handling
When building API-calling functions, the || fallbacks only work if the API call succeeds but returns incomplete data. But if the entire API call fails (network error, 404, authentication failure, etc.), you never get an object at all. Without the catch block, a failed API call would make that promise resolve to undefined, and you'd get:

```
voices.value = [validVoiceObject, undefined, validVoiceObject]
```

The catch block ensures that even complete API failures still contribute a usable object:

```
voices.value = [validVoiceObject, fallbackVoiceObject, validVoiceObject]
```

So you have two layers of fallbacks:

- Property-level fallbacks (|| operators) for incomplete but successful responses
- Object-level fallbacks (catch block) for complete API failures

### Fetch Default Behavior
In JavaScript, the fetch() function by default makes a GET request - that's actually the default HTTP method when you don't specify one explicitly. The fetch API assumes GET requests when you don't provide a method, since GET is the most common HTTP operation (it's what happens when you type a URL in your browser). We only need to explicitly specify the method when we're doing something else (e.g POST or PUT requests).

### Class Creation and Dependency Injection
When you create a class in JavaScript, you often don't use that directly, but rather make an instance of it that you store on a regular variable:

```javascript
//Class creation
class TranscriptionImprover {
  constructor() { 
  }
}

//Class instance
const transcriptionImprover = new TranscriptionImprover()
```

This design pattern is called dependency injection - instead of creating a new TranscriptionImprover every time you need to improve text, you create it once and reuse it. This is more efficient and ensures consistent behavior across all transcription sessions. The instance stays alive for the entire lifetime of your application, ready to be called whenever transcribeAudio() needs to improve some text.

### HTTP Methods and Response Data
Whether you're making a GET request to fetch data, a POST request to create something, a PUT request to update something, or a DELETE request to remove something, you always get a response back that tells you what happened and potentially gives you new data. Even when you make a POST request to create something, the server often sends back the created item with additional fields (like an auto-generated ID or timestamp) that weren't in your original request.

### JavaScript Classes Without Constructors
In JavaScript classes, if a constructor doesn't do anything, you can actually omit it entirely. The constructor is only needed when you're initializing instance properties (like prompt templates in other services).

### Default Parameter Values
The = null is JavaScript's way of providing a default parameter value, which serves a similar purpose to TypeScript's optional parameters. See the below example from your speech-to-text app:

```javascript
async transcribe(audioFile, apiKey, contextPrompt = null) {
  // If contextPrompt is not passed, it defaults to null
}
```

This means the function can be called in multiple ways:

```javascript
// With context
transcribe(audioFile, apiKey, 'coding')     // contextPrompt = 'coding'

// Without context  
transcribe(audioFile, apiKey)               // contextPrompt = null (default)

// Explicitly null
transcribe(audioFile, apiKey, null)         // contextPrompt = null
```

The = null is essentially JavaScript's way of saying "this parameter is optional, and if not provided, treat it as null" - which perfectly handles cases where a parameter is completely optional and might not be provided, so the function can run regardless of that.

### Optional Chaining Operator
The ? in persona?.icon is called the optional chaining operator. It's a safety feature that prevents errors when accessing properties of potentially undefined objects.

What it does:
- If persona exists → access persona.icon
- If persona is null or undefined → return undefined instead of throwing an error

Why we need it:

Since persona is computed from a store lookup, there's a brief moment during loading where it might be undefined. Without ?, you'd get an error like "Cannot read property 'icon' of undefined".

Example:
```javascript
// Without optional chaining (dangerous):
persona.icon // ❌ Error if persona is undefined

// With optional chaining (safe):
persona?.icon // ✅ Returns undefined safely if persona is undefined
```

### Function Return Values and Variable Assignment
When you define a variable and assign its value to an existing function, the return value of that function gets stored in the variable.

See the below variable, and assume there's a previously defined function called 'splitDocument' that returns something:

```javascript
const chunkData = await splitDocument("movies.txt");
```

Here, in our example:

1. splitDocument("movies.txt") returns the output variable (which contains the split document chunks)
2. That returned value is what gets stored in chunkData
3. You can then get chunkData somewhere else (e.g inside yet another function or a class)

### TypeScript Interfaces
In TypeScript, interface is not an object or variable—it's a special keyword used to define the shape (structure) of an object type. An interface lets you describe what properties and methods an object must have.

```typescript
interface Person {
  name: string;
  age: number;
}

const user: Person = {
  name: "Alice",
  age: 30
};
```

'interface' is for describing object types, not for creating objects or variables. When you see interface in TypeScript, think of it as a blueprint or contract for the structure of objects, not as an object or variable itself.

```typescript
interface Car {
  make: string;
  model: string;
}
let myCar: Car = { make: "Toyota", model: "Corolla" };
```

### TypeScript Type Aliases
There's also something pretty similar called aliases, which are used for complex types in general. You can make them using the 'type' keyword:

```typescript
type Point = { x: number; y: number };
let position: Point = { x: 1, y: 2 };
```

### TypeScript any Type
TypeScript also has a special type, any, that you can use whenever you don't want a particular value to cause typechecking errors. When a value is of type any, you can access any properties of it (which will in turn be of type any), call it like a function, assign it to (or from) a value of any type, or pretty much anything else that's syntactically legal.

Using `any` disables all further type checking, and it is assumed you know the environment better than TypeScript.

### TypeScript Type Inference
For variables holding simple values, let TypeScript infer the types for you instead of using type annotations:

```typescript
let x: number = 5;   // Correct but unnecessary 
let y = 10;	     // Inferred as number, still correct and shorter
```

### TypeScript Optional Properties
In TypeScript it comes to Object Types, you can use the ? symbol to make a property optional:

```typescript
let pet: { name: string; age?: number } = {
  name: "Buddy"
};
```

### TypeScript Union Types and Literal Types
In TypeScript, you can allow a value to be one of several types using Union Types:

```typescript
let id: number | string;
id = 42;
id = "A001"; // both fine
```

And with Literal Types, you can restrict the value of a variable to really specific values:

```typescript
let direction: "left" | "right" | "center";
direction = "left"; // Only allowed values
```

### TypeScript Null and Undefined Handling
By default in TypeScript null and undefined can be assigned to most types. They signal can that a variable intentionally has "no value." For example, an unfinished computation or an unset configuration options:

```typescript
let result: number | null = null; // result is absent now, will be set later
```

Functions and objects can have optional parameters or properties, which are undefined until set

```typescript
function greet(name?: string) {
  // name is undefined if not provided
  return "Hello, " + (name ?? "Guest");
}
```

Additionally, many APIs return null/undefined to indicate not found or missing. Using these values matches common patterns:

```typescript
function findUser(id: string): User | undefined {
  // return undefined if user not found
}
```

So, in summary, assigning null or undefined lets you clearly express "no value" or "not set yet," making your code safer, more readable, and easier to maintain.

### NPM vs NPX
NPM is a package management that is used to install, uninstall, and update Javascript packages on your workstation, whereas NPX is a package executer that is used to directly execute Javascript packages without installing them.

### TypeScript verbatimModuleSyntax
When verbatimModuleSyntax is enabled, TypeScript requires you to be explicit about whether you're importing:

- Values (functions, classes, objects) - used at runtime
- Types (interfaces, type aliases) - only used for type checking, stripped away at build time

---

## Vue 3

### Vue Component Styling Architecture
The key idea of designing web apps or web pages with Vue, is that you have two levels of styling: the container level (where you control overall layout, spacing between major sections, and page-wide responsive behavior) and the component level (where each component handles its own internal layout and styling).

When it comes to responsiveness, you have multiple approaches, and the best strategy combines them:

- Component-Level Responsiveness: Each component handles its own responsive behavior. Your ProjectCard.vue component would contain media queries for how project cards should behave on different screen sizes.

- Container-Level Responsiveness: Your view or layout components handle overall page structure changes. For example, your ProjectsSection.vue might change from a three-column grid to a single column on mobile.

Here's how this works in practice:

```vue
<!-- ProjectCard.vue -->
<style scoped>
.project-card {
  /* Base styles */
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
}

@media (max-width: 768px) {
  .project-card {
    padding: var(--spacing-md);
    /* Component-specific mobile adjustments */
  }
}
</style>

<!-- ProjectsSection.vue -->
<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
}
</style>
```

To manage global CSS styles and variables, here's the most effective approach:

- Global Styles Setup: Create a styles/main.css file that contains your CSS custom properties, reset styles, and utility classes. Import this in your main.js file so it's available throughout your entire application.

- Component-Specific Styles: Each component uses <style scoped> for its specific styling needs, pulling from your global variables for consistency but adding component-specific rules.

In general, your components become like a design system for your own website. The ProjectCard component you create now can be reused if you later add a dedicated projects page. Your HeroSection might evolve into a more generic PageHeader component that you can customize for different pages.

The scoped styling ensures that each component's styles don't interfere with others, while your global variables maintain visual consistency. This gives you the best of both worlds: the modularity and organization of component-based development with the design control you need for a polished portfolio website.

### TypeScript Support in Vue
When using TypeScript in Vue, 'could not find errors' might occur because Vue's TypeScript support needs to understand that .vue files are valid modules. TypeScript is statically typed and needs to know the type of every import at compile time.

Make sure you have a env.d.ts file (or similar) in your src directory with Vue type declarations:

```typescript
<reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

The code above in your 'env.d.ts' should fix any 'could not find' problems you might see. The declaration 'declare module '*.vue' essentially tells TypeScript: "Any file ending in .vue exports a Vue component of this specific type."

### Composables
A composable is a separate JavaScript file that exports a function containing reactive logic.

```
src/
├── composables/
│   └── useElevenLabs.js    // New composable file
├── components/
│   └── Menu.vue            // Your existing component
└── stores/
    └── conversation.js     // Pinia store
```

- The composable is a separate .js file that you import into your component
- It's not injected - you call it as a function that returns reactive references and methods
- Multiple components can use the same composable independently
- The composable maintains its own internal state but can interact with Pinia stores

### Composables vs Pinia Stores
A composable in Vue is a function that encapsulates and reuses stateful logic. It uses Vue's Composition API (like ref, reactive, computed) to manage reactive state and return it for use in components

Key differences from Pinia stores:

- Scope: Composables create isolated instances per component that uses them. Pinia stores are global singletons shared across the entire app.
- State sharing: Each component gets its own composable state. Pinia stores share state between all components.
- Persistence: Composable state is tied to component lifecycle. Store state persists until explicitly cleared.

### Vue Components are JavaScript
Vue 3 components, even though they have .vue extensions, are actually JavaScript under the hood. Everything inside <script setup> is regular JavaScript.

### v-html Directive
v-html is what you used in Vue when you intend to render HTML elements into the code, rather than strings of text which is the Vue default. This is what you need to use when you need, for example, to dynamically render SVGs into a component.

- Text interpolation {{ }} = "Show this as text"
- HTML directive v-html = "Render this as HTML"

See it in practice below:

```vue
<span class="icon">{{ option.icon }}</span>
```

- Result: Literal text <svg xmlns="http://www.w3.org/2000/svg"... displayed on screen
- Problem: Vue's {{ }} treats everything as text, not HTML

```vue
<span class="icon" v-html="option.icon"></span>
```

- Result: Actual SVG icon renders visually
- Solution: Vue's v-html directive interprets the string as HTML markup

### Dynamic src with v-bind and @ Alias
When using dynamic src attributes with v-bind (:src), the @ alias might not be resolved properly at runtime. The @ alias works fine for static imports in <script> sections or static src attributes in templates, but when the path is stored in a variable and used dynamically, it might not resolve correctly. So for example, the below will not work:

```vue
<img :src="skill.icon" />
```

The solution is to import all the assets you're going to be serving in the component directly in the script section:

```javascript
import pythonIcon from '@/assets/icons/python.svg'
import nodejsIcon from '@/assets/icons/nodejs.svg'
import fastapiIcon from '@/assets/icons/FastAPI.svg'
```

And then you link them to the attribute:

```javascript
const skillCategories = {
  'Tech Stack': [
    { name: 'Vue 3', icon: vueIcon },
    { name: 'Python', icon: pythonIcon },
    { name: 'Node.js', icon: nodejsIcon },
    { name: 'FastAPI', icon: fastapiIcon },
    { name: 'JavaScript', icon: javascriptIcon }
  ],
  //Rest of the icons and attributes
}
```

Then you can use this successfully:

```vue
<img :src="skill.icon">
```

### Pinia Store State Isolation
In Pinia, each store maintains its own isolated state, so having a status variable in multiple stores will not cause any conflicts. This is actually one of the key benefits of using a state management library like Pinia - each store operates as its own independent module.

### Scoped Styles in Parent Components
In Vue, scoped styles in parent components (meaning components that hold other components) are NOT be accessible to child components due to Vue's scoping mechanism.

### RouterLink and Semantic HTML
<RouterLink> renders as an <a> tag by default, which maintains semantic HTML and ensures accessibility for screen readers and keyboard navigation. Do not wrapping <button> or <a> inside <RouterLink> tags as this is incorrect.

---

## Astro.js

### TypeScript Support in Astro
Astro has built-in TypeScript support, that treats all components as TypeScript by default, even when you write plain JavaScript. Is not like there's something wrong with your code when you write plain JavaScript and get flagged a Type error. The errors you mostly see are from your editor's TypeScript language server, not from Astro's build process.

To completely opt out of TypeScript for your project, open VS Code Command Palette by pressing Ctrl+Shift+P, select Preferences: Open Workspace Settings (JSON) and add the following code to the file.

```json
{
  "typescript.validate.enable": false
}
```

Keep in mind that you can freely mix TypeScript and JavaScript in Astro projects—it's completely fine and actually a common practice. Astro processes everything through its TypeScript compiler regardless of whether you write TypeScript or JavaScript. This means that .js and .ts files can coexist in the same project, and that Astro components can contain plain JavaScript or TypeScript syntax.

No mandatory consistency is required either: Some components can use TypeScript features (like type annotations) while others use plain JavaScript

### Component Data Management in Astro
In Astro.js, you use expression syntax (the single curly braces {} ) and template literals to inject data from the frontmatter directly in your HTML, just like in JSX.

For example:

```astro
---
const eyebrow = "WORK WITH THE BEST";
---
<p>{eyebrow}</p>
```

This works and is a legitimate pattern, especially for static landing pages and one-off components you're not intending to reuse.

But there're different patterns/solutions for different scenarios as well:

1. For components that you'll likely reuse with different content, props are the recommended best practice. You'd then just pass the data via props from the parent component to the child, or in the page where your component is being used.

2. When we're handling data from a list, we use JavaScript's native .map() method within our markup. Let's say we need to generate a number of feature cards within a component, one feature card per each item within a 'const features' array, along with additional information from the feature, like title, image and a URL.

We would do something like this in our markup:

```
{features.map((feature) => (
  <div>
    <h3>{feature.heading}</h3>
    <p>{feature.description}</p>
  </div>
))}
```

You can even perform filtering operations before the mapping, to filter out data in real time before rendering elements.

This is the equivalent of Vue 3 'v-for' directive.

3. When we want to display (or not display) something based on a given condition, we use conditionals with ternary:

```
{isVisible ? <div>Shown</div> : <div>Hidden</div>}
```

### Fonts in Astro + Tailwind Projects
Working with fonts in Astro + Tailwind projects is fairly straight-forward. Just import the fonts you wish to use at the top of your global.css styles:

```css
@import url("https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
```

Then, inject the font you want to use as the default into your body via @layer base:

```css
@layer base {
  body {
    @apply bg-background text-foreground font-geist antialiased;
    scrollbar-gutter: stable;
  }
}
```

This will make Geist the first-choice font throughout your project.

Any other font you need to use, you'll need to make sure it is imported in global.css first, and then you just have to use any of your predefined variables as a utility class (or create a new one if you do not have it for that specific font)

For example, in an <h1> element:

```html
<h1 class="font-bebasNeue text-3xl">
```

### Client Directives for Hydration
Astro renders everything as static HTML by default. For React components with animations to work, you need to add a **client directive** to tell Astro to hydrate the component on the client side.

Common directives:
- `client:load` - Hydrates immediately on page load
- `client:visible` - Hydrates when component enters viewport
- `client:idle` - Hydrates after page is idle

The client:* directive is a rendering instruction that tells Astro when and how to hydrate the component on the client-side.

### Vite Development Mode and Bundle Size
In development, Vite (Astro's and Vue's build tool) uses unbundled ESM (ES Modules). This means:
- ✅ Each module is served individually (that's why you see 156+ requests)
- ✅ Source maps are included for debugging
- ✅ No minification or tree-shaking
- ✅ Hot Module Replacement (HMR) code is included
- ✅ This is intentional for fast dev experience

This is why you see sometimes enormous load sizes when testing on your local environment.

### Unused Dependencies in Astro
Unused dependencies do NOT affect your build. Astro (and modern bundlers in general) only bundle code that's actually imported and used in your components.

Astro scans your components and only includes code that you explicitly import.

Modern bundlers (Vite, which Astro uses) eliminate dead code:

- Only used exports from libraries are included
- Unused functions are stripped out
- Empty imports are removed entirely

Even if you install a package and is in your node_modules folder (e.g React), these packages won't be added to the build as long as they're not imported in your components (even if they're added to the package.json dependencies, because of tree-shaking).

---

## Project Management

### YAGNI Principle
"You aren't gonna need it" (YAGNI) is a principle which arose from extreme programming (XP) that states a programmer should not add functionality until deemed necessary. Ron Jeffries, a co-founder of XP, explained the philosophy: "Always implement things when you actually need them, never when you just foresee that you [will] need them."

### Claude Code Optimization
Don't overdo code optimization with Claude Code. If you run optimization prompts several times in a row, you'll end up running your logic into the ground and the code will eventually stop working, because Claude will overengineer the shit out of it once it runs out of sensible and reasonable improvement suggestions (which usually happens after the 2nd or even 1st round of optimizations).

From now on, do not do more than 2 optimization runs, and if it still works, just let it be.

### Claude Code --resume Command
You can use the following command to kickstart a conversation with Claude to work on the project you're currently on:

```
claude --resume
```

This will basically save you the step of telling Claude to analyze your codebase to get on context, since it will tell Claude Code to do it automatically and it will also check your commit history to see what you've been working on recently. It will essentially get Claude ready to work on whatever feature you want straight away.

### Windows Clipboard Manager for Saving Prompts
Start using the Windows Key + V shortcut with pinned clipping to save prompts you often reuse, so you don't have to write them over and over again.

### Package Installation Best Practices
To completely uninstall a package and revert all changes:

1. Discard all file changes in Source Control (which you've already done)
2. Remove the package by running:

```
npm uninstall @package-name
```

Alternatively, since Git source control should already revert the package.json, you can simply run:

```
npm install
```

This will reinstall dependencies based on the reverted package.json, effectively removing the @formkit/auto-animate package.

### Cloning and Setting Up a Repository
After cloning a project removing the git history, you need to install the dependencies again by running 'npm install'. Here's the full process step by step (step 0 being situated already in the folder or desktop where you want to install your new project)

```bash
# 1. Clone the repository
git clone https://github.com/username/repository-name.git your-new-project-name

# 2. Navigate to the project
cd your-new-project-name

# 3. Remove git history
Remove-Item -Recurse -Force .git

# 4. Install dependencies (THIS IS THE MISSING STEP!)
npm install

# 5. Initialize fresh git
git init
git add .
git commit -m "Initial commit"

# 6. Now you can run the project
npm run dev
```

### NPM Install Across Git Branches
When you install packages via npm on a feature branch, the packages themselves are not exclusive to that branch, meaning that while the package.json changes are branch-specific, the actual package files are added to the shared node_modules/ folder.

After switching branches, run npm install to ensure your node_modules/ matches that branch's package.json.

Running npm install on your main branch will:

- Install all packages listed in package.json that aren't already in node_modules/
- Remove any extra packages that exist in node_modules/ but aren't declared in package.json
- Restore the exact state defined by your package-lock.json

### Understanding package.json and package-lock.json
package.json is where you check your direct dependencies - the packages your app is actually using.

package-lock.json contains the complete dependency tree, including all the sub-dependencies (dependencies of your dependencies). For example, when you install vue, it might depend on 20 other packages - those all get listed in the lock file.

To check what's actually installed:

1. package.json = "What I directly need"
2. package-lock.json = "Everything that's actually installed (including sub-dependencies)"
3. node_modules/ = "What's physically on disk right now"

Keep in mind that Vite (and most modern bundlers) will treeshake unused code during production builds, but this works at the code level, not the package level. To see your actual bundle size: Run npm run build and check the output - Vite will show you exactly what's included and the final bundle sizes. Vite protects you from unused code, but keeping your package.json clean (like yours) is still the best practice.

### Git: Discarding All Changes
If you ever want to DISCARD all changes in Git (before they're commited obviously), run these two commands in that exact order:

```bash
git reset --hard HEAD
git clean -fd
```

git reset will remove all staged changes, discard all modifications to tracked files and reset your working directory to exactly match the last commit, while git clean removes any untracked file (new files you created during the working session you want to erase that have not been added to Git).

### Claude Code: Context7 MCP Integration
Use the below command to successfully add Context7 MCP to Claude Code for any project:

```
claude mcp add context7 -- npx @upstash/context7-mcp@latest
```

### Claude Code: Skip Permissions
Use the below command to allow Claude Code to do everything he wants without asking permission:

```
claude --dangerously-skip-permissions
```

Or add this to your settings.local.json file:

```json
{
  "permissions": {
    "allow": [],
    "deny": [],
    "ask": [],
    "defaultMode": "bypassPermissions"
  }
}
```

### Claude Code: Plan Mode
Press Alt + M to switch to Plan Mode on Claude Code.

### Claude Code: Serena MCP Configuration
If in the future, you want to add Serena again to your Claude Code configuration, simply add this to your .claude.json file at the /migue directory:

```json
"mcpServers": {
  "serena": {
    "command": "uvx",
    "args": [
      "--from",
      "git+https://github.com/oraios/serena",
      "serena-mcp-server"
    ]
  }
}
```

### File Operations with ni Command
The 'ni' command is used to create new files inside an existing folder.

```
ni src/__init__.py
```

Keep in mind that it requires the 'src' folder to actually exist.

### VS Code: Hide Files and Folders
You can configure patterns to hide files and folders from the explorer and searches.

1. Open Visual Studio Code User Settings (Main menu: File → Preferences → Settings). This will open the setting screen.
2. Search for files:exclude in the search at the top.
3. Add the type of file you wish to hide.

### VS Code: File Deletion Warning
Be careful when selecting files in VS Code to delete. You sometimes have a file already selected (that you do no intend to delete, but it's include in the selection) and, without being aware, delete it as well.

### Git File Tracking
You can safely make hard copies of code files and take them outside your project if you want to make a provisional backup. Git only tracks files inside the repository (the project folder). A file you copy to a different folder outside a project becomes completely independent, since changes committed to the repository won't touch any external files (even if they used to belong to said repository).

### Importing vs Using/Rendering
Be aware of the distinction between IMPORTING and USING/RENDERING. Importing is when you import the file/module/package at the top of your code file. Using/rendering means when you use a component or asset that you imported in the template area of your code file (e.g in Vue <template> or inside the Component Template in Astro.js).

---

## AI

### LLM Optimization and Claude Code
Don't overdo code optimization with Claude Code. If you run optimization prompts several times in a row, you'll end up running your logic into the ground and the code will eventually stop working, because Claude will overengineer the shit out of it once it runs out of sensible and reasonable improvement suggestions (which usually happens after the 2nd or even 1st round of optimizations).

From now on, do not do more than 2 optimization runs, and if it still works, just let it be.

### LLM Skepticism: setTimeout Suggestions
If your LLM ever suggests using 'setTimeout' to fix an issue, take it with skepticism, as that rarely works.

### Atomic Agents: BaseIOSchema
BaseIOSchema in Atomic Agents is just a thin wrapper around BaseModel, probably looking like this:

```python
class BaseIOSchema(BaseModel):
    pass
```

### Claude: Explanatory Style
When you want you just want an explanation on a code file or a portion of your codebase, without having a lot of code examples or additional actions from Claude, use the 'Explanatory' style. This will make the LLMs answer mostly text-based.

### Claude: Context Limit Consumption
It takes way longer than you think to reach context limits in Claude conversations. Whenever you think you're approaching it, simply ask how many tokens have you consumed so far and how much you got left, and Claude will tell you.

### Embedding Concept
Embedding is a mathematical concept that refers to placing one object into a different space.

### OpenAI: Frequency Penalty Parameter
In OpenAI, the frequency penalty is a parameter that reduces the likelihood of the model repeating the same words or tokens within a single generated output by decreasing a word's score each time it's used. It helps promote vocabulary diversity and makes the text less repetitive. The parameter can be adjusted in the API, typically between -2.0 and 2.0, where a value of 0 means no penalty is applied.

---

## Miscellanea

### HTML <a> Tag Href Best Practices
Regarding <a> elements, when you write href="www.linkedin.com", the browser treats it as a relative path from your current domain rather than an external link. You are missing the https:// protocol.

Here's how you should do it:

```html
<a href="https://www.linkedin.com/in/your-profile-name">
```

Or use protocol-relative URL:

```html
<a href="//www.linkedin.com/in/your-profile-name">
```

### HTML Figure Tag for Logos
Use <figure> for logos, since that's the actual meaning of the figure tag: visual elements with some meaning.

### HTML Thematic Break Tag
The <hr> tag, called Thematic Break, defines a thematic break in an HTML page (e.g. a shift of topic).

The <hr> element is most often displayed as a horizontal rule that is used to separate content (or define a change) in an HTML page, or also used as a divider. It can be styled if needed.

### Chrome DevTools: Modify Webpage Text
If you type document.designMode = "on"; into the Chrome devtools, it lets you modify the text on the webpage directly.